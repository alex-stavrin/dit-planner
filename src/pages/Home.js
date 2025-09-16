import { Flex } from '@chakra-ui/react';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import {
    Stat,
    StatLabel,
    StatNumber,
    Box,
    Heading,
    Stack,
    StackDivider,
} from '@chakra-ui/react'
import { Card, CardHeader, CardBody } from '@chakra-ui/react'
import { Thead, Tr, Table, Td, Tbody} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export function Home({courses})
{
    const [ectsPassedSum, setEctsPassedSum] = useState(0);
    const [ectsPlannedSum, setEctsPlannedSum] = useState(0);

    const [currentGrade, setCurrentGrade] = useState(0);

    const [gpPassed, setGpPassed] = useState(0);
    const [gpPlanned, setGpPlanned] = useState(0);

    const [ypPassed, setYpPassed] = useState(0);
    const [ypPlanned, setYpPlanned] = useState(0);

    const [eymPassed, setEymPassed] = useState(0);
    const [eymPlanned, setEymPlanned] = useState(0);

    const [projectPassed, setProjectPassed] = useState(0);
    const [projectPlanned, setProjectPlanned] = useState(0);

    const [tpPassed, setTpPassed] = useState(0);
    const [tpPlanned, setTpPlanned] = useState(0);

    const [currentCount, setCurrentCount] = useState(0);
    const [passedCount, setPassedCount] = useState(0);
    const [plannedCount, setPlannedCount] = useState(0);
    
    //
    // Could be done with array and more efficiently. Just doing this for now
    //

    const [s1BPassed, setS1BPassed] = useState(0);
    const [s1BPlanned, setS1BPlanned] = useState(0);
    const [s1YPassed, setS1YPassed] = useState(0);
    const [s1YPlanned, setS1YPlanned] = useState(0);

    const [s2BPassed, setS2BPassed] = useState(0);
    const [s2BPlanned, setS2BPlanned] = useState(0);
    const [s2YPassed, setS2YPassed] = useState(0);
    const [s2YPlanned, setS2YPlanned] = useState(0);

    const [s3BPassed, setS3BPassed] = useState(0);
    const [s3BPlanned, setS3BPlanned] = useState(0);
    const [s3YPassed, setS3YPassed] = useState(0);
    const [s3YPlanned, setS3YPlanned] = useState(0);

    const [s4BPassed, setS4BPassed] = useState(0);
    const [s4BPlanned, setS4BPlanned] = useState(0);
    const [s4YPassed, setS4YPassed] = useState(0);
    const [s4YPlanned, setS4YPlanned] = useState(0);

    const [s5BPassed, setS5BPassed] = useState(0);
    const [s5BPlanned, setS5BPlanned] = useState(0);
    const [s5YPassed, setS5YPassed] = useState(0);
    const [s5YPlanned, setS5YPlanned] = useState(0);

    const [s6BPassed, setS6BPassed] = useState(0);
    const [s6BPlanned, setS6BPlanned] = useState(0);
    const [s6YPassed, setS6YPassed] = useState(0);
    const [s6YPlanned, setS6YPlanned] = useState(0);

    useEffect(()=>{
        calculateStats();
    },[courses]);

    const calculateStats = () =>
    {
        let passedCount = 0;
        let passedEcts = 0;

        let plannedEcts = 0;
        let weightedSum = 0;

        let currentCountSum = 0;

        let gpPassedSum = 0;
        let gpPlannedSum = 0;

        let ypPassedSum = 0;
        let ypPlannedSum = 0;

        let eymPassedSum = 0;
        let eymPlannedSum = 0;

        let projectPassedSum = 0;
        let projectPlannedSum = 0;

        let tpPassedSum = 0;
        let tpPlannedSum = 0;

        let s1BPassedSum=0;
        let s1BPlannedSum=0;
        let s1YPassedSum=0;
        let s1YPlannedSum=0;
    
        let s2BPassedSum=0;
        let s2BPlannedSum=0;
        let s2YPassedSum=0;
        let s2YPlannedSum=0;
    
        let s3BPassedSum=0;
        let s3BPlannedSum=0;
        let s3YPassedSum=0;
        let s3YPlannedSum=0;
    
        let s4BPassedSum=0;
        let s4BPlannedSum=0;
        let s4YPassedSum=0;
        let s4YPlannedSum=0;
    
        let s5BPassedSum=0;
        let s5BPlannedSum=0;
        let s5YPassedSum=0;
        let s5YPlannedSum=0;
    
        let s6BPassedSum=0;
        let s6BPlannedSum=0;
        let s6YPassedSum=0;
        let s6YPlannedSum=0;

        courses.forEach(course => {

            // passed course
            if(course.grade>=5)
            {
                setPassedCount((prev) => prev+1);

                passedCount++;
                passedEcts+=parseInt(course.ECTS);
                weightedSum += parseInt(course.ECTS) * course.grade;

                if(course.category==="ΓΠ")
                {
                    gpPassedSum++;
                }

                if(course.category==="ΥΜ")
                {
                    ypPassedSum++;
                }

                if(course.category === "ΕΥΜ")
                {
                    eymPassedSum++;
                }

                if(course.category === "P")
                {
                    projectPassedSum++;
                }

                if (course.category === "Π")
                {
                    tpPassedSum++;
                }

                if(course.s1)
                {
                    if(course.s1==="Υ")
                    {
                        s1YPassedSum++;
                    }

                    if(course.s1==="B")
                    {
                        s1BPassedSum++;
                    }
                }

                if(course.s2)
                {
                    if(course.s2==="Υ")
                    {
                        s2YPassedSum++;
                    }

                    if(course.s2==="B")
                    {
                        s2BPassedSum++;
                    }
                }

                if(course.s3)
                {
                    if(course.s3==="Υ")
                    {
                        s3YPassedSum++;
                    }

                    if(course.s3==="B")
                    {
                        s3BPassedSum++;
                    }
                }

                if(course.s4)
                {
                    if(course.s4==="Υ")
                    {
                        s4YPassedSum++;
                    }

                    if(course.s4==="B")
                    {
                        s4BPassedSum++;
                    }
                }


                if(course.s5)
                {
                    if(course.s5==="Υ")
                    {
                        s5YPassedSum++;
                    }

                    if(course.s5==="B")
                    {
                        s5BPassedSum++;
                    }
                }

                if(course.s6)
                {
                    if(course.s6==="Υ")
                    {
                        s6YPassedSum++;
                    }

                    if(course.s6==="B")
                    {
                        s6BPassedSum++;
                    }
                }
            }
            // planed course
            if(course.hasCourse)
            {
                setPlannedCount((prev) => prev+1);

                plannedEcts+=parseInt(course.ECTS);

                if(course.category==="ΓΠ")
                {
                    gpPlannedSum++;
                }

                if(course.category==="ΥΜ")
                {
                    ypPlannedSum++;
                }

                if(course.category === "ΕΥΜ")
                {
                    eymPlannedSum++;
                }

                if(course.category === "P")
                {
                    projectPlannedSum++;
                }

                if (course.category === "Π")
                {
                    tpPlannedSum++;
                }

                if(course.s1)
                {
                    if(course.s1==="Υ")
                    {
                        s1YPlannedSum++;
                    }

                    if(course.s1==="B")
                    {
                        s1BPlannedSum++;
                    }
                }
    
                    if(course.s2)
                    {
                        if(course.s2==="Υ")
                        {
                            s2YPlannedSum++;
                        }
    
                        if(course.s2==="B")
                        {
                            s2BPlannedSum++;
                        }
                    }
    
                    if(course.s3)
                    {
                        if(course.s3==="Υ")
                        {
                            s3YPlannedSum++;
                        }
    
                        if(course.s3==="B")
                        {
                            s3BPlannedSum++;
                        }
                    }
    
                    if(course.s4)
                    {
                        if(course.s4==="Υ")
                        {
                            s4YPlannedSum++;
                        }
    
                        if(course.s4==="B")
                        {
                            s4BPlannedSum++;
                        }
                    }
    
    
                    if(course.s5)
                    {
                        if(course.s5==="Υ")
                        {
                            s5YPlannedSum++;
                        }
    
                        if(course.s5==="B")
                        {
                            s5BPlannedSum++;
                        }
                    }
    
                    if(course.s6)
                    {
                        if(course.s6==="Υ")
                        {
                            s6YPlannedSum++;
                        }
    
                        if(course.s6==="B")
                        {
                            s6BPlannedSum++;
                        }
                    }
            }
            if(course.isActive)
            {
                currentCountSum++;
                setCurrentCount((prev) => prev+1);
            }
        });

        setEctsPassedSum(passedEcts);
        setEctsPlannedSum(plannedEcts);

        setGpPassed(gpPassedSum);
        setGpPlanned(gpPlannedSum);

        setEymPlanned(eymPlannedSum);
        setEymPassed(eymPassedSum);

        setProjectPassed(projectPassedSum);
        setProjectPlanned(projectPlannedSum);

        setTpPassed(tpPassedSum);
        setTpPlanned(tpPlannedSum);

        setYpPassed(ypPassedSum);
        setYpPlanned(ypPlannedSum);

        setS1YPassed(s1YPassedSum);
        setS1BPassed(s1BPassedSum);

        setS2YPassed(s2YPassedSum);
        setS2BPassed(s2BPassedSum);

        setS3YPassed(s3YPassedSum);
        setS3BPassed(s3BPassedSum);

        setS4YPassed(s4YPassedSum);
        setS4BPassed(s4BPassedSum);

        setS5YPassed(s5YPassedSum);
        setS5BPassed(s5BPassedSum);

        setS6YPassed(s6YPassedSum);
        setS6BPassed(s6BPassedSum);

        setS1YPlanned(s1YPlannedSum);
        setS1BPlanned(s1BPlannedSum);

        setS2YPlanned(s2YPlannedSum);
        setS2BPlanned(s2BPlannedSum);

        setS3YPlanned(s3YPlannedSum);
        setS3BPlanned(s3BPlannedSum);

        setS4YPlanned(s4YPlannedSum);
        setS4BPlanned(s4BPlannedSum);

        setS5YPlanned(s5YPlannedSum);
        setS5BPlanned(s5BPlannedSum);

        setS6YPlanned(s6YPlannedSum);
        setS6BPlanned(s6BPlannedSum);

        if(passedEcts !== 0)
        {
            setCurrentGrade(weightedSum / passedEcts);
        }
    }
    return (
    <Flex align="center" justifyContent="center" flexDirection={"column"} overflow={"auto"}>
        <CircularProgress value={ectsPassedSum} color='blue.400'  size='250px' thickness='5px' min={0} max={240} mt={3}>
            <CircularProgressLabel fontSize={"0.2em"}>{ectsPassedSum+" "}ects</CircularProgressLabel>
        </CircularProgress>
        <Flex flexDirection={"column"} w={["100%", "75%", "50%"]} mb={4}>
            <Button as={RouterLink} to="/dit-planner/all" h={65}colorScheme="blue" borderRadius={0} mb={1}>
                Add Courses
            </Button>
        </Flex>
        <Card w={["100%", "75%", "50%"]} mb={4}>
            <CardHeader>
                <Heading sizes='xl'>Your Stats</Heading>
            </CardHeader>
            <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                <Box>
                    <Heading size='lg' mb={5}>Passed Overview</Heading>
                    <Stat>
                        <StatLabel>Average</StatLabel>
                        <StatNumber>{currentGrade.toFixed(2)}</StatNumber>
                    </Stat>
                    <Stat color={gpPassed >= 3 ? "green.300" : "white"}>
                        <StatLabel>Passed Γενικης Παιδειας</StatLabel>
                        <StatNumber>{gpPassed}/3</StatNumber>
                    </Stat>
                    <Stat color={ypPassed >= 18 ? "green.300" : "white"}>
                        <StatLabel>Passed Υποχρεωτικά</StatLabel>
                        <StatNumber>{ypPassed}/18</StatNumber>
                    </Stat>
                    <Stat color={eymPassed >= 4 ? "green.300" : "white"}>
                        <StatLabel>Passed Κατά Επιλογή Υποχρεωτικά</StatLabel>
                        <StatNumber>{eymPassed}/4</StatNumber>
                    </Stat>
                    <Stat color={projectPassed >= 1 ? "green.300" : "white"}>
                        <StatLabel>Passed Project</StatLabel>
                        <StatNumber>{projectPassed}/1</StatNumber>
                    </Stat>
                    <Stat color={tpPassed >= 2 ? "green.300" : "white"}>
                        <StatLabel>Passed Πτυχιακή/Πρακτική</StatLabel>
                        <StatNumber>{tpPassed}/2</StatNumber>
                    </Stat>
                    <Table>
                        <Thead>
                            <Tr>
                                <Td fontSize={['xs', 'xs', 'lg']}  px={0.5}>
                                    Category
                                </Td>
                                <Td fontSize={['xs', 'xs', 'lg']}  px={0.5}>
                                    Υποχρεωτικά
                                </Td>
                                <Td fontSize={['xs', 'xs', 'lg']}  px={0.5}>
                                    Bασικά
                                </Td>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr bg={(s1YPassed >= 2 && s1BPassed >= 4) ? "green.300" : "transparent"}>
                                <Td>
                                    S1
                                </Td>
                                <Td>
                                    {s1YPassed}/2
                                </Td>
                                <Td>
                                    {s1BPassed}/4
                                </Td>
                            </Tr>
                            <Tr bg={(s2YPassed >= 2 && s2BPassed >= 4) ? "green.300" : "transparent"}>
                                <Td>
                                    S2
                                </Td>
                                <Td>
                                    {s2YPassed}/2
                                </Td>
                                <Td>
                                    {s2BPassed}/4
                                </Td>
                            </Tr>
                            <Tr bg={(s3YPassed >= 2 && s3BPassed >= 4) ? "green.300" : "transparent"}>
                                <Td>
                                    S3
                                </Td>
                                <Td>
                                    {s3YPassed}/2
                                </Td>
                                <Td>
                                    {s3BPassed}/4
                                </Td>
                            </Tr>
                            <Tr bg={(s4YPassed >= 2 && s4BPassed >= 4) ? "green.300" : "transparent"}>
                                <Td>
                                    S4
                                </Td>
                                <Td>
                                    {s4YPassed}/2
                                </Td>
                                <Td>
                                    {s4BPassed}/4
                                </Td>
                            </Tr>
                            <Tr bg={(s5YPassed >= 2 && s5BPassed >= 4) ? "green.300" : "transparent"}>
                                <Td>
                                    S5
                                </Td>
                                <Td>
                                    {s5YPassed}/2
                                </Td>
                                <Td>
                                    {s5BPassed}/4
                                </Td>
                            </Tr>
                            <Tr bg={(s6YPassed >= 2 && s6BPassed >= 4) ? "green.300" : "transparent"}>
                                <Td>
                                    S6
                                </Td>
                                <Td>
                                    {s6YPassed}/2
                                </Td>
                                <Td>
                                    {s6BPassed}/4
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </Box>
                <Box>
                    <Heading size='lg' mb={5}>Planned Overview</Heading>
                    <Stat>
                        <StatLabel color={ectsPlannedSum >= 240 ? "green.300" : "white"}>Planned ECTS</StatLabel>
                        <StatNumber color={ectsPlannedSum >= 240 ? "green.300" : "white"}>{ectsPlannedSum}/240</StatNumber>
                    </Stat>
                    <Stat>
                        <StatLabel color={gpPlanned === 3 ? "green.300" : "white"}>Planned Γενικης Παιδειας</StatLabel>
                        <StatNumber color={gpPlanned === 3 ? "green.300" : "white"}>{gpPlanned}/3</StatNumber>
                    </Stat>
                    <Stat>
                        <StatLabel color={ypPlanned === 18 ? "green.300" : "white"}>Planned Υποχρεωτικά</StatLabel>
                        <StatNumber color={ypPlanned === 18 ? "green.300" : "white"}>{ypPlanned}/18</StatNumber>
                    </Stat>
                    <Stat>
                        <StatLabel color={eymPlanned >= 4 ? "green.300" : "white"}>Planned Κατα Επιλογή Υποχρεωτικά</StatLabel>
                        <StatNumber color={eymPlanned >= 4 ? "green.300" : "white"}>{eymPlanned}/4</StatNumber>
                    </Stat>
                    <Stat>
                        <StatLabel color={projectPlanned >=1 ? "green.300" : "white"}>Planned Project</StatLabel>
                        <StatNumber color={projectPlanned >= 1 ? "green.300" : "white"}>{projectPlanned}/1</StatNumber>
                    </Stat>
                    <Stat>
                        <StatLabel color={tpPlanned >=2 ? "green.300" : "white"}>Planned Πτυχιακή/Πρακτική</StatLabel>
                        <StatNumber color={tpPlanned >= 2 ? "green.300" : "white"}>{tpPlanned}/2</StatNumber>
                    </Stat>                   
                    <Table>
                        <Thead>
                            <Tr>
                                <Td fontSize={['xs', 'xs', 'lg']}  px={0.5}>
                                    Category
                                </Td>
                                <Td fontSize={['xs', 'xs', 'lg']}  px={0.5}>
                                    Υποχρεωτικά
                                </Td>
                                <Td fontSize={['xs', 'xs', 'lg']}  px={0.5}>
                                    Bασικά
                                </Td>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr bg={(s1YPlanned >= 2 && s1BPlanned >= 4) ? "green.300" : "transparent"}>
                                <Td>
                                    S1
                                </Td>
                                <Td>
                                    {s1YPlanned}/2
                                </Td>
                                <Td>
                                    {s1BPlanned}/4
                                </Td>
                            </Tr>
                            <Tr bg={(s2YPlanned >= 2 && s2BPlanned >= 4) ? "green.300" : "transparent"}>
                                <Td>
                                    S2
                                </Td>
                                <Td>
                                    {s2YPlanned}/2
                                </Td>
                                <Td>
                                    {s2BPlanned}/4
                                </Td>
                            </Tr>
                            <Tr bg={(s3YPlanned >= 2 && s3BPlanned >= 4) ? "green.300" : "transparent"}>
                                <Td>
                                    S3
                                </Td>
                                <Td>
                                    {s3YPlanned}/2
                                </Td>
                                <Td>
                                    {s3BPlanned}/4
                                </Td>
                            </Tr>
                            <Tr  bg={(s4YPlanned >= 2 && s4BPlanned >= 4) ? "green.300" : "transparent"}>
                                <Td>
                                    S4
                                </Td>
                                <Td>
                                    {s4YPlanned}/2
                                </Td>
                                <Td>
                                    {s4BPlanned}/4
                                </Td>
                            </Tr>
                            <Tr  bg={(s5YPlanned >= 2 && s5BPlanned >= 4) ? "green.300" : "transparent"}>
                                <Td>
                                    S5
                                </Td>
                                <Td>
                                    {s5YPlanned}/2
                                </Td>
                                <Td>
                                    {s5BPlanned}/4
                                </Td>
                            </Tr>
                            <Tr  bg={(s6YPlanned >= 2 && s6BPlanned >= 4) ? "green.300" : "transparent"}>
                                <Td>
                                    S6
                                </Td>
                                <Td>
                                    {s6YPlanned}/2
                                </Td>
                                <Td>
                                    {s6BPlanned}/4
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </Box>
                </Stack>
            </CardBody>
        </Card>
    </Flex>)
}