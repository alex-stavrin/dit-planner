import { Card, CardBody, CardHeader, Flex, Heading, Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react"
import { MyCoursesShower } from "../components/MyCoursesShower"

export default function CurrentCourses(
    {
        courses,
        removeHasCourse,
        changeGrade,
        updateActivity,
        currentCourseState,
        noCurrentComponent
    }
)
{
    // i know this isnt optimized. but i dont really care
    const currentCourses = courses.filter(el => currentCourseState(el));
    const currentCoursesCount = currentCourses.length;

    let ectsSum = 0;
    for(let i = 0; i < currentCoursesCount; i++)
    {
        ectsSum += Number(currentCourses[i].ECTS); 
    }

    const sortedCurrent = [...currentCourses].sort((a, b) => Number(a.semester) - Number(b.semester));


    return <Flex flexDirection={"column"} overflow={"auto"} gap={5} mt={5} padding={3}>
        {currentCoursesCount > 0 && <Flex flexDirection={"column"}>
            <Card>
                <CardHeader>
                    <Heading fontSize={"1.25rem"}>
                        Stats
                    </Heading>
                </CardHeader>
                <CardBody>
                    <Stat>
                        <StatLabel>
                            Current
                        </StatLabel>
                        <StatNumber>
                            {currentCoursesCount}
                        </StatNumber>
                        <StatHelpText>
                            How many courses you currently have
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
                            The total amount of ECTS you will get when you pass you current courses
                        </StatHelpText>
                    </Stat>
                </CardBody>
            </Card>
        </Flex>}
        <MyCoursesShower courses={sortedCurrent} onRemove={removeHasCourse} onChangeGrade={changeGrade} onUpdateActivity={updateActivity}
          stateFunction={currentCourseState} showActivity={true} showGrade={false} emptyComponent={noCurrentComponent}/>
    </Flex>
}