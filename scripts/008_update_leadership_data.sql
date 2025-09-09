-- Update leadership team with actual company leaders
-- This script replaces sample data with real leadership information

-- Clear existing leadership data
DELETE FROM leadership_team;

-- Insert actual leadership team members
INSERT INTO leadership_team (name, position, bio, display_order, is_active, created_at, updated_at) VALUES
(
  'Mr. Niranjan V. Somannavar',
  'Founder & CEO',
  'Visionary leader with extensive experience in precision engineering and industrial training. Under his leadership, Trivix Techno Skills has established itself as a premier destination for advanced manufacturing solutions and technical education. His expertise spans across press tool design, quality control systems, and strategic business development.',
  1,
  true,
  NOW(),
  NOW()
),
(
  'Mr. Likhith Gowda',
  'COO & Executive Director',
  'Operational excellence expert responsible for streamlining business processes and ensuring quality delivery across all service verticals. With deep knowledge in manufacturing operations and team management, he drives the company''s growth initiatives and maintains the highest standards of service delivery.',
  2,
  true,
  NOW(),
  NOW()
),
(
  'Mr. Sudeep Patil',
  'Engineer',
  'Technical specialist with hands-on expertise in precision engineering, CAD/CAM systems, and quality inspection methodologies. His practical experience in manufacturing processes and commitment to innovation ensures that Trivix delivers cutting-edge solutions to clients across various industries.',
  3,
  true,
  NOW(),
  NOW()
);

-- Verify the data was inserted correctly
SELECT name, position FROM leadership_team ORDER BY display_order;
