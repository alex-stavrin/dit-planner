import React from "react";
import { MyCourse } from "./MyCourse";

export function MyCoursesShower({
  courses, 
  onRemove, 
  onChangeGrade, 
  onUpdateActivity, 
  stateFunction, 
  showActivity, 
  emptyComponent: EmptyComponent, 
  showGrade
}) {
  const filteredCourses = courses.filter(course => stateFunction(course));
  
  return filteredCourses.length > 0 ? (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-xs md:text-lg p-1 text-left font-medium">Course</th>
            <th className="text-xs md:text-lg p-1 text-left font-medium">Code</th>
            <th className="text-xs md:text-lg p-1 text-left font-medium">ECTS</th>
            <th className="text-xs md:text-lg p-1 text-left font-medium">Category</th>
            <th className="text-xs md:text-lg p-1 text-left font-medium">Semester</th>
            {showGrade && <th className="text-xs md:text-lg p-1 text-left font-medium">Grade</th>}
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