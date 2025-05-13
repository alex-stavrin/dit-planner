import React from "react";
import { ChevronRight } from "lucide-react";

export function Course({ course, onAdd }) {
  function onClickButton() {
    onAdd(course);
  }

  return (
    <tr 
      key={course.code} 
      className="hover:bg-green-500 hover:text-white cursor-pointer border-b transition-colors"
      onClick={onClickButton}
    >
      <td className="text-xs md:text-lg p-1 flex items-center">
        <ChevronRight className="h-4 w-4 inline mr-1" />
        {course.name}
      </td>
      <td className="text-xs md:text-lg p-1">{course.code}</td>
      <td className="text-xs md:text-lg p-1">{course.ECTS}</td>
      <td className="text-xs md:text-lg p-1">{course.category}</td>
      <td className="text-xs md:text-lg p-1">{course.semester}</td>
    </tr>
  );
}