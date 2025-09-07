-- Removed gallery references and kept only careers and leadership data
-- Insert sample career opportunities
INSERT INTO public.careers (title, department, location, employment_type, experience_level, description, requirements, responsibilities, salary_range) VALUES
('Senior Design Engineer', 'Engineering', 'Bengaluru, Karnataka', 'full-time', 'senior', 
'We are seeking an experienced Senior Design Engineer to lead our product design and development initiatives. The ideal candidate will have extensive experience in mechanical design, CAD software, and manufacturing processes.',
'• Bachelor''s degree in Mechanical Engineering or related field
• 5+ years of experience in product design and development
• Proficiency in CAD software (SolidWorks, AutoCAD, CATIA)
• Experience with press tool and mould design
• Strong problem-solving and analytical skills
• Excellent communication and leadership abilities',
'• Lead design projects from concept to production
• Develop and optimize product designs for manufacturability
• Collaborate with cross-functional teams
• Mentor junior engineers and provide technical guidance
• Ensure designs meet quality and safety standards
• Prepare technical documentation and specifications',
'₹8,00,000 - ₹12,00,000 per annum'),

('Quality Control Inspector', 'Quality Assurance', 'Bengaluru, Karnataka', 'full-time', 'mid', 
'Join our quality assurance team as a Quality Control Inspector. You will be responsible for ensuring our products meet the highest quality standards using advanced inspection equipment.',
'• Diploma/Bachelor''s degree in Mechanical Engineering or related field
• 2-4 years of experience in quality control and inspection
• Experience with CMM, VMS, and other inspection equipment
• Knowledge of GD&T and quality standards
• Attention to detail and strong analytical skills
• Ability to work independently and in team environments',
'• Perform quality inspections using CMM and VMS equipment
• Document inspection results and maintain quality records
• Identify and report quality issues and non-conformances
• Collaborate with production team to resolve quality issues
• Maintain and calibrate inspection equipment
• Support continuous improvement initiatives',
'₹4,00,000 - ₹6,00,000 per annum'),

('Manufacturing Trainee', 'Production', 'Bengaluru, Karnataka', 'full-time', 'entry', 
'Excellent opportunity for recent graduates to start their career in manufacturing. This role offers comprehensive training in various manufacturing processes and technologies.',
'• Recent graduate in Mechanical/Production Engineering
• Strong interest in manufacturing and production processes
• Basic knowledge of manufacturing principles
• Willingness to learn and adapt to new technologies
• Good communication skills
• Team player with positive attitude',
'• Participate in comprehensive training programs
• Learn various manufacturing processes and techniques
• Assist senior engineers in production activities
• Support quality control and inspection activities
• Maintain production records and documentation
• Follow safety protocols and procedures',
'₹2,50,000 - ₹3,50,000 per annum');

-- Insert sample leadership team
INSERT INTO public.leadership_team (name, position, bio, image_url, display_order) VALUES
('Rajesh Kumar', 'Chief Executive Officer', 
'Rajesh brings over 15 years of experience in manufacturing and engineering leadership. He has successfully led multiple organizations through digital transformation and operational excellence initiatives. His vision drives Trivix Techno Skills towards innovation and sustainable growth.',
'/professional-ceo-portrait.png', 1),

('Priya Sharma', 'Head of Engineering', 
'Priya is a seasoned engineering professional with expertise in product design and development. She holds a Master''s degree in Mechanical Engineering and has been instrumental in developing our advanced manufacturing capabilities and training programs.',
'/professional-female-engineer.png', 2),

('Amit Patel', 'Director of Training & Development', 
'Amit specializes in technical education and skill development. With his extensive background in industrial training, he has designed comprehensive programs that bridge the gap between academic learning and industry requirements.',
'/professional-training-director-portrait.png', 3);
