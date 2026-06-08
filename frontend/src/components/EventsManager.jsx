import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus, Edit, Trash2, Calendar, Clock, MapPin, X } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { format } from 'date-fns';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const EventsManager = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    venue: '',
    description: '',
    type: 'performance'
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API}/events`);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to load events');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleTypeChange = (value) => {
    setFormData({
      ...formData,
      type: value
    });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      date: '',
      time: '',
      venue: '',
      description: '',
      type: 'performance'
    });
    setEditingEvent(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('admin_token');

    try {
      if (editingEvent) {
        // Update existing event
        await axios.put(`${API}/events/${editingEvent.id}`, formData, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        toast.success('Event updated successfully!');
      } else {
        // Create new event
        await axios.post(`${API}/events`, formData, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        toast.success('Event created successfully!');
      }
      fetchEvents();
      resetForm();
    } catch (error) {
      console.error('Error saving event:', error);
      toast.error(error.response?.data?.detail || 'Failed to save event');
    }
  };

  const handleEdit = (event) => {
    setFormData({
      title: event.title,
      date: event.date,
      time: event.time,
      venue: event.venue,
      description: event.description,
      type: event.type
    });
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return;
    }

    const token = localStorage.getItem('admin_token');

    try {
      await axios.delete(`${API}/events/${eventId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      toast.success('Event deleted successfully!');
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event');
    }
  };

  const getEventTypeColor = (type) => {
    const colors = {
      performance: 'bg-maroon-100 text-maroon-800 border-maroon-300',
      workshop: 'bg-amber-100 text-amber-800 border-amber-300',
      camp: 'bg-orange-100 text-orange-800 border-orange-300',
      registration: 'bg-green-100 text-green-800 border-green-300'
    };
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading events...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Add Event Button */}
      {!showForm && (
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-maroon-800">Manage Events</h2>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-maroon-700 hover:bg-maroon-800"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Event
          </Button>
        </div>
      )}

      {/* Event Form */}
      {showForm && (
        <Card className="border-2 border-maroon-200 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-maroon-800">
              {editingEvent ? 'Edit Event' : 'Add New Event'}
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={resetForm}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Annual Arangetram Ceremony"
                  />
                </div>

                <div>
                  <Label htmlFor="type">Event Type *</Label>
                  <Select value={formData.type} onValueChange={handleTypeChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="performance">Performance</SelectItem>
                      <SelectItem value="workshop">Workshop</SelectItem>
                      <SelectItem value="camp">Camp</SelectItem>
                      <SelectItem value="registration">Registration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor="time">Time *</Label>
                  <Input
                    id="time"
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    placeholder="6:00 PM - 9:00 PM"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="venue">Venue *</Label>
                <Input
                  id="venue"
                  name="venue"
                  required
                  value={formData.venue}
                  onChange={handleChange}
                  placeholder="Ravindra Bharathi Auditorium, Hyderabad"
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Describe the event..."
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-maroon-700 hover:bg-maroon-800">
                  {editingEvent ? 'Update Event' : 'Create Event'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="border-2 border-maroon-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getEventTypeColor(event.type)}`}>
                  {event.type.toUpperCase()}
                </span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(event)}
                    className="border-maroon-300 text-maroon-700 hover:bg-maroon-50"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(event.id)}
                    className="border-red-300 text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <h3 className="text-lg font-bold text-maroon-800 mb-2">{event.title}</h3>
              <p className="text-gray-700 text-sm mb-3">{event.description}</p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4 text-maroon-600" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-4 w-4 text-maroon-600" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4 text-maroon-600" />
                  <span>{event.venue}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No events yet. Add your first event!</p>
        </div>
      )}
    </div>
  );
};
