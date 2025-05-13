import React from "react";
import { MyCoursesShower } from "../components/MyCoursesShower";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function CurrentCourses({
  courses,
  removeHasCourse,
  changeGrade,
  updateActivity,
  currentCourseState,
  noCurrentComponent
}) {
  // i know this isnt optimized. but i dont really care
  const currentCourses = courses.filter(el => currentCourseState(el));
  const currentCoursesCount = currentCourses.length;

  let ectsSum = 0;
  for(let i = 0; i < currentCoursesCount; i++) {
    ectsSum += Number(currentCourses[i].ECTS); 
  }

  const sortedCurrent = [...currentCourses].sort((a, b) => Number(a.semester) - Number(b.semester));

  return (
    <div className="flex flex-col overflow-auto gap-5 mt-5 p-3">
      {currentCoursesCount > 0 && (
        <div className="flex flex-col">
          <Card>
            <CardHeader>
              <h3 className="text-xl font-bold">Stats</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="stat">
                  <div className="text-sm font-medium text-muted-foreground">Current</div>
                  <div className="text-2xl font-bold">{currentCoursesCount}</div>
                  <div className="text-sm text-muted-foreground">
                    How many courses you currently have
                  </div>
                </div>

                <div className="stat">
                  <div className="text-sm font-medium text-muted-foreground">ECTS</div>
                  <div className="text-2xl font-bold">{ectsSum}</div>
                  <div className="text-sm text-muted-foreground">
                    The total amount of ECTS you will get when you pass your current courses
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      <MyCoursesShower 
        courses={sortedCurrent} 
        onRemove={removeHasCourse} 
        onChangeGrade={changeGrade} 
        onUpdateActivity={updateActivity}
        stateFunction={currentCourseState} 
        showActivity={true} 
        showGrade={false} 
        emptyComponent={noCurrentComponent}
      />
    </div>
  );
}