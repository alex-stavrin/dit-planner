import { Flex, Stat, StatHelpText, StatLabel, StatNumber, Text } from "@chakra-ui/react"
import { MyCoursesShower } from "./MyCoursesShower"

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
    const filteredCourses = courses.filter(el => el.isActive);
    const currentCoursesCount = filteredCourses.length;

    let ectsSum = 0;
    for(let i = 0; i < filteredCourses.length; i++)
    {
        ectsSum += Number(filteredCourses[i].ECTS); 
    }

    return <Flex flexDirection={"column"} gap={5} mt={5} padding={3}>
        <MyCoursesShower courses={courses} onRemove={removeHasCourse} onChangeGrade={changeGrade} onUpdateActivity={updateActivity}
          stateFunction={currentCourseState} showActivity={true} showGrade={false} emptyComponent={noCurrentComponent}/>
        <Flex flexDirection={"column"} fontSize={"1.25em"}>
            <Stat>
                <StatLabel>
                    Count
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
        </Flex>
    </Flex>
}