-- Remove image fields from leadership_team table
ALTER TABLE leadership_team DROP COLUMN IF EXISTS image_url;
ALTER TABLE leadership_team DROP COLUMN IF EXISTS photo;
ALTER TABLE leadership_team DROP COLUMN IF EXISTS picture;

-- Update existing records to remove any image references
UPDATE leadership_team SET image_url = NULL WHERE image_url IS NOT NULL;

-- Add comment for clarity
COMMENT ON TABLE leadership_team IS 'Leadership team information without photos - content only';
