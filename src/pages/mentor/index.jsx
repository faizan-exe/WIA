import React, { useState, useEffect } from 'react';
import AdvertisementCard from '../../components/AdCard';
import Header from '../../components/Header';

function Mentors() {
const sampleAdvertisements = [
    {
      mentorName: 'John Doe',
      services: 'Career Coaching, Resume Building',
      description: 'Helping professionals advance their careers with personalized guidance.',
      contactEmail: 'johndoe@example.com',
      contactPhone: '123-456-7890',
      image: "https://static.wikia.nocookie.net/shipping/images/0/09/Batman.jpg/revision/latest?cb=20210522210953",
      experience: 5,
      location: 'Remote',
      availableSlots: 'Weekends, Evenings',
      priceRange: '$50 - $100 per session',
    },
    {
      mentorName: 'John Doe',
      services: 'Career Coaching, Resume Building',
      description: 'Helping professionals advance their careers with personalized guidance.',
      contactEmail: 'johndoe@example.com',
      contactPhone: '123-456-7890',
      image: "https://static.wikia.nocookie.net/shipping/images/0/09/Batman.jpg/revision/latest?cb=20210522210953",
      experience: 5,
      location: 'Remote',
      availableSlots: 'Weekends, Evenings',
      priceRange: '$50 - $100 per session',
    },
    {
      mentorName: 'John Doe',
      services: 'Career Coaching, Resume Building',
      description: 'Helping professionals advance their careers with personalized guidance.',
      contactEmail: 'johndoe@example.com',
      contactPhone: '123-456-7890',
      image: "https://static.wikia.nocookie.net/shipping/images/0/09/Batman.jpg/revision/latest?cb=20210522210953",
      experience: 5,
      location: 'Remote',
      availableSlots: 'Weekends, Evenings',
      priceRange: '$50 - $100 per session',
    },
    {
      mentorName: 'John Doe',
      services: 'Career Coaching, Resume Building',
      description: 'Helping professionals advance their careers with personalized guidance.',
      contactEmail: 'johndoe@example.com',
      contactPhone: '123-456-7890',
      image: "https://static.wikia.nocookie.net/shipping/images/0/09/Batman.jpg/revision/latest?cb=20210522210953",
      experience: 5,
      location: 'Remote',
      availableSlots: 'Weekends, Evenings',
      priceRange: '$50 - $100 per session',
    },
    {
      mentorName: 'John Doe',
      services: 'Career Coaching, Resume Building',
      description: 'Helping professionals advance their careers with personalized guidance.',
      contactEmail: 'johndoe@example.com',
      contactPhone: '123-456-7890',
      image: "https://static.wikia.nocookie.net/shipping/images/0/09/Batman.jpg/revision/latest?cb=20210522210953",
      experience: 5,
      location: 'Remote',
      availableSlots: 'Weekends, Evenings',
      priceRange: '$50 - $100 per session',
    },
    {
      mentorName: 'John Doe',
      services: 'Career Coaching, Resume Building',
      description: 'Helping professionals advance their careers with personalized guidance.',
      contactEmail: 'johndoe@example.com',
      contactPhone: '123-456-7890',
      image: "https://static.wikia.nocookie.net/shipping/images/0/09/Batman.jpg/revision/latest?cb=20210522210953",
      experience: 5,
      location: 'Remote',
      availableSlots: 'Weekends, Evenings',
      priceRange: '$50 - $100 per session',
    },
    // More sample advertisements...
  ];

  return (
    <>
      <Header userRole={'job-seeker'} />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 space-y-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Mentor Advertisements</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleAdvertisements.map((advertisement, index) => (
            <div key={index} className="flex flex-col items-center">
              <AdvertisementCard advertisement={advertisement} />
              
            </div>
          ))}
        </div>
      </div>

      
    </>
  );
}

export default Mentors;
