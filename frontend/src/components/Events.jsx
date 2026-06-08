import React from 'react';
import { Card, CardContent } from './ui/card';
import { Calendar, Clock, MapPin, Tag } from 'lucide-react';
import { format } from 'date-fns';

export const Events = ({ events }) => {
  const getEventTypeColor = (type) => {
    const colors = {
      performance: 'bg-maroon-100 text-maroon-800 border-maroon-300',
      workshop: 'bg-amber-100 text-amber-800 border-amber-300',
      camp: 'bg-orange-100 text-orange-800 border-orange-300',
      registration: 'bg-green-100 text-green-800 border-green-300'
    };
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMMM dd, yyyy');
    } catch {
      return dateString;
    }
  };

  return (
    <section id="events" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-maroon-800 mb-4">
            Upcoming Events
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-maroon-600 to-amber-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Join us for performances, workshops, and special events throughout the year
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-maroon-400 via-amber-400 to-maroon-400"></div>

          <div className="space-y-12">
            {events.map((event, index) => (
              <div
                key={event.id}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-amber-500 rounded-full border-4 border-white shadow-lg z-10"></div>

                {/* Spacer for alignment */}
                <div className="hidden md:block w-1/2"></div>

                {/* Event Card */}
                <div className="w-full md:w-1/2 pl-16 md:pl-0">
                  <Card className="border-2 border-maroon-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getEventTypeColor(event.type)}`}>
                          {event.type.toUpperCase()}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-maroon-800 mb-3">
                        {event.title}
                      </h3>
                      
                      <p className="text-gray-700 mb-4">
                        {event.description}
                      </p>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="h-4 w-4 text-maroon-600" />
                          <span>{formatDate(event.date)}</span>
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
