// Story type for static stories
export interface Story {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  readTime: string;
  featured: boolean;
}

const stories: Story[] = [
  {
    id: '1',
    date: '12/15/24',
    title: 'Reforestation Revolution: How One Community Transformed Their Landscape',
    excerpt: 'In the heart of Costa Rica, the village of San Miguel has planted over 50,000 trees in just two years, creating a green corridor that supports both wildlife and local livelihoods.',
    content: 'The transformation began when local farmer Maria Santos witnessed the devastating effects of deforestation on her community. With support from GEI, she organized neighbors to begin an ambitious reforestation project that would change everything. Today, the once-barren hillsides are alive with native species, and the community has developed sustainable eco-tourism that provides income while protecting their natural heritage.',
    image: 'https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Conservation',
    author: 'Dr. Elena Rodriguez',
    readTime: '5 min read',
    featured: true
  },
  {
    id: '2',
    date: '12/10/24',
    title: 'Ocean Guardians: Youth Leading Marine Conservation in the Philippines',
    excerpt: 'Young environmental activists in the Philippines are pioneering innovative approaches to marine conservation, protecting coral reefs and building sustainable fishing practices.',
    content: 'Led by 16-year-old climate activist Paolo Mercado, a group of island youth has developed a comprehensive marine protection program that combines traditional knowledge with modern conservation techniques. Their efforts have resulted in a 40% increase in fish populations and the restoration of critical coral reef ecosystems.',
    image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Youth Leadership',
    author: 'James Chen',
    readTime: '4 min read',
    featured: true
  },
  {
    id: '3',
    date: '12/05/24',
    title: 'Solar Villages: Bringing Clean Energy to Remote Communities',
    excerpt: 'Through innovative solar microgrids, rural communities in Kenya are gaining access to reliable electricity while reducing their carbon footprint.',
    content: 'The Solar Villages project has transformed daily life in remote Kenyan communities, providing clean electricity to schools, clinics, and homes. This initiative demonstrates how renewable energy can drive economic development while protecting the environment.',
    image: 'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Renewable Energy',
    author: 'Dr. Amina Hassan',
    readTime: '6 min read',
    featured: false
  },
  {
    id: '4',
    date: '11/28/24',
    title: "Urban Farming: Growing Food and Community in Detroit",
    excerpt: "Detroit's urban agriculture movement is transforming vacant lots into productive gardens, creating food security and building stronger neighborhoods.",
    content: "In Detroit, what began as a response to food deserts has evolved into a thriving urban agriculture ecosystem. Community gardens now provide fresh produce to thousands of families while creating jobs and fostering neighborhood connections.",
    image: 'https://images.pexels.com/photos/1458332/pexels-photo-1458332.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Urban Agriculture',
    author: 'Sarah Williams',
    readTime: '5 min read',
    featured: false
  },
  {
    id: '5',
    date: '11/22/24',
    title: "Plastic-Free Future: A School's Journey to Zero Waste",
    excerpt: "Green Valley Elementary School eliminated single-use plastics and achieved zero waste to landfill, inspiring other schools to follow their example.",
    content: "Through student-led initiatives and innovative waste reduction programs, Green Valley Elementary has become a model for sustainable education. Their approach combines environmental education with practical action, creating lasting change in their community.",
    image: 'https://images.pexels.com/photos/3183170/pexels-photo-3183170.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Education',
    author: 'Michael Thompson',
    readTime: '4 min read',
    featured: false
  }
];

export default stories; 