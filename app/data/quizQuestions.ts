import { Question } from '../types/quiz';

export const sustainableLivingQuizQuestions: Question[] = [
    {
        question: "What does your carbon footprint represent?",
        options: [
            "The total weight of the carbon you breathe daily",
            "The amount of greenhouse gases produced by your activities",
            "How much carbon is stored in your body",
            "The cost of carbon-based products you buy",
        ],
        correctAnswer: 1,
        explanation: "It represents the total amount of greenhouse gases produced by your daily activities.",
    },
    {
        question: "Which statement best describes a circular economy?",
        options: [
            "An economy based on the 'take-make-waste' model",
            "An economy that minimizes waste by emphasizing repair, reuse, and recycling",
            "An economy that only focuses on increasing production",
            "An economy that ignores environmental impact",
        ],
        correctAnswer: 1,
        explanation: "A circular economy minimizes waste by keeping resources in use for as long as possible.",
    },
    {
        question: "Approximately what percentage of global greenhouse gas emissions is linked to household consumption?",
        options: ["50%", "72%", "30%", "90%"],
        correctAnswer: 1,
        explanation: "Household consumption is linked to roughly 72% of global greenhouse gas emissions.",
    },
    {
        question: "How does community engagement contribute to sustainable living?",
        options: [
            "By isolating individual actions",
            "By amplifying the impact of individual efforts through local initiatives",
            "By increasing energy consumption",
            "By focusing solely on personal benefits",
        ],
        correctAnswer: 1,
        explanation: "Community engagement amplifies individual actions through collective local initiatives.",
    },
];

export const climateQuizQuestions: Question[] = [
    {
        question: "What is the primary greenhouse gas responsible for global warming?",
        options: ["Carbon Dioxide", "Oxygen", "Nitrogen", "Helium"],
        correctAnswer: 0,
        explanation: "Carbon Dioxide is the main greenhouse gas contributing to global warming.",
    },
    {
        question: "Which human activity significantly contributes to climate change?",
        options: ["Reading", "Burning fossil fuels", "Sleeping", "Walking"],
        correctAnswer: 1,
        explanation: "Burning fossil fuels releases large amounts of CO₂, a major greenhouse gas.",
    },
    {
        question: "What is a common consequence of climate change?",
        options: ["Rising sea levels", "Decreased temperatures", "More snowfall", "Less extreme weather"],
        correctAnswer: 0,
        explanation: "One consequence of climate change is rising sea levels due to melting ice caps.",
    },
    {
        question: "Which solution is most effective in mitigating climate change?",
        options: ["Using renewable energy", "Increasing fossil fuel use", "Deforestation", "Overfishing"],
        correctAnswer: 0,
        explanation: "Transitioning to renewable energy sources is key to mitigating climate change.",
    },
];

export const energyMixQuestions: Question[] = [
    {
        question: "What does the term 'energy mix' refer to?",
        options: [
            "The exclusive use of fossil fuels for energy",
            "A combination of various energy sources used to generate power",
            "Only renewable energy sources such as solar and wind",
            "Energy produced solely from nuclear power",
        ],
        correctAnswer: 1,
        explanation: "The energy mix is the combination of different energy sources used to produce power.",
    },
    {
        question: "Which factor most influences a country's energy mix?",
        options: [
            "Geographical location and the availability of natural resources",
            "The country's internet infrastructure",
            "Global fashion trends",
            "The number of automobiles on the road",
        ],
        correctAnswer: 0,
        explanation: "A country's geographical location and natural resource availability largely determine its energy mix.",
    },
    {
        question: "What is one of the primary benefits of diversifying a nation's energy mix?",
        options: [
            "Reducing dependency on a single energy source",
            "Increasing the risk of power outages",
            "Raising overall energy costs significantly",
            "Limiting the development of renewable energy technology",
        ],
        correctAnswer: 0,
        explanation: "Diversification reduces dependency on any one energy source, leading to improved stability.",
    },
    {
        question: "Which energy storage technology is most commonly used in both electric vehicles and grid-scale systems?",
        options: [
            "Pumped Hydro Storage",
            "Thermal Storage",
            "Battery Storage",
            "Flywheel Storage",
        ],
        correctAnswer: 2,
        explanation: "Battery storage is the most widely used technology for electric vehicles and grid-scale energy storage.",
    }
];

export const carbonFootprintQuestions: Question[] = [
    {
        question: "What does your carbon footprint measure?",
        options: [
            "The distance you travel daily",
            "The total greenhouse gases emitted by your activities",
            "The amount of energy you store",
            "The number of trees you plant",
        ],
        correctAnswer: 1,
        explanation: "It measures the total greenhouse gases emitted by your personal activities.",
    },
    {
        question: "Which activity is a major contributor to your carbon footprint?",
        options: [
            "Reading books",
            "Using public transportation",
            "Driving a gasoline-powered car",
            "Drinking water",
        ],
        correctAnswer: 2,
        explanation: "Driving a gasoline-powered car is one of the main contributors to a higher carbon footprint.",
    },
    {
        question: "How can you reduce your carbon footprint?",
        options: [
            "Increase meat consumption",
            "Switch to renewable energy sources",
            "Use more single-use plastics",
            "Drive more frequently",
        ],
        correctAnswer: 1,
        explanation: "Switching to renewable energy sources can significantly reduce your carbon footprint.",
    },
    {
        question: "Why does the carbon footprint vary globally?",
        options: [
            "Due to differences in lifestyle and energy sources",
            "Because of the number of people in each country",
            "Due to the size of the country",
            "Because everyone measures it differently",
        ],
        correctAnswer: 0,
        explanation: "Differences in lifestyle and the types of energy used contribute to global variations in carbon footprints.",
    },
];

export const solarPowerQuestions: Question[] = [
    {
        question: "True or False: Solar energy is classified as an intermittent power source.",
        options: [
            "True",
            "False"
        ],
        correctAnswer: 0,
        explanation: "Solar panels only generate electricity when sunlight is available, making them intermittent. Unlike baseload sources (nuclear, gas) that produce power continuously, solar output varies with daylight and weather. Battery storage systems can help manage this intermittency by storing excess energy for later use.",
    },
    {
        question: "True or False: Solar panels are the most expensive form of electricity generation",
        options: [
            "True",
            "False"
        ],
        correctAnswer: 1,
        explanation: "While the initial installation cost may be high, solar panels are among the most cost-effective over time.",
    },
    {
        question: "True or false: Solar panels can generate electricity on cloudy days.",
        options: [
            "True",
            "False"
        ],
        correctAnswer: 0,
        explanation: "Solar panels can still generate electricity on cloudy days, though at reduced efficiency.",
    },
];

export const organizationsQuizQuestions: Question[] = [
    {
        question: "What is the primary role of the Intergovernmental Panel on Climate Change (IPCC)?",
        options: [
            "To fund climate mitigation projects",
            "To assess scientific research on climate change and its impacts",
            "To enforce climate-related laws",
            "To negotiate international climate treaties",
        ],
        correctAnswer: 1,
        explanation: "The IPCC assesses scientific research on climate change and its impacts, producing comprehensive reports that inform global climate policy.",
    },
    {
        question: "Which of the following best describes the United Nations Framework Convention on Climate Change (UNFCCC)?",
        options: [
            "A financial institution that supports renewable energy projects",
            "A treaty that serves as the backbone of global climate negotiations",
            "An organization responsible for implementing local environmental policies",
            "A research center for climate science",
        ],
        correctAnswer: 1,
        explanation: "The UNFCCC is a treaty that forms the backbone of global climate negotiations and has enabled landmark agreements like the Kyoto Protocol and the Paris Agreement.",
    },
    {
        question: "What is the key function of the Green Climate Fund (GCF)?",
        options: [
            "To produce scientific reports on climate change",
            "To facilitate international climate negotiations",
            "To provide financial support to developing countries for climate projects",
            "To enforce global environmental regulations",
        ],
        correctAnswer: 2,
        explanation: "The Green Climate Fund provides financial support to developing countries for projects aimed at reducing greenhouse gas emissions and enhancing resilience to climate change.",
    },
];

export const recyclingQuizQuestions: Question[] = [
    {
        question: "What is the primary goal of recycling?",
        options: [
            "To reduce waste sent to landfills",
            "To increase energy consumption",
            "To produce more plastic products",
            "To reduce the cost of goods",
        ],
        correctAnswer: 0,
        explanation: "Recycling aims to reduce waste sent to landfills by reusing materials to create new products.",
    },
    {
        question: "Which of the following materials can be recycled?",
        options: [
            "Plastic bottles",
            "Glass jars",
            "Aluminum cans",
            "All of the above",
        ],
        correctAnswer: 3,
        explanation: "Plastic bottles, glass jars, and aluminum cans are all recyclable materials.",
    },
    {
        question: "What is the first step in the recycling process?",
        options: [
            "Sorting materials",
            "Melting materials",
            "Creating new products",
            "Collecting materials",
        ],
        correctAnswer: 3,
        explanation: "The first step in recycling is collecting materials to be processed and reused.",
    },
    {
        question: "How does recycling help the environment?",
        options: [
            "By increasing pollution",
            "By conserving natural resources",
            "By reducing energy efficiency",
            "By creating more waste",
        ],
        correctAnswer: 1,
        explanation: "Recycling helps the environment by conserving natural resources and reducing waste sent to landfills.",
    },
];

export const oceanQuizQuestions: Question[] = [
    {
        question: "What percentage of the Earth's surface is covered by oceans?",
        options: [
            "50%",
            "70%",
            "90%",
            "30%",
        ],
        correctAnswer: 1,
        explanation: "Oceans cover approximately 70% of the Earth's surface.",
    },
    {
        question: "Which of the following is a major threat to ocean health?",
        options: [
            "Plastic pollution",
            "Increased biodiversity",
            "Reduced carbon emissions",
            "Sustainable fishing practices",
        ],
        correctAnswer: 0,
        explanation: "Plastic pollution poses a significant threat to ocean health, harming marine life and ecosystems.",
    },
    {
        question: "What is the primary cause of coral bleaching?",
        options: [
            "Increased water temperature",
            "Decreased water salinity",
            "Overfishing",
            "Oil spills",
        ],
        correctAnswer: 0,
        explanation: "Coral bleaching is primarily caused by increased water temperatures, which stress coral reefs and lead to their decline.",
    },
    {
        question: "How do oceans help regulate the Earth's climate?",
        options: [
            "By trapping heat in the atmosphere",
            "By absorbing excess carbon dioxide",
            "By increasing global temperatures",
            "By reducing sea levels",
        ],
        correctAnswer: 1,
        explanation: "Oceans help regulate the Earth's climate by absorbing excess carbon dioxide from the atmosphere, which helps mitigate global warming.",
    },
];

export const agricultureQuizQuestions: Question[] = [
    {
        question: "What is the environmental impact of industrial agriculture?",
        options: [
            "Increased biodiversity",
            "Reduced water pollution",
            "Deforestation and habitat loss",
            "Enhanced soil health",
        ],
        correctAnswer: 2,
        explanation: "Industrial agriculture contributes to deforestation and habitat loss, impacting ecosystems and biodiversity.",
    },
    {
        question: "How does food production contribute to climate change?",
        options: [
            "By reducing greenhouse gas emissions",
            "By increasing carbon sequestration",
            "By deforestation for agriculture",
            "By promoting sustainable farming practices",
        ],
        correctAnswer: 2,
        explanation: "Food production contributes to climate change through deforestation for agriculture, which releases stored carbon into the atmosphere.",
    },
    {
        question: "What is one way to reduce the environmental impact of food production?",
        options: [
            "Increase food waste",
            "Adopt sustainable farming practices",
            "Use more pesticides",
            "Expand monoculture farming",
        ],
        correctAnswer: 1,
        explanation: "Adopting sustainable farming practices can help reduce the environmental impact of food production, promoting biodiversity and soil health.",
    },
    {
        question: "How does the food system impact water resources?",
        options: [
            "By reducing water pollution",
            "By increasing water scarcity",
            "By promoting water conservation",
            "By improving water quality",
        ],
        correctAnswer: 1,
        explanation: "The food system contributes to water scarcity through intensive irrigation and water-intensive crop production.",
    },
];

export const electricVehiclesQuizQuestions: Question[] = [
    {
        question: "What is a primary benefit of electric vehicles (EVs) compared to gasoline-powered cars?",
        options: [
            "Lower fuel efficiency",
            "Higher greenhouse gas emissions",
            "Reduced air pollution",
            "Increased noise pollution",
        ],
        correctAnswer: 2,
        explanation: "Electric vehicles produce fewer emissions and reduce air pollution compared to gasoline-powered cars.",
    },
    {
        question: "How do electric vehicles help reduce greenhouse gas emissions?",
        options: [
            "By burning fossil fuels",
            "By increasing energy consumption",
            "By using renewable energy sources",
            "By promoting deforestation",
        ],
        correctAnswer: 2,
        explanation: "Electric vehicles help reduce greenhouse gas emissions by using electricity from renewable energy sources.",
    },
    {
        question: "What is a common environmental concern about electric vehicle batteries?",
        options: [
            "They are too heavy",
            "They are too expensive",
            "They are not recyclable",
            "They require intensive lithium and cobalt mining"
        ],
        correctAnswer: 3,
        explanation: "EV batteries depend on lithium and cobalt mining, which can cause water depletion, habitat damage, and other environmental harms ."
    },
    {
        question: "What is one way to increase the adoption of electric vehicles?",
        options: [
            "Reduce charging infrastructure",
            "Increase gasoline prices",
            "Offer incentives and rebates",
            "Promote fossil fuel use",
        ],
        correctAnswer: 2,
        explanation: "Offering incentives and rebates can help increase the adoption of electric vehicles by making them more affordable for consumers.",
    },
];

export const fashionQuizQuestions: Question[] = [
    {
        question: "What is fast fashion?",
        options: [
            "High-quality, long-lasting clothing",
            "Clothing designed for durability and sustainability",
            "A trend of rapidly changing fashion styles",
            "A movement to reduce waste in the fashion industry",
        ],
        correctAnswer: 2,
        explanation: "Fast fashion refers to the trend of rapidly changing fashion styles, leading to increased consumption and waste.",
    },
    {
        question: "What is one environmental impact of the fashion industry?",
        options: [
            "Reduced water usage",
            "Increased textile recycling",
            "Water pollution from dyeing processes",
            "Promotion of sustainable materials",
        ],
        correctAnswer: 2,
        explanation: "The fashion industry contributes to water pollution through dyeing processes and chemical discharge.",
    },
    {
        question: "How does the fashion industry contribute to waste?",
        options: [
            "By promoting durable, long-lasting clothing",
            "By encouraging clothing repair and reuse",
            "By producing large quantities of low-quality garments",
            "By supporting sustainable fashion brands",
        ],
        correctAnswer: 2,
        explanation: "The fashion industry produces large quantities of low-quality garments, leading to increased waste and environmental impact.",
    },
    {
        question: "What is one way to reduce the environmental impact of fashion?",
        options: [
            "Increase clothing production",
            "Promote fast fashion trends",
            "Support sustainable and ethical brands",
            "Encourage disposable fashion",
        ],
        correctAnswer: 2,
        explanation: "Supporting sustainable and ethical fashion brands can help reduce the environmental impact of the fashion industry."
    },
];

export const renewableEnergyQuizQuestions: Question[] = [
    {
        question: "Which renewable energy source provides approximately 16% of global electricity and is the largest renewable energy source?",
        options: [
            "Wind energy",
            "Solar power",
            "Hydroelectric power",
            "Geothermal energy",
        ],
        correctAnswer: 2,
        explanation: "Hydroelectric power provides approximately 16% of global electricity and remains the largest renewable energy source worldwide.",
    },
    {
        question: "What makes geothermal energy particularly valuable compared to solar and wind?",
        options: [
            "It's cheaper to install",
            "It operates 24/7 providing reliable baseload power",
            "It requires no infrastructure",
            "It generates more power per installation",
        ],
        correctAnswer: 1,
        explanation: "Geothermal plants operate continuously 24/7 with minimal environmental impact, providing reliable baseload power unlike intermittent solar and wind sources.",
    },
    {
        question: "Which country generates nearly 100% of its electricity from renewable sources, with geothermal playing a major role?",
        options: [
            "Germany",
            "Denmark",
            "Iceland",
            "China",
        ],
        correctAnswer: 2,
        explanation: "Iceland generates nearly 100% of its electricity from renewable sources, with geothermal energy playing a major role alongside hydropower.",
    },
    {
        question: "What is one major benefit of renewable energy beyond climate change mitigation?",
        options: [
            "Increases dependence on imported fuels",
            "Reduces job opportunities",
            "Enhances energy independence and national security",
            "Increases air pollution",
        ],
        correctAnswer: 2,
        explanation: "Renewable energy reduces reliance on imported fossil fuels, enhancing energy independence and national security while also creating jobs and improving air quality.",
    },
];

export const policyLawsQuizQuestions: Question[] = [
    {
        question: "What is the Paris Agreement?",
        options: [
            "A trade deal between European countries",
            "An international treaty on climate change mitigation",
            "A renewable energy company",
            "A United Nations building",
        ],
        correctAnswer: 1,
        explanation: "The Paris Agreement is an international treaty signed in 2015 aimed at limiting global warming to 1.5°C above pre-industrial levels.",
    },
    {
        question: "What does the Clean Air Act regulate in the United States?",
        options: [
            "Water pollution",
            "Air emissions from stationary and mobile sources",
            "Noise pollution",
            "Food safety standards",
        ],
        correctAnswer: 1,
        explanation: "The Clean Air Act regulates air emissions from various sources to protect public health and the environment.",
    },
    {
        question: "What is the purpose of a carbon tax?",
        options: [
            "To encourage more fossil fuel use",
            "To put a price on carbon emissions to incentivize reductions",
            "To reduce energy prices",
            "To fund military operations",
        ],
        correctAnswer: 1,
        explanation: "A carbon tax puts a price on greenhouse gas emissions, incentivizing businesses and individuals to reduce their carbon footprint.",
    },
    {
        question: "Which law established the Environmental Protection Agency (EPA) in the US?",
        options: [
            "The Clean Water Act",
            "The National Environmental Policy Act (NEPA)",
            "The Endangered Species Act",
            "The Toxic Substances Control Act",
        ],
        correctAnswer: 1,
        explanation: "The National Environmental Policy Act (NEPA) of 1970 led to the creation of the EPA to enforce environmental laws.",
    },
];

export const publicTransportQuizQuestions: Question[] = [
    {
        question: "How much can public transit reduce an individual's carbon footprint compared to driving?",
        options: [
            "10%",
            "25%",
            "50% or more",
            "Public transit is worse for the environment",
        ],
        correctAnswer: 2,
        explanation: "Public transit can reduce an individual's carbon footprint by 50% or more compared to driving a personal vehicle.",
    },
    {
        question: "What is a '15-minute city'?",
        options: [
            "A city with only 15 minutes of traffic per day",
            "An urban design where daily needs are within 15 minutes by foot or bike",
            "A city with 15 neighborhoods",
            "A fast-paced lifestyle",
        ],
        correctAnswer: 1,
        explanation: "A 15-minute city is an urban planning concept where daily necessities are accessible within 15 minutes of walking or cycling from home.",
    },
    {
        question: "Which city has one of the world's largest and most efficient metro systems?",
        options: [
            "Los Angeles",
            "Tokyo",
            "Houston",
            "Phoenix",
        ],
        correctAnswer: 1,
        explanation: "Tokyo has one of the world's largest and most efficient metro systems, moving millions of passengers daily with remarkable punctuality.",
    },
    {
        question: "What is urban sprawl?",
        options: [
            "Rapid growth of tall buildings in city centers",
            "The spread of development into suburban areas requiring more cars",
            "A type of public park",
            "A sustainable urban design",
        ],
        correctAnswer: 1,
        explanation: "Urban sprawl is the uncontrolled expansion of urban development into surrounding areas, often increasing car dependency and emissions.",
    },
];
