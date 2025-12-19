-- Create storage bucket for avatars
INSERT INTO storage.buckets (id, name, public)
VALUES ('Aayup', 'Aayup', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to avatars
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'Aayup');

-- Allow anyone to upload avatars (for testimonials)
CREATE POLICY "Anyone can upload avatars"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'Aayup');

-- Allow authenticated users to update avatars
CREATE POLICY "Authenticated users can update avatars"
ON storage.objects FOR UPDATE
USING (bucket_id = 'Aayup' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete avatars
CREATE POLICY "Authenticated users can delete avatars"
ON storage.objects FOR DELETE
USING (bucket_id = 'Aayup' AND auth.role() = 'authenticated');