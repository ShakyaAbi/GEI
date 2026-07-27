import type { ProgramArea } from '../lib/programAreasApi';

export interface NavigationDropdownItem {
  name: string;
  path: string;
  description: string;
}

export interface NavigationItem {
  name: string;
  path: string;
  hasDropdown: boolean;
  dropdownItems: NavigationDropdownItem[];
}

export const getNavigationItems = (programAreas: ProgramArea[] = []): NavigationItem[] => [
  {
    name: 'Who We Are',
    path: '/about',
    hasDropdown: true,
    dropdownItems: [
      { name: 'Our Mission', path: '/about#mission', description: 'Learn about our core mission and values' },
      { name: 'Our Team', path: '/about#team', description: 'Meet our leadership and expert team' },
      { name: 'Our History', path: '/about#history', description: 'Our journey and key milestones' },
      { name: 'Our Stories', path: '/our-stories', description: 'Stories of impact and change' },
      { name: 'Partnerships', path: '/about#partnerships', description: 'Our global network of collaborators' },
    ],
  },
  {
    name: 'Our Work',
    path: '/our-work',
    hasDropdown: true,
    dropdownItems: [
      { name: 'All Programs', path: '/our-work', description: 'All program areas' },
      { name: 'Research & Publications', path: '/our-work/research-publications', description: 'Explore our research and publications' },
      ...programAreas.map((area) => ({
        name: area.name,
        path: `/areas/${area.slug}`,
        description: 'Learn more',
      })),
    ],
  },
  {
    name: 'Join us',
    path: '/ideas',
    hasDropdown: true,
    dropdownItems: [
      { name: 'Collaborate with Us', path: '/ideas', description: 'Partner or volunteer with us to make an impact' },
      { name: 'Contact Us', path: '/ideas', description: 'Get in touch with our team' },
    ],
  },
];