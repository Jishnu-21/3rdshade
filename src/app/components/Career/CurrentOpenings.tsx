import React from 'react';
import JobListing from './JobListingProps';

const CurrentOpenings: React.FC = () => {
  const openings = [
    "Product Designer",
    "Senior Project Manager",
    "Content Writer",
    "HR Manager"
  ];

  return (
    <section className="current-openings py-20 bg-white">
      <div className="container mx-auto px-4 md:px-[122px]">
        <h2 className="text-black text-5xl md:text-6xl font-bold pb-4">Current openings</h2>
        <p className="text-lg pb-12 text-gray-600">
          Grow with us at 3RD SHADE - where creativity and passion thrive.
        </p>
        
        <div className="job-listings text-black space-y-4">
          {openings.map((job, index) => (
            <JobListing key={index} title={job} />
          ))}
        </div>
        
        <p className="mt-12 text-base text-gray-800">
          If your profile is not listed above, send your resume <a href="#" className="underline font-semibold text-black">here!</a>
        </p>
      </div>
    </section>
  );
};

export default CurrentOpenings;
