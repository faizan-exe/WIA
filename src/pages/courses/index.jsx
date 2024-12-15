import React, { useState, useEffect, useRef } from 'react';
import CourseCard from '../../components/CourseCard';
import Header from '../../components/Header';

const Courses = () => {
  const [courseData, setCourseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);  // Track current page
  const [itemsPerPage] = useState(6); // Items per page (you can adjust this number)
  
  const debounceTimeout = useRef(null);
  const paginationRef = useRef(null); // Ref for pagination container

  useEffect(() => {
    // Fetch the data from the JSON file
    fetch('../../../data.json') // Adjust the path based on where the file is located
      .then((response) => response.json())
      .then((data) => {
        setCourseData(data); // Set the course data to state
        setIsLoading(false);  // Set loading to false
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);

  // Debounce the search query
  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current); // Clear previous timeout if any
    }

    // Set a new timeout to update the debounced query after a delay
    debounceTimeout.current = setTimeout(() => {
      setDebouncedQuery(searchQuery); // Set the debounced query after 500ms delay
    }, 500);

    // Cleanup timeout on unmount
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [searchQuery]);

  // Filter courses based on the debounced query
  const filteredCourses = courseData.filter((course) =>
    course.course_title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
    course.subject.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
    course.level.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  // Get the current page's courses
  const indexOfLastCourse = currentPage * itemsPerPage;
  const indexOfFirstCourse = indexOfLastCourse - itemsPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top when page changes
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  return (
    <>
      <Header userRole={'job-seeker'} />

      {isLoading ? (
        <div className="flex justify-center items-center p-6">Loading...</div>
      ) : (
        <>
          <div className="p-6">
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full p-3 border border-gray-300 rounded-md mb-6"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query on user input
            />
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {currentCourses.length > 0 ? (
              currentCourses.map((course) => (
                <CourseCard key={course.course_id} course={course} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">No courses found</div>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center p-6">
            <button
              className="px-4 py-2 bg-gray-300 rounded-md mr-2"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>

            {/* Horizontal Scrolling Pagination */}
            <div
              className="flex overflow-x-auto"
              ref={paginationRef}
            >
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              className="px-4 py-2 bg-gray-300 rounded-md ml-2"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Courses;
