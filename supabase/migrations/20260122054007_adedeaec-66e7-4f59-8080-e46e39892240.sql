-- Create admin_whitelist table for allowed Gmail addresses
CREATE TABLE public.admin_whitelist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert the allowed admin emails
INSERT INTO public.admin_whitelist (email) VALUES 
  ('shubhamkumargupta909@gmail.com'),
  ('Careercraftcafe0@gmail.com'),
  ('dominatein2025@gmail.com');

-- Enable RLS on admin_whitelist
ALTER TABLE public.admin_whitelist ENABLE ROW LEVEL SECURITY;

-- Only authenticated users who are in the whitelist can read the whitelist
CREATE POLICY "Admins can view whitelist" 
  ON public.admin_whitelist 
  FOR SELECT 
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_whitelist aw 
      WHERE aw.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

-- Create mentors table
CREATE TABLE public.mentors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  designation TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on mentors
ALTER TABLE public.mentors ENABLE ROW LEVEL SECURITY;

-- Anyone can read mentors (public display)
CREATE POLICY "Anyone can view mentors" 
  ON public.mentors 
  FOR SELECT 
  USING (true);

-- Only whitelisted admins can insert mentors
CREATE POLICY "Admins can insert mentors" 
  ON public.mentors 
  FOR INSERT 
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_whitelist aw 
      WHERE aw.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

-- Only whitelisted admins can update mentors
CREATE POLICY "Admins can update mentors" 
  ON public.mentors 
  FOR UPDATE 
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_whitelist aw 
      WHERE aw.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

-- Only whitelisted admins can delete mentors
CREATE POLICY "Admins can delete mentors" 
  ON public.mentors 
  FOR DELETE 
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_whitelist aw 
      WHERE aw.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

-- Create sponsors table
CREATE TABLE public.sponsors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  tier TEXT DEFAULT 'standard',
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on sponsors
ALTER TABLE public.sponsors ENABLE ROW LEVEL SECURITY;

-- Anyone can read sponsors (public display)
CREATE POLICY "Anyone can view sponsors" 
  ON public.sponsors 
  FOR SELECT 
  USING (true);

-- Only whitelisted admins can insert sponsors
CREATE POLICY "Admins can insert sponsors" 
  ON public.sponsors 
  FOR INSERT 
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_whitelist aw 
      WHERE aw.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

-- Only whitelisted admins can update sponsors
CREATE POLICY "Admins can update sponsors" 
  ON public.sponsors 
  FOR UPDATE 
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_whitelist aw 
      WHERE aw.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

-- Only whitelisted admins can delete sponsors
CREATE POLICY "Admins can delete sponsors" 
  ON public.sponsors 
  FOR DELETE 
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_whitelist aw 
      WHERE aw.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

-- Create event_images table
CREATE TABLE public.event_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  image_url TEXT NOT NULL,
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on event_images
ALTER TABLE public.event_images ENABLE ROW LEVEL SECURITY;

-- Anyone can read event_images (public display)
CREATE POLICY "Anyone can view event images" 
  ON public.event_images 
  FOR SELECT 
  USING (true);

-- Only whitelisted admins can insert event_images
CREATE POLICY "Admins can insert event images" 
  ON public.event_images 
  FOR INSERT 
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_whitelist aw 
      WHERE aw.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

-- Only whitelisted admins can update event_images
CREATE POLICY "Admins can update event images" 
  ON public.event_images 
  FOR UPDATE 
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_whitelist aw 
      WHERE aw.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

-- Only whitelisted admins can delete event_images
CREATE POLICY "Admins can delete event images" 
  ON public.event_images 
  FOR DELETE 
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_whitelist aw 
      WHERE aw.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add triggers for updated_at
CREATE TRIGGER update_mentors_updated_at
  BEFORE UPDATE ON public.mentors
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_sponsors_updated_at
  BEFORE UPDATE ON public.sponsors
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_event_images_updated_at
  BEFORE UPDATE ON public.event_images
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage buckets for images
INSERT INTO storage.buckets (id, name, public) VALUES ('mentors', 'mentors', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('sponsors', 'sponsors', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('event-images', 'event-images', true);

-- Storage policies for mentors bucket
CREATE POLICY "Anyone can view mentor images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'mentors');

CREATE POLICY "Admins can upload mentor images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'mentors' AND
    EXISTS (
      SELECT 1 FROM public.admin_whitelist aw 
      WHERE aw.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

CREATE POLICY "Admins can update mentor images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'mentors' AND
    EXISTS (
      SELECT 1 FROM public.admin_whitelist aw 
      WHERE aw.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

CREATE POLICY "Admins can delete mentor images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'mentors' AND
    EXISTS (
      SELECT 1 FROM public.admin_whitelist aw 
      WHERE aw.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

-- Storage policies for sponsors bucket
CREATE POLICY "Anyone can view sponsor logos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'sponsors');

CREATE POLICY "Admins can upload sponsor logos"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'sponsors' AND
    EXISTS (
      SELECT 1 FROM public.admin_whitelist aw 
      WHERE aw.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

CREATE POLICY "Admins can update sponsor logos"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'sponsors' AND
    EXISTS (
      SELECT 1 FROM public.admin_whitelist aw 
      WHERE aw.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

CREATE POLICY "Admins can delete sponsor logos"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'sponsors' AND
    EXISTS (
      SELECT 1 FROM public.admin_whitelist aw 
      WHERE aw.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

-- Storage policies for event-images bucket
CREATE POLICY "Anyone can view event images storage"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'event-images');

CREATE POLICY "Admins can upload event images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'event-images' AND
    EXISTS (
      SELECT 1 FROM public.admin_whitelist aw 
      WHERE aw.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

CREATE POLICY "Admins can update event images storage"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'event-images' AND
    EXISTS (
      SELECT 1 FROM public.admin_whitelist aw 
      WHERE aw.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

CREATE POLICY "Admins can delete event images storage"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'event-images' AND
    EXISTS (
      SELECT 1 FROM public.admin_whitelist aw 
      WHERE aw.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );