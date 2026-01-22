import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { X } from 'lucide-react';

interface EventImage {
  id: string;
  title: string | null;
  image_url: string;
  description: string | null;
}

const EventGallerySection = () => {
  const [images, setImages] = useState<EventImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<EventImage | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data, error } = await supabase
          .from('event_images')
          .select('*')
          .order('display_order', { ascending: true });

        if (error) throw error;
        setImages(data || []);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (isLoading) {
    return null;
  }

  if (images.length === 0) {
    return null;
  }

  return (
    <section id="gallery" className="py-20 bg-background relative overflow-hidden">
      {/* Ambient glow effects */}
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-pink/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-blue/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4">
            <span className="gradient-text">Event Gallery</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Moments captured from our previous events and hackathons.
          </p>
        </div>

        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {images.map((image, index) => (
            <Dialog key={image.id}>
              <DialogTrigger asChild>
                <button
                  className={`relative overflow-hidden rounded-xl group cursor-pointer ${
                    index === 0 ? 'col-span-2 row-span-2' : ''
                  }`}
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.image_url}
                    alt={image.title || 'Event image'}
                    className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                      index === 0 ? 'h-80 md:h-96' : 'aspect-square'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {image.title && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="font-medium">{image.title}</p>
                    </div>
                  )}
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-0">
                <div className="relative">
                  <img
                    src={image.image_url}
                    alt={image.title || 'Event image'}
                    className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                  />
                  {(image.title || image.description) && (
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
                      {image.title && (
                        <h3 className="text-xl font-bold text-white mb-2">{image.title}</h3>
                      )}
                      {image.description && (
                        <p className="text-white/80">{image.description}</p>
                      )}
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventGallerySection;
