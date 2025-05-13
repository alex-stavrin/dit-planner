import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { NumberInput } from "@/components/ui/number-input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export function MyCourse({
  course,
  onRemove,
  onChangeGrade,
  showActivity,
  onUpdateActivity,
  showGrade
}) {
  const [grade, setGrade] = useState(course.grade || 0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setGrade(course.grade);
  }, [course.grade]);

  const handleChange = (value) => {
    setGrade(value);
  };

  const handleSave = () => {
    const parsedGrade = parseFloat(grade);
    if (!isNaN(parsedGrade) && parsedGrade >= 0 && parsedGrade <= 10) {
      onChangeGrade(grade, course);
      setIsOpen(false);
    }
  };

  const activityChanged = (checked) => {
    setIsOpen(false);
    onUpdateActivity(checked, course);
  };

  const onDropClassButton = () => {
    onRemove(course);
    setIsOpen(false);
  };

  // Determine grade color
  let gradeColorClass = "text-yellow-300";
  if (grade > 7) {
    gradeColorClass = "text-green-300";
  }
  if (grade == 10.0) {
    gradeColorClass = "text-pink-300";
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{course.name}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <p className="text-sm">Code {course.code}</p>
              <p className="text-sm">ECTS {course.ECTS}</p>
              <p className="text-sm">Category {course.category}</p>
              <p className="text-sm">Semester {course.semester}</p>
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="grade" className="text-sm font-medium">
                Grade
              </label>
              <NumberInput
                id="grade"
                value={grade}
                onChange={handleChange}
                min={0}
                max={10}
                step={0.5}
                precision={1}
              />
            </div>
            {showActivity && (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="course-active"
                  checked={course.isActive}
                  onCheckedChange={activityChanged}
                />
                <label
                  htmlFor="course-active"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Current
                </label>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={onDropClassButton} className="bg-red-50 hover:bg-red-100 hover:text-red-700">
              Drop Class
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <tr
        className="hover:bg-blue-500 hover:text-white cursor-pointer border-b transition-colors"
        onClick={() => setIsOpen(true)}
      >
        <td className="text-xs md:text-lg p-1 flex items-center">
          <ChevronRight className="h-4 w-4 inline mr-1" />
          {course.name}
        </td>
        <td className="text-xs md:text-lg p-1">{course.code}</td>
        <td className="text-xs md:text-lg p-1">{course.ECTS}</td>
        <td className="text-xs md:text-lg p-1">{course.category}</td>
        <td className="text-xs md:text-lg p-1">{course.semester}</td>
        {showGrade && (
          <td className={`text-xs md:text-lg p-1 ${gradeColorClass}`}>
            {course.grade}
          </td>
        )}
      </tr>
    </>
  );
}