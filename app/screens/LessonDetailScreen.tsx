import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
} from 'react-native';
import GoBackToLessonsButton from '../components/GoBackToLessonsButton';

export default function LessonDetailScreen({ route, navigation }) {
  const { title = 'Climate Basics', step = 1 } = route.params || {};

  // Climate Basics split into two parts
  const climateBasicsContentPart1 = `Climate Basics covers the fundamentals of climate science, including:

• The Greenhouse Effect: How gases like carbon dioxide, methane, and water vapor trap heat in the atmosphere.
• Human Impact: How burning fossil fuels, deforestation, and industrial processes contribute to climate change.`;
  const climateBasicsContentPart2 = `• Consequences: The impacts of climate change such as rising temperatures, melting ice caps, and extreme weather events.
• Solutions: Steps we can take to reduce our carbon footprint and mitigate the effects of climate change.

This lesson introduces you to the key concepts of our changing climate.`;

  // Greenhouse Gases split into two parts
  const greenhouseGasesContentPart1 = `Greenhouse Gases are the primary contributors to global warming. In this lesson, you'll learn:

• Key Gases: Such as carbon dioxide (CO₂), methane (CH₄), and nitrous oxide (N₂O).
• Sources: How both natural processes and human activities release these gases.`;
  const greenhouseGasesContentPart2 = `• Impact: The role these gases play in trapping heat and influencing global temperatures.
• Mitigation: Strategies to reduce emissions and protect our environment.

Understanding greenhouse gases is essential for grasping the scale of climate change.`;

  // Human Impact split into two parts
  const humanImpactContentPart1 = `Human Impact examines how human activities affect our planet. In this lesson, you'll discover:

• Environmental Degradation: The effects of pollution, deforestation, and resource depletion.
• Social & Economic Factors: How environmental changes influence communities and economies.`;
  const humanImpactContentPart2 = `• Sustainability Challenges: The complexities of balancing development with conservation.
• Innovative Solutions: Emerging strategies and technologies to reduce human impact.

This lesson shows why understanding human impact is crucial to building a sustainable future.`;

  // Consequences split into two parts
  const consequencesContentPart1 = `Consequences of Climate Change focus on the real-world impacts, including:

• Rising Sea Levels: Threatening coastal communities and ecosystems.
• Extreme Weather Events: Increasing frequency and intensity of hurricanes, floods, droughts, and wildfires.`;
  const consequencesContentPart2 = `• Biodiversity Loss: The decline of species unable to adapt to rapid environmental changes.
• Economic and Social Disruptions: Challenges to agriculture, infrastructure, and public health.

This lesson explains the wide-ranging effects that climate change has on our world.`;

  // Solutions split into two parts
  const solutionsContentPart1 = `Solutions to Climate Change explore practical ways to address environmental challenges, including:

• Renewable Energy: Transitioning to wind, solar, and other clean energy sources.
• Energy Efficiency: Implementing technologies and practices that reduce energy consumption.`;
  const solutionsContentPart2 = `• Conservation and Reforestation: Protecting ecosystems and restoring natural habitats.
• Policy and Global Cooperation: Enacting measures and international agreements to curb emissions.

This lesson provides insights into how we can work together to build a more sustainable future.`;

  // Carbon Footprint lesson parts (unchanged)
  const carbonFootprintContent1 = `Understanding Your Carbon Footprint is key to sustainable living. This lesson explores what it means and how you can reduce it:

• Definition: Your carbon footprint measures the total greenhouse gases, like carbon dioxide (CO₂) and methane (CH₄), emitted directly or indirectly by your activities—everything from driving to eating.

• Reduction Strategies: Practical steps include using public transport, switching to renewable energy, reducing meat consumption, and minimizing waste through recycling and reuse.

By grasping your carbon footprint, you’ll uncover actionable ways to lower your environmental impact and contribute to a healthier planet.`;
  const carbonFootprintContent2 = `• Global Impact: The average person's carbon footprint varies widely—e.g., 0.1 tons CO₂e per year in Madagascar versus 14.7 tons in the United States—highlighting lifestyle and regional differences.`;
  const carbonFootprintContent3 = `Criticisms and Limitations: While carbon footprints are a useful tool, they have limitations. For example, they may not account for all emissions, and some calculations can be complex or imprecise.`;

  // New Achievements content split into three parts
  const achievementsContentPart1 = `Recent progress in climate policy and consumer behavior includes: \n
Policy Milestones: \n • New international agreements like the 2015 Paris Climate Accords, and national commitments to reduce emissions.
\nConsumer Shifts: More consumers are embracing renewable energy, sustainable transportation, and eco-friendly products.`;
  const achievementsContentPart2 = `• Technological Innovations: Advances in carbon capture, smart grids, and sustainable materials are paving the way for a cleaner future.
• Innovations in Waste Reduction: New recycling and circular economy initiatives are transforming how we handle waste.`;
  const achievementsContentPart3 = `• Positive Trends: Declining deforestation rates and successful reforestation initiatives are helping restore natural ecosystems.
• Global Collaboration: Increased international cooperation on climate initiatives is driving real change.

These achievements highlight the promising progress being made toward a more sustainable future.`;

const organizationsPart1 = "Intergovernmental Panel on Climate Change (IPCC) (1988): Established by the United Nations, the IPCC assesses scientific research on climate change and its impacts. It produces comprehensive reports that inform global climate policy.";

const organizationsPart2 = "United Nations Framework Convention on Climate Change (UNFCCC) (1992)Although technically a treaty rather than an organization, the UNFCCC forms the backbone of global climate negotiations and has enabled landmark agreements like the Kyoto Protocol and the Paris Agreement.";
const organizationsPart3 = "United Nations Framework Convention on Climate Change (UNFCCC) (1992)Although technically a treaty rather than an organization, the UNFCCC forms the backbone of global climate negotiations and has enabled landmark agreements like the Kyoto Protocol and the Paris Agreement.";

const organizationsPart4 = "Convention on Biological Diversity (CBD) (1992): The CBD aims to conserve biodiversity, promote sustainable use of natural resources, and ensure fair sharing of benefits from genetic resources.";

const solarPowerContent1= "Solar Power is now the worlds cheapest inexhaustible energy that is converted from sunlight. It is a renewable energy source that harnesses sunlight to generate electricity."
const solarPowerContent2= "Despite being the cheapest energy source today, solar accounted for just around 6% of global electricity generation in 2023 and 1% of primary energy consumption.";
const solarPowerContent3= "The thing to watch out for is the rate of growth of solar power. In 2004, 1 GW of solar worldwide was installed in 1 year. In 2023, 1 GW was installed in one day. \n \n Cost Rankings (2023) \n • Solar: $33/MWh \n • Wind: $35/MWhNatural \n • Gas: $75/MWh \n • Hydropower:  $78/MWh \n • Coal: $135/MWh \n •  Nuclear: $168/MWh";
const solarPowerContent4="Solars growth has been nothing short of exponential. Solar is projected by the Economist magazine to be the world's largest energy source by 2050.";

  // Determine content and next button based on title and step
  let content = `This is the content for the ${title} lesson.`;
  let nextButton = null;

  if (title === 'Climate Basics') {
    if (step === 1) {
      content = climateBasicsContentPart1;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Climate Basics', step: 2 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 2) {
      content = climateBasicsContentPart2;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next: Greenhouse Gases"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Greenhouse Gases', step: 1 })
            }
            color="#fff"
          />
        </View>
      );
    }
  } else if (title === 'Greenhouse Gases') {
    if (step === 1) {
      content = greenhouseGasesContentPart1;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Greenhouse Gases', step: 2 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 2) {
      content = greenhouseGasesContentPart2;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next: Human Impact"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Human Impact', step: 1 })
            }
            color="#fff"
          />
        </View>
      );
    }
  } else if (title === 'Human Impact') {
    if (step === 1) {
      content = humanImpactContentPart1;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Human Impact', step: 2 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 2) {
      content = humanImpactContentPart2;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next: Consequences"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Consequences', step: 1 })
            }
            color="#fff"
          />
        </View>
      );
    }
  } else if (title === 'Consequences') {
    if (step === 1) {
      content = consequencesContentPart1;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Consequences', step: 2 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 2) {
      content = consequencesContentPart2;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next: Solutions"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Solutions', step: 1 })
            }
            color="#fff"
          />
        </View>
      );
    }
  } else if (title === 'Solutions') {
    if (step === 1) {
      content = solutionsContentPart1;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Solutions', step: 2 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 2) {
      content = solutionsContentPart2;
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
  } else if (title === 'Carbon Footprint') {
    // Carbon Footprint remains as before
    if (step === 1) {
      content = carbonFootprintContent1;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Carbon Footprint', step: 2 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 2) {
      content = carbonFootprintContent2;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Carbon Footprint', step: 3 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 3) {
      content = carbonFootprintContent3;
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
  } else if (title === 'Achievements') {
    if (step === 1) {
      content = achievementsContentPart1;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Achievements', step: 2 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 2) {
      content = achievementsContentPart2;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Achievements', step: 3 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 3) {
      content = achievementsContentPart3;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Quiz"
            onPress={() => navigation.navigate('Quiz', { lesson: title })}
            color="#fff"
          />
        </View>
      );
    }  } else if (title === 'Organizations') {
      if (step === 1) {
        content = organizationsPart1;
        nextButton = (
          <View style={styles.buttonContainer}>
            <Button
              title="Next"
              onPress={() =>
                navigation.navigate('LessonDetail', { title: 'Organizations', step: 2 })
              }
              color="#fff"
            />
          </View>
        );
      } else if (step === 2) {
        content = organizationsPart2;
        nextButton = (
          <View style={styles.buttonContainer}>
            <Button
              title="Next"
              onPress={() =>
                navigation.navigate('LessonDetail', { title: 'Organizations', step: 3 })
              }
              color="#fff"
            />
          </View>
        );
      } else if (step === 3) {
        content = organizationsPart3;
        nextButton = (
          <View style={styles.buttonContainer}>
            <Button
                 title="Quiz"
                 onPress={() => navigation.navigate('Quiz', { lesson: title })}
              color="#fff"
            />
          </View>
        );
      }  }  else if (title === 'Solar Power') {
          if (step === 1) {
            content = solarPowerContent1;
            nextButton = (
              <View style={styles.buttonContainer}>
                <Button
                  title="Next"
                  onPress={() =>
                    navigation.navigate('LessonDetail', { title: 'Solar Power', step: 2 })
                  }
                  color="#fff"
                />
              </View>
            );
          } else if (step === 2) {
            content = solarPowerContent2;
            nextButton = (
              <View style={styles.buttonContainer}>
                <Button
                  title="Next"
                  onPress={() =>
                    navigation.navigate('LessonDetail', { title: 'Solar Power', step: 3 })
                  }
                  color="#fff"
                />
              </View>
            );
          } else if (step === 3) {
            content = solarPowerContent3;
            nextButton = (
              <View style={styles.buttonContainer}>
                <Button
                  title="Next"
                  onPress={() =>
                    navigation.navigate('LessonDetail', { title: 'Solar Power', step: 4 })
                  }
                  color="#fff"
                />
              </View>
            );
          } else if (step === 4) {
            content = solarPowerContent4;
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
        }
  
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.card}>
        <Text style={styles.description}>{content}</Text>
      </View>
      {nextButton}
      <View style={styles.secondaryButtonContainer}>
        <GoBackToLessonsButton />
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
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