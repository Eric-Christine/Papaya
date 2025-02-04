// app/screens/SustainableLivingScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';

export default function SustainableLivingScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Sustainable Living</Text>
      <Text style={styles.description}>
        Sustainable Living is about making daily choices that reduce your environmental impact and contribute to a healthier planet. In this lesson, you'll discover practical tips to live more sustainably and improve your quality of life.
      </Text>
      <Text style={styles.listItem}>• Reduce waste by recycling and reusing materials</Text>
      <Text style={styles.listItem}>• Conserve energy by using efficient appliances and renewable energy sources</Text>
      <Text style={styles.listItem}>• Opt for sustainable transportation like biking, walking, or public transit</Text>
      <Text style={styles.listItem}>• Choose locally grown and organic foods to support sustainable agriculture</Text>
      <Text style={styles.listItem}>• Conserve water and use eco-friendly products</Text>
      <Text style={styles.description}>
        Embracing sustainable living practices not only benefits the environment but also promotes a healthier lifestyle and a more resilient community.
      </Text>
      <View style={styles.buttonContainer}>
        <Button 
          title="Learn More"
          onPress={() => navigation.navigate('SustainableLivingDetails')}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  listItem: {
    fontSize: 18,
    color: '#555',
    marginVertical: 5,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
  },
});
