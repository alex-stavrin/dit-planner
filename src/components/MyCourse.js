import { Tr, Td } from "@chakra-ui/react";
import { Text, Icon } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { ChevronRightIcon } from '@chakra-ui/icons';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure
  } from '@chakra-ui/react'

import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Flex,
    Checkbox
} from '@chakra-ui/react';

export function MyCourse({course, onRemove, onChangeGrade, showActivity, onUpdateActivity, showGrade})
{
    useEffect(()=>{
        setGrade(course.grade);
    }, [course.grade])

    const [grade, setGrade] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleChange = (value) => {
        setGrade(value);
    };
  
    const handleSave = () => {

        let parsedGrade = parseFloat(grade);
        if(!isNaN(parsedGrade) && parsedGrade >= 0 && parsedGrade <= 10)
        {
            onChangeGrade(grade,course);
        }
    };

    const activityChanged = (event) => {
        onClose();
        onUpdateActivity(event.target.checked, course);
    }

    const onDropClassButton = () => {
        onRemove(course);
    }

    let gradeColor = "yellow.300";
    if(grade > 7)
    {
        gradeColor = "green.300";
    }

    if(grade == 10.0)
    {
        gradeColor = "pink.300";
    }

    return (<>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>{course.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Text mt={3}>Code {course.code}</Text>
                <Text mt={3}>ECTS {course.ECTS}</Text>
                <Text mt={3}>Category {course.category}</Text>
                <Text mt={3}>Semester {course.semester}</Text>
                <Flex alignItems={"center"} mt={3}>
                    <Text>Grade</Text>
                    <NumberInput defaultValue={0} min={0} max={10} ml={5} precision={1} step={0.5} value={grade} onChange={handleChange}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </Flex>
                {showActivity &&
                <Flex alignItems={"center"} mt={3}>
                    <Text>Current</Text>
                    <Checkbox
                        isChecked={course.isActive}
                        onChange={activityChanged}
                        ml={2}
                    >
                    </Checkbox>
                </Flex>}

            </ModalBody>

            <ModalFooter>
                <Button colorScheme="red" variant={"ghost"} onClick={onDropClassButton} mr={3}>Drop Class</Button>
                <Button colorScheme='blue' onClick={handleSave}>Save</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>

        <Tr key={course.code} _hover={{ bg: "blue.500", cursor: "pointer" } } onClick={onOpen}>
            <Td fontSize={['xs', 'xs', 'lg']}  px={0.25}>
                <Icon as={ChevronRightIcon} />
                {course.name}
            </Td>
            <Td fontSize={['xs', 'xs', 'lg']}  px={0.25}> 
                <Text>{course.code}</Text>
            </Td>
            <Td fontSize={['xs', 'xs', 'lg']}  px={0.25}>
                <Text>{course.ECTS}</Text>
            </Td>
            <Td fontSize={['xs', 'xs', 'lg']}  px={0.25}>
                <Text>{course.category}</Text>
            </Td>
            <Td fontSize={['xs', 'xs', 'lg']}  px={0.25}>
                <Text>{course.semester}</Text>
            </Td>
            {showGrade && <Td fontSize={['xs', 'xs', 'lg']}  px={0.25}>
                <Text color={gradeColor}>{course.grade}</Text>
            </Td>}
        </Tr>
    </>)
}