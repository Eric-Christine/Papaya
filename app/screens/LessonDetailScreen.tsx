import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default function LessonDetailScreen({ route, navigation }) {
  const { title = 'Climate Basics' } = route.params || {};

  // Content for Climate Change lessons (omitted here for brevity – keep your content strings)
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

  const sustainableLivingContent = `Sustainable Living Fundamentals explores how individual choices create collective impact. This comprehensive introduction covers:
  
• Carbon Footprint Awareness: The average person's carbon footprint varies significantly by region - from 0.1 tons CO2e in Madagascar to 14.7 tons in the United States annually. Understanding your personal impact is the first step to reduction.
• Circular Economy Participation: Moving beyond the "take-make-waste" model to embrace repair, sharing, and reuse. The global circular economy could reduce annual greenhouse gas emissions by 39% and raw material use by 28% by 2032.
• Sustainable Consumer Choices: With 72% of global greenhouse gas emissions linked to household consumption, your purchasing decisions matter. Learn to evaluate products based on their full lifecycle impact.
• Community Engagement: How local action creates global change - from community gardens to repair cafes, discover how collective action amplifies individual impact.

This foundation will transform how you think about daily choices and their broader environmental impact.`;

  const wasteReductionContent = `Waste Reduction Strategies addresses our global waste crisis through practical solutions:
  
• Zero-Waste Living: Beyond basic recycling to precycling - preventing waste before it occurs. With global waste expected to increase 73% by 2050, prevention is crucial.
• Food Waste Solutions: Using AI-powered apps for meal planning, understanding date labels, and composting. Food waste contributes 8-10% of global greenhouse gas emissions.
• Plastic-Free Living: Practical alternatives to single-use plastics, including new materials like mycelium packaging and seaweed-based alternatives. Only 9% of plastic ever produced has been recycled.
• Digital Decluttering: The hidden environmental cost of data storage - the internet's carbon footprint equals that of global air travel. Learn digital minimalism practices.`;

  const energyEfficiencyContent = `Energy Efficiency for the Modern Home combines traditional wisdom with cutting-edge technology:
  
• Smart Home Integration: Beyond basic LED bulbs - using AI-powered systems to optimize energy use. Smart home technology can reduce energy consumption by 20-30%.
• Passive Design Principles: Working with natural light and ventilation to reduce energy needs. Proper implementation can cut heating and cooling costs by 40%.
• Renewable Energy Integration: From community solar projects to heat pumps, understanding the latest in clean energy technology. Heat pump adoption could reduce global CO2 emissions by 500 million tons by 2030.
• Behavioral Changes: Small habits with big impact - vampire power costs U.S. households $100+ annually. Learn about energy-efficient routines and their cumulative effect.

This lesson empowers you with knowledge to significantly reduce home energy consumption.`;

  // Determine which content to display and which next button to show based on the lesson title
  let content = `This is the content for the ${title} lesson.`;
  let nextButton = null;

  if (title === 'Climate Basics') {
    content = climateBasicsContent;
    nextButton = (
      <View style={styles.buttonContainer}>
        <Button
          title="Next: Greenhouse Gases"
          onPress={() =>
            navigation.navigate('LessonDetail', { title: 'Greenhouse Gases' })
          }
          color="#fff"
        />
      </View>
    );
  } else if (title === 'Greenhouse Gases') {
    content = greenhouseGasesContent;
    nextButton = (
      <View style={styles.buttonContainer}>
        <Button
          title="Next: Human Impact"
          onPress={() =>
            navigation.navigate('LessonDetail', { title: 'Human Impact' })
          }
          color="#fff"
        />
      </View>
    );
  } else if (title === 'Human Impact') {
    content = humanImpactContent;
    nextButton = (
      <View style={styles.buttonContainer}>
        <Button
          title="Next: Consequences"
          onPress={() =>
            navigation.navigate('LessonDetail', { title: 'Consequences' })
          }
          color="#fff"
        />
      </View>
    );
  } else if (title === 'Consequences') {
    content = consequencesContent;
    nextButton = (
      <View style={styles.buttonContainer}>
        <Button
          title="Next: Solutions"
          onPress={() =>
            navigation.navigate('LessonDetail', { title: 'Solutions' })
          }
          color="#fff"
        />
      </View>
    );
  } else if (title === 'Solutions') {
    content = solutionsContent;
    nextButton = (
      <View style={styles.buttonContainer}>
        <Button
          title="Quiz"
          onPress={() => navigation.navigate('Quiz', { lesson: title })}
          color="#fff"
        />
      </View>
    );
  } else if (title === 'Sustainable Living' || title === 'Sustainable Living Basics') {
    content = sustainableLivingContent;
    nextButton = (
      <View style={styles.buttonContainer}>
        <Button
          title="Next: Reduce Waste"
          onPress={() =>
            navigation.navigate('LessonDetail', { title: 'Sustainable Living: Reduce Waste' })
          }
          color="#fff"
        />
      </View>
    );
  } else if (title === 'Sustainable Living: Reduce Waste') {
    content = wasteReductionContent;
    nextButton = (
      <View style={styles.buttonContainer}>
        <Button
          title="Next: Energy Efficiency"
          onPress={() =>
            navigation.navigate('LessonDetail', { title: 'Sustainable Living: Energy Efficiency' })
          }
          color="#fff"
        />
      </View>
    );
  } else if (title === 'Sustainable Living: Energy Efficiency') {
    content = energyEfficiencyContent;
    nextButton = (
      <View style={styles.buttonContainer}>
        <Button
          title="Quiz"
          onPress={() => navigation.navigate('Quiz', { lesson: title })}
          color="#fff"
        />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.card}>
        <Text style={styles.description}>{content}</Text>
      </View>
      {nextButton}
      <View style={styles.secondaryButtonContainer}>
        <Button
          title="Go Back to Lessons"
          onPress={() => navigation.goBack()}
          color="#00695c"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F0F4F7',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#00695c',
    marginBottom: 15,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    marginBottom: 20,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    // Android shadow
    elevation: 3,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#424242',
    textAlign: 'left',
  },
  buttonContainer: {
    backgroundColor: '#00695c',
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
    marginVertical: 10,
  },
  secondaryButtonContainer: {
    marginTop: 10,
    width: '100%',
  },
});

