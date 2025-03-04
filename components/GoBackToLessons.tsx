import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GoBackToLessonsButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={() => navigation.navigate('Lessons')}
    >
      <Text style={styles.buttonText}>Go Back to Lessons</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#00695c',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GoBackToLessonsButton;