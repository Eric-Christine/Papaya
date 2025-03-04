import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import GoBackToLessonsButton from '../components/GoBackToLessonsButton';

export default function LessonDetailScreen({ route, navigation }) {
  const { title = 'Climate Basics' } = route.params || {};

  // Content for lessons (unchanged from your original file)
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

  const energyMixContent = `Energy Mix explores the diverse sources of energy we use, including:

• Fossil Fuels: Coal, oil, and natural gas still play a major role, though their environmental impacts are driving a gradual shift.
• Nuclear Power: Offers a reliable, low-carbon source of energy that complements renewables.
• Renewables: Includes solar, wind, hydroelectric, geothermal, and biomass. These sources are rapidly expanding and transforming the energy landscape.
• Energy Storage: Innovations in batteries, pumped hydro storage, and other storage technologies help balance supply and demand.
• Future Trends: Emerging technologies such as hydrogen fuel cells and smart grid systems are set to further revolutionize how we generate and use energy.

This lesson explores how we use different energy sources to power our homes and businesses.`;

  const nuclearEnergyContent = `Although nuclear power may spark debate, it remains a key pillar in our renewable energy transition. Embracing its potential, nuclear energy offers a low-carbon, reliable, and highly efficient source of electricity. In the United States, 93 reactors generate around 20% of our power, playing a vital role in stabilizing our energy supply while significantly reducing greenhouse gas emissions.

Key facts about nuclear energy worldwide:
• France relies on nuclear power for about 70% of its electricity, showcasing the success of a long-term commitment to nuclear technology.
• The United Kingdom and Canada are investing in next-generation reactors and small modular reactors (SMRs) to modernize their energy infrastructure.
• South Korea and Japan are advancing new nuclear projects that promise enhanced safety and efficiency.
• Cutting-edge nuclear technologies are emerging globally, with projects in Europe and Asia aiming to further reduce carbon emissions and provide sustainable energy solutions.

With the rigorous oversight of the US Nuclear Regulatory Commission (NRC) and continuous innovation in reactor design, nuclear energy inspires hope for a cleaner, more sustainable future.`;

  const solarEnergyContent = `Solar power is transforming our energy future by tapping into the vast, renewable energy of the sun. Rapid technological advances and declining installation costs have made solar energy a cornerstone of the transition to cleaner power sources. Across the globe, solar installations are not only reducing greenhouse gas emissions but also promoting energy independence and local economic growth.

Key facts about solar energy worldwide:
• Germany, China, and the United States are leading the way, with large-scale solar farms and residential rooftop systems contributing to a significant share of each country's renewable capacity.
• Technological breakthroughs such as bifacial solar panels, perovskite cells, and concentrated solar power (CSP) are pushing the boundaries of efficiency and energy output.
• Distributed solar installations empower communities, reduce reliance on centralized power grids, and offer resilience against power outages.
• Innovative integrations—like solar panels combined with energy storage systems and agrivoltaics, where solar panels coexist with agricultural activities—are expanding the potential and versatility of solar energy.

Supported by robust government incentives, increasing private investment, and a global commitment to reducing carbon footprints, solar energy stands as a beacon of hope for a sustainable, resilient future.`;

  const energyStorageContent = `Energy Storage is a critical component of our clean energy future. In this lesson, you'll learn about the key technologies transforming our power systems and witness how innovative deployments across the globe are paving the way for a more sustainable energy landscape.

• Battery Storage:
   - The most common form of energy storage, vital for both electric vehicles and grid-scale applications.
   - Rapid advancements in lithium-ion and emerging solid-state batteries are being deployed in countries like the United States, South Korea, and Australia.
   - Notably, China leads in both manufacturing and large-scale battery installations, driving cost reductions and performance improvements worldwide.

• Pumped Hydro Storage:
   - A mature, reliable technology offering long-duration storage by moving water between reservoirs at different elevations.
   - Countries such as China, the United States, and Norway have harnessed pumped hydro to balance intermittent renewable generation, making it a cornerstone in their energy strategies.
   - Recent projects in Europe and emerging markets are expanding pumped hydro capacities to further stabilize grids as renewable penetration increases.

• Thermal Storage:
   - A versatile method that uses heat to store energy, often used for balancing seasonal fluctuations in solar and wind output.
   - Nations with high solar irradiance, including Spain, India, and parts of the Middle East, are pioneering thermal storage solutions to optimize their renewable resources.
   - Innovations in materials and system designs continue to enhance efficiency and integration with combined heat and power systems.

Worldwide, energy storage deployments are accelerating as nations strive to decarbonize their economies and improve grid resiliency. Key highlights include:
   - **China:** Dominating both production and deployment, with massive battery storage projects supporting its expanding renewable capacity.
   - **United States and Europe:** Investing heavily in grid-scale storage to ensure reliability, manage peak loads, and integrate increasing levels of wind and solar power.
   - **Australia:** Leading in community and utility-scale battery projects, proving critical in remote and urban settings alike.
   - **Emerging Markets:** Countries across Southeast Asia and the Middle East are rapidly adopting storage solutions to complement growing renewable infrastructures.

This lesson explores how each of these technologies and deployments is revolutionizing the way we store energy to power our homes, businesses, and entire cities—ensuring a resilient and sustainable energy future for all.
`;
const carbonFootprintContent = `Understanding Your Carbon Footprint is key to sustainable living. This lesson explores what it means and how you can reduce it:

• Definition: Your carbon footprint measures the total greenhouse gases, like carbon dioxide (CO₂) and methane (CH₄), emitted directly or indirectly by your activities—everything from driving to eating.
• Global Impact: The average person's carbon footprint varies widely—e.g., 0.1 tons of CO₂ equivalent (CO2e) per year in Madagascar versus 14.7 tons in the United States—highlighting lifestyle and regional differences.
• Sources: Major contributors include transportation (e.g., car emissions), energy use (e.g., electricity from fossil fuels), and consumption (e.g., food production and waste).
• Reduction Strategies: Practical steps include using public transport, switching to renewable energy, reducing meat consumption, and minimizing waste through recycling and reuse.

By grasping your carbon footprint, you’ll uncover actionable ways to lower your environmental impact and contribute to a healthier planet.`;

  // Determine content and next button based on title
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
  } else if (title === 'Energy Mix') {
    content = energyMixContent;
    nextButton = (
      <View style={styles.buttonContainer}>
        <Button
          title="Next: Nuclear Power"
          onPress={() => navigation.navigate('LessonDetail', { title: 'Nuclear Power' })}
          color="#fff"
        />
      </View>
    );
  } else if (title === 'Nuclear Power') {
    content = nuclearEnergyContent;
    nextButton = (
      <View style={styles.buttonContainer}>
        <Button
          title="Next: Solar Power"
          onPress={() => navigation.navigate('LessonDetail', { title: 'Solar Power' })}
          color="#fff"
        />
      </View>
    );
  } else if (title === 'Solar Power') {
    content = solarEnergyContent;
    nextButton = (
      <View style={styles.buttonContainer}>
        <Button
          title="Energy Storage"
          onPress={() => navigation.navigate('LessonDetail', { title: 'Energy Storage' })}
          color="#fff"
        />
      </View>
    );
  } else if (title === 'Energy Storage') {
    content = energyStorageContent;
    nextButton = (
      <View style={styles.buttonContainer}>
        <Button
          title="Quiz"
          onPress={() => navigation.navigate('Quiz', { lesson: title })}
          color="#fff"
        />
      </View>
    );
  } else if (title === 'Carbon Footprint') {
    content = carbonFootprintContent;
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