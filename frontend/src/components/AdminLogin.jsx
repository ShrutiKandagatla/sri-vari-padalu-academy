import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${API}/auth/login`, formData);
      
      // Store token in localStorage
      localStorage.setItem('admin_token', response.data.access_token);
      
      toast.success('Login successful!');
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.detail || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-maroon-900 via-maroon-800 to-maroon-900 px-4">
      <Card className="w-full max-w-md border-2 border-amber-400/30 shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-maroon-600 to-maroon-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">N</span>
          </div>
          <CardTitle className="text-2xl font-bold text-maroon-800">
            Admin Login
          </CardTitle>
          <p className="text-gray-600">
            Srivari Padalu Dance Academy
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username" className="text-maroon-700 font-semibold">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="mt-2 border-maroon-300 focus:border-maroon-500 focus:ring-maroon-500"
                placeholder="Enter your username"
                disabled={isLoading}
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-maroon-700 font-semibold">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-2 border-maroon-300 focus:border-maroon-500 focus:ring-maroon-500"
                placeholder="Enter your password"
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-maroon-700 to-maroon-900 hover:from-maroon-800 hover:to-maroon-950 text-white font-semibold py-6 text-lg transition-all duration-300"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>

            <div className="text-center">
              <Button
                type="button"
                variant="link"
                onClick={() => navigate('/')}
                className="text-maroon-700 hover:text-maroon-900"
              >
                Back to Website
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
