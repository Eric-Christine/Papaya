import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function LessonDetailScreen({ route, navigation }) {
  const { title } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title ? title : 'Lesson Details'}</Text>
      <Text style={styles.description}>
        This is the content for the <Text style={styles.bold}>{title || 'selected lesson'}</Text>.
      </Text>
      <Button title="Go Back to Lessons" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2E7D32',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  bold: {
    fontWeight: 'bold',
    color: '#388E3C',
  },
});
