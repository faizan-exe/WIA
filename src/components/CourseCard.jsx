import React from 'react';

const CourseCard = ({ course }) => {
  const handleClick = () => {
    window.open(course.url, '_blank');
  };

  return (
    <div 
      className="bg-white shadow-md rounded-md overflow-hidden cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-gray-100"
      onClick={handleClick}
    >
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">{course.course_title}</h3>
        <p className="text-gray-600 mt-2">Subject: {course.subject}</p>
        <p className="text-gray-600">Level: {course.level}</p>
        <p className="text-gray-600">Price: ${course.price}</p>
        <p className="text-gray-600">Subscribers: {course.num_subscribers}</p>
        <p className="text-gray-600">Reviews: {course.num_reviews}</p>
        <p className="text-gray-600">Lectures: {course.num_lectures}</p>
        <p className="text-gray-600">Content Duration: {course.content_duration} hours</p>
        
        <div className="mt-2 text-gray-700">
          <p>Published on: {new Date(course.published_timestamp).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
