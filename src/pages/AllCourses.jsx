import { Course } from '@/components/Course';
import { FilterBar } from '@/components/FilterBar';
import { SearchBar } from '@/components/SearchBar';
import { allCategories, allSemesters } from '@/data/coursesData';
import { useState } from 'react';

function removeTonos(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function AllCourses({ courses, onAdd }) {
  const [selectedSemesters, setSelectedSemesters] = useState(allSemesters);
  const [selectedCategories, setSelectedCategories] = useState(allCategories);
  const [sortBy, setSortBy] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const isFilteredCourse = (course) => {
    if (selectedSemesters.map((semester) => semester.value).indexOf(course.semester) === -1)
      return false;
    if (selectedCategories.map((category) => category.value).indexOf(course.category) === -1)
      return false;
    if (
      course.name !== undefined &&
      !removeTonos(course.name.toLowerCase()).includes(removeTonos(searchQuery).toLowerCase())
    )
      return false;

    return true;
  };

  const ectsIn = (course1, course2) => {
    return parseInt(course1.ECTS) - parseInt(course2.ECTS);
  };

  const ectsDe = (course1, course2) => {
    return parseInt(course2.ECTS) - parseInt(course1.ECTS);
  };

  const alphabetical = (course1, course2) => {
    return course1.name.localeCompare(course2.name);
  };

  const defaultSorting = (course1, course2) => {
    return 0;
  };

  const getCompareFunction = () => {
    if (sortBy === null) {
      return defaultSorting;
    } else if (sortBy === 'ECTS_in') {
      return ectsIn;
    } else if (sortBy === 'ECTS_de') {
      return ectsDe;
    } else if (sortBy === 'ALPHA') {
      return alphabetical;
    }
    return defaultSorting;
  };

  return (
    <div className="w-full overflow-auto text-sm md:text-base lg:text-lg">
      <div className="m-4 flex items-center justify-start gap-4">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <FilterBar
          semesters={selectedSemesters}
          setSemesters={setSelectedSemesters}
          categories={selectedCategories}
          setCategories={setSelectedCategories}
          setSortBy={setSortBy}
        />
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-1 text-left text-xs font-medium md:text-lg">Course</th>
              <th className="p-1 text-left text-xs font-medium md:text-lg">Code</th>
              <th className="p-1 text-left text-xs font-medium md:text-lg">ECTS</th>
              <th className="p-1 text-left text-xs font-medium md:text-lg">Category</th>
              <th className="p-1 text-left text-xs font-medium md:text-lg">Semester</th>
            </tr>
          </thead>
          <tbody>
            {courses.sort(getCompareFunction()).map((course, index) => {
              // Filter and display courses
              if (!course.hasCourse && isFilteredCourse(course)) {
                return <Course course={course} key={index} onAdd={onAdd} />;
              } else {
                return null;
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
