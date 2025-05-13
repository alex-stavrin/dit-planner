import React from "react";
import { MyCoursesShower } from "../components/MyCoursesShower";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function PlannedCourses({
    courses,
    removeHasCourse,
    changeGrade,
    updateActivity,
    plannedCourseState,
    noPlannedComponent
})
{
    const plannedCourses = courses.filter((el) => plannedCourseState(el))
    const plannedCoursesCount = plannedCourses.length;
    let ectsSum = 0;
    for(let i = 0; i < plannedCourses.length; i++)
    {
        ectsSum += Number(plannedCourses[i].ECTS); 
    }

    const sortedPlanned = [...plannedCourses].sort((a, b) => Number(a.semester) - Number(b.semester));

    return (
        <div className="flex flex-col overflow-auto gap-5 mt-5 p-3">
            {plannedCoursesCount > 0 && (
                <Card>
                    <CardHeader>
                        <h3 className="text-xl font-bold">Stats</h3>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="stat">
                                <div className="text-sm font-medium text-muted-foreground">Planned</div>
                                <div className="text-2xl font-bold">{plannedCoursesCount}</div>
                                <div className="text-sm text-muted-foreground">
                                    How many courses you have planned
                                </div>
                            </div>

                            <div className="stat">
                                <div className="text-sm font-medium text-muted-foreground">ECTS</div>
                                <div className="text-2xl font-bold">{ectsSum}</div>
                                <div className="text-sm text-muted-foreground">
                                    How many ECTS you will get from planned courses
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
            <MyCoursesShower 
                courses={sortedPlanned} 
                onRemove={removeHasCourse} 
                onChangeGrade={changeGrade} 
                onUpdateActivity={updateActivity}
                stateFunction={plannedCourseState} 
                showActivity={true} 
                showGrade={false}
                emptyComponent={noPlannedComponent}
            />
        </div>
    );
}