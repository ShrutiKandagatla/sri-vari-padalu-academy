import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Gallery } from '@/components/Gallery';
import { Events } from '@/components/Events';
import { Team } from '@/components/Team';
import { ClassTimings } from '@/components/ClassTimings';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import axios from 'axios';
import {
  heroData,
  danceFormsData,
  teamData,
  classTimingsData,
  contactData
} from '@/utils/mockData';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const HomePage = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch gallery images
      const galleryResponse = await axios.get(`${API}/gallery`);
      setGalleryImages(galleryResponse.data);

      // Fetch events
      const eventsResponse = await axios.get(`${API}/events`);
      setEventsData(eventsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-maroon-900 to-maroon-800">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white font-semibold text-lg">Loading Sri Vari Padalu...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main id="home">
        <Hero data={heroData} />
        <About data={danceFormsData} />
        <Gallery images={galleryImages} />
        <Events events={eventsData} />
        <Team team={teamData} />
        <ClassTimings timings={classTimingsData} />
        <Contact data={contactData} />
      </main>
      <Footer contactData={contactData} />
    </>
  );
};
