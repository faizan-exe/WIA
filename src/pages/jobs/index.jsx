import React, { useState } from 'react'
import Header from '../../components/Header';
import JobCard from '../../components/JobCard';

const Jobs = () => {
    const [jobPosts, setJobPosts] = useState([
      {
        id: 1,
        image: 'https://via.placeholder.com/100',
        jobName: 'Frontend Developer',
        jobDescription:
          'Looking for a skilled frontend developer with experience in React, JavaScript, and CSS to build user-facing applications.',
        expectedSalary: '$70,000 - $90,000',
        industry: 'Technology',
        location: 'New York, NY',
        jobType: 'Full-Time',
        skills: 'React, JavaScript, CSS',
        experience: 3,
        organizationName: 'Tech Innovators Inc.',
      },
      {
        id: 2,
        image: 'https://via.placeholder.com/100',
        jobName: 'Data Scientist',
        jobDescription:
          'Seeking a data scientist proficient in Python, machine learning, and data visualization to analyze business insights.',
        expectedSalary: '$90,000 - $120,000',
        industry: 'Finance',
        location: 'San Francisco, CA',
        jobType: 'Full-Time',
        skills: 'Python, Machine Learning, Data Visualization',
        experience: 4,
        organizationName: 'DataCorp Analytics',
      },
      {
        id: 3,
        image: 'https://via.placeholder.com/100',
        jobName: 'Healthcare Administrator',
        jobDescription:
          'We are hiring a healthcare administrator to oversee hospital operations and manage patient services efficiently.',
        expectedSalary: '$80,000 - $100,000',
        industry: 'Healthcare',
        location: 'Chicago, IL',
        jobType: 'Full-Time',
        skills: 'Management, Communication, Leadership',
        experience: 5,
        organizationName: 'Healthy Lives Hospital',
      },
      {
        id: 4,
        image: 'https://via.placeholder.com/100',
        jobName: 'Content Writer',
        jobDescription:
          'Hiring a creative content writer to produce high-quality articles, blogs, and social media posts for our clients.',
        expectedSalary: '$40,000 - $60,000',
        industry: 'Education',
        location: 'Remote',
        jobType: 'Part-Time',
        skills: 'Writing, SEO, Creativity',
        experience: 2,
        organizationName: 'EduCreative Solutions',
      },
      {
        id: 5,
        image: 'https://via.placeholder.com/100',
        jobName: 'AI Research Engineer',
        jobDescription:
          'Join our team as an AI research engineer to develop cutting-edge AI models and deploy them in real-world scenarios.',
        expectedSalary: '$110,000 - $150,000',
        industry: 'Technology',
        location: 'Austin, TX',
        jobType: 'Full-Time',
        skills: 'AI, Machine Learning, Deep Learning',
        experience: 6,
        organizationName: 'AI Pioneers Inc.',
      },
    ]);
  
    return (
      <>
        <Header userRole={'job-seeker'} />
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">Jobs</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobPosts.map((job) => (
              <div key={job.id} className="relative">
                {/* JobCard Component */}
                <JobCard job={job} />
  
              </div>
            ))}
          </div>
        </div>
  
      </>
    );
  }

export default Jobs