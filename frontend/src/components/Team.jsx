import React from 'react';
import { Card, CardContent } from './ui/card';

export const Team = ({ team }) => {
  return (
    <section id="team" className="py-20 bg-gradient-to-br from-maroon-50 via-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Team Section */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-maroon-800 mb-4">
              Our Gurus
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-maroon-600 to-amber-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Learn from experienced masters dedicated to preserving and teaching classical dance traditions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <Card key={member.id} className="border-2 border-maroon-200 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                    <p className="text-amber-300 font-semibold">{member.role}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-maroon-700">
                      {member.specialty}
                    </span>
                    <span className="text-sm text-gray-600">
                      {member.experience}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
