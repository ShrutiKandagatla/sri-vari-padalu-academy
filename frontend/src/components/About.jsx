import React from 'react';
import { Card, CardContent } from './ui/card';
import { CheckCircle2 } from 'lucide-react';

export const About = ({ data }) => {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-amber-50 via-white to-maroon-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-maroon-800 mb-4">
            Our Dance Forms
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-maroon-600 to-amber-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Immerse yourself in the timeless beauty of India's most revered classical dance traditions
          </p>
        </div>

        <div className="space-y-16">
          {data.map((form, index) => (
            <div
              key={form.id}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-8 items-center`}
            >
              {/* Image */}
              <div className="w-full lg:w-1/2">
                <div className="relative group overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src={form.image}
                    alt={form.name}
                    className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2">
                <Card className="border-2 border-maroon-200 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <CardContent className="p-8">
                    <h3 className="text-3xl font-bold text-maroon-800 mb-4">
                      {form.name}
                    </h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {form.description}
                    </p>
                    <div className="bg-maroon-50 p-4 rounded-lg mb-4">
                      <p className="text-sm text-gray-600 italic">
                        {form.history}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-maroon-700 mb-3">Key Highlights:</h4>
                      {form.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
