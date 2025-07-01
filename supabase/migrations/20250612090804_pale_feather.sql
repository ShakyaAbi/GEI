/*
  # Seed Sample Data for Publications System

  1. Sample Data
    - Research categories
    - Authors
    - Publications
    - Publication-author relationships

  2. Purpose
    - Provides realistic demo data
    - Shows system functionality
    - Enables immediate testing
*/

-- Insert research categories
INSERT INTO research_categories (name, slug, description) VALUES
  ('Artificial Intelligence', 'ai', 'Machine learning, neural networks, and cognitive computing systems'),
  ('Quantum Computing', 'quantum', 'Quantum algorithms, quantum information processing, and quantum technologies'),
  ('Climate Science', 'climate', 'Environmental monitoring, climate modeling, and sustainability research'),
  ('Robotics', 'robotics', 'Autonomous systems, human-robot interaction, and robotic applications'),
  ('Biotechnology', 'biotech', 'Genetic engineering, synthetic biology, and biomedical applications'),
  ('Energy Systems', 'energy', 'Renewable energy, energy storage, and smart grid technologies')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample authors
INSERT INTO authors (name, email, affiliation, bio) VALUES
  ('Dr. Sarah Chen', 'sarah.chen@gei.edu', 'GEI Research Center', 'Director & Principal Investigator specializing in AI and machine learning'),
  ('Dr. Michael Rodriguez', 'michael.rodriguez@gei.edu', 'GEI Research Center', 'Senior Research Scientist in quantum computing and information theory'),
  ('Dr. Emma Thompson', 'emma.thompson@gei.edu', 'GEI Research Center', 'Associate Director focusing on climate science and environmental modeling'),
  ('Dr. James Wilson', 'james.wilson@gei.edu', 'GEI Research Center', 'Principal Investigator in robotics and autonomous systems'),
  ('Dr. Lisa Park', 'lisa.park@gei.edu', 'GEI Research Center', 'Research Scientist in biotechnology and genetic engineering'),
  ('Dr. David Kumar', 'david.kumar@gei.edu', 'GEI Research Center', 'Senior Researcher in energy systems and renewable technologies')
ON CONFLICT (email) DO NOTHING;

-- Insert sample publications
INSERT INTO publications (
  title, 
  abstract, 
  journal, 
  publication_year, 
  publication_type, 
  doi, 
  citations, 
  category_id, 
  is_featured
) VALUES
  (
    'Advanced Neural Network Architectures for Climate Prediction',
    'This paper presents novel neural network architectures specifically designed for long-term climate prediction models. Our approach combines convolutional and recurrent neural networks with attention mechanisms to capture both spatial and temporal patterns in climate data. Experimental results show significant improvements in prediction accuracy compared to traditional methods.',
    'Nature Machine Intelligence',
    2024,
    'Journal Article',
    '10.1038/s42256-024-00001-x',
    127,
    (SELECT id FROM research_categories WHERE slug = 'ai'),
    true
  ),
  (
    'Quantum Algorithm Optimization for Large-Scale Systems',
    'We introduce new quantum algorithms that significantly improve computational efficiency for complex optimization problems. Our variational quantum eigensolver approach demonstrates quantum advantage for systems with over 100 qubits, opening new possibilities for practical quantum computing applications.',
    'Science',
    2024,
    'Journal Article',
    '10.1126/science.abc1234',
    89,
    (SELECT id FROM research_categories WHERE slug = 'quantum'),
    false
  ),
  (
    'Sustainable Energy Grid Integration Using AI-Driven Analytics',
    'This research demonstrates how artificial intelligence can optimize renewable energy integration in smart grid systems. We developed machine learning models that predict energy demand and supply fluctuations, enabling more efficient grid management and reduced carbon emissions.',
    'IEEE Transactions on Smart Grid',
    2024,
    'Journal Article',
    '10.1109/TSG.2024.001234',
    156,
    (SELECT id FROM research_categories WHERE slug = 'energy'),
    true
  ),
  (
    'Robotic Swarm Coordination in Dynamic Environments',
    'We present a novel approach to coordinating robotic swarms in unpredictable and dynamic operational environments. Our distributed algorithm enables real-time adaptation to changing conditions while maintaining formation integrity and mission objectives.',
    'Robotics and Autonomous Systems',
    2023,
    'Journal Article',
    '10.1016/j.robot.2023.001234',
    94,
    (SELECT id FROM research_categories WHERE slug = 'robotics'),
    false
  ),
  (
    'CRISPR-Cas9 Applications in Environmental Biotechnology',
    'This study explores innovative applications of CRISPR technology for environmental remediation and sustainability. We demonstrate how gene editing can enhance microbial capabilities for pollution cleanup and carbon sequestration.',
    'Nature Biotechnology',
    2023,
    'Journal Article',
    '10.1038/s41587-023-001234',
    203,
    (SELECT id FROM research_categories WHERE slug = 'biotech'),
    true
  ),
  (
    'Climate Change Impact Assessment Using Advanced Modeling',
    'Our comprehensive analysis provides new insights into regional climate change impacts using state-of-the-art modeling techniques. The study combines satellite data, ground measurements, and machine learning to predict future climate scenarios with unprecedented accuracy.',
    'Climate Dynamics',
    2023,
    'Journal Article',
    '10.1007/s00382-023-001234',
    178,
    (SELECT id FROM research_categories WHERE slug = 'climate'),
    false
  );

-- Insert publication-author relationships
INSERT INTO publication_authors (publication_id, author_id, author_order) VALUES
  -- Advanced Neural Network Architectures for Climate Prediction
  ((SELECT id FROM publications WHERE title = 'Advanced Neural Network Architectures for Climate Prediction'), (SELECT id FROM authors WHERE name = 'Dr. Sarah Chen'), 1),
  ((SELECT id FROM publications WHERE title = 'Advanced Neural Network Architectures for Climate Prediction'), (SELECT id FROM authors WHERE name = 'Dr. Emma Thompson'), 2),
  ((SELECT id FROM publications WHERE title = 'Advanced Neural Network Architectures for Climate Prediction'), (SELECT id FROM authors WHERE name = 'Dr. Michael Rodriguez'), 3),
  
  -- Quantum Algorithm Optimization for Large-Scale Systems
  ((SELECT id FROM publications WHERE title = 'Quantum Algorithm Optimization for Large-Scale Systems'), (SELECT id FROM authors WHERE name = 'Dr. Michael Rodriguez'), 1),
  ((SELECT id FROM publications WHERE title = 'Quantum Algorithm Optimization for Large-Scale Systems'), (SELECT id FROM authors WHERE name = 'Dr. James Wilson'), 2),
  
  -- Sustainable Energy Grid Integration Using AI-Driven Analytics
  ((SELECT id FROM publications WHERE title = 'Sustainable Energy Grid Integration Using AI-Driven Analytics'), (SELECT id FROM authors WHERE name = 'Dr. David Kumar'), 1),
  ((SELECT id FROM publications WHERE title = 'Sustainable Energy Grid Integration Using AI-Driven Analytics'), (SELECT id FROM authors WHERE name = 'Dr. Sarah Chen'), 2),
  ((SELECT id FROM publications WHERE title = 'Sustainable Energy Grid Integration Using AI-Driven Analytics'), (SELECT id FROM authors WHERE name = 'Dr. Lisa Park'), 3),
  
  -- Robotic Swarm Coordination in Dynamic Environments
  ((SELECT id FROM publications WHERE title = 'Robotic Swarm Coordination in Dynamic Environments'), (SELECT id FROM authors WHERE name = 'Dr. James Wilson'), 1),
  ((SELECT id FROM publications WHERE title = 'Robotic Swarm Coordination in Dynamic Environments'), (SELECT id FROM authors WHERE name = 'Dr. Emma Thompson'), 2),
  
  -- CRISPR-Cas9 Applications in Environmental Biotechnology
  ((SELECT id FROM publications WHERE title = 'CRISPR-Cas9 Applications in Environmental Biotechnology'), (SELECT id FROM authors WHERE name = 'Dr. Lisa Park'), 1),
  ((SELECT id FROM publications WHERE title = 'CRISPR-Cas9 Applications in Environmental Biotechnology'), (SELECT id FROM authors WHERE name = 'Dr. David Kumar'), 2),
  
  -- Climate Change Impact Assessment Using Advanced Modeling
  ((SELECT id FROM publications WHERE title = 'Climate Change Impact Assessment Using Advanced Modeling'), (SELECT id FROM authors WHERE name = 'Dr. Emma Thompson'), 1),
  ((SELECT id FROM publications WHERE title = 'Climate Change Impact Assessment Using Advanced Modeling'), (SELECT id FROM authors WHERE name = 'Dr. Sarah Chen'), 2);