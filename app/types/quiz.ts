export interface Question {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
}

export interface QuizData {
    [key: string]: Question[];
}
