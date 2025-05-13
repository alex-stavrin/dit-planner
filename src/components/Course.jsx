import { ChevronRight } from 'lucide-react';
import React from 'react';

export function Course({ course, onAdd }) {
  function onClickButton() {
    onAdd(course);
  }

  return (
    <tr
      key={course.code}
      className="cursor-pointer border-b transition-colors hover:bg-green-500 hover:text-white"
      onClick={onClickButton}
    >
      <td className="flex items-center p-1 text-xs md:text-lg">
        <ChevronRight className="mr-1 inline h-4 w-4" />
        {course.name}
      </td>
      <td className="p-1 text-xs md:text-lg">{course.code}</td>
      <td className="p-1 text-xs md:text-lg">{course.ECTS}</td>
      <td className="p-1 text-xs md:text-lg">{course.category}</td>
      <td className="p-1 text-xs md:text-lg">{course.semester}</td>
    </tr>
  );
}
