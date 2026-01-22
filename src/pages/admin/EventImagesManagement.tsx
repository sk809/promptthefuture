import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Plus, Pencil, Trash2, Loader2, Upload, Image } from 'lucide-react';
import type { Tables } from '@/integrations/supabase/types';

type EventImage = Tables<'event_images'>;

const EventImagesManagement = () => {
  const [images, setImages] = useState<EventImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingImage, setEditingImage] = useState<EventImage | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    image_url: '',
    title: '',
    description: '',
    display_order: 0,
  });

  const fetchImages = async () => {
    const { data, error } = await supabase
      .from('event_images')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      setImages(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const resetForm = () => {
    setFormData({
      image_url: '',
      title: '',
      description: '',
      display_order: images.length,
    });
    setEditingImage(null);
  };

  const handleEdit = (image: EventImage) => {
    setEditingImage(image);
    setFormData({
      image_url: image.image_url,
      title: image.title || '',
      description: image.description || '',
      display_order: image.display_order,
    });
    setIsDialogOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('event-images')
      .upload(fileName, file);

    if (uploadError) {
      toast({ title: 'Upload Error', description: uploadError.message, variant: 'destructive' });
      setUploadingImage(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from('event-images').getPublicUrl(fileName);
    setFormData({ ...formData, image_url: publicUrl });
    setUploadingImage(false);
  };

  const handleMultipleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsSubmitting(true);
    let successCount = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${i}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('event-images')
        .upload(fileName, file);

      if (uploadError) {
        toast({ title: 'Upload Error', description: `Failed to upload ${file.name}`, variant: 'destructive' });
        continue;
      }

      const { data: { publicUrl } } = supabase.storage.from('event-images').getPublicUrl(fileName);
      
      const { error } = await supabase.from('event_images').insert({
        image_url: publicUrl,
        title: file.name.replace(/\.[^/.]+$/, ''),
        display_order: images.length + i,
      });

      if (!error) successCount++;
    }

    toast({ title: 'Success', description: `${successCount} image(s) uploaded successfully` });
    fetchImages();
    setIsSubmitting(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image_url) {
      toast({ title: 'Error', description: 'Please upload an image', variant: 'destructive' });
      return;
    }
    setIsSubmitting(true);

    try {
      if (editingImage) {
        const { error } = await supabase
          .from('event_images')
          .update(formData)
          .eq('id', editingImage.id);

        if (error) throw error;
        toast({ title: 'Success', description: 'Image updated successfully' });
      } else {
        const { error } = await supabase.from('event_images').insert(formData);
        if (error) throw error;
        toast({ title: 'Success', description: 'Image added successfully' });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchImages();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const { error } = await supabase.from('event_images').delete().eq('id', deleteId);
      if (error) throw error;
      toast({ title: 'Success', description: 'Image deleted successfully' });
      fetchImages();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold font-display">Event Images</h1>
            <p className="text-muted-foreground mt-1">Manage event gallery images</p>
          </div>
          <div className="flex gap-3">
            <label className="inline-flex items-center gap-2 px-4 py-2 border border-dashed rounded-lg cursor-pointer hover:bg-muted/50">
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              <span className="text-sm">Bulk Upload</span>
              <input type="file" accept="image/*" multiple onChange={handleMultipleUpload} className="hidden" disabled={isSubmitting} />
            </label>
            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) resetForm();
            }}>
              <DialogTrigger asChild>
                <Button variant="gradient">
                  <Plus className="w-4 h-4 mr-2" /> Add Image
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>{editingImage ? 'Edit Image' : 'Add New Image'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>Image *</Label>
                    <div className="flex flex-col items-center gap-4">
                      {formData.image_url && (
                        <img src={formData.image_url} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                      )}
                      <label className="flex items-center gap-2 px-4 py-2 border border-dashed rounded-lg cursor-pointer hover:bg-muted/50 w-full justify-center">
                        {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                        <span className="text-sm">{uploadingImage ? 'Uploading...' : 'Upload Image'}</span>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Image title (optional)"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={2}
                      placeholder="Image description (optional)"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="order">Display Order</Label>
                    <Input
                      id="order"
                      type="number"
                      value={formData.display_order}
                      onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                      Cancel
                    </Button>
                    <Button type="submit" variant="gradient" className="flex-1" disabled={isSubmitting || !formData.image_url}>
                      {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                      {editingImage ? 'Update' : 'Add'} Image
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-12 glass-card rounded-xl">
            <Image className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No event images added yet. Upload your first image!</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {images.map((image) => (
              <div key={image.id} className="glass-card rounded-xl border border-border/50 overflow-hidden group">
                <div className="relative aspect-video">
                  <img src={image.image_url} alt={image.title || 'Event image'} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button size="sm" variant="secondary" onClick={() => handleEdit(image)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => setDeleteId(image.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                {image.title && (
                  <div className="p-3">
                    <p className="font-medium truncate">{image.title}</p>
                    {image.description && (
                      <p className="text-xs text-muted-foreground truncate">{image.description}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Image?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the image from the gallery.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default EventImagesManagement;
