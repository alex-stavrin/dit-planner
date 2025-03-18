import { Flex,Card, CardBody, CardHeader, Heading, Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";
import { MyCoursesShower } from "../components/MyCoursesShower";

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


    return <Flex flexDirection={"column"} overflow={"auto"} gap={5} mt={5} padding={3}>
        {plannedCoursesCount > 0 && <Card>
            <CardHeader>
                <Heading fontSize={"1.25rem"}>
                    Stats
                </Heading>
            </CardHeader>
            <CardBody>
                <Stat>
                    <StatLabel>
                        Planned
                    </StatLabel>
                    <StatNumber>
                        {plannedCoursesCount}
                    </StatNumber>
                    <StatHelpText>
                        How many courses you have planned
                    </StatHelpText>
                </Stat>
                <Stat>
                    <StatLabel>
                        ECTS
                    </StatLabel>
                    <StatNumber>
                        {ectsSum}
                    </StatNumber>
                    <StatHelpText>
                        How many ECTS you will get from planned courses
                    </StatHelpText>
                </Stat>
            </CardBody>
        </Card>}
        <MyCoursesShower courses={sortedPlanned} onRemove={removeHasCourse} onChangeGrade={changeGrade}
        onUpdateActivity={updateActivity}
        stateFunction={plannedCourseState} showActivity={true} showGrade={false}
        emptyComponent={noPlannedComponent}/>
    </Flex>
}