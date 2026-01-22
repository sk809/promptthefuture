-- Replace is_admin() to work properly with storage policies (using CREATE OR REPLACE)
-- The issue is that auth.jwt() might not be available in all contexts

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_email text;
BEGIN
  -- Get the email from auth.users table using auth.uid()
  SELECT email INTO user_email
  FROM auth.users
  WHERE id = auth.uid();
  
  -- Check if this email exists in admin_whitelist (case-insensitive)
  RETURN EXISTS (
    SELECT 1
    FROM public.admin_whitelist aw
    WHERE lower(aw.email) = lower(COALESCE(user_email, ''))
  );
END;
$$;