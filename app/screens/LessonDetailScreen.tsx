import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { lessonImages } from '../data/contentData';
import GoBackToLessonsButton from '../components/GoBackToLessonsButton';



import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LessonDetailScreen({ route, navigation }: any) {
  const { title = 'Climate Basics', step = 1 } = route.params || {};
  const [isLessonCompleted, setIsLessonCompleted] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const checkCompletion = async () => {
        try {
          const completedMapJson = await AsyncStorage.getItem('completedLessonsMap');
          if (completedMapJson) {
            const completedMap = JSON.parse(completedMapJson);
            if (completedMap[title]) {
              setIsLessonCompleted(true);
            }
          }
        } catch (e) {
          console.error('Failed to load completion status', e);
        }
      };
      checkCompletion();
    }, [title])
  );

  // Climate Basics split into two parts
  const climateBasicsContentPart1 = `Climate Basics covers the fundamentals of climate science, including:

• **The Greenhouse Effect:** How gases like carbon dioxide, methane, and water vapor trap heat in the atmosphere.
• **Human Impact:** How burning fossil fuels, deforestation, and industrial processes contribute to climate change.`;
  const climateBasicsContentPart2 = `• **Consequences:** The impacts of climate change such as rising temperatures, melting ice caps, and extreme weather events.
• **Solutions:** Steps we can take to reduce our carbon footprint and mitigate the effects of climate change.

This lesson introduces you to the key concepts of our changing climate.`;

  // Greenhouse Gases split into two parts
  const greenhouseGasesContentPart1 = `Greenhouse Gases are the primary contributors to global warming. In this lesson, you'll learn:

• **Key Gases:** Such as carbon dioxide (CO₂), methane (CH₄), and nitrous oxide (N₂O).
• **Sources:** How both natural processes and human activities release these gases.`;
  const greenhouseGasesContentPart2 = `• **Impact:** The role these gases play in trapping heat and influencing global temperatures.
• **Mitigation:** Strategies to reduce emissions and protect our environment.

Understanding greenhouse gases is essential for grasping the scale of climate change.`;

  // Human Impact split into two parts
  const humanImpactContentPart1 = `Human Impact examines how human activities affect our planet. In this lesson, you'll discover:

• **Environmental Degradation:** The effects of pollution, deforestation, and resource depletion.
• **Social & Economic Factors:** How environmental changes influence communities and economies.`;
  const humanImpactContentPart2 = `• **Sustainability Challenges:** The complexities of balancing development with conservation.
• **Innovative Solutions:** Emerging strategies and technologies to reduce human impact.

This lesson shows why understanding human impact is crucial to building a sustainable future.`;

  // Consequences split into two parts
  const consequencesContentPart1 = `Consequences of Climate Change focus on the real-world impacts, including:

• **Rising Sea Levels:** Threatening coastal communities and ecosystems.
• **Extreme Weather Events:** Increasing frequency and intensity of hurricanes, floods, droughts, and wildfires.`;
  const consequencesContentPart2 = `• **Biodiversity Loss:** The decline of species unable to adapt to rapid environmental changes.
• **Economic and Social Disruptions:** Challenges to agriculture, infrastructure, and public health.

This lesson explains the wide-ranging effects that climate change has on our world.`;

  // Solutions split into two parts
  const solutionsContentPart1 = `Solutions to Climate Change explore practical ways to address environmental challenges, including:

• **Renewable Energy:** Transitioning to wind, solar, and other clean energy sources.
• **Energy Efficiency:** Implementing technologies and practices that reduce energy consumption.`;
  const solutionsContentPart2 = `• **Conservation and Reforestation:** Protecting ecosystems and restoring natural habitats.
• **Policy and Global Cooperation:** Enacting measures and international agreements to curb emissions.

This lesson provides insights into how we can work together to build a more sustainable future.`;

  // Carbon Footprint lesson parts (unchanged)
  const carbonFootprintContent1 = `Understanding Your Carbon Footprint is key to sustainable living. This lesson explores what it means and how you can reduce it:

• **Definition:** Your carbon footprint measures the total greenhouse gases, like carbon dioxide (CO₂) and methane (CH₄), emitted directly or indirectly by your activities—everything from driving to eating.

• **Reduction Strategies:** Practical steps include using public transport, switching to renewable energy, reducing meat consumption, and minimizing waste through recycling and reuse.

By grasping your carbon footprint, you’ll uncover actionable ways to lower your environmental impact and contribute to a healthier planet.`;
  const carbonFootprintContent2 = `• **Global Impact:** The average person's carbon footprint varies widely—e.g., 0.1 tons CO₂e per year in Madagascar versus 14.7 tons in the United States—highlighting lifestyle and regional differences.`;
  const carbonFootprintContent3 = `**Criticisms and Limitations:** While carbon footprints are a useful tool, they have limitations. For example, they may not account for all emissions, and some calculations can be complex or imprecise.`;

  // New Achievements content split into three parts
  const achievementsContentPart1 = `Recent progress in climate policy and consumer behavior includes: \n
**Policy Milestones:** \n • New international agreements like the 2015 Paris Climate Accords, and national commitments to reduce emissions.
\n**Consumer Shifts:** More consumers are embracing renewable energy, sustainable transportation, and eco-friendly products.`;
  const achievementsContentPart2 = `• **Technological Innovations:** Advances in carbon capture, smart grids, and sustainable materials are paving the way for a cleaner future.
• **Innovations in Waste Reduction:** New recycling and circular economy initiatives are transforming how we handle waste.`;
  const achievementsContentPart3 = `• **Positive Trends:** Declining deforestation rates and successful reforestation initiatives are helping restore natural ecosystems.
• **Global Collaboration:** Increased international cooperation on climate initiatives is driving real change.

These achievements highlight the promising progress being made toward a more sustainable future.`;

  const organizationsPart1 = "**Intergovernmental Panel on Climate Change (IPCC) (1988):** Established by the United Nations, the IPCC assesses scientific research on climate change and its impacts. It produces comprehensive reports that inform global climate policy.";

  const organizationsPart2 = "**United Nations Framework Convention on Climate Change (UNFCCC) (1992)** Although technically a treaty rather than an organization, the UNFCCC forms the backbone of global climate negotiations and has enabled landmark agreements like the Kyoto Protocol and the Paris Agreement.";
  const organizationsPart3 = "**Green Climate Fund (GCF) (2010):** Established under the UNFCCC, the GCF provides financial support to developing countries for projects aimed at reducing greenhouse gas emissions and enhancing resilience to climate change. It plays a pivotal role in mobilizing investments for sustainable, low-emission development pathways.";


  const organizationsPart4 = "**Convention on Biological Diversity (CBD) (1992):** The CBD aims to conserve biodiversity, promote sustainable use of natural resources, and ensure fair sharing of benefits from genetic resources.";

  const solarPowerContent1 = "**Solar Power** is now the worlds cheapest inexhaustible energy that is converted from sunlight. It is a renewable energy source that harnesses sunlight to generate electricity."
  const solarPowerContent2 = "Despite being the cheapest energy source today, solar accounted for just around 6% of global electricity generation in 2023 and 1% of primary energy consumption.";
  const solarPowerContent3 = "The thing to watch out for is the rate of growth of solar power. In 2004, 1 GW of solar worldwide was installed in 1 year. In 2023, 1 GW was installed in one day. \n \n Cost Rankings (2023) \n • Solar: $33/MWh \n • Wind: $35/MWhNatural \n • Gas: $75/MWh \n • Hydropower:  $78/MWh \n • Coal: $135/MWh \n •  Nuclear: $168/MWh";
  const solarPowerContent4 = "Solars growth has been nothing short of exponential. Solar is projected by the Economist magazine to be the world's largest energy source by 2050.";

  const recyclingContent1 = "**Recycling** is the process of converting waste materials into new materials and objects. It is an alternative to 'conventional' waste disposal that can save material and help lower greenhouse gas emissions.";
  const recyclingContent2 = "Recycling can prevent the waste of potentially useful materials and reduce the consumption of fresh raw materials, thereby reducing: energy usage, air pollution (from incineration), and water pollution (from landfilling).";
  const recyclingContent3 = "Recycling is a key component of modern waste reduction and is the third component of the 'Reduce, Reuse, Recycle' waste hierarchy. However, actual recycling rates vary widely across the country, with many materials not being processed as intended due to contamination, lack of proper facilities, or economic challenges. Understanding what is truly recyclable in your area is crucial for effective waste management.";
  const recyclingContent4 = "Some of the most recyclable items include aluminum cans, which can be recycled indefinitely without losing quality, and glass bottles, which are also highly recyclable if properly sorted. Paper and cardboard are widely accepted in recycling programs, though they must be clean and dry. Rigid plastics labeled with recycling codes #1 (PET) and #2 (HDPE) are among the most commonly recycled plastics. Ensuring these materials are clean and free of food residue can significantly improve their chances of being successfully processed.";

  const electricVehiclesContent1 = "**Electric Vehicles (EVs)** are cars, trucks, and other vehicles that run on electricity instead of gasoline or diesel. They are powered by batteries that store electricity and can be recharged at home or at charging stations.";
  const electricVehiclesContent2 = "EVs produce zero tailpipe emissions, reducing air pollution and greenhouse gas emissions that contribute to climate change. They are also quieter and require less maintenance than traditional vehicles.";
  const electricVehiclesContent3 = "The adoption of EVs is growing worldwide, driven by advancements in battery technology, government incentives, and consumer demand for cleaner transportation options. EVs are seen as a key solution to reducing emissions from the transportation sector and transitioning to a more sustainable energy future.";
  const electricVehiclesContent4 = "Challenges remain in expanding EV infrastructure, increasing battery range, and addressing the environmental impacts of battery production and disposal. However, ongoing research and development are focused on overcoming these obstacles and making EVs a viable and widespread transportation option.";
  const electricVehiclesContent5 = "In 2024, the electric vehicle market reached new milestones, with China and Europe at the forefront of this transformation. In China, industry reports indicate that EV production hit approximately 7.5 million units—up around 35% from 2023—driven by substantial government incentives and an expansive domestic manufacturing network. \n\nAcross Europe, stringent emissions regulations and supportive policies fueled a surge in EV adoption, with new sales exceeding 2.8 million units in 2024, marking nearly a 40% year-over-year increase. \n\nThese figures underscore a robust global shift toward sustainable transportation, as both regions continue to invest heavily in next-generation battery technology and charging infrastructure to meet growing consumer demand.";


  const oceanContent1 = "**Oceans** are the largest ecosystems on Earth, covering 71% of the planet's surface. They play a vital role in regulating the climate, absorbing carbon dioxide, and supporting marine life.";
  const oceanContent2 = "Oceans are under threat from climate change, pollution, overfishing, and habitat destruction. Protecting marine ecosystems is essential for the health of the planet and future generations.";
  const oceanContent3 = "Sustainable practices like marine protected areas, responsible fishing, and reducing plastic pollution can help preserve ocean health and biodiversity.";

  const energyMixContent1 = "**The Energy Mix** refers to the combination of energy sources used to generate electricity and power our society. It includes both renewable sources like solar and wind, as well as traditional sources like coal and natural gas.";
  const energyMixContent2 = "The Energy Mix is shifting towards cleaner, more sustainable sources as we seek to reduce greenhouse gas emissions and combat climate change. Transitioning to a low-carbon energy mix is essential for a sustainable future.";
  const energyMixContent3 = "Renewable energy sources like solar, wind, and hydropower are becoming increasingly competitive with fossil fuels, driving the transition to a cleaner energy mix. Energy storage technologies are also playing a key role in integrating renewables into the grid.";

  const agricultureContent1 = "**Agriculture and Food production** are major contributors to environmental degradation, deforestation, and greenhouse gas emissions. Sustainable agriculture practices aim to reduce the environmental impact of food production and promote biodiversity.";
  const agricultureContent2 = "Sustainable agriculture practices include organic farming, crop rotation, and agroforestry, which help maintain soil health, conserve water, and reduce the need for chemical inputs. These practices support ecosystem health and resilience.";
  const agricultureContent3 = "Consumers can also make a difference by choosing sustainably produced foods, reducing food waste, and supporting local farmers. By adopting sustainable food practices, we can help protect the environment and promote a healthier food system.";

  const fashionContent1 = "**The Fashion Industry** has a significant environmental impact, from raw material production to garment manufacturing and distribution. Fast fashion, in particular, contributes to resource depletion, pollution, and waste.";
  const fashionContent2 = "**Sustainable Fashion** aims to reduce the environmental and social impact of clothing production and consumption. It includes eco-friendly materials, ethical labor practices, and circular fashion models that promote reuse and recycling.";
  const fashionContent3 = "Consumers can support sustainable fashion by choosing quality, timeless pieces, buying secondhand, and supporting brands with transparent and ethical practices. By making conscious fashion choices, we can help create a more sustainable and ethical industry.";
  const fashionContent4 = "In 2024, about 34% of overall apparel spending went toward pre-owned items, with Gen Z dedicating up to 46% of their clothing budgets to secondhand purchases. As the industry embraces sustainability, brands now pair eco-friendly materials like organic cotton and recycled polyester with innovative technologies that reduce water and energy use. \n\nDigital resale platforms such as Depop, Vinted, and ThredUp have surged in popularity, helping to mitigate the environmental impact of fast fashion by promoting a circular economy where garments are reused and upcycled. This shift not only cuts waste but also paves the way for a more sustainable fashion future.";

  const renewableEnergyContent1 = "Renewable Energy represents the cornerstone of our transition to a sustainable future. Unlike fossil fuels that deplete over time, renewable energy sources harness Earth's natural processes to generate clean, abundant power.\n\n• **Wind Energy:** Modern wind turbines convert kinetic energy from moving air into electricity. Offshore wind farms can power millions of homes, and costs have dropped dramatically, making wind one of the cheapest forms of electricity generation.\n\n• **Solar Power:** Photovoltaic panels directly convert sunlight into electricity. Solar efficiency continues to improve, and distributed rooftop solar democratizes energy production, allowing homes to generate their own power.";
  const renewableEnergyContent2 = "• **Hydroelectric Power:** Provides approximately 16% of global electricity and remains the largest renewable energy source. Pumped-storage hydroelectricity acts as a massive battery, storing energy by pumping water uphill during low demand.\n\n• **Geothermal Energy:** Taps into Earth's internal heat to generate electricity 24/7 with minimal environmental impact, providing reliable baseload power. Iceland generates nearly 100% of its electricity from renewables, with geothermal playing a major role.";
  const renewableEnergyContent3 = "• **Biomass and Bioenergy:** Converts organic materials into electricity, heat, or biofuels. When managed sustainably, biomass can be carbon-neutral. Advanced biofuels offer alternatives to gasoline and diesel.\n\n• **Tidal and Wave Energy:** Harnesses the predictable movement of ocean tides and waves. Still in early development but offers immense potential, particularly for coastal nations.\n\nThe renewable transition offers benefits beyond climate action: energy independence, job creation, improved air quality, economic resilience, and rural development.";

  const renewableEnergyContent4 = "Challenges and Solutions:\n\n• **Intermittency:** Battery storage, grid modernization, and diversified energy mix address variable generation from solar and wind.\n\n• **Infrastructure:** Upgrading transmission grids requires investment but enables distributed generation.\n\n• **Land Use:** Careful siting and multi-use approaches (like agrivoltaics) minimize environmental impact.\n\n• **Material Supply:** Recycling programs and alternative materials reduce reliance on rare earth elements.\n\nRenewable energy is not just environmentally necessary but economically advantageous, creating a pathway toward a clean, sustainable, and prosperous energy future for all.";

  const sustainableLivingContent = `Sustainable Living Fundamentals explores how individual choices create collective impact. This comprehensive introduction covers:

• **Carbon Footprint Awareness:** The average person's carbon footprint varies significantly by region - from 0.1 tons CO2e in Madagascar to 14.7 tons in the United States annually. Understanding your personal impact is the first step to reduction.
• **Circular Economy Participation:** Moving beyond the "take-make-waste" model to embrace repair, sharing, and reuse. The global circular economy could reduce annual greenhouse gas emissions by 39% and raw material use by 28% by 2032.
• **Sustainable Consumer Choices:** With 72% of global greenhouse gas emissions linked to household consumption, your purchasing decisions matter. Learn to evaluate products based on their full lifecycle impact.
• **Community Engagement:** How local action creates global change - from community gardens to repair cafes, discover how collective action amplifies individual impact.

This foundation will transform how you think about daily choices and their broader environmental impact.`;

  const sustainableLivingReduceWasteContent = `Waste Reduction Strategies addresses our global waste crisis through practical solutions:

• **Zero-Waste Living:** Beyond basic recycling to precycling - preventing waste before it occurs. With global waste expected to increase 73% by 2050, prevention is crucial.
• **Food Waste Solutions:** Using AI-powered apps for meal planning, understanding date labels, and composting. Food waste contributes 8-10% of global greenhouse gas emissions.
• **Plastic-Free Living:** Practical alternatives to single-use plastics, including new materials like mycelium packaging and seaweed-based alternatives. Only 9% of plastic ever produced has been recycled.
• **Digital Decluttering:** The hidden environmental cost of data storage - the internet's carbon footprint equals that of global air travel. Learn digital minimalism practices.`;

  const sustainableLivingEnergyEfficiencyContent = `Energy Efficiency for the Modern Home combines traditional wisdom with cutting-edge technology:

• **Smart Home Integration:** Beyond basic LED bulbs - using AI-powered systems to optimize energy use. Smart home technology can reduce energy consumption by 20-30%.
• **Passive Design Principles:** Working with natural light and ventilation to reduce energy needs. Proper implementation can cut heating and cooling costs by 40%.
• **Renewable Energy Integration:** From community solar projects to heat pumps, understanding the latest in clean energy technology. Heat pump adoption could reduce global CO2 emissions by 500 million tons by 2030.
• **Behavioral Changes:** Small habits with big impact - vampire power costs U.S. households $100+ annually. Learn about energy-efficient routines and their cumulative effect.

This lesson empowers you with knowledge to significantly reduce home energy consumption.`;

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
    }
  } else if (title === 'Organizations') {
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
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Organizations', step: 4 })
            }
            color="#fff"
          />
        </View>);
    } else if (step === 4) {
      content = organizationsPart4;
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
  } else if (title === 'Solar Power') {
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
  } else if (title === 'Recycling') {
    if (step === 1) {
      content = recyclingContent1;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Recycling', step: 2 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 2) {
      content = recyclingContent2;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Recycling', step: 3 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 3) {
      content = recyclingContent3;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Recycling', step: 4 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 4) {
      content = recyclingContent4;
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
  } else if (title === 'Oceans') {
    if (step === 1) {
      content = oceanContent1;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Oceans', step: 2 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 2) {
      content = oceanContent2;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Oceans', step: 3 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 3) {
      content = oceanContent3;
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
  } else if (title === 'Electric Vehicles') {
    if (step === 1) {
      content = electricVehiclesContent1;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Electric Vehicles', step: 2 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 2) {
      content = electricVehiclesContent2;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Electric Vehicles', step: 3 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 3) {
      content = electricVehiclesContent3;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Electric Vehicles', step: 4 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 4) {
      content = electricVehiclesContent4;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Electric Vehicles', step: 5 })
            }
            color="#fff"
          />
        </View>
      );
    }
    else if (step === 5) {
      content = electricVehiclesContent5;
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
  } else if (title === 'Energy Mix') {
    if (step === 1) {
      content = energyMixContent1;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Energy Mix', step: 2 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 2) {
      content = energyMixContent2;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Energy Mix', step: 3 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 3) {
      content = energyMixContent3;
      nextButton = (
        <View style={styles.customButtonStack}>
          {isLessonCompleted ? (
            <>
              <TouchableOpacity
                style={styles.greenButton}
                onPress={() => navigation.navigate('Quiz', { lesson: title })}
              >
                <Text style={styles.greenButtonText}>Re-Take Quiz</Text>
              </TouchableOpacity>
              <View style={{ height: 10 }} />
              <TouchableOpacity
                style={styles.greenButton}
                onPress={() => navigation.navigate('screens/GlobalEnergyMixScreen')}
              >
                <Text style={styles.greenButtonText}>View Artifact</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.greenButton}
                onPress={() => navigation.navigate('screens/GlobalEnergyMixScreen')}
              >
                <Text style={styles.greenButtonText}>View the Global Energy Mix</Text>
              </TouchableOpacity>
              <View style={{ height: 10 }} />
              <TouchableOpacity
                style={styles.greenButton}
                onPress={() => navigation.navigate('Quiz', { lesson: title })}
              >
                <Text style={styles.greenButtonText}>Quiz</Text>
              </TouchableOpacity>
            </>
          )}
          <View style={{ height: 10 }} />
          <TouchableOpacity
            style={styles.greenButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.greenButtonText}>Go Back to Lessons</Text>
          </TouchableOpacity>
        </View>
      );
    }
  } else if (title === 'Agriculture') {
    if (step === 1) {
      content = agricultureContent1;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Agriculture', step: 2 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 2) {
      content = agricultureContent2;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Agriculture', step: 3 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 3) {
      content = agricultureContent3;
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
  } else if (title === 'Fashion') {
    if (step === 1) {
      content = fashionContent1;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Fashion', step: 2 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 2) {
      content = fashionContent2;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Fashion', step: 3 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 3) {
      content = fashionContent3;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Fashion', step: 4 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 4) {
      content = fashionContent4;
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
  } else if (title === 'Renewable Energy') {
    if (step === 1) {
      content = renewableEnergyContent1;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Renewable Energy', step: 2 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 2) {
      content = renewableEnergyContent2;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Renewable Energy', step: 3 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 3) {
      content = renewableEnergyContent3;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Renewable Energy', step: 4 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 4) {
      content = renewableEnergyContent4;
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
  } else if (title === 'Sustainable Living') {
    content = sustainableLivingContent;
    nextButton = (
      <View style={styles.buttonContainer}>
        <Button
          title="Next: Reduce Waste"
          onPress={() =>
            navigation.navigate('LessonDetail', { title: 'Sustainable Living: Reduce Waste', step: 1 })
          }
          color="#fff"
        />
      </View>
    );
  } else if (title === 'Sustainable Living: Reduce Waste') {
    content = sustainableLivingReduceWasteContent;
    nextButton = (
      <View style={styles.buttonContainer}>
        <Button
          title="Next: Energy Efficiency"
          onPress={() =>
            navigation.navigate('LessonDetail', { title: 'Sustainable Living: Energy Efficiency', step: 1 })
          }
          color="#fff"
        />
      </View>
    );
  } else if (title === 'Sustainable Living: Energy Efficiency') {
    content = sustainableLivingEnergyEfficiencyContent;
    nextButton = (
      <View style={styles.buttonContainer}>
        <Button
          title="Quiz"
          onPress={() => navigation.navigate('Quiz', { lesson: 'Sustainable Living' })}
          color="#fff"
        />
      </View>
    );
  }



  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.card}>
        {lessonImages[title] && (
          <Image
            source={{ uri: lessonImages[title] }}
            style={styles.lessonImage}
            resizeMode="cover"
          />
        )}
        <Text style={styles.description}>
          {content.split(/(\*\*.*?\*\*)/g).map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <Text key={index} style={{ fontWeight: 'bold' }}>
                  {part.slice(2, -2)}
                </Text>
              );
            }
            return <Text key={index}>{part}</Text>;
          })}
        </Text>
      </View>
      {nextButton}
      {!(title === 'Energy Mix' && step === 3) && (
        <View style={styles.secondaryButtonContainer}>
          <GoBackToLessonsButton />
        </View>
      )}
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
  customButtonStack: {
    width: '100%',
    marginVertical: 10,
  },
  greenButton: {
    backgroundColor: '#00695c',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  greenButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButtonContainer: {
    marginTop: 10,
    width: '100%',
  },
  lessonImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
});