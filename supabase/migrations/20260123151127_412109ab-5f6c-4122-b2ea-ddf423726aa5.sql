-- Fix failing uploads by removing a conflicting storage INSERT policy for event-images
-- The duplicate policy references auth.users/admin_whitelist directly and can break under RLS.

DROP POLICY IF EXISTS "Admins can upload event images" ON storage.objects;

-- Keep the correct policy that uses public.is_admin():
-- "Admins can upload event images storage" (INSERT WITH CHECK bucket_id='event-images' AND is_admin())
