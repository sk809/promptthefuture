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
import { Plus, Edit, Trash2, Loader2, Linkedin, Twitter, User } from 'lucide-react';

interface Mentor {
  id: string;
  name: string;
  designation: string;
  bio: string | null;
  image_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  display_order: number;
}

const MentorsManagement = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMentor, setEditingMentor] = useState<Mentor | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    bio: '',
    image_url: '',
    linkedin_url: '',
    twitter_url: '',
    display_order: 0,
  });

  const fetchMentors = async () => {
    try {
      const { data, error } = await supabase
        .from('mentors')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setMentors(data || []);
    } catch (error) {
      console.error('Error fetching mentors:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch mentors',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  const resetForm = () => {
    setFormData({
      name: '',
      designation: '',
      bio: '',
      image_url: '',
      linkedin_url: '',
      twitter_url: '',
      display_order: 0,
    });
    setEditingMentor(null);
  };

  const handleEdit = (mentor: Mentor) => {
    setEditingMentor(mentor);
    setFormData({
      name: mentor.name,
      designation: mentor.designation,
      bio: mentor.bio || '',
      image_url: mentor.image_url || '',
      linkedin_url: mentor.linkedin_url || '',
      twitter_url: mentor.twitter_url || '',
      display_order: mentor.display_order,
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
        .from('mentors')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('mentors')
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

  const handleSave = async () => {
    if (!formData.name || !formData.designation) {
      toast({
        title: 'Error',
        description: 'Name and designation are required',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);
    try {
      if (editingMentor) {
        const { error } = await supabase
          .from('mentors')
          .update({
            name: formData.name,
            designation: formData.designation,
            bio: formData.bio || null,
            image_url: formData.image_url || null,
            linkedin_url: formData.linkedin_url || null,
            twitter_url: formData.twitter_url || null,
            display_order: formData.display_order,
          })
          .eq('id', editingMentor.id);

        if (error) throw error;
        toast({ title: 'Success', description: 'Mentor updated successfully' });
      } else {
        const { error } = await supabase
          .from('mentors')
          .insert({
            name: formData.name,
            designation: formData.designation,
            bio: formData.bio || null,
            image_url: formData.image_url || null,
            linkedin_url: formData.linkedin_url || null,
            twitter_url: formData.twitter_url || null,
            display_order: formData.display_order,
          });

        if (error) throw error;
        toast({ title: 'Success', description: 'Mentor added successfully' });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchMentors();
    } catch (error) {
      console.error('Error saving mentor:', error);
      toast({
        title: 'Error',
        description: 'Failed to save mentor',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('mentors').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Success', description: 'Mentor deleted successfully' });
      fetchMentors();
    } catch (error) {
      console.error('Error deleting mentor:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete mentor',
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Mentors Management</h2>
          <p className="text-muted-foreground">Add, edit, or remove mentors displayed on the website.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button variant="gradient">
              <Plus className="w-4 h-4 mr-2" />
              Add Mentor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingMentor ? 'Edit Mentor' : 'Add New Mentor'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter mentor name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="designation">Designation *</Label>
                <Input
                  id="designation"
                  value={formData.designation}
                  onChange={(e) => setFormData(prev => ({ ...prev, designation: e.target.value }))}
                  placeholder="e.g., Senior Developer at XYZ"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Short biography..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Profile Image</Label>
                <div className="flex items-center gap-4">
                  {formData.image_url ? (
                    <img
                      src={formData.image_url}
                      alt="Preview"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                      <User className="w-8 h-8 text-muted-foreground" />
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
                <Label htmlFor="linkedin">LinkedIn URL</Label>
                <Input
                  id="linkedin"
                  value={formData.linkedin_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, linkedin_url: e.target.value }))}
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter URL</Label>
                <Input
                  id="twitter"
                  value={formData.twitter_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, twitter_url: e.target.value }))}
                  placeholder="https://twitter.com/..."
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
                  editingMentor ? 'Update Mentor' : 'Add Mentor'
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {mentors.length === 0 ? (
        <Card className="bg-muted/30">
          <CardContent className="py-12 text-center">
            <User className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No mentors added yet.</p>
            <p className="text-sm text-muted-foreground">Click "Add Mentor" to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mentors.map((mentor) => (
            <Card key={mentor.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-start gap-4">
                  {mentor.image_url ? (
                    <img
                      src={mentor.image_url}
                      alt={mentor.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                      <User className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg truncate">{mentor.name}</CardTitle>
                    <p className="text-sm text-muted-foreground truncate">{mentor.designation}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {mentor.bio && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{mentor.bio}</p>
                )}
                <div className="flex items-center gap-2 mb-4">
                  {mentor.linkedin_url && (
                    <a href={mentor.linkedin_url} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-4 h-4 text-muted-foreground hover:text-primary" />
                    </a>
                  )}
                  {mentor.twitter_url && (
                    <a href={mentor.twitter_url} target="_blank" rel="noopener noreferrer">
                      <Twitter className="w-4 h-4 text-muted-foreground hover:text-primary" />
                    </a>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(mentor)} className="flex-1">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Mentor</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete {mentor.name}? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(mentor.id)}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MentorsManagement;
