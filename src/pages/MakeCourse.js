import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Button,
  FormErrorMessage,
  Flex,
  Card,
  Heading
} from "@chakra-ui/react";

const CourseSchema = Yup.object().shape({
  courseName: Yup.string().required("Course name is required"),
  ects: Yup.number()
    .typeError("ECTS must be a number")
    .required("ECTS is required")
    .min(1, "ECTS must be at least 1"),
});

export const MakeCourse = ({onMakeCourse}) => {

  const onSubmitForm = (values) => {
    onMakeCourse(values.courseName, values.ects);
  }

  return (
    <Flex align="center" gap={5} flexDirection={"column"} w="100%" h="100%" mt={5}>
      <Heading>Make a Course</Heading>
      <Card w={['100%', '75%', '35%']} p={3}>
        <Formik
          initialValues={{
            courseName: "",
            ects: "",
          }}
          validationSchema={CourseSchema}
          onSubmit={(values, { resetForm }) => {
            onSubmitForm(values);
            resetForm();
          }}
        >
          {({ errors, touched, handleSubmit, setFieldValue, values }) => (
            <Form onSubmit={handleSubmit}>
              <FormControl isInvalid={errors.courseName && touched.courseName}>
                <FormLabel htmlFor="courseName">Course Name</FormLabel>
                <Field
                  as={Input}
                  id="courseName"
                  name="courseName"
                  placeholder="Enter course name"
                />
                <FormErrorMessage>{errors.courseName}</FormErrorMessage>
              </FormControl>
  
              <FormControl mt={4} isInvalid={errors.ects && touched.ects}>
                <FormLabel htmlFor="ects">ECTS</FormLabel>
                <NumberInput
                  min={1}
                  value={values.ects} // Bind the value from Formik
                  onChange={(value) => setFieldValue("ects", value)} // Update Formik field
                >
                  <NumberInputField id="ects" name="ects" placeholder="ECTS" />
                </NumberInput>
                <FormErrorMessage>{errors.ects}</FormErrorMessage>
              </FormControl>
  
              <Button mt={4} colorScheme="blue" type="submit">
                Make
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </Flex>
  );
};