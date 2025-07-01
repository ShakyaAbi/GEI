/*
  # Seed Program Areas with Initial Data

  1. Insert Sample Program Areas
    - Climate Action
    - Water & Sanitation
    - Renewable Energy
    - Forest Conservation
    - Waste Management
    - Community Development

  2. Migrate existing program_projects data to new projects table
    - Copy relevant data from program_projects
    - Link to appropriate program areas based on content analysis
*/

-- Insert initial program areas
INSERT INTO program_areas (name, slug, description, seo_title, seo_description, order_index) VALUES
(
  'Climate Action',
  'climate-action',
  'Building climate resilience in vulnerable communities through innovative adaptation strategies, sustainable practices, and community-centered solutions that protect lives and livelihoods.',
  'Climate Action Programs | GEI',
  'Discover our comprehensive climate action initiatives that help communities adapt to climate change and build resilience for the future.',
  1
),
(
  'Water & Sanitation',
  'water-sanitation',
  'Ensuring access to clean water and sustainable sanitation systems for underserved communities through innovative technologies and community-centered approaches.',
  'Water & Sanitation Programs | GEI',
  'Learn about our water and sanitation programs that provide clean water access and improve health outcomes in communities worldwide.',
  2
),
(
  'Renewable Energy',
  'renewable-energy',
  'Developing sustainable energy solutions that reduce carbon emissions and provide reliable power access to remote and underserved communities.',
  'Renewable Energy Programs | GEI',
  'Explore our renewable energy initiatives that bring clean, sustainable power to communities while protecting the environment.',
  3
),
(
  'Forest Conservation',
  'forest-conservation',
  'Protecting and restoring forest ecosystems through community-based conservation, sustainable forestry practices, and biodiversity preservation.',
  'Forest Conservation Programs | GEI',
  'Discover our forest conservation efforts that protect biodiversity and support sustainable livelihoods in forest communities.',
  4
),
(
  'Waste Management',
  'waste-management',
  'Implementing circular economy solutions and sustainable waste management systems that reduce environmental impact and create economic opportunities.',
  'Waste Management Programs | GEI',
  'Learn about our innovative waste management solutions that create circular economies and reduce environmental impact.',
  5
),
(
  'Community Development',
  'community-development',
  'Empowering communities through capacity building, education, and sustainable development programs that create lasting positive change.',
  'Community Development Programs | GEI',
  'Explore our community development initiatives that empower local communities and create sustainable positive change.',
  6
);

-- Migrate existing program_projects data to projects table
-- Note: This assumes program_projects table exists and has data
-- Adjust the program_area_id assignments based on your actual data

DO $$
DECLARE
  climate_area_id uuid;
  water_area_id uuid;
  energy_area_id uuid;
  forest_area_id uuid;
  waste_area_id uuid;
  community_area_id uuid;
BEGIN
  -- Get the IDs of the program areas we just created
  SELECT id INTO climate_area_id FROM program_areas WHERE slug = 'climate-action';
  SELECT id INTO water_area_id FROM program_areas WHERE slug = 'water-sanitation';
  SELECT id INTO energy_area_id FROM program_areas WHERE slug = 'renewable-energy';
  SELECT id INTO forest_area_id FROM program_areas WHERE slug = 'forest-conservation';
  SELECT id INTO waste_area_id FROM program_areas WHERE slug = 'waste-management';
  SELECT id INTO community_area_id FROM program_areas WHERE slug = 'community-development';

  -- Only proceed if program_projects table exists
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'program_projects') THEN
    -- Insert sample projects for each program area
    -- Climate Action projects
    INSERT INTO projects (program_area_id, title, description, location, duration, status, budget, beneficiaries, impact_metrics, order_index)
    VALUES 
    (
      climate_area_id,
      'Nepal Climate Resilience Program',
      'Supporting farmers in adapting to climate change through sustainable agriculture practices, water management systems, and climate-smart technologies.',
      'Sindhupalchok, Nepal',
      '2020 - 2025',
      'Active',
      '$2.5M',
      '15,000 farmers',
      ARRAY['50% increase in crop yields', '30% reduction in water usage', '200 water harvesting systems built', '500 farmers trained in climate-smart agriculture'],
      1
    ),
    (
      climate_area_id,
      'Pacific Island Climate Adaptation',
      'Building climate resilience in Pacific Island communities through coastal protection, sustainable fisheries, and disaster preparedness programs.',
      'Vanuatu & Fiji',
      '2021 - 2026',
      'Active',
      '$3.8M',
      '25,000 islanders',
      ARRAY['15 coastal protection barriers built', '80% reduction in storm damage', '300 families relocated to safer areas', '1,000 people trained in disaster response'],
      2
    );

    -- Water & Sanitation projects
    INSERT INTO projects (program_area_id, title, description, location, duration, status, budget, beneficiaries, impact_metrics, order_index)
    VALUES 
    (
      water_area_id,
      'Cambodia Water Security Project',
      'Building sustainable water infrastructure and training local communities in water management and conservation practices.',
      'Siem Reap, Cambodia',
      '2018 - 2023',
      'Completed',
      '$1.8M',
      '25,000 people',
      ARRAY['90% reduction in waterborne diseases', '300 community water points built', '150 local technicians trained', '95% system sustainability rate'],
      1
    ),
    (
      water_area_id,
      'Bangladesh Safe Water Initiative',
      'Providing safe drinking water and sanitation facilities in urban slums and rural communities through innovative filtration systems.',
      'Dhaka & Chittagong, Bangladesh',
      '2020 - 2025',
      'Active',
      '$3.2M',
      '45,000 people',
      ARRAY['200 water treatment plants installed', '80% improvement in water quality', '500 sanitation facilities built', '1,200 families with household connections'],
      2
    );

    -- Add more sample projects for other areas as needed
  END IF;
END $$;