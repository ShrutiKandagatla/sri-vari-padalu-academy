import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { LogOut, Plus, Calendar, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { EventsManager } from './EventsManager';
import { GalleryManager } from './GalleryManager';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    verifyAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verifyAuth = async () => {
    const token = localStorage.getItem('admin_token');
    
    if (!token) {
      toast.error('Please login first');
      navigate('/admin/login');
      return;
    }

    try {
      await axios.get(`${API}/auth/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Auth verification failed:', error);
      toast.error('Session expired. Please login again.');
      localStorage.removeItem('admin_token');
      navigate('/admin/login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-maroon-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-maroon-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-maroon-700 font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-maroon-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b-2 border-maroon-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-maroon-600 to-maroon-800 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-maroon-800">Admin Dashboard</h1>
              <p className="text-sm text-maroon-600">Srivari Padalu Dance Academy</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="border-maroon-300 text-maroon-700 hover:bg-maroon-50"
            >
              View Website
            </Button>
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="bg-maroon-700 hover:bg-maroon-800"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="events" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2 bg-white border-2 border-maroon-200">
            <TabsTrigger 
              value="events"
              className="data-[state=active]:bg-maroon-700 data-[state=active]:text-white"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Events
            </TabsTrigger>
            <TabsTrigger 
              value="gallery"
              className="data-[state=active]:bg-maroon-700 data-[state=active]:text-white"
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              Gallery
            </TabsTrigger>
          </TabsList>

          <TabsContent value="events">
            <EventsManager />
          </TabsContent>

          <TabsContent value="gallery">
            <GalleryManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};
