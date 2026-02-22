#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import ts from "typescript";

const ROOT = process.cwd();
const PATHS = {
  lessons: path.join(ROOT, "app/data/lessons.ts"),
  contentData: path.join(ROOT, "app/data/contentData.tsx"),
  lessonDetail: path.join(ROOT, "app/screens/LessonDetailScreen.tsx"),
  output: path.join(ROOT, "lesson-content-export.md"),
};

const WATCH_FILES = [PATHS.lessons, PATHS.contentData, PATHS.lessonDetail];
const WATCH_FLAG = "--watch";

function readFile(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function isStringOrTemplateLiteral(node) {
  return (
    ts.isStringLiteral(node) ||
    ts.isNoSubstitutionTemplateLiteral(node) ||
    ts.isTemplateExpression(node)
  );
}

function literalToText(node, sourceFile) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text;
  }

  if (ts.isTemplateExpression(node)) {
    let value = node.head.text;
    for (const span of node.templateSpans) {
      value += "${" + span.expression.getText(sourceFile) + "}";
      value += span.literal.text;
    }
    return value;
  }

  return null;
}

function parseEqualsString(expr, identifierName) {
  if (!ts.isBinaryExpression(expr)) {
    return null;
  }

  const op = expr.operatorToken.kind;
  if (op !== ts.SyntaxKind.EqualsEqualsEqualsToken && op !== ts.SyntaxKind.EqualsEqualsToken) {
    return null;
  }

  const leftIsId = ts.isIdentifier(expr.left) && expr.left.text === identifierName;
  const rightIsId = ts.isIdentifier(expr.right) && expr.right.text === identifierName;

  if (leftIsId && ts.isStringLiteralLike(expr.right)) {
    return expr.right.text;
  }
  if (rightIsId && ts.isStringLiteralLike(expr.left)) {
    return expr.left.text;
  }

  return null;
}

function parseEqualsNumber(expr, identifierName) {
  if (!ts.isBinaryExpression(expr)) {
    return null;
  }

  const op = expr.operatorToken.kind;
  if (op !== ts.SyntaxKind.EqualsEqualsEqualsToken && op !== ts.SyntaxKind.EqualsEqualsToken) {
    return null;
  }

  const leftIsId = ts.isIdentifier(expr.left) && expr.left.text === identifierName;
  const rightIsId = ts.isIdentifier(expr.right) && expr.right.text === identifierName;

  if (leftIsId && ts.isNumericLiteral(expr.right)) {
    return Number(expr.right.text);
  }
  if (rightIsId && ts.isNumericLiteral(expr.left)) {
    return Number(expr.left.text);
  }

  return null;
}

function collectStringConstsFromStatements(statements, sourceFile) {
  const map = new Map();

  for (const stmt of statements) {
    if (!ts.isVariableStatement(stmt)) {
      continue;
    }

    for (const decl of stmt.declarationList.declarations) {
      if (!ts.isIdentifier(decl.name) || !decl.initializer || !isStringOrTemplateLiteral(decl.initializer)) {
        continue;
      }

      const text = literalToText(decl.initializer, sourceFile);
      if (text !== null) {
        map.set(decl.name.text, text);
      }
    }
  }

  return map;
}

function collectStringConstsInNode(node, sourceFile) {
  const map = new Map();

  function visit(current) {
    if (ts.isVariableDeclaration(current)) {
      if (ts.isIdentifier(current.name) && current.initializer && isStringOrTemplateLiteral(current.initializer)) {
        const text = literalToText(current.initializer, sourceFile);
        if (text !== null) {
          map.set(current.name.text, text);
        }
      }
    }
    ts.forEachChild(current, visit);
  }

  visit(node);
  return map;
}

function findContentAssignmentDeep(node, sourceFile) {
  let match = null;

  function visit(current) {
    if (match) {
      return;
    }

    if (ts.isBinaryExpression(current) && current.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
      if (ts.isIdentifier(current.left) && current.left.text === "content") {
        match = current.right;
        return;
      }
    }
    ts.forEachChild(current, visit);
  }

  visit(node);
  return match;
}

function findDirectContentAssignmentInBlock(node) {
  if (!ts.isBlock(node)) {
    return null;
  }

  for (const stmt of node.statements) {
    if (!ts.isExpressionStatement(stmt) || !ts.isBinaryExpression(stmt.expression)) {
      continue;
    }
    if (stmt.expression.operatorToken.kind !== ts.SyntaxKind.EqualsToken) {
      continue;
    }
    if (!ts.isIdentifier(stmt.expression.left) || stmt.expression.left.text !== "content") {
      continue;
    }
    return stmt.expression.right;
  }

  return null;
}

function resolveContentText(assignmentExpr, sourceFile, valueMap) {
  if (!assignmentExpr) {
    return null;
  }

  if (ts.isIdentifier(assignmentExpr)) {
    return valueMap.get(assignmentExpr.text) ?? null;
  }

  if (isStringOrTemplateLiteral(assignmentExpr)) {
    return literalToText(assignmentExpr, sourceFile);
  }

  return null;
}

function extractStepContent(stepIfNode, sourceFile, valueMap) {
  const steps = [];
  let current = stepIfNode;

  while (current) {
    const stepNumber = parseEqualsNumber(current.expression, "step");
    const assigned = findContentAssignmentDeep(current.thenStatement, sourceFile);
    const text = resolveContentText(assigned, sourceFile, valueMap);

    if (stepNumber !== null && text) {
      steps.push({ step: stepNumber, text });
    }

    if (current.elseStatement && ts.isIfStatement(current.elseStatement)) {
      current = current.elseStatement;
    } else {
      break;
    }
  }

  steps.sort((a, b) => a.step - b.step);
  return steps;
}

function extractLessonBranchContent(thenStatement, sourceFile, globalMap) {
  const localMap = collectStringConstsInNode(thenStatement, sourceFile);
  const valueMap = new Map(globalMap);
  for (const [key, value] of localMap.entries()) {
    valueMap.set(key, value);
  }

  if (ts.isBlock(thenStatement)) {
    for (const stmt of thenStatement.statements) {
      if (ts.isIfStatement(stmt) && parseEqualsNumber(stmt.expression, "step") !== null) {
        const steps = extractStepContent(stmt, sourceFile, valueMap);
        if (steps.length > 0) {
          return steps;
        }
      }
    }

    const directAssign = findDirectContentAssignmentInBlock(thenStatement);
    const directText = resolveContentText(directAssign, sourceFile, valueMap);
    if (directText) {
      return [{ step: 1, text: directText }];
    }
  } else {
    const deepAssign = findContentAssignmentDeep(thenStatement, sourceFile);
    const text = resolveContentText(deepAssign, sourceFile, valueMap);
    if (text) {
      return [{ step: 1, text }];
    }
  }

  return [];
}

function parseLessonsMetadata(fileText) {
  const sourceFile = ts.createSourceFile("lessons.ts", fileText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const results = [];

  function getObjectStringValue(obj, propertyName) {
    for (const prop of obj.properties) {
      if (!ts.isPropertyAssignment(prop)) {
        continue;
      }

      let key = null;
      if (ts.isIdentifier(prop.name)) {
        key = prop.name.text;
      } else if (ts.isStringLiteral(prop.name)) {
        key = prop.name.text;
      }

      if (key !== propertyName || !isStringOrTemplateLiteral(prop.initializer)) {
        continue;
      }

      return literalToText(prop.initializer, sourceFile);
    }
    return null;
  }

  function visit(node) {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === "lessons") {
      if (!node.initializer || !ts.isArrayLiteralExpression(node.initializer)) {
        return;
      }
      for (const element of node.initializer.elements) {
        if (!ts.isObjectLiteralExpression(element)) {
          continue;
        }
        const id = getObjectStringValue(element, "id");
        const title = getObjectStringValue(element, "title");
        const category = getObjectStringValue(element, "category");
        if (id && title && category) {
          results.push({ id, title, category });
        }
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return results;
}

function parseContentData(fileText) {
  const sourceFile = ts.createSourceFile("contentData.tsx", fileText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const contentMap = new Map();

  function visit(node) {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === "lessonContents") {
      if (!node.initializer || !ts.isObjectLiteralExpression(node.initializer)) {
        return;
      }

      for (const prop of node.initializer.properties) {
        if (!ts.isPropertyAssignment(prop)) {
          continue;
        }

        let key = null;
        if (ts.isStringLiteral(prop.name)) {
          key = prop.name.text;
        } else if (ts.isIdentifier(prop.name)) {
          key = prop.name.text;
        }

        if (!key || !isStringOrTemplateLiteral(prop.initializer)) {
          continue;
        }

        const value = literalToText(prop.initializer, sourceFile);
        if (value !== null) {
          contentMap.set(key, value);
        }
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return contentMap;
}

function findLessonDetailFunction(sourceFile) {
  for (const stmt of sourceFile.statements) {
    if (ts.isFunctionDeclaration(stmt) && stmt.body && stmt.name && stmt.name.text === "LessonDetailScreen") {
      return stmt;
    }
  }
  return null;
}

function parseLessonDetail(fileText) {
  const sourceFile = ts.createSourceFile(
    "LessonDetailScreen.tsx",
    fileText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  );
  const fn = findLessonDetailFunction(sourceFile);
  if (!fn || !fn.body) {
    throw new Error("Could not parse LessonDetailScreen function body.");
  }

  const statements = fn.body.statements;
  const rootIfIndex = statements.findIndex(
    (stmt) => ts.isIfStatement(stmt) && parseEqualsString(stmt.expression, "title") !== null
  );

  if (rootIfIndex === -1) {
    throw new Error("Could not find lesson title switch logic in LessonDetailScreen.");
  }

  const globalConsts = collectStringConstsFromStatements(statements.slice(0, rootIfIndex), sourceFile);
  const titleToSteps = new Map();

  let chainNode = statements[rootIfIndex];
  if (!ts.isIfStatement(chainNode)) {
    return titleToSteps;
  }

  while (chainNode) {
    const title = parseEqualsString(chainNode.expression, "title");
    if (title) {
      const steps = extractLessonBranchContent(chainNode.thenStatement, sourceFile, globalConsts);
      if (steps.length > 0) {
        titleToSteps.set(title, steps);
      }
    }

    if (chainNode.elseStatement && ts.isIfStatement(chainNode.elseStatement)) {
      chainNode = chainNode.elseStatement;
    } else {
      break;
    }
  }

  return titleToSteps;
}

function normalizeText(text) {
  return text.replace(/\r\n/g, "\n").trim();
}

function buildMarkdown(lessonsMeta, detailMap, contentDataMap) {
  const lines = [];
  const now = new Date().toISOString();
  const categoryOrder = [];
  const lessonsByCategory = new Map();
  const knownTitles = new Set();

  for (const lesson of lessonsMeta) {
    knownTitles.add(lesson.title);
    if (!lessonsByCategory.has(lesson.category)) {
      lessonsByCategory.set(lesson.category, []);
      categoryOrder.push(lesson.category);
    }
    lessonsByCategory.get(lesson.category).push(lesson);
  }

  lines.push("# Lesson Content Export");
  lines.push("");
  lines.push(`Generated: ${now}`);
  lines.push("");
  lines.push("This file is auto-generated by `scripts/export-lesson-content.mjs`.");
  lines.push("");

  for (const category of categoryOrder) {
    lines.push(`## ${category}`);
    lines.push("");

    for (const lesson of lessonsByCategory.get(category)) {
      lines.push(`### ${lesson.title}`);
      lines.push(`Lesson ID: ${lesson.id}`);
      lines.push("");

      const steps = detailMap.get(lesson.title);
      const fallback = contentDataMap.get(lesson.title);

      if (steps && steps.length > 0) {
        if (steps.length === 1) {
          lines.push(normalizeText(steps[0].text));
          lines.push("");
        } else {
          for (const step of steps) {
            lines.push(`#### Step ${step.step}`);
            lines.push("");
            lines.push(normalizeText(step.text));
            lines.push("");
          }
        }
      } else if (fallback) {
        lines.push(normalizeText(fallback));
        lines.push("");
      } else {
        lines.push("_No lesson content found in source files._");
        lines.push("");
      }
    }
  }

  const extraTitles = Array.from(
    new Set([...detailMap.keys(), ...contentDataMap.keys()])
  )
    .filter((title) => !knownTitles.has(title))
    .sort((a, b) => a.localeCompare(b));

  if (extraTitles.length > 0) {
    lines.push("## Supplemental Lesson Pages");
    lines.push("");
    lines.push("These titles exist in lesson content sources but are not listed in `app/data/lessons.ts`.");
    lines.push("");

    for (const title of extraTitles) {
      lines.push(`### ${title}`);
      lines.push("");

      const steps = detailMap.get(title);
      const fallback = contentDataMap.get(title);

      if (steps && steps.length > 0) {
        if (steps.length === 1) {
          lines.push(normalizeText(steps[0].text));
          lines.push("");
        } else {
          for (const step of steps) {
            lines.push(`#### Step ${step.step}`);
            lines.push("");
            lines.push(normalizeText(step.text));
            lines.push("");
          }
        }
      } else if (fallback) {
        lines.push(normalizeText(fallback));
        lines.push("");
      } else {
        lines.push("_No lesson content found in source files._");
        lines.push("");
      }
    }
  }

  return lines.join("\n");
}

function generateLessonExport() {
  const lessonsText = readFile(PATHS.lessons);
  const contentDataText = readFile(PATHS.contentData);
  const lessonDetailText = readFile(PATHS.lessonDetail);

  const lessonsMeta = parseLessonsMetadata(lessonsText);
  const contentDataMap = parseContentData(contentDataText);
  const detailMap = parseLessonDetail(lessonDetailText);
  const markdown = buildMarkdown(lessonsMeta, detailMap, contentDataMap);

  fs.writeFileSync(PATHS.output, markdown, "utf8");
  console.log(`[lesson-export] Wrote ${PATHS.output}`);
}

function runWatchMode() {
  let debounceTimer = null;
  const watchers = [];

  const triggerGenerate = (reason) => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    debounceTimer = setTimeout(() => {
      try {
        generateLessonExport();
        console.log(`[lesson-export] Updated after ${reason}`);
      } catch (error) {
        console.error("[lesson-export] Failed to update:", error);
      }
    }, 120);
  };

  for (const filePath of WATCH_FILES) {
    const watcher = fs.watch(filePath, () => {
      triggerGenerate(path.basename(filePath));
    });
    watchers.push(watcher);
  }

  console.log("[lesson-export] Watching lesson files for changes...");

  const shutdown = () => {
    for (const watcher of watchers) {
      watcher.close();
    }
    process.exit(0);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

function main() {
  try {
    generateLessonExport();
  } catch (error) {
    console.error("[lesson-export] Initial export failed:", error);
    process.exit(1);
  }

  if (process.argv.includes(WATCH_FLAG)) {
    runWatchMode();
  }
}

main();
