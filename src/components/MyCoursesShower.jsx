import { MyCourse } from './MyCourse';
import React from 'react';

export function MyCoursesShower({
  courses,
  onRemove,
  onChangeGrade,
  onUpdateActivity,
  stateFunction,
  showActivity,
  emptyComponent: EmptyComponent,
  showGrade,
}) {
  const filteredCourses = courses.filter((course) => stateFunction(course));

  return filteredCourses.length > 0 ? (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-1 text-left text-xs font-medium md:text-lg">Course</th>
            <th className="p-1 text-left text-xs font-medium md:text-lg">Code</th>
            <th className="p-1 text-left text-xs font-medium md:text-lg">ECTS</th>
            <th className="p-1 text-left text-xs font-medium md:text-lg">Category</th>
            <th className="p-1 text-left text-xs font-medium md:text-lg">Semester</th>
            {showGrade && <th className="p-1 text-left text-xs font-medium md:text-lg">Grade</th>}
          </tr>
        </thead>
        <tbody>
          {filteredCourses.map((course) => (
            <MyCourse
              course={course}
              key={course.code}
              onRemove={onRemove}
              onChangeGrade={onChangeGrade}
              onUpdateActivity={onUpdateActivity}
              showActivity={showActivity}
              showGrade={showGrade}
            />
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <EmptyComponent />
  );
}
