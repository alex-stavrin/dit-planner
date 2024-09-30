import { Thead, Tr, Table, Td, Tbody, Box} from "@chakra-ui/react";
import { Course } from "../components/Course";
import { FilterBar } from "../components/FilterBar";
import { useState } from 'react';
import { allCategories, allSemesters } from "../coursesData";

export function AllCourses({courses, onAdd})
{
    const [selectedSemesters, setSelectedSemesters] = useState(allSemesters);
    const [selectedCategories, setSelectedCategories] = useState(allCategories);
    const [sortBy, setSortBy] = useState(null);

    const isFilteredCourse = (course) => {
       if (selectedSemesters.map(semester => semester.value).indexOf(course.semester) === -1) return false;
       if (selectedCategories.map(category => category.value).indexOf(course.category) === -1) return false;
        return true;
    }

    const ectsIn = (course1, course2) => {
        return parseInt(course1.ECTS) - parseInt(course2.ECTS);
    }

    const ectsDe = (course1, course2) => {
        return parseInt(course2.ECTS) - parseInt(course1.ECTS);
    }

    const alphabetical = (course1, course2) => {
        return course1.name.localeCompare(course2.name);
    }

    const defaultSorting = (course1, course2) => {
        return 0;
    }

    const getCompareFunction = () => {
        if (sortBy === null) {
            return defaultSorting;
        } else if (sortBy === "ECTS_in") {
            return ectsIn;
        } else if (sortBy === "ECTS_de") {
            return ectsDe;
        } else if (sortBy === "ALPHA") {
            return alphabetical;
        }   
        return defaultSorting;
    }

    return (<Box overflow={"auto"} size={['sm', 'md', 'lg']}>
        <FilterBar semesters={selectedSemesters} 
                   setSemesters={setSelectedSemesters} 
                   categories={selectedCategories} 
                   setCategories={setSelectedCategories} 
                   setSortBy={setSortBy} />
        <Table variant="simple" >
            <Thead>
                <Tr>
                    <Td fontSize={['xs', 'xs', 'lg']}  px={0.5}>
                        Course
                    </Td>
                    <Td fontSize={['xs', 'xs', 'lg']}  px={0.5}>
                        Code
                    </Td>
                    <Td fontSize={['xs', 'xs', 'lg']}  px={0.5}>
                        ECTS
                    </Td>
                    <Td fontSize={['xs', 'xs', 'lg']}  px={0.5}>
                        Category
                    </Td>
                    <Td fontSize={['xs', 'xs', 'lg']}  px={0.5}>
                        Semester
                    </Td>
                </Tr>
            </Thead>
            <Tbody>
  {[...courses]
    .sort(getCompareFunction(sortBy)) // Pass `sortBy` to get the correct compare function
    .map((course, index) => {
      // Filter and display courses
      if (!course.hasCourse && isFilteredCourse(course)) {
        return <Course course={course} key={index} onAdd={onAdd} />;
      } else {
        return null; // Use null instead of an empty JSX element
      }
    })}
</Tbody>
        </Table>
    </Box>);
}