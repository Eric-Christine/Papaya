import { Lesson } from '../types/lesson';

export const lessons: Lesson[] = [
    // Climate Fundamentals
    {
        id: '1',
        title: 'Climate Basics',
        description: 'Understand the greenhouse effect and how climate change works.',
        icon: 'earth',
        category: 'Climate Fundamentals',
    },
    {
        id: '5',
        title: 'Carbon Footprint',
        description: 'Find out how to calculate and reduce your carbon footprint.',
        icon: 'foot-print',
        category: 'Climate Fundamentals',
    },
    // Energy
    {
        id: '4',
        title: 'Energy Mix',
        description: 'Learn about how we use solar, wind, energy storage alongside our current energy mix.',
        icon: 'solar-power',
        category: 'Energy',
    },
    {
        id: '10',
        title: 'Solar Power',
        description: 'Learn about how solar power and debunk common myths',
        icon: 'white-balance-sunny',
        category: 'Energy',
    },
    {
        id: '13',
        title: 'Renewable Energy',
        description: 'Explore wind, solar, hydro, and other clean energy sources powering our future',
        icon: 'wind-turbine',
        category: 'Energy',
    },
    {
        id: '19',
        title: 'Nuclear Energy',
        description: 'Debate the controversies and benefits of nuclear power as a clean energy source',
        icon: 'atom',
        category: 'Energy',
    },
    // Transportation
    {
        id: '6',
        title: 'Electric Vehicles',
        description: 'Explore how EVs reduce emissions and contribute to a sustainable transportation future.',
        icon: 'car-electric',
        category: 'Transportation',
    },
    {
        id: '15',
        title: 'Public Transport & Urban Living',
        description: 'Discover how sustainable cities and public transport reduce emissions',
        icon: 'bus',
        category: 'Transportation',
    },
    // Sustainable Living
    {
        id: '3',
        title: 'Sustainable Living',
        description: 'Discover simple tips for reducing waste and living green.',
        icon: 'leaf',
        category: 'Sustainable Living',
    },
    {
        id: '2',
        title: 'Fashion',
        description: 'Learn about the environmental impact of the fashion industry and how to shop sustainably.',
        icon: 'tshirt-crew',
        category: 'Sustainable Living',
    },
    {
        id: '7',
        title: 'Agriculture',
        description: 'Learn about the environmental impact of food production and how to eat sustainably.',
        icon: 'food-apple',
        category: 'Sustainable Living',
    },
    {
        id: '12',
        title: 'Recycling',
        description: 'Recycling misconceptions and how to recycle properly',
        icon: 'recycle',
        category: 'Sustainable Living',
    },
    {
        id: '17',
        title: 'Urban Living',
        description: 'Explore the environmental impact of cities and global urbanization trends',
        icon: 'city',
        category: 'Sustainable Living',
    },
    // Environment
    {
        id: '11',
        title: 'Oceans',
        description: 'How have our oceans changed and how to protect them',
        icon: 'waves',
        category: 'Environment',
    },
    {
        id: '16',
        title: 'Rainforests',
        description: 'Explore the world\'s rainforests and the vital importance of conservation',
        icon: 'tree',
        category: 'Environment',
    },
    {
        id: '20',
        title: 'Deserts & Geo-engineering',
        description: 'Learn about desertification and the global efforts to green the world\'s drylands',
        icon: 'weather-sunny',
        category: 'Environment',
    },
    // Policy & Progress
    {
        id: '14',
        title: 'Policy & Environmental Laws',
        description: 'Learn about key environmental policies and laws shaping our world',
        icon: 'scale-balance',
        category: 'Policy & Progress',
    },
    {
        id: '9',
        title: 'Organizations',
        description: 'Organizations that are making a difference',
        icon: 'office-building',
        category: 'Policy & Progress',
    },
    {
        id: '8',
        title: 'Achievements',
        description: 'Learn about our progress so far',
        icon: 'trophy',
        category: 'Policy & Progress',
    },
    // Fun Facts
    {
        id: '18',
        title: 'Amazing Animals',
        description: 'Discover how incredible animals are adapting to our changing world',
        icon: 'paw',
        category: 'Fun Facts',
    },
];
