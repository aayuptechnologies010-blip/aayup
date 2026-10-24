-- Create storage bucket for applications
INSERT INTO storage.buckets (id, name, public) 
VALUES ('applications', 'applications', true);

-- Allow public to upload files
CREATE POLICY "Anyone can upload to applications" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'applications');

-- Allow public to read files
CREATE POLICY "Anyone can read from applications" ON storage.objects
  FOR SELECT USING (bucket_id = 'applications');

-- Allow authenticated users to delete files
CREATE POLICY "Authenticated users can delete from applications" ON storage.objects
  FOR DELETE USING (bucket_id = 'applications' AND auth.role() = 'authenticated');