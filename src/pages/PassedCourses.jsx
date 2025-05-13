import React from "react";
import { MyCoursesShower } from "../components/MyCoursesShower";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function PassedCourses(
    {
        courses,
        removeHasCourse,
        changeGrade,
        passedCourseState,
        updateActivity,
        noPassedComponent
    }
)
{
    const passedCourses = courses.filter((el) => passedCourseState(el))
    let ectsSum = 0;
    for(let i = 0; i < passedCourses.length; i++)
    {
        ectsSum += Number(passedCourses[i].ECTS); 
    }

    const sortedPassed = [...passedCourses].sort((a, b) => Number(a.semester) - Number(b.semester));

    return (
        <div className="flex flex-col overflow-auto gap-5 mt-5 p-3">
            {passedCourses.length > 0 && (
                <Card>
                    <CardHeader>
                        <h3 className="text-xl font-bold">Stats</h3>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="stat">
                                <div className="text-sm font-medium text-muted-foreground">Passed</div>
                                <div className="text-2xl font-bold">{passedCourses.length}</div>
                                <div className="text-sm text-muted-foreground">
                                    How many courses you have passed
                                </div>
                            </div>

                            <div className="stat">
                                <div className="text-sm font-medium text-muted-foreground">ECTS</div>
                                <div className="text-2xl font-bold">{ectsSum}</div>
                                <div className="text-sm text-muted-foreground">
                                    How many ECTS you have gathered from your passed courses
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
            <MyCoursesShower 
                courses={sortedPassed} 
                onRemove={removeHasCourse} 
                onChangeGrade={changeGrade} 
                onUpdateActivity={updateActivity}
                stateFunction={passedCourseState} 
                showActivity={false} 
                showGrade={true} 
                emptyComponent={noPassedComponent}
            />
        </div>
    );
}