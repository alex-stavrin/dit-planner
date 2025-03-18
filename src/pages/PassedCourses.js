import { Flex, Card, CardBody, CardHeader, Heading, Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";
import { MyCoursesShower } from "../components/MyCoursesShower";

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


    return <Flex flexDirection={"column"} overflow={"auto"} gap={5} mt={5} padding={3}>
        {passedCourses.length > 0 && <Card>
            <CardHeader>
                <Heading fontSize={"1.25rem"}>
                    Stats
                </Heading>
            </CardHeader>
            <CardBody>
                <Stat>
                    <StatLabel>
                        Passed
                    </StatLabel>
                    <StatNumber>
                        {passedCourses.length}
                    </StatNumber>
                    <StatHelpText>
                        How many courses you have passed
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
                        How many ECTS you have gathered from your passed courses
                    </StatHelpText>
                </Stat>
            </CardBody>
        </Card>}
        <MyCoursesShower courses={sortedPassed} onRemove={removeHasCourse} onChangeGrade={changeGrade} onUpdateActivity={updateActivity}
                    stateFunction={passedCourseState} showActivity={false} showGrade={true} emptyComponent={noPassedComponent}/>
    </Flex>
}