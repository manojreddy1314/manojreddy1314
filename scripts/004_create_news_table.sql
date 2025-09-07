-- Create news articles table
CREATE TABLE IF NOT EXISTS news_articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT,
  content TEXT,
  category VARCHAR(100),
  author VARCHAR(100),
  published_date DATE DEFAULT CURRENT_DATE,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users to read all news articles
CREATE POLICY "Anyone can view active news articles" ON news_articles
  FOR SELECT USING (is_active = true);

-- Simplified admin policy to avoid column dependency issues
CREATE POLICY "Admin users can manage news articles" ON news_articles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.email = auth.jwt() ->> 'email'
    )
  );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for news_articles
CREATE TRIGGER update_news_articles_updated_at BEFORE UPDATE ON news_articles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
