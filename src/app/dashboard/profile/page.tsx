'use client';

import { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  bio?: string;
  role: string;
  createdAt: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<UserProfile>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile');
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
          setFormData(data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedProfile = await response.json();
        setProfile(updatedProfile);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!profile) {
    return <div>Error loading profile</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl text-black font-bold">Profile</h2>
      </div>

      <Card className="p-6 bg-white border border-black">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-white" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl text-black font-semibold">{profile.name}</h2>
              <p className="text-black text-muted-foreground">
                Member since {new Date(profile.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-black text-muted-foreground capitalize">
                {profile.role.toLowerCase()} Account
              </p>
            </div>
          </div>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)} className="bg-black text-white">
              Edit Profile
            </Button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-black font-medium mb-1">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2 border rounded-md bg-background"
              />
            </div>
            <div>
              <label className="block text-sm text-black font-medium mb-1">Phone</label>
              <input
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-2 border rounded-md bg-background"
              />
            </div>
            <div>
              <label className="block text-sm text-black font-medium mb-1">Address</label>
              <input
                type="text"
                value={formData.address || ''}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full p-2 border rounded-md bg-background"
              />
            </div>
            <div>
              <label className="block text-sm text-black font-medium mb-1">Bio</label>
              <textarea
                value={formData.bio || ''}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full p-2 border rounded-md bg-background"
                rows={4}
              />
            </div>
            <div className=" flex space-x-4">
              <Button type="submit" className="bg-black text-white">Save Changes</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setFormData(profile);
                  setIsEditing(false);
                }}
                className="bg-black text-white"
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center">
              <Mail className="h-5 w-5 mr-2 text-black" />
              <span className="text-black"  >{profile.email}</span>
            </div>
            {profile.phone && (
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-black" />
                <span className="text-black">{profile.phone}</span>
              </div>
            )}
            {profile.address && (
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-black" />
                <span className="text-black">{profile.address}</span>
              </div>
            )}
            {profile.bio && (
              <div className="mt-4">
                <h3 className="text-lg text-black font-semibold mb-2">About</h3>
                <p className="text-black text-muted-foreground">{profile.bio}</p>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
