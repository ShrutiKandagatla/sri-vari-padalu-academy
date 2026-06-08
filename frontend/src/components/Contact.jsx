import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { MapPin, Phone, Instagram, Youtube } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

export const Contact = ({ data }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const API = `${BACKEND_URL}/api`;
    
    try {
      await axios.post(`${API}/contact`, formData);
      toast.success('Thank you! We will get back to you soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-amber-50 via-white to-maroon-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-maroon-800 mb-4">
            Get in Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-maroon-600 to-amber-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="border-2 border-maroon-200 shadow-xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-maroon-800 mb-6">
                Send us a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-maroon-700 font-semibold">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-2 border-maroon-300 focus:border-maroon-500 focus:ring-maroon-500"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-maroon-700 font-semibold">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-2 border-maroon-300 focus:border-maroon-500 focus:ring-maroon-500"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-maroon-700 font-semibold">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-2 border-maroon-300 focus:border-maroon-500 focus:ring-maroon-500"
                    placeholder="+91 90002 03866"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-maroon-700 font-semibold">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="mt-2 border-maroon-300 focus:border-maroon-500 focus:ring-maroon-500"
                    placeholder="Tell us about your interest in learning classical dance..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-maroon-700 to-maroon-900 hover:from-maroon-800 hover:to-maroon-950 text-white font-semibold py-6 text-lg transition-all duration-300 hover:scale-105"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="border-2 border-maroon-200 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-maroon-600 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-maroon-800 mb-2">Address</h4>
                    <p className="text-gray-700">{data.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-maroon-200 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-maroon-600 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-maroon-800 mb-2">Phone</h4>
                    <a href={`tel:${data.phone}`} className="text-gray-700 hover:text-maroon-700 transition-colors">
                      {data.phone}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-maroon-200 shadow-lg">
              <CardContent className="p-6">
                <h4 className="font-bold text-maroon-800 mb-4">Follow Us</h4>
                <div className="flex gap-4">
                  <a
                    href={data.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-maroon-700 hover:bg-maroon-800 rounded-full flex items-center justify-center transition-colors duration-300"
                  >
                    <Instagram className="h-6 w-6 text-white" />
                  </a>
                  <a
                    href={data.socialMedia.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-maroon-700 hover:bg-maroon-800 rounded-full flex items-center justify-center transition-colors duration-300"
                  >
                    <Youtube className="h-6 w-6 text-white" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
