-- Drop existing storage policies and recreate with is_admin()

-- Drop existing policies for mentors bucket
DROP POLICY IF EXISTS "Anyone can view mentor images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload mentor images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update mentor images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete mentor images" ON storage.objects;

-- Drop existing policies for sponsors bucket
DROP POLICY IF EXISTS "Anyone can view sponsor logos" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload sponsor logos" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update sponsor logos" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete sponsor logos" ON storage.objects;

-- Drop existing policies for event-images bucket
DROP POLICY IF EXISTS "Anyone can view event images storage" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload event images storage" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update event images storage" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete event images storage" ON storage.objects;

-- Recreate policies with is_admin() function

-- mentors bucket
CREATE POLICY "Anyone can view mentor images"
ON storage.objects FOR SELECT
USING (bucket_id = 'mentors');

CREATE POLICY "Admins can upload mentor images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'mentors' AND public.is_admin());

CREATE POLICY "Admins can update mentor images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'mentors' AND public.is_admin());

CREATE POLICY "Admins can delete mentor images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'mentors' AND public.is_admin());

-- sponsors bucket
CREATE POLICY "Anyone can view sponsor logos"
ON storage.objects FOR SELECT
USING (bucket_id = 'sponsors');

CREATE POLICY "Admins can upload sponsor logos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'sponsors' AND public.is_admin());

CREATE POLICY "Admins can update sponsor logos"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'sponsors' AND public.is_admin());

CREATE POLICY "Admins can delete sponsor logos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'sponsors' AND public.is_admin());

-- event-images bucket
CREATE POLICY "Anyone can view event images storage"
ON storage.objects FOR SELECT
USING (bucket_id = 'event-images');

CREATE POLICY "Admins can upload event images storage"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'event-images' AND public.is_admin());

CREATE POLICY "Admins can update event images storage"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'event-images' AND public.is_admin());

CREATE POLICY "Admins can delete event images storage"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'event-images' AND public.is_admin());