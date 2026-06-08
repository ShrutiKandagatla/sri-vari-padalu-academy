import React from 'react';
import { Card, CardContent } from './ui/card';
import { Clock, Calendar } from 'lucide-react';

export const ClassTimings = ({ timings }) => {
  return (
    <section id="classes" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-maroon-800 mb-4">
            Class Timings
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-maroon-600 to-amber-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Flexible schedules designed to accommodate students of all ages and skill levels
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {timings.map((schedule) => (
            <Card key={schedule.id} className="border-2 border-maroon-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-maroon-100">
                  <div className="w-12 h-12 bg-gradient-to-br from-maroon-600 to-amber-600 rounded-full flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-maroon-800">
                    {schedule.day}
                  </h3>
                </div>

                <div className="space-y-4">
                  {schedule.classes.map((classInfo, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gradient-to-br from-amber-50 to-maroon-50 rounded-lg border border-maroon-200 hover:border-maroon-400 transition-colors duration-300"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-maroon-800 text-sm">
                          {classInfo.level}
                        </h4>
                        <span className="px-2 py-1 bg-amber-200 text-amber-800 text-xs rounded-full font-semibold">
                          {classInfo.form}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock className="h-4 w-4 text-maroon-600" />
                        <span className="text-sm">{classInfo.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-maroon-700 to-maroon-900 border-0 shadow-2xl max-w-3xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Special Note
              </h3>
              <p className="text-amber-100 leading-relaxed">
                We offer flexible timings and private sessions for working professionals and advanced students. 
                Trial classes available for new students. Contact us to schedule your visit!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
