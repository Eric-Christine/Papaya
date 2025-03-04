import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GoBackToLessonsButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={() => navigation.goBack()}
    >
      <Text style={styles.text}>Go Back to Lessons</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#00695c',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default GoBackToLessonsButton; 