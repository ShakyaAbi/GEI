import { NavItem, DropdownItems } from '../types';

export const NAV_ITEMS: NavItem[] = [
  { name: 'About', path: '/about', hasDropdown: true, key: 'about' },
  { name: 'Our Work', path: '/our-work', hasDropdown: true, key: 'our-work' },
  { name: 'Research', path: '/research', hasDropdown: true, key: 'research' },
  { name: 'Contact', path: '/contact', hasDropdown: false, key: 'contact' },
];

export const DROPDOWN_ITEMS: DropdownItems = {
  about: [
    { name: 'Our Story', path: '/about/our-story', description: 'Learn about our mission, vision, and values' },
    { name: 'Our Team', path: '/about/our-team', description: 'Meet our leadership and expert team' },
    { name: 'Our History', path: '/about/our-history', description: 'Our journey and key milestones' },
    { name: 'Partnerships', path: '/about/partnerships', description: 'Our global network of collaborators' },
    { name: 'Careers', path: '/about/careers', description: 'Join our mission for environmental change' },
  ],
  'our-work': [
    { name: 'Climate Action', path: '/our-work/climate-action', description: 'Fighting climate change through innovative solutions' },
    { name: 'Conservation', path: '/our-work/conservation', description: 'Protecting ecosystems and biodiversity' },
    { name: 'Renewable Energy', path: '/our-work/renewable-energy', description: 'Advancing clean energy technologies' },
    { name: 'Sustainability', path: '/our-work/sustainability', description: 'Building sustainable communities' },
    { name: 'Policy & Advocacy', path: '/our-work/policy-advocacy', description: 'Influencing environmental policy' },
  ],
  research: [
    { name: 'Publications', path: '/research/publications', description: 'Latest research papers and findings' },
    { name: 'Data & Reports', path: '/research/data-reports', description: 'Environmental data and analysis' },
    { name: 'Case Studies', path: '/research/case-studies', description: 'Real-world impact stories' },
    { name: 'White Papers', path: '/research/white-papers', description: 'In-depth policy analysis' },
    { name: 'Research Partners', path: '/research/partners', description: 'Academic and institutional collaborations' },
  ],
}; 