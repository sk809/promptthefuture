import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Loader2, Image, Upload } from 'lucide-react';

interface EventImage {
  id: string;
  title: string | null;
  image_url: string;
  description: string | null;
  display_order: number;
}

const EventImagesManagement = () => {
  const [images, setImages] = useState<EventImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<EventImage | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    image_url: '',
    description: '',
    display_order: 0,
  });

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
      toast({
        title: 'Error',
        description: 'Failed to fetch images',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const resetForm = () => {
    setFormData({
      title: '',
      image_url: '',
      description: '',
      display_order: 0,
    });
    setEditingImage(null);
  };

  const handleEdit = (image: EventImage) => {
    setEditingImage(image);
    setFormData({
      title: image.title || '',
      image_url: image.image_url,
      description: image.description || '',
      display_order: image.display_order,
    });
    setIsDialogOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('event-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('event-images')
        .getPublicUrl(fileName);

      setFormData(prev => ({ ...prev, image_url: publicUrl }));
      toast({
        title: 'Success',
        description: 'Image uploaded successfully',
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload image',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleBulkUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    let successCount = 0;

    try {
      for (const file of Array.from(files)) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('event-images')
          .upload(fileName, file);

        if (uploadError) {
          console.error('Error uploading file:', file.name, uploadError);
          continue;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('event-images')
          .getPublicUrl(fileName);

        const { error: insertError } = await supabase
          .from('event_images')
          .insert({
            title: file.name.replace(/\.[^/.]+$/, ''),
            image_url: publicUrl,
            display_order: images.length + successCount,
          });

        if (!insertError) {
          successCount++;
        }
      }

      toast({
        title: 'Success',
        description: `${successCount} image(s) uploaded successfully`,
      });
      fetchImages();
    } catch (error) {
      console.error('Error during bulk upload:', error);
      toast({
        title: 'Error',
        description: 'Some images failed to upload',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
      // Reset the file input
      e.target.value = '';
    }
  };

  const handleSave = async () => {
    if (!formData.image_url) {
      toast({
        title: 'Error',
        description: 'Please upload an image',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);
    try {
      if (editingImage) {
        const { error } = await supabase
          .from('event_images')
          .update({
            title: formData.title || null,
            image_url: formData.image_url,
            description: formData.description || null,
            display_order: formData.display_order,
          })
          .eq('id', editingImage.id);

        if (error) throw error;
        toast({ title: 'Success', description: 'Image updated successfully' });
      } else {
        const { error } = await supabase
          .from('event_images')
          .insert({
            title: formData.title || null,
            image_url: formData.image_url,
            description: formData.description || null,
            display_order: formData.display_order,
          });

        if (error) throw error;
        toast({ title: 'Success', description: 'Image added successfully' });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchImages();
    } catch (error) {
      console.error('Error saving image:', error);
      toast({
        title: 'Error',
        description: 'Failed to save image',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('event_images').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Success', description: 'Image deleted successfully' });
      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete image',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Event Images Management</h2>
          <p className="text-muted-foreground">Upload and manage event gallery images.</p>
        </div>
        <div className="flex gap-2">
          <label className="cursor-pointer">
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handleBulkUpload}
              disabled={isUploading}
              className="hidden"
            />
            <Button variant="outline" asChild disabled={isUploading}>
              <span>
                <Upload className="w-4 h-4 mr-2" />
                Bulk Upload
              </span>
            </Button>
          </label>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button variant="gradient">
                <Plus className="w-4 h-4 mr-2" />
                Add Image
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingImage ? 'Edit Image' : 'Add New Image'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title (Optional)</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter image title"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Image *</Label>
                  <div className="space-y-4">
                    {formData.image_url ? (
                      <img
                        src={formData.image_url}
                        alt="Preview"
                        className="w-full h-48 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 rounded-lg bg-muted flex items-center justify-center">
                        <Image className="w-12 h-12 text-muted-foreground" />
                      </div>
                    )}
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUploading}
                    />
                  </div>
                  {isUploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description..."
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="order">Display Order</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
                  />
                </div>
                <Button onClick={handleSave} disabled={isSaving} className="w-full" variant="gradient">
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    editingImage ? 'Update Image' : 'Add Image'
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {isUploading && (
        <Card className="bg-primary/10 border-primary/30">
          <CardContent className="py-4 flex items-center gap-3">
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
            <span>Uploading images...</span>
          </CardContent>
        </Card>
      )}

      {images.length === 0 ? (
        <Card className="bg-muted/30">
          <CardContent className="py-12 text-center">
            <Image className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No event images added yet.</p>
            <p className="text-sm text-muted-foreground">Click "Add Image" or use "Bulk Upload" to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {images.map((image) => (
            <Card key={image.id} className="overflow-hidden group">
              <div className="relative aspect-video">
                <img
                  src={image.image_url}
                  alt={image.title || 'Event image'}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button variant="secondary" size="sm" onClick={() => handleEdit(image)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Image</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this image? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(image.id)}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
              {(image.title || image.description) && (
                <CardContent className="py-3">
                  {image.title && <p className="font-medium truncate">{image.title}</p>}
                  {image.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">{image.description}</p>
                  )}
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventImagesManagement;
