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
import { lessonImages, lessonContents } from '../data/contentData';
import GoBackToLessonsButton from '../components/GoBackToLessonsButton';



import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LessonDetailScreen({ route, navigation }: any) {
  const { title = 'Climate Basics', step = 1 } = route.params || {};
  const [isLessonCompleted, setIsLessonCompleted] = useState(false);
  let customImage: any = null; // For lessons with step-specific images

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

  const solarPower2Content1 = `**The 10,000x Potential**
Did you know that the sun provides more energy to Earth in **one hour** than the entire world consumes in a **year**?

Theoretical calculations show that we have roughly **10,000 times** more solar energy available than our current global energy demand.

If we covered just a small fraction of the Sahara Desert with solar panels, we could theoretically power the entire planet. The challenge isn't availability—it's capture, storage, and distribution.`;

  const solarPower2Content2 = `**The Efficiency & Cost Revolution**
The "Swanson Effect" (similar to Moore's Law) has seen the price of solar modules drop by over **90%** in the last decade alone.

• **Efficiency:** Modern panels convert about **20-22%** of sunlight into electricity, up from just 10% a few decades ago.
• **Cost:** Solar is now the **cheapest form of new electricity** in many parts of the world, often beating even the cheapest coal or gas.

This economic reality is driving deployment faster than any government target or policy could on its own.`;

  const solarPower2Content3 = `**Trade Wars & Tariffs**
China currently produces approximately **80%** of the world's solar panels. Their massive scale and vertical integration have driven prices to record lows.

However, this dominance has led to trade tensions:
• **Tariffs:** The US and EU have imposed heavy tariffs (some up to **100%**) on Chinese solar imports.
• **Reasoning:** These are designed to protect domestic manufacturing industries and reduce reliance on a single nation for critical energy infrastructure.
• **Trade-off:** While protecting local jobs, these tariffs can make solar installations more expensive for consumers in the short term.`;

  const solarPower2Content4 = `**The "Small" Giant**
It's a strange paradox: Solar is the fastest-growing energy source in history, yet it still provides less than **6%** of global electricity.

• **Current Share:** In 2023, solar's share was roughly 5.5% globally.
• **Growth Rate:** It is growing exponentially. In some regions, utility-scale solar is being added faster than all other energy sources combined.
• **Transition:** We are currently in the "kink" of the exponential curve—the point where a small percentage starts to look like a vertical climb.`;

  const solarPower2Content5 = `**Future Outlook: Beyond the Grid**
The future of solar depends on three major pillars:

1. **Storage:** Batteries (like Lithium-ion or Solid State) are becoming cheaper, allowing us to use "stored sunlight" at night.
2. **Smart Grids:** AI and advanced software will balance supply and demand in real-time across vast distances.
3. **Multi-use Solar:** From "Agrivoltaics" (farming under panels) to "Floating Solar" on reservoirs, we are finding ways to generate power without competing for land.

The question is no longer *if* solar will power the world, but *how fast* we can build the infrastructure to support it.`;

  const recyclingContent1 = "**Recycling** is the process of converting waste materials into new materials and objects. It is an alternative to 'conventional' waste disposal that can save material and help lower greenhouse gas emissions.";
  const recyclingContent2 = "Recycling can prevent the waste of potentially useful materials and reduce the consumption of fresh raw materials, thereby reducing: energy usage, air pollution (from incineration), and water pollution (from landfilling).";
  const recyclingContent3 = "Recycling is a key component of modern waste reduction and is the third component of the 'Reduce, Reuse, Recycle' waste hierarchy. However, actual recycling rates vary widely across the country, with many materials not being processed as intended due to contamination, lack of proper facilities, or economic challenges. Understanding what is truly recyclable in your area is crucial for effective waste management.";
  const recyclingContent4 = "Some of the most recyclable items include aluminum cans, which can be recycled indefinitely without losing quality, and glass bottles, which are also highly recyclable if properly sorted. Paper and cardboard are widely accepted in recycling programs, though they must be clean and dry. Rigid plastics labeled with recycling codes #1 (PET) and #2 (HDPE) are among the most commonly recycled plastics. Ensuring these materials are clean and free of food residue can significantly improve their chances of being successfully processed.";
  const recyclingContent5 = `**Complex Sorting: The Japan Model**
Japan has one of the world's most rigorous recycling systems. In cities like Kamikatsu, residents sort waste into over **45 different categories**.

• **Results:** Kamikatsu recycles over **80%** of its waste—compared to an average of 35% in the US.
• **Education:** Children learn sorting rules in elementary school.
• **Community:** Residents bring items to a central facility, reinforcing collective responsibility.

This approach proves that detailed sorting, while demanding, can dramatically improve recycling outcomes.`;
  const recyclingContent6 = `**Reverse Vending Machines: The RTS Story**
**RTS (Recycle Track Systems)** has pioneered innovative recycling solutions at scale. One standout success story is the use of **Reverse Vending Machines (RVMs)** at stadiums.

• **How It Works:** Fans deposit plastic bottles and cans into RVMs and receive rewards like discounts, loyalty points, or charitable donations in their name.
• **Stadium Example:** At major venues, RVMs have diverted **thousands of tons** of recyclables away from landfills during sporting events.
• **Incentive Structure:** By making recycling rewarding and effortless, RVMs tap into behavioral economics—turning waste into opportunity.

This is an 'easy win' for recycling: high foot traffic, captive audience, and clear incentives.`;
  const recyclingContent7 = `**The Path Forward**
True progress in recycling requires:

• **Standardization:** Consistent labeling and sorting rules across regions.
• **Infrastructure Investment:** More advanced Material Recovery Facilities (MRFs).
• **Producer Responsibility:** Manufacturers designing products for recyclability (Extended Producer Responsibility laws).
• **Consumer Awareness:** Understanding what is *actually* recyclable in your local system.

By combining smart technology (like RVMs), community engagement (like Japan's programs), and policy reform, we can dramatically improve global recycling rates.`;


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

  const policyContentPart1 = `**International Frameworks & Agreements**

• **The Paris Agreement (2015):** A historic international treaty uniting 196 countries to limit global warming to 1.5°C. Nations set their own "Nationally Determined Contributions" (NDCs) to reduce emissions.

• **Kyoto Protocol (1997):** The first legally binding international agreement to reduce greenhouse gas emissions.

• **Montreal Protocol (1987):** Successfully phased out ozone-depleting substances, proving that global cooperation can heal the planet (restoring the ozone layer).

• **UNFCCC:** The United Nations Framework Convention on Climate Change is the backbone of global climate negotiations that led to these agreements.`;

  const policyContentPart2 = `**US Legislation & Agencies**

• **The Environmental Protection Agency (EPA):** Created in 1970, the EPA enforces environmental laws, conducts research, and sets national standards for air and water quality.

• **The Clean Air Act:** Landmark legislation that has successfully reduced common pollutants like sulfur dioxide and lead, preventing millions of premature deaths and illnesses.

• **The Clean Water Act:** Protects national waters from pollution, requiring permits for industrial discharges and setting strict water quality standards.`;

  const policyContentPart3 = `**Modern Mechanisms & Future Policies**

• **Carbon Pricing:**
   - **Carbon Tax:** A direct price on each ton of CO₂ emitted, incentivizing reduction (e.g., Canada, Sweden).
   - **Cap-and-Trade:** Sets a limit on total emissions and lets companies trade permits (e.g., EU Emissions Trading System).

• **Emerging Policies:**
   - **Plastic Bans:** Legislating against single-use plastics to reduce ocean pollution.
   - **Right to Repair:** Laws requiring manufacturers to make products fixable, reducing e-waste.
   - **Extended Producer Responsibility (EPR):** Making manufacturers responsible for the entire lifecycle of their products.

Understanding these policies empowers you to support legislation that protects our future.`;

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
  } else if (title === 'Solar Power II') {
    const solarPower2Images = {
      1: 'https://placehold.co/600x400/FFCC80/000000/png?text=10000x+Potential',
      2: 'https://placehold.co/600x400/FFCC80/000000/png?text=Cost+Revolution',
      3: 'https://placehold.co/600x400/FFCC80/000000/png?text=Trade+Politics',
      4: 'https://placehold.co/600x400/FFCC80/000000/png?text=Exponential+Growth',
      5: 'https://placehold.co/600x400/FFCC80/000000/png?text=Future+Grids',
    };

    customImage = solarPower2Images[step as keyof typeof solarPower2Images] || solarPower2Images[1];

    if (step === 1) {
      content = solarPower2Content1;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Solar Power II', step: 2 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 2) {
      content = solarPower2Content2;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Solar Power II', step: 3 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 3) {
      content = solarPower2Content3;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Solar Power II', step: 4 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 4) {
      content = solarPower2Content4;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Solar Power II', step: 5 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 5) {
      content = solarPower2Content5;
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
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Recycling', step: 5 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 5) {
      content = recyclingContent5;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Recycling', step: 6 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 6) {
      content = recyclingContent6;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Recycling', step: 7 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 7) {
      content = recyclingContent7;
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
    const evImages = {
      1: '/Users/ericchristine/.gemini/antigravity/brain/c488cf2e-e3ab-462c-840a-f9a93b9af969/ev_definition_modern_1769373005408.png',
      2: '/Users/ericchristine/.gemini/antigravity/brain/c488cf2e-e3ab-462c-840a-f9a93b9af969/ev_benefits_eco_1769373021195.png',
      3: '/Users/ericchristine/.gemini/antigravity/brain/c488cf2e-e3ab-462c-840a-f9a93b9af969/ev_adoption_trends_global_1769373032861.png',
      4: 'https://placehold.co/600x400/0288D1/ffffff/png?text=EV+Infrastructure',
      5: '/Users/ericchristine/.gemini/antigravity/brain/c488cf2e-e3ab-462c-840a-f9a93b9af969/electric_public_transport_shenzhen_1769372565618.png',
    };
    customImage = evImages[step as keyof typeof evImages] || evImages[1];

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
    } else if (step === 5) {
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
  } else if (title === 'Electric Vehicles II') {
    const ev2Content1 = `**China's EV Market Dominance**
China has become the undisputed global leader in electric vehicles. In 2023, China accounted for **60% of all global EV sales**. 

The government has invested over **$29 billion** in subsidies and tax breaks between 2009 and 2022 to build a complete supply chain—from lithium mining to advanced battery manufacturing.`;

    const ev2Content2 = `**Competitive edge: Scaling Cheap**
Chinese automakers like **BYD, NIO, and GAC** can produce EVs for significantly less than their Western counterparts. 

BYD's entry-level model, the *Seagull*, sells for less than **$10,000** in China. This price point is achieved through vertical integration—BYD even makes its own batteries and chips, something most car companies outsource.`;

    const ev2Content3 = `**BYD vs. Tesla: The Battle of the Giants**
Tesla long reigned as the EV king, but BYD (Build Your Dreams) is now a formidable rival. 

• **Tesla:** Strong focus on high-performance software, autonomous driving, and brand prestige.
• **BYD:** Focuses on affordability, diverse battery tech (LFP), and massive scale.

In late 2023, **BYD briefly overtook Tesla** as the world's top seller of pure battery electric vehicles (BEVs) globally.`;

    const ev2Content4 = `**Western Tariffs & Trade Wars**
To protect domestic automakers from an influx of low-cost imports, Western governments are raising trade barriers:

• **USA:** Recently hiked tariffs on Chinese EVs to **100%**.
• **EU:** Imposed provisional tariffs of up to **38%** on Chinese-made electric cars, citing unfair government subsidies.

These tariffs aim to give Western companies like Ford, VW, and GM time to catch up, but they may also slow down the overall green transition by keeping prices high.`;

    const ev2Content5 = `**The Future of Competitive EVs**
Competition is driving rapid innovation. As Western companies respond to China's lead, we are seeing:

• **Solid-State Batteries:** Promising longer range and faster charging.
• **New Manufacturing Techniques:** Aiming to slash costs to compete with BYD.
• **Global Supply Chain Shifts:** Moving battery production to the US and Europe to qualify for local incentives.

The race to electrify the world is now a high-stakes geopolitical contest between the East and the West.`;

    const ev2Images = {
      1: 'https://placehold.co/600x400/0288D1/ffffff/png?text=China+EV+Dominance',
      2: 'https://placehold.co/600x400/0288D1/ffffff/png?text=Cheap+EV+Models',
      3: 'https://placehold.co/600x400/0288D1/ffffff/png?text=BYD+vs+Tesla',
      4: 'https://placehold.co/600x400/0288D1/ffffff/png?text=Trade+War+Tariffs',
      5: 'https://placehold.co/600x400/0288D1/ffffff/png?text=Future+EV+Competition',
    };
    customImage = ev2Images[step as keyof typeof ev2Images] || ev2Images[1];

    if (step === 1) {
      content = ev2Content1;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Electric Vehicles II', step: 2 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 2) {
      content = ev2Content2;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Electric Vehicles II', step: 3 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 3) {
      content = ev2Content3;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Electric Vehicles II', step: 4 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 4) {
      content = ev2Content4;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Electric Vehicles II', step: 5 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 5) {
      content = ev2Content5;
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
  } else if (title === 'Arctic Ice') {
    const arcticContent1 = `**The Polar Mirror: Albedo Effect**
"Albedo" is a measure of how much solar energy a surface reflects. 

• **Pure White Ice/Snow:** Reflects up to **85%** of sunlight back into space. It acts as Earth's natural air conditioner.
• **Open Ocean Water:** Reflects only **6%**, absorbing almost all the energy as heat.

When we lose ice, we lose our primary reflection shield, and the planet starts to absorb significantly more energy.`;

    const arcticContent2 = `**The Warming Loop (Feedback Cycle)**
The loss of Arctic ice creates a dangerous "positive feedback loop":

1. **Warming:** Global temperatures rise due to greenhouse gases.
2. **Melting:** Arctic sea ice melts, exposing dark water.
3. **Absorption:** Dark water absorbs more solar heat.
4. **Amplification:** The warmer water melts even more ice.

This cycle self-reinforces, accelerating climate change beyond the capacity of human intervention to slow it down easily.`;

    const arcticContent3 = `**Arctic Amplification**
Did you know the Arctic is warming **3 to 4 times faster** than the rest of the planet? This is called *Arctic Amplification*.

While the world averages a 1.2°C temperature rise, parts of the Arctic have already seen a **4°C increase**. This extreme warming is causing the "permafrost" (frozen ground) to thaw, releasing ancient methane—a greenhouse gas 80x more potent than CO₂.`;

    const arcticContent4 = `**The Threat of Sea Level Rise**
Arctic sea ice melting doesn't raise sea levels (it's already floating). However, the **Greenland Ice Sheet** is a different story.

Greenland holds enough land-based ice to raise global sea levels by **7 meters (23 feet)**. If even a fraction of it melts, cities like Miami, New York, Shanghai, and Mumbai would face catastrophic flooding. Currently, Greenland is losing **270 billion tons** of ice per year.`;

    const arcticContent5 = `**Weather & The Jet Stream**
Changes at the poles don't stay at the poles. The temperature difference between the Arctic and the tropics drives the **Jet Stream** (a high-altitude wind current).

As the Arctic warms, the Jet Stream becomes "wavy" and sluggish. This causes weather systems to get stuck, leading to prolonged:
• **Extreme Heatwaves**
• **Severe Floods**
• **Intense Winter Storms** (like the "Polar Vortex" hitting mid-latitudes)`;

    const arcticContent6 = `**Polar Life and Permafrost**
Melting ice destroys vital habitats for iconic species:

• **Polar Bears & Seals:** Rely on sea ice for hunting and resting.
• **Marine Food Web:** Algae under the ice forms the base of the entire Arctic food chain.

Below the surface, **Thawing Permafrost** is a "carbon bomb." It contains twice as much carbon as the entire atmosphere. As it thaws, it releases CO₂ and methane, further accelerating the heating cycle.`;

    const arcticContent7 = `**Why It Matters to You**
The Arctic is Earth's primary stability regulator. A stable Arctic means:

• **Predictable Seasons:** Critical for global agriculture and food security.
• **Stable Sea Levels:** Protecting coastal economies and millions of homes.
• **Balanced Ocean Currents:** Distributing heat and nutrients across the globe.

Protecting the Arctic is not just about polar bears; it's about maintaining the climate stability that modern civilization is built upon.`;

    const arcticImages = {
      1: 'https://placehold.co/600x400/B3E5FC/01579B/png?text=Albedo+Effect',
      2: 'https://placehold.co/600x400/B3E5FC/01579B/png?text=Warming+Loop',
      3: 'https://placehold.co/600x400/B3E5FC/01579B/png?text=Arctic+Amplification',
      4: 'https://placehold.co/600x400/B3E5FC/01579B/png?text=Sea+Level+Rise',
      5: 'https://placehold.co/600x400/B3E5FC/01579B/png?text=Jet+Stream',
      6: 'https://placehold.co/600x400/B3E5FC/01579B/png?text=Permafrost',
      7: 'https://placehold.co/600x400/B3E5FC/01579B/png?text=Global+Survival',
    };
    customImage = arcticImages[step as keyof typeof arcticImages] || arcticImages[1];

    if (step === 1) {
      content = arcticContent1;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Arctic Ice', step: 2 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 2) {
      content = arcticContent2;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Arctic Ice', step: 3 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 3) {
      content = arcticContent3;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Arctic Ice', step: 4 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 4) {
      content = arcticContent4;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Arctic Ice', step: 5 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 5) {
      content = arcticContent5;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Arctic Ice', step: 6 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 6) {
      content = arcticContent6;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Arctic Ice', step: 7 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 7) {
      content = arcticContent7;
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
  } else if (title === 'Food') {
    const foodContent1 = `**The Hidden Cost of Food Waste**
Globally, we waste about **1.3 billion tons** of food every year—nearly one-third of all food produced.

• If food waste were a country, it would be the **3rd largest emitter** of greenhouse gases.
• Food decomposing in landfills releases **methane**, a gas 80x more potent than CO₂.

Reducing waste at home is one of the easiest wins for climate action.`;

    const foodContent2 = `**The Power of Food Banks**
Food banks are critical infrastructure in the fight against both hunger and waste.

• In the US alone, **Feeding America** rescues 4 billion pounds of food annually that would otherwise go to waste.
• This diverts meals from landfills and delivers them to **40 million Americans** facing food insecurity.
• Every **$1 donated** to food banks can provide up to 10 meals.

Donating surplus food—or volunteering—has both social and environmental impact.`;

    const foodContent3 = `**Composting: Turning Waste into Gold**
Composting is the natural process of recycling organic matter into nutrient-rich soil amendment.

• **Home composting** can divert **30%** of your household waste from landfills.
• Compost enriches soil, reduces the need for synthetic fertilizers, and sequesters carbon.
• Cities like San Francisco have mandatory composting programs, achieving **80%** landfill diversion rates.

Start small: coffee grounds, eggshells, and vegetable scraps are easy wins.`;

    const foodContent4 = `**Complex Sorting: What the World Can Learn**
Some countries have elevated food and waste sorting to an art form.

**Japan's System:**
• Cities like Kamikatsu sort waste into **45+ categories**, including different types of food scraps.
• Result: The town recycles over **80%** of its waste.
• Children learn sorting rules from elementary school.

**South Korea:**
• Mandatory food waste recycling since 2005.
• 95% of food waste is now recycled into animal feed, fertilizer, or biogas.`;

    const foodContent5 = `**Smart Consumption Tips**
You can make a big impact with small changes:

• **Plan meals:** Make a weekly menu and shopping list to avoid over-buying.
• **Understand dates:** "Best by" is about quality, not safety. "Use by" is for safety.
• **FIFO:** First In, First Out—use older groceries before new ones.
• **Freeze strategically:** Bread, fruits, and cooked meals last months in the freezer.
• **Ugly produce:** Embrace imperfect fruits and vegetables—they taste the same!`;

    const foodContent6 = `**The Future of Food**
Innovations are transforming food systems worldwide:

• **AI-powered inventory:** Restaurants use AI to predict demand and reduce waste.
• **Upcycled foods:** Companies turn food byproducts (like spent grain) into new products.
• **Vertical farming:** Reduces transport emissions and water use by 90%.
• **Lab-grown meat:** Could reduce livestock emissions by up to 96%.

A sustainable food future is possible—and it starts with the choices you make every day.`;

    const foodImages = {
      1: 'https://placehold.co/600x400/FF8A65/ffffff/png?text=Food+Waste',
      2: 'https://placehold.co/600x400/FF8A65/ffffff/png?text=Food+Banks',
      3: 'https://placehold.co/600x400/FF8A65/ffffff/png?text=Composting',
      4: 'https://placehold.co/600x400/FF8A65/ffffff/png?text=Complex+Sorting',
      5: 'https://placehold.co/600x400/FF8A65/ffffff/png?text=Smart+Consumption',
      6: 'https://placehold.co/600x400/FF8A65/ffffff/png?text=Future+of+Food',
    };
    customImage = foodImages[step as keyof typeof foodImages] || foodImages[1];

    if (step === 1) {
      content = foodContent1;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Food', step: 2 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 2) {
      content = foodContent2;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Food', step: 3 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 3) {
      content = foodContent3;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Food', step: 4 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 4) {
      content = foodContent4;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Food', step: 5 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 5) {
      content = foodContent5;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Food', step: 6 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 6) {
      content = foodContent6;
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
  } else if (title === 'AI & Energy') {
    const aiContent1 = `**The Energy Cost of Training AI**
Training large AI models is computationally intensive—and that computation requires significant electricity.

• **GPT-3 (2020):** Estimated to have consumed **1,287 MWh** during training, equivalent to powering ~120 US homes for a year.
• **GPT-4 and beyond:** Modern models are even larger, with training runs potentially requiring **50,000+ GPUs** running for months.
• **Carbon footprint:** A single training run can emit **300+ tons of CO₂**—more than 5 cars emit over their entire lifetimes.

This is a real environmental cost that the AI industry is grappling with.`;

    const aiContent2 = `**Data Centers: The Hidden Infrastructure**
AI models don't just train once—they run continuously to serve billions of queries.

• **Global data centers** currently consume about **1-2% of global electricity**—roughly the same as the aviation industry.
• AI workloads (inference and training) are the fastest-growing segment of data center demand.
• By 2030, projections suggest AI-related energy demand could **triple or quadruple**.

The physical infrastructure required—servers, cooling, networking—adds to the environmental footprint.`;

    const aiContent3 = `**Near-Term Solutions: How Demand is Being Met**
In the short term (2024-2030), AI's energy demand is being met through a mix of sources:

• **Grid Power:** Most data centers still rely on local electricity grids, which include a mix of fossil fuels and renewables.
• **Corporate PPAs:** Major tech companies (Google, Microsoft, Amazon) are signing Power Purchase Agreements for renewable energy to offset their consumption.
• **Efficiency Gains:** AI hardware is improving rapidly. Newer chips (like NVIDIA's H100 and beyond) deliver more compute per watt.
• **Liquid Cooling:** Advanced cooling systems reduce the ~40% of data center energy typically spent on cooling.

However, the pace of AI growth may outstrip these efficiency gains.`;

    const aiContent4 = `**Long-Term Solutions: Scaling Clean Energy**
Meeting AI's long-term energy needs will require systemic changes:

• **Massive Renewables Buildout:** Solar and wind installations need to scale dramatically. Fortunately, they are now the cheapest sources of new electricity.
• **Nuclear Renaissance:** Tech companies like Google and Microsoft are exploring small modular reactors (SMRs) to power data centers with zero-carbon baseload.
• **Grid Modernization:** Smarter grids and energy storage will help match variable renewable supply with 24/7 AI demand.
• **Geographic Optimization:** Locating data centers in regions with abundant clean energy (like Iceland, Quebec, or Scandinavia) is becoming strategic.`;

    const aiContent5 = `**The Other Side: AI as a Climate Tool**
AI is not just an energy consumer—it's also a powerful tool for climate action:

• **Grid Optimization:** DeepMind's AI reduced Google data center cooling energy by **40%**.
• **Climate Modeling:** AI accelerates climate simulations, helping scientists predict and prepare for changes.
• **Materials Discovery:** AI is identifying new materials for better batteries, solar cells, and carbon capture.
• **Precision Agriculture:** AI-driven farming reduces water, fertilizer, and pesticide use.

The net impact of AI on climate is a balance between its energy costs and its contributions to efficiency and discovery.`;

    const aiContent6 = `**The Bottom Line**
AI's energy demands are real and growing, but so are the solutions:

• **Today:** AI relies heavily on existing grids, with big tech offsetting through renewables and efficiency.
• **2030s:** Expect nuclear SMRs, massive solar/wind buildout, and hyper-efficient hardware to reshape the landscape.
• **Long-term:** If scaled responsibly, AI's benefits to climate science, energy optimization, and industrial efficiency could outweigh its footprint.

The key is **accountability, transparency, and investment in clean energy infrastructure** to power the AI era sustainably.`;

    const aiImages = {
      1: 'https://placehold.co/600x400/7C4DFF/ffffff/png?text=Training+Costs',
      2: 'https://placehold.co/600x400/7C4DFF/ffffff/png?text=Data+Centers',
      3: 'https://placehold.co/600x400/7C4DFF/ffffff/png?text=Near-Term+Solutions',
      4: 'https://placehold.co/600x400/7C4DFF/ffffff/png?text=Long-Term+Solutions',
      5: 'https://placehold.co/600x400/7C4DFF/ffffff/png?text=AI+for+Climate',
      6: 'https://placehold.co/600x400/7C4DFF/ffffff/png?text=The+Bottom+Line',
    };
    customImage = aiImages[step as keyof typeof aiImages] || aiImages[1];

    if (step === 1) {
      content = aiContent1;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'AI & Energy', step: 2 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 2) {
      content = aiContent2;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'AI & Energy', step: 3 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 3) {
      content = aiContent3;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'AI & Energy', step: 4 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 4) {
      content = aiContent4;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'AI & Energy', step: 5 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 5) {
      content = aiContent5;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'AI & Energy', step: 6 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 6) {
      content = aiContent6;
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
    const energyMixImages = {
      1: '/Users/ericchristine/.gemini/antigravity/brain/72290e95-8328-4e58-945d-c7a4cd91d43f/energy_mix_overview_nano_banana_1769288229429.png',
      2: '/Users/ericchristine/.gemini/antigravity/brain/72290e95-8328-4e58-945d-c7a4cd91d43f/clean_energy_nuclear_nano_banana_1769288242213.png',
      3: '/Users/ericchristine/.gemini/antigravity/brain/72290e95-8328-4e58-945d-c7a4cd91d43f/future_energy_trends_nano_banana_1769288254296.png',
    };

    customImage = energyMixImages[step as keyof typeof energyMixImages] || energyMixImages[1];

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
  } else if (title === 'Policy & Environmental Laws') {
    if (step === 1) {
      content = policyContentPart1;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next: US Legislation"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Policy & Environmental Laws', step: 2 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 2) {
      content = policyContentPart2;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next: Future Policies"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Policy & Environmental Laws', step: 3 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 3) {
      content = policyContentPart3;
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
  } else if (title === 'Public Transport & Urban Living') {
    const urbanContent1 = `**The Urban Carbon Crisis:**
   - Cities consume over 2/3 of global energy and produce 70% of CO₂ emissions.
   - Transportation accounts for approximately 29% of U.S. greenhouse gas emissions.
   - Personal vehicles are among the largest contributors to urban air pollution.`;

    const urbanContent2 = `**Public Transit Benefits:**
   - A single bus can replace 40 cars during rush hour.
   - Rail transit produces 76% fewer emissions per passenger-mile than driving alone.
   - Public transit reduces traffic congestion, saving time and fuel for all road users.`;

    const urbanContent3 = `**The 15-Minute City:**
   - An urban planning concept where daily needs are within 15 minutes by foot or bike.
   - Paris is transforming streets, adding bike lanes and green spaces.
   - Barcelona's "superblocks" reduce car traffic, creating pedestrian-friendly neighborhoods.`;

    const urbanContent4 = `**Cycling Infrastructure:**
   - Amsterdam: 63% of residents cycle daily, with 400+ km of bike paths.
   - Copenhagen: Bikes outnumber cars, with heated bike lanes in winter.
   - E-bikes are making cycling accessible to more people and longer distances.`;

    const urbanContent5 = `**Electric Public Transport:**
   - Shenzhen, China operates the world's largest electric bus fleet (16,000+ buses).
   - Electric trams, light rail, and metros provide zero-emission urban mobility.
   - Hydrogen fuel cell buses are emerging in cities like London and Tokyo.`;

    const urbanContent6 = `**Mixed-Use Development:**
   - Combining residential, commercial, and recreational spaces reduces travel needs.
   - Walkable neighborhoods increase property values and local business activity.
   - Green building standards (LEED, BREEAM) reduce energy consumption.`;

    const urbanContent7 = `**Remote Work & Urban Planning:**
   - Hybrid work reduces commuting, cutting emissions and improving air quality.
   - Co-working spaces in neighborhoods reduce the need for downtown commutes.
   - Smart city technology optimizes traffic flow and public transit schedules.

By embracing sustainable transportation and thoughtful urban design, cities can become healthier, more livable, and dramatically reduce their environmental impact.`;

    const publicTransportImages = {
      1: '/Users/ericchristine/.gemini/antigravity/brain/c488cf2e-e3ab-462c-840a-f9a93b9af969/urban_carbon_crisis_1769372510770.png',
      2: '/Users/ericchristine/.gemini/antigravity/brain/c488cf2e-e3ab-462c-840a-f9a93b9af969/public_transit_benefits_1769372525726.png',
      3: '/Users/ericchristine/.gemini/antigravity/brain/c488cf2e-e3ab-462c-840a-f9a93b9af969/fifteen_minute_city_1769372537848.png',
      4: '/Users/ericchristine/.gemini/antigravity/brain/c488cf2e-e3ab-462c-840a-f9a93b9af969/cycling_infrastructure_amsterdam_1769372550961.png',
      5: '/Users/ericchristine/.gemini/antigravity/brain/c488cf2e-e3ab-462c-840a-f9a93b9af969/electric_public_transport_shenzhen_1769372565618.png',
      6: '/Users/ericchristine/.gemini/antigravity/brain/c488cf2e-e3ab-462c-840a-f9a93b9af969/mixed_use_development_walkable_1769372578122.png',
      7: '/Users/ericchristine/.gemini/antigravity/brain/c488cf2e-e3ab-462c-840a-f9a93b9af969/remote_work_urban_planning_smart_city_1769372591806.png',
    };

    customImage = publicTransportImages[step as keyof typeof publicTransportImages] || publicTransportImages[1];

    if (step === 1) {
      content = urbanContent1;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Public Transport & Urban Living', step: 2 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 2) {
      content = urbanContent2;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Public Transport & Urban Living', step: 3 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 3) {
      content = urbanContent3;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Public Transport & Urban Living', step: 4 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 4) {
      content = urbanContent4;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Public Transport & Urban Living', step: 5 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 5) {
      content = urbanContent5;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Public Transport & Urban Living', step: 6 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 6) {
      content = urbanContent6;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Public Transport & Urban Living', step: 7 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 7) {
      content = urbanContent7;
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
  } else if (title === 'Rainforests') {
    const rainforestContent1 = `**The Lungs of the Earth:**
   - Rainforests produce about 20% of the world's oxygen through photosynthesis.
   - The Amazon alone absorbs 2 billion tons of CO₂ annually, making it a critical carbon sink.
   - Tropical forests store more carbon than the entire atmosphere contains.

**Biodiversity Hotspots:**
   - A single hectare of rainforest can contain over 750 tree species and 1,500 plant species.
   - 80% of documented species live in tropical rainforests.
   - New species are still being discovered—scientists find an average of 2-3 new species per week in the Amazon.`;

    const rainforestContent2 = `**Major Rainforests Around the World:**
   - **Amazon Rainforest (South America):** The largest, spanning 9 countries and covering 5.5 million km².
   - **Congo Basin (Africa):** The second largest, home to forest elephants and gorillas.
   - **Southeast Asian Rainforests:** Including Borneo and Sumatra, home to orangutans and tigers.
   - **Daintree Rainforest (Australia):** One of the oldest rainforests, dating back 180 million years.

**Why Rainforests Are Disappearing:**
   - **Deforestation:** An area the size of a football field is cleared every second.
   - **Agriculture:** Cattle ranching and palm oil plantations are leading drivers.
   - **Logging:** Legal and illegal timber extraction devastates forest ecosystems.
   - **Mining:** Gold, oil, and mineral extraction cause irreversible damage.`;

    const rainforestContent3 = `**Conservation Success Stories:**
   - Costa Rica reversed deforestation, growing forest cover from 21% to over 52% since 1987.
   - Indigenous-managed lands show 80% less deforestation than other areas.
   - Brazil reduced Amazon deforestation by 84% between 2004-2012 through enforcement.

**How You Can Help:**
   - Support organizations protecting rainforests like Rainforest Alliance and WWF.
   - Choose products with sustainable certifications (FSC wood, RSPO palm oil).
   - Reduce consumption of beef from deforested regions.
   - Spread awareness about rainforest conservation.

Rainforests are irreplaceable treasures that regulate our climate, protect biodiversity, and provide resources for millions. Their conservation is essential for a sustainable future.`;

    if (step === 1) {
      content = rainforestContent1;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Rainforests', step: 2 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 2) {
      content = rainforestContent2;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Rainforests', step: 3 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 3) {
      content = rainforestContent3;
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
  } else if (title === 'Urban Living') {
    const urbanContent1 = `**The Global Urbanization Trend:**
   - In 1950, only 30% of the world lived in cities. Today, it's 56%—and by 2050, it will reach 68%.
   - Every week, 1.5 million people move to cities worldwide.
   - Africa and Asia are urbanizing fastest, adding 2.5 billion urban residents by 2050.
   - China alone built over 700 million square meters of new floor space annually in recent years.`;

    const urbanContent2 = `**Urban Efficiency Advantages:**
   - **Per Capita Emissions:** New Yorkers emit 7.1 tons CO₂/year vs. the US average of 16 tons—less than half.
   - **Land Use:** A city of 1 million can occupy 100 km², while the same suburban population needs 1,000+ km².
   - **Infrastructure Sharing:** One water main serves thousands; shared heating systems reduce energy by 30%.
   - **Transportation:** Dense cities enable walking, cycling, and transit—cutting car dependency by 60-80%.`;

    const urbanContent3 = `**The Consumption Reality:**
   - Cities consume 75% of the world's energy and produce 70% of global CO₂ emissions.
   - Urban residents consume 60% more resources per capita in wealthy nations.
   - The urban Heat Island Effect raises city temperatures 1-3°C higher than surroundings.
   - Concrete and steel production for buildings accounts for 11% of global emissions.`;

    const urbanContent4 = `**Case Studies - Dense vs. Sprawling Cities:**
   - **Hong Kong:** 7 million people in 1,100 km². Per capita emissions: 5.7 tons CO₂/year.
   - **Houston:** 2.3 million in 1,700 km². Per capita emissions: 14.2 tons CO₂/year.
   - **Tokyo:** 14 million use rail daily; 88% of commutes are by public transit.
   - **Los Angeles:** 73% of commuters drive alone; average commute: 31 minutes.`;

    const urbanContent5 = `**Environmental Pressures of Urbanization:**
   - Urban expansion destroys 60,000 km² of land annually—mostly farmland and forests.
   - Cities alter local water cycles, increasing flood risks by 2-5 times.
   - Light pollution from cities affects 80% of the world's population.
   - E-waste from urban electronics: 54 million tons globally in 2024.`;

    const urbanContent6 = `**Sustainable Urban Design Solutions:**
   - **Singapore:** Vertical gardens cover buildings; green cover increased 30% despite density.
   - **Copenhagen:** 62% of residents cycle to work; carbon-neutral target by 2025.
   - **Freiburg, Germany:** Solar rooftops, car-free zones, and Passivhaus standards.
   - **Curitiba, Brazil:** Pioneered Bus Rapid Transit (BRT), now adopted in 200+ cities.`;

    const urbanContent7 = `**Your Urban Footprint:**
   - Housing type matters: apartments use 50% less heating than detached homes.
   - Locally-produced food in urban markets reduces transport emissions.
   - Shared mobility (car-sharing, bike-sharing) can replace 15 private vehicles.
   - Green spaces in cities reduce cooling needs and improve mental health.

The future of sustainability is largely urban. How we design, build, and live in cities will determine our collective environmental impact for generations to come.`;

    const urbanImages = {
      1: '/Users/ericchristine/.gemini/antigravity/brain/c488cf2e-e3ab-462c-840a-f9a93b9af969/global_urbanization_trend_1769372275265.png',
      2: '/Users/ericchristine/.gemini/antigravity/brain/c488cf2e-e3ab-462c-840a-f9a93b9af969/urban_efficiency_advantages_1769372289031.png',
      3: '/Users/ericchristine/.gemini/antigravity/brain/c488cf2e-e3ab-462c-840a-f9a93b9af969/urban_consumption_reality_1769372302215.png',
      4: '/Users/ericchristine/.gemini/antigravity/brain/c488cf2e-e3ab-462c-840a-f9a93b9af969/dense_vs_sprawling_cities_1769372314053.png',
      5: '/Users/ericchristine/.gemini/antigravity/brain/c488cf2e-e3ab-462c-840a-f9a93b9af969/urbanization_environmental_pressures_1769372327672.png',
      6: '/Users/ericchristine/.gemini/antigravity/brain/c488cf2e-e3ab-462c-840a-f9a93b9af969/sustainable_urban_design_solutions_1769372341310.png',
      7: '/Users/ericchristine/.gemini/antigravity/brain/c488cf2e-e3ab-462c-840a-f9a93b9af969/personal_urban_footprint_1769372353916.png',
    };

    customImage = urbanImages[step as keyof typeof urbanImages] || urbanImages[1];

    if (step === 1) {
      content = urbanContent1;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Urban Living', step: 2 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 2) {
      content = urbanContent2;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Urban Living', step: 3 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 3) {
      content = urbanContent3;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Urban Living', step: 4 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 4) {
      content = urbanContent4;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Urban Living', step: 5 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 5) {
      content = urbanContent5;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Urban Living', step: 6 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 6) {
      content = urbanContent6;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Urban Living', step: 7 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 7) {
      content = urbanContent7;
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
  } else if (title === 'Amazing Animals') {
    // Real wildlife photos for each screen
    const animalImages = {
      1: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=600&h=400&fit=crop', // Polar bear
      2: 'https://images.unsplash.com/photo-1551986782-d0169b3f8fa7?w=600&h=400&fit=crop', // Penguins
      3: 'https://images.unsplash.com/photo-1497206365907-f5e630693df0?w=600&h=400&fit=crop', // Flamingos
    };

    const animalsContent1 = `🦋 Did you know? Animals around the world are showing incredible adaptations to climate change!

🐻‍❄️ **Polar Bears Going Inland:**
   - Some polar bears in Hudson Bay have started eating goose eggs and berries as sea ice shrinks!
   - They're learning to hunt on land—something scientists thought wouldn't happen.
   - One bear was filmed sliding down a snowy hill just for fun. Even in tough times, play matters!

🦎 **Lizards Getting Longer Legs:**
   - In the Bahamas, anole lizards evolved longer legs in just 15 years to grip branches better during stronger hurricanes.
   - That's evolution happening in real-time—faster than scientists ever expected!

🦋 **Butterflies Changing Colors:**
   - Some butterflies are evolving lighter-colored wings to reflect more heat and stay cool.
   - The common brown butterfly in Australia has gotten 15% lighter in just 20 years!`;

    const animalsContent2 = `🐧 **Penguins Moving South:**
   - Gentoo penguins are expanding their territory further south in Antarctica as temperatures warm.
   - They're the "pioneers" of the penguin world, setting up new colonies where it was once too cold!

🦅 **Birds Shrinking:**
   - Over 40 years, North American birds have gotten 2-3% smaller on average—but their wings got longer!
   - Smaller bodies cool down faster. Nature's own air conditioning upgrade!

🐟 **Fish Swimming Deeper:**
   - Many fish species are diving to cooler, deeper waters—some by 10-30 meters per decade.
   - Fishermen are noticing their catches are coming from different depths than their grandparents used.`;

    const animalsContent3 = `🦩 **Flamingos Appearing in New Places:**
   - African flamingos have been spotted in Europe more frequently as migration patterns shift.
   - In 2024, flamingos were seen in places like Germany and the UK—thousands of miles from their usual range!

🦝 **Raccoons Going North:**
   - Raccoons have expanded into Canada further than ever before, following warmer winters.
   - They're so adaptable, scientists call them "climate change winners"—for now!

🌍 **The Big Picture:**
The animal kingdom is constantly surprising us with its resilience. But while some species adapt, many cannot keep up with the pace of change. Conservation helps give wildlife a fighting chance!`;

    // Set the custom image based on current step
    customImage = animalImages[step as keyof typeof animalImages] || animalImages[1];

    if (step === 1) {
      content = animalsContent1;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Amazing Animals', step: 2 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 2) {
      content = animalsContent2;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Amazing Animals', step: 3 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 3) {
      content = animalsContent3;
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
  } else if (title === 'Nuclear Energy') {
    const nuclearEnergyContent1 = `**The Power of the Atom:**
Nuclear energy provides a massive amount of reliable, low-carbon electricity.

• **Zero Emissions:** Nuclear power plants emit no greenhouse gases during operation. Unlike fossil fuels, they don't contribute to the greenhouse effect.
• **Baseload Power:** Solar and wind are variable, but nuclear provides a steady supply of energy 24/7, year-round. This makes it a vital "baseload" source for the grid.
• **Incredible Density:** A single uranium fuel pellet, the size of a gummy bear, contains as much energy as a ton of coal or 150 gallons of oil!`;

    const nuclearEnergyContent2 = `**Safety and Waste:**
Nuclear energy is efficient, but it comes with serious challenges that fuel public debate.

• **Historical Disasters:** Accidents like Chernobyl (1986) and Fukushima (2011) have shown the catastrophic potential of reactor failures. These events led to massive evacuations and long-term exclusion zones.
• **Radioactive Waste:** Spent fuel remains dangerous for thousands of years. High-level waste must be stored in secure, deep geological repositories to prevent environmental leaks.
• **High Costs:** Modern nuclear plants are among the most expensive infrastructure projects on Earth and can take 10-15 years to build.`;

    const nuclearEnergyContent3 = `**The Modern Nuclear Era:**
Scientists are working on new technologies to make nuclear energy safer, cheaper, and cleaner.

• **SMRs (Small Modular Reactors):** These smaller, prefabricated reactors are easier to build and include "passive" safety features that don't require human intervention to shut down safely.
• **Fusion Power:** Often called the "holy grail" of energy, fusion mimics the sun by fusing atoms together. It could provide limitless clean power with almost no long-lived radioactive waste.
• **Closing the Fuel Cycle:** Next-gen reactors are being designed to run on the "waste" of older plants, potentially solving the waste problem while generating even more power!`;

    const nuclearImages = {
      1: '/Users/ericchristine/.gemini/antigravity/brain/dbddb713-e42b-4c7b-b0d9-15034a45eaf1/modern_nuclear_plant_1769208341353.png',
      2: '/Users/ericchristine/.gemini/antigravity/brain/dbddb713-e42b-4c7b-b0d9-15034a45eaf1/realistic_nuclear_waste_repository_1769208430994.png',
      3: '/Users/ericchristine/.gemini/antigravity/brain/dbddb713-e42b-4c7b-b0d9-15034a45eaf1/realistic_fusion_reactor_iter_style_1769208481860.png',
    };

    customImage = nuclearImages[step as keyof typeof nuclearImages] || nuclearImages[1];

    if (step === 1) {
      content = nuclearEnergyContent1;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Nuclear Energy', step: 2 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 2) {
      content = nuclearEnergyContent2;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Nuclear Energy', step: 3 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 3) {
      content = nuclearEnergyContent3;
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
  } else if (title === 'Deserts & Geo-engineering') {
    const desertContent1 = `**The Spread of Sands:**
Desertification is the process where fertile land becomes desert, typically as a result of drought, deforestation, or inappropriate agriculture.

• **A Global Threat:** Over 75% of Earth's land area is already degraded, and this could reach 90% by 2050.
• **Climate Feedback:** As forests and grasslands turn to sand, they lose the ability to absorb CO2, further accelerating global warming.
• **Human Impact:** Hundreds of millions of people face food insecurity as the soil they rely on turns to dust.`;

    const desertContent2 = `**Geo-engineering the Green:**
Countries are launching massive engineering projects to stop the sand and even "re-green" the desert.

• **The Great Green Wall (Africa):** A 5,000-mile long "wall" of trees being planted across 11 countries to block the Sahara's expansion.
• **Three-North Shelter Forest (China):** Known as the "Green Great Wall," this project has already increased forest cover in northern China by millions of hectares.
• **Cloud Seeding:** Using specialized planes to "seed" clouds with salt or silver iodide to encourage rain in dry regions like the UAE and western USA.`;

    const desertContent3 = `**Desert Opportunities:**
With the right technology, deserts can become centers for clean energy and life.

• **Solar Superpower:** Deserts receive the most intense and consistent sunlight on Earth. A small fraction of the Sahara could theoretically power the entire world!
• **Desalination:** Using solar energy to turn seawater into fresh water, which can then be used to irrigate and re-forest coastal desert areas.
• **Halophytes:** Scientists are farming "salt-loving" plants that can grow in desert soil using salty water, providing food and fuel.`;

    const desertImages = {
      1: '/Users/ericchristine/.gemini/antigravity/brain/dbddb713-e42b-4c7b-b0d9-15034a45eaf1/desert_sunset_dunes_1769210720336.png',
      2: '/Users/ericchristine/.gemini/antigravity/brain/dbddb713-e42b-4c7b-b0d9-15034a45eaf1/great_green_wall_sahel_1769210733047.png',
      3: '/Users/ericchristine/.gemini/antigravity/brain/dbddb713-e42b-4c7b-b0d9-15034a45eaf1/desert_solar_farm_future_1769210745487.png',
    };

    customImage = desertImages[step as keyof typeof desertImages] || desertImages[1];

    if (step === 1) {
      content = desertContent1;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Deserts & Geo-engineering', step: 2 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 2) {
      content = desertContent2;
      nextButton = (
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate('LessonDetail', { title: 'Deserts & Geo-engineering', step: 3 })
            }
            color="#fff"
          />
        </View>
      );
    } else if (step === 3) {
      content = desertContent3;
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
        {(customImage || lessonImages[title]) && (
          <Image
            source={
              typeof (customImage || lessonImages[title]) === 'string'
                ? { uri: customImage || lessonImages[title] }
                : (customImage || lessonImages[title])
            }
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