import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

const CourseSchema = Yup.object().shape({
  courseName: Yup.string().required('Course name is required'),
  ects: Yup.number()
    .typeError('ECTS must be a number')
    .required('ECTS is required')
    .min(1, 'ECTS must be at least 1'),
});

export const MakeCourse = ({ onMakeCourse }) => {
  const onSubmitForm = (values) => {
    onMakeCourse(values.courseName, values.ects);
  };

  return (
    <div className="mt-5 flex h-full w-full flex-col items-center gap-5">
      <h1 className="text-3xl font-bold">Make a Course</h1>
      <Card className="w-full p-3 sm:w-3/4 md:w-1/3">
        <CardContent className="pt-6">
          <Formik
            initialValues={{
              courseName: '',
              ects: '',
            }}
            validationSchema={CourseSchema}
            onSubmit={(values, { resetForm }) => {
              onSubmitForm(values);
              resetForm();
            }}
          >
            {({ errors, touched, handleSubmit, setFieldValue, values }) => (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="courseName"
                    className={cn(
                      errors.courseName && touched.courseName ? 'text-destructive' : ''
                    )}
                  >
                    Course Name
                  </Label>
                  <Field
                    as={Input}
                    id="courseName"
                    name="courseName"
                    placeholder="Enter course name"
                    className={cn(
                      errors.courseName && touched.courseName ? 'border-destructive' : ''
                    )}
                  />
                  {errors.courseName && touched.courseName && (
                    <p className="text-sm font-medium text-destructive">{errors.courseName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="ects"
                    className={cn(errors.ects && touched.ects ? 'text-destructive' : '')}
                  >
                    ECTS
                  </Label>
                  <Input
                    id="ects"
                    name="ects"
                    type="number"
                    min={1}
                    value={values.ects}
                    onChange={(e) => setFieldValue('ects', e.target.value)}
                    placeholder="ECTS"
                    className={cn(errors.ects && touched.ects ? 'border-destructive' : '')}
                  />
                  {errors.ects && touched.ects && (
                    <p className="text-sm font-medium text-destructive">{errors.ects}</p>
                  )}
                </div>

                <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                  Make
                </Button>
              </form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
};
