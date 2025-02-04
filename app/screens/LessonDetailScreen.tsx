// app/screens/LessonDetailScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';

export default function LessonDetailScreen({ route, navigation }) {
  // Get the current lesson title from route params; default to "Climate Basics"
  const { title = 'Climate Basics' } = route.params || {};

  // Content for Climate Change lessons
  const climateBasicsContent = `Climate Basics covers the fundamentals of climate science, including:

• The Greenhouse Effect: How gases like carbon dioxide, methane, and water vapor trap heat in the atmosphere.
• Human Impact: How burning fossil fuels, deforestation, and industrial processes contribute to climate change.
• Consequences: The impacts of climate change such as rising temperatures, melting ice caps, and extreme weather events.
• Solutions: Steps we can take to reduce our carbon footprint and mitigate the effects of climate change.

This lesson introduces you to the key concepts of our changing climate.`;

  const greenhouseGasesContent = `Greenhouse Gases are the primary contributors to global warming. In this lesson, you'll learn:

• Key Gases: Such as carbon dioxide (CO₂), methane (CH₄), and nitrous oxide (N₂O).
• Sources: How both natural processes and human activities release these gases.
• Impact: The role these gases play in trapping heat and influencing global temperatures.
• Mitigation: Strategies to reduce emissions and protect our environment.

Understanding greenhouse gases is essential for grasping the scale of climate change.`;

  const humanImpactContent = `Human Impact examines how human activities affect our planet. In this lesson, you'll discover:

• Environmental Degradation: The effects of pollution, deforestation, and resource depletion.
• Social & Economic Factors: How environmental changes influence communities and economies.
• Sustainability Challenges: The complexities of balancing development with conservation.
• Innovative Solutions: Emerging strategies and technologies to reduce human impact.

This lesson shows why understanding human impact is crucial to building a sustainable future.`;

  const consequencesContent = `Consequences of Climate Change focus on the real-world impacts, including:

• Rising Sea Levels: Threatening coastal communities and ecosystems.
• Extreme Weather Events: Increasing frequency and intensity of hurricanes, floods, droughts, and wildfires.
• Biodiversity Loss: The decline of species unable to adapt to rapid environmental changes.
• Economic and Social Disruptions: Challenges to agriculture, infrastructure, and public health.

This lesson explains the wide-ranging effects that climate change has on our world.`;

  const solutionsContent = `Solutions to Climate Change explore practical ways to address environmental challenges, including:

• Renewable Energy: Transitioning to wind, solar, and other clean energy sources.
• Energy Efficiency: Implementing technologies and practices that reduce energy consumption.
• Conservation and Reforestation: Protecting ecosystems and restoring natural habitats.
• Policy and Global Cooperation: Enacting measures and international agreements to curb emissions.

This lesson provides insights into how we can work together to build a more sustainable future.`;

  // Content for Sustainable Living lessons (treated the same for "Sustainable Living" and "Sustainable Living Basics")
  const sustainableLivingContent = `Sustainable Living introduces the principles of eco-friendly living. Learn how small, daily actions—like reducing consumption, conserving water, recycling, and choosing sustainable products—can significantly reduce your environmental impact and help create a healthier planet.

This lesson provides a practical foundation for sustainable habits.`;

  // Determine which content to display and which next button to show based on the lesson title
  let content = `This is the content for the ${title} lesson.`;
  let nextButton = null;

  if (title === 'Climate Basics') {
    content = climateBasicsContent;
    nextButton = (
      <View style={styles.nextButton}>
        <Button
          title="Next: Greenhouse Gases"
          onPress={() => navigation.navigate('LessonDetail', { title: 'Greenhouse Gases' })}
        />
      </View>
    );
  } else if (title === 'Greenhouse Gases') {
    content = greenhouseGasesContent;
    nextButton = (
      <View style={styles.nextButton}>
        <Button
          title="Next: Human Impact"
          onPress={() => navigation.navigate('LessonDetail', { title: 'Human Impact' })}
        />
      </View>
    );
  } else if (title === 'Human Impact') {
    content = humanImpactContent;
    nextButton = (
      <View style={styles.nextButton}>
        <Button
          title="Next: Consequences"
          onPress={() => navigation.navigate('LessonDetail', { title: 'Consequences' })}
        />
      </View>
    );
  } else if (title === 'Consequences') {
    content = consequencesContent;
    nextButton = (
      <View style={styles.nextButton}>
        <Button
          title="Next: Solutions"
          onPress={() => navigation.navigate('LessonDetail', { title: 'Solutions' })}
        />
      </View>
    );
  } else if (title === 'Solutions') {
    content = solutionsContent;
    // When solutions are finished, navigate to the Quiz for this lesson's content.
    nextButton = (
      <View style={styles.nextButton}>
        <Button
          title="Quiz"
          onPress={() => navigation.navigate('Quiz', { lesson: title })}
        />
      </View>
    );
  } else if (title === 'Sustainable Living' || title === 'Sustainable Living Basics') {
    // Treat both "Sustainable Living" and "Sustainable Living Basics" as the same lesson.
    content = sustainableLivingContent;
    nextButton = (
      <View style={styles.nextButton}>
        <Button
          title="Next: Reduce Waste"
          onPress={() => navigation.navigate('LessonDetail', { title: 'Sustainable Living: Reduce Waste' })}
        />
      </View>
    );
  } else if (title === 'Sustainable Living: Reduce Waste') {
    content = `Reduce Waste focuses on practical strategies for minimizing waste. In this lesson, you'll learn about recycling, reusing, composting, and making smarter purchasing decisions that reduce overall waste production.`;
    nextButton = (
      <View style={styles.nextButton}>
        <Button
          title="Next: Energy Efficiency"
          onPress={() => navigation.navigate('LessonDetail', { title: 'Sustainable Living: Energy Efficiency' })}
        />
      </View>
    );
  } else if (title === 'Sustainable Living: Energy Efficiency') {
    content = `Energy Efficiency is all about using less energy to perform the same tasks. Discover tips for reducing energy consumption at home and in the workplace, including smart technology, insulation improvements, and energy-saving habits.`;
    nextButton = (
      <View style={styles.nextButton}>
        <Button
          title="Quiz"
          onPress={() => navigation.navigate('Quiz', { lesson: title })}
        />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{content}</Text>
      {/* Render the Next (or Quiz) button above the "Go Back" button */}
      {nextButton}
      <Button title="Go Back to Lessons" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2E7D32',
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    textAlign: 'left',
    marginBottom: 20,
    color: '#333',
  },
  nextButton: {
    marginVertical: 10,
  },
});
