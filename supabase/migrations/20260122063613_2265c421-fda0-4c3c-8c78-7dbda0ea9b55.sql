-- Fix infinite-recursion RLS by using SECURITY DEFINER helpers

-- 1) Helper: is current authenticated user an admin?
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_whitelist aw
    WHERE lower(aw.email) = lower(COALESCE(auth.jwt() ->> 'email', ''))
  );
$$;

-- 2) Helper: is a given email whitelisted? (used by UI before allowing sign-up)
CREATE OR REPLACE FUNCTION public.is_admin_email(_email text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_whitelist aw
    WHERE lower(aw.email) = lower(COALESCE(_email, ''))
  );
$$;

-- 3) Replace policies that currently recurse via subqueries

-- admin_whitelist
DROP POLICY IF EXISTS "Admins can view whitelist" ON public.admin_whitelist;
CREATE POLICY "Admins can view whitelist"
ON public.admin_whitelist
FOR SELECT
TO authenticated
USING (public.is_admin());

-- mentors
DROP POLICY IF EXISTS "Anyone can view mentors" ON public.mentors;
DROP POLICY IF EXISTS "Admins can insert mentors" ON public.mentors;
DROP POLICY IF EXISTS "Admins can update mentors" ON public.mentors;
DROP POLICY IF EXISTS "Admins can delete mentors" ON public.mentors;

CREATE POLICY "Anyone can view mentors"
ON public.mentors
FOR SELECT
USING (true);

CREATE POLICY "Admins can insert mentors"
ON public.mentors
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update mentors"
ON public.mentors
FOR UPDATE
TO authenticated
USING (public.is_admin());

CREATE POLICY "Admins can delete mentors"
ON public.mentors
FOR DELETE
TO authenticated
USING (public.is_admin());

-- sponsors
DROP POLICY IF EXISTS "Anyone can view sponsors" ON public.sponsors;
DROP POLICY IF EXISTS "Admins can insert sponsors" ON public.sponsors;
DROP POLICY IF EXISTS "Admins can update sponsors" ON public.sponsors;
DROP POLICY IF EXISTS "Admins can delete sponsors" ON public.sponsors;

CREATE POLICY "Anyone can view sponsors"
ON public.sponsors
FOR SELECT
USING (true);

CREATE POLICY "Admins can insert sponsors"
ON public.sponsors
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update sponsors"
ON public.sponsors
FOR UPDATE
TO authenticated
USING (public.is_admin());

CREATE POLICY "Admins can delete sponsors"
ON public.sponsors
FOR DELETE
TO authenticated
USING (public.is_admin());

-- event_images
DROP POLICY IF EXISTS "Anyone can view event images" ON public.event_images;
DROP POLICY IF EXISTS "Admins can insert event images" ON public.event_images;
DROP POLICY IF EXISTS "Admins can update event images" ON public.event_images;
DROP POLICY IF EXISTS "Admins can delete event images" ON public.event_images;

CREATE POLICY "Anyone can view event images"
ON public.event_images
FOR SELECT
USING (true);

CREATE POLICY "Admins can insert event images"
ON public.event_images
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update event images"
ON public.event_images
FOR UPDATE
TO authenticated
USING (public.is_admin());

CREATE POLICY "Admins can delete event images"
ON public.event_images
FOR DELETE
TO authenticated
USING (public.is_admin());
