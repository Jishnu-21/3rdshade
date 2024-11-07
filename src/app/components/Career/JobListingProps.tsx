import React from 'react';

interface JobListingProps {
  title: string;
}

const JobListing: React.FC<JobListingProps> = ({ title }) => {
  return (
    <div className="job-listing flex items-center justify-between py-6 px-6 bg-gray-100 rounded-lg">
      <h3 className="text-xl font-bold">{title}</h3>
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-black transition-colors duration-200">
          View details ▼
        </button>
        <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors duration-200">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobListing;