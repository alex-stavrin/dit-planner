import { FormControl, FormLabel, Select } from "@chakra-ui/react";

export function compareCourses(sortBy)
{
    switch(sortBy)
    {
        case "ects_in": return (a, b) => Number(a.ECTS) - Number(b.ECTS);
        case "ects_de": return (a, b) => Number(b.ECTS) - Number(a.ECTS);
        case "grade_in": return (a, b) => Number(a.grade) - Number(b.grade);
        case "grade_de": return (a, b) => Number(b.grade) - Number(a.grade);
        default: return (a, b) => Number(a.semester) - Number(b.semester);
    }
}

export function SortSelect({sortBy, onChangeSortBy, showGrade})
{
    return (
        <FormControl maxW={"300px"}>
            <FormLabel fontSize={"sm"} fontWeight={"semibold"} color={"gray.400"} mb={1}>
                Sort by
            </FormLabel>
            <Select value={sortBy} onChange={(e) => onChangeSortBy(e.target.value)}
                focusBorderColor={"blue.400"} borderRadius={"lg"} bg={"whiteAlpha.100"} cursor={"pointer"}
                _hover={{bg: "whiteAlpha.200"}}>
                <option value="semester">Semester</option>
                <option value="ects_de">ECTS (higher first)</option>
                <option value="ects_in">ECTS (lower first)</option>
                {showGrade && <option value="grade_de">Grade (higher first)</option>}
                {showGrade && <option value="grade_in">Grade (lower first)</option>}
            </Select>
        </FormControl>
    );
}
