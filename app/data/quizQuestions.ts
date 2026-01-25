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

export const rainforestQuizQuestions: Question[] = [
    {
        question: "What percentage of all plant and animal species live in rainforests?",
        options: [
            "About 20%",
            "About 35%",
            "More than 50%",
            "About 10%",
        ],
        correctAnswer: 2,
        explanation: "Though covering only 6% of Earth's surface, rainforests host more than half of all plant and animal species.",
    },
    {
        question: "Which rainforest is the largest in the world?",
        options: [
            "Congo Basin",
            "Daintree Rainforest",
            "Amazon Rainforest",
            "Borneo Rainforest",
        ],
        correctAnswer: 2,
        explanation: "The Amazon Rainforest is the largest, spanning 9 countries and covering 5.5 million km².",
    },
    {
        question: "What is the primary driver of deforestation in tropical rainforests?",
        options: [
            "Tourism",
            "Agriculture (cattle ranching and palm oil)",
            "Urban development",
            "Natural disasters",
        ],
        correctAnswer: 1,
        explanation: "Agriculture, particularly cattle ranching and palm oil plantations, is the leading driver of rainforest deforestation.",
    },
    {
        question: "Why are rainforests called 'the lungs of the Earth'?",
        options: [
            "They are shaped like lungs",
            "They produce about 20% of the world's oxygen",
            "They filter air pollution",
            "They are located near major cities",
        ],
        correctAnswer: 1,
        explanation: "Rainforests produce about 20% of the world's oxygen through photosynthesis and absorb vast amounts of CO₂.",
    },
    {
        question: "Which country successfully reversed deforestation, growing forest cover from 21% to over 52%?",
        options: [
            "Brazil",
            "Indonesia",
            "Costa Rica",
            "Malaysia",
        ],
        correctAnswer: 2,
        explanation: "Costa Rica reversed deforestation through conservation policies and incentives, growing forest cover from 21% to over 52% since 1987.",
    },
];

export const urbanLivingQuizQuestions: Question[] = [
    {
        question: "What percentage of the world's population is expected to live in cities by 2050?",
        options: [
            "50%",
            "68%",
            "80%",
            "45%",
        ],
        correctAnswer: 1,
        explanation: "By 2050, 68% of the world's population is expected to live in urban areas, up from 56% today.",
    },
    {
        question: "How do New York City residents' CO₂ emissions compare to the US average?",
        options: [
            "About the same",
            "Twice as high",
            "Less than half the US average",
            "Slightly higher",
        ],
        correctAnswer: 2,
        explanation: "New Yorkers emit 7.1 tons CO₂/year compared to the US average of 16 tons—less than half, due to density and public transit.",
    },
    {
        question: "What percentage of global CO₂ emissions do cities produce?",
        options: [
            "40%",
            "55%",
            "70%",
            "85%",
        ],
        correctAnswer: 2,
        explanation: "Cities consume 75% of the world's energy and produce approximately 70% of global CO₂ emissions.",
    },
    {
        question: "Which city pioneered Bus Rapid Transit (BRT), now adopted in over 200 cities worldwide?",
        options: [
            "Singapore",
            "Copenhagen",
            "Curitiba, Brazil",
            "Tokyo",
        ],
        correctAnswer: 2,
        explanation: "Curitiba, Brazil pioneered Bus Rapid Transit (BRT) in the 1970s, which has since been adopted in over 200 cities worldwide.",
    },
    {
        question: "How much less heating energy do apartments typically use compared to detached homes?",
        options: [
            "10% less",
            "25% less",
            "50% less",
            "75% less",
        ],
        correctAnswer: 2,
        explanation: "Apartments use approximately 50% less heating energy than detached homes due to shared walls and smaller spaces.",
    },
];

export const amazingAnimalsQuizQuestions: Question[] = [
    {
        question: "What surprising food have some polar bears started eating as sea ice shrinks?",
        options: [
            "Seaweed",
            "Goose eggs and berries",
            "Fish from rivers",
            "Seals on land",
        ],
        correctAnswer: 1,
        explanation: "Some polar bears in Hudson Bay have adapted by eating goose eggs and berries when sea ice isn't available for seal hunting!",
    },
    {
        question: "How fast did Bahamian anole lizards evolve longer legs?",
        options: [
            "100 years",
            "50 years",
            "15 years",
            "5 years",
        ],
        correctAnswer: 2,
        explanation: "Anole lizards evolved longer legs in just 15 years to grip branches better during stronger hurricanes—amazingly fast evolution!",
    },
    {
        question: "Why are some butterflies evolving lighter-colored wings?",
        options: [
            "To hide from predators",
            "To attract mates",
            "To reflect more heat and stay cool",
            "To fly faster",
        ],
        correctAnswer: 2,
        explanation: "Lighter-colored wings reflect more heat, helping butterflies stay cool as temperatures rise. The Australian common brown butterfly got 15% lighter in 20 years!",
    },
    {
        question: "Which penguin species is called the 'pioneer' of the penguin world for setting up new colonies?",
        options: [
            "Emperor penguins",
            "King penguins",
            "Gentoo penguins",
            "Adelie penguins",
        ],
        correctAnswer: 2,
        explanation: "Gentoo penguins are expanding their territory further south in Antarctica as temperatures warm, setting up new colonies in previously too-cold areas!",
    },
    {
        question: "What two body changes have North American birds shown over 40 years?",
        options: [
            "Larger bodies and shorter wings",
            "Smaller bodies and longer wings",
            "Same size but different colors",
            "Larger beaks and smaller feet",
        ],
        correctAnswer: 1,
        explanation: "Birds have gotten 2-3% smaller (to cool down faster) but developed longer wings—nature's own adaptation to a warming world!",
    },
];

export const nuclearEnergyQuizQuestions: Question[] = [
    {
        question: "What is a major benefit of nuclear power for the climate?",
        options: [
            "It's completely free",
            "It produces zero emissions during operation",
            "It uses safe renewable fuel",
            "It cools the Earth directly",
        ],
        correctAnswer: 1,
        explanation: "Nuclear power plants generate electricity without burning fossil fuels, meaning they don't emit CO2 while running!",
    },
    {
        question: "Which term describes the steady, 24/7 power supply provided by nuclear plants?",
        options: [
            "Variable power",
            "Intermittent power",
            "Baseload power",
            "Peak power",
        ],
        correctAnswer: 2,
        explanation: "Because nuclear plants run constantly, they provide a reliable \"baseload\" that solar and wind (which depend on the weather) cannot yet match alone.",
    },
    {
        question: "What is a primary concern regarding nuclear waste?",
        options: [
            "It smells bad",
            "It remains radioactive for thousands of years",
            "It's too heavy to move",
            "It turns into coal over time",
        ],
        correctAnswer: 1,
        explanation: "Spent nuclear fuel is highly radioactive and must be stored in secure geological repositories to keep it away from the environment for millennia.",
    },
    {
        question: "What happened at the Fukushima Daiichi plant in 2011?",
        options: [
            "A nuclear fusion breakthrough",
            "A major accident caused by a tsunami",
            "The world's first clean reactor launch",
            "A fire caused by solar panels",
        ],
        correctAnswer: 1,
        explanation: "A massive earthquake and tsunami led to a cooling failure and multiple meltdowns at the Fukushima plant, highlighting the risks of nuclear safety.",
    },
    {
        question: "What is \"Fusion power\" often called in the energy world?",
        options: [
            "The energy of the moon",
            "The holy grail of energy",
            "The expensive giant",
            "The old-fashioned atom",
        ],
        correctAnswer: 1,
        explanation: "Fusion mimics the sun to create virtually endless, clean power without long-lived waste—though it's still extremely difficult to achieve on Earth!",
    },
];

export const desertGeoengineeringQuizQuestions: Question[] = [
    {
        question: "What is desertification?",
        options: [
            "The process of making more ice",
            "The spread of desert-like conditions into fertile land",
            "The study of desert animals",
            "A type of desert plant",
        ],
        correctAnswer: 1,
        explanation: "Desertification is the degradation of land in dry areas, making it increasingly arid and unusable for farming or living.",
    },
    {
        question: "What is the 'Great Green Wall' in Africa?",
        options: [
            "A wall made of green stones",
            "A massive reforestation project across the Sahel region",
            "A type of renewable energy plant",
            "A natural mountain range",
        ],
        correctAnswer: 1,
        explanation: "The Great Green Wall is an ambitious project to plant a 5,000-mile long 'wall' of trees across Africa to combat desertification.",
    },
    {
        question: "Which geo-engineering technique involves injecting particles into clouds to encourage rain?",
        options: [
            "Ocean fertilization",
            "Cloud seeding",
            "Solar dimming",
            "Carbon capture",
        ],
        correctAnswer: 1,
        explanation: "Cloud seeding is a weather modification technique that aims to increase precipitation by dispersing substances into the air.",
    },
    {
        question: "Why are deserts actually good locations for solar power?",
        options: [
            "Because sand is made of silicon",
            "Frequent clouds help cool panels",
            "Vast open space and intense, consistent sunlight",
            "Solar panels prefer hot weather",
        ],
        correctAnswer: 2,
        explanation: "Deserts offer massive amounts of space and some of the most reliable sunlight on the planet, making them ideal for large-scale solar farms.",
    },
    {
        question: "What is one way 'geo-engineering' can help forests in dry areas?",
        options: [
            "By painting trees green",
            "By creating artificial irrigation and weather patterns",
            "By removing all the sand",
            "By importing ice from the poles",
        ],
        correctAnswer: 1,
        explanation: "Geo-engineering projects often involve large-scale irrigation, water management, or climate intervention to help new forests survive in arid regions.",
    },
];
