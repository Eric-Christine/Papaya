import React from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import PapayaAppIcon from '../components/AppIcon';

/**
 * Test page to view and export the Papaya app icon
 *
 * To export as PNG:
 * 1. Run this on web: npm run web
 * 2. Navigate to /test-icon
 * 3. Right-click on the icon and "Save image as..."
 * 4. Save as icon.png (1024x1024)
 *
 * Then update app.json:
 * "icon": "./assets/images/icon.png"
 */
export default function TestIconScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Papaya App Icon</Text>
      <Text style={styles.subtitle}>1024x1024 - Ready for export</Text>

      <View style={styles.iconContainer}>
        <PapayaAppIcon size={1024} />
      </View>

      {Platform.OS === 'web' && (
        <View style={styles.instructions}>
          <Text style={styles.instructionText}>
            📱 To export: Right-click the icon above and select "Save image as..."
          </Text>
          <Text style={styles.instructionText}>
            💾 Save it as: icon.png (1024x1024px)
          </Text>
          <Text style={styles.instructionText}>
            📂 Place it in: assets/images/icon.png
          </Text>
          <Text style={styles.instructionText}>
            ⚙️ Update app.json: "icon": "./assets/images/icon.png"
          </Text>
          <Text style={styles.instructionText}>
            🔄 Rebuild: npx expo prebuild --clean
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  iconContainer: {
    width: 320,
    height: 320,
    backgroundColor: '#fff',
    borderRadius: 60,
    padding: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'hidden',
    marginBottom: 30,
  },
  instructions: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    maxWidth: 600,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  instructionText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
    lineHeight: 20,
  },
});
