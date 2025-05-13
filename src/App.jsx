import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Home } from "./pages/Home";
import { Settings } from './pages/Settings';
import { coursesData } from "./coursesData";
import { coursesDataVersion } from './coursesDataVersion';
import { useState, useEffect } from "react";
import { AllCourses } from './pages/AllCourses';
import BurgerHeader from './components/BurgerHeader';
import { MakeCourse } from './pages/MakeCourse';
import { saveAs } from "file-saver"; // To export course data
import CurrentCourses from './pages/CurrentCourses';
import PassedCourses from './pages/PassedCourses';
import PlannedCourses from './pages/PlannedCourses';
import { useToast } from './hooks/use-toast';
import { Toaster } from './components/ui/toaster';

function App() {
  const [courses, setCourses] = useState([]);
  const { toast } = useToast();
  const [isFirstLoad, setFirstLoad] = useState(true);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
      // force dark mode
      setTheme("dark");
      if(isFirstLoad)
      {
          const savedCourses = localStorage.getItem("courses");
          const version = localStorage.getItem("version");
          if(!version)
          {
            if(!savedCourses)
            {
              // initial load
              setCourses(coursesData);
            }
            else
            {
              // very old sync
              syncSavedWithCourseData();
            }
            localStorage.setItem("version", coursesDataVersion);
          }
          else
          { 
            if(version !== coursesDataVersion)
            {
               // other version
              syncSavedWithCourseData();
              localStorage.setItem("version", coursesDataVersion);
            }
            else
            {
              // normal load
              setCourses(JSON.parse(savedCourses));
            }
          }
          setFirstLoad(false);
      }
  }, []);

  useEffect(() => {
    if(!isFirstLoad)
    {
      localStorage.setItem("courses", JSON.stringify(courses));   
    }
  }, [courses]);

  const resetData = () => {
    localStorage.setItem("courses", JSON.stringify(coursesData));   
    setCourses(coursesData);
    showToast("Data Reset", "All your data was deleted.", "success");
  };

  const makeCourse = (name, ECTS) => {
    let newCourse = {name, code: "MC" + name.substring(0, 2).toUpperCase() + courses.length, ECTS, category: "MC", hasCourse:true, userMade:true};
    setCourses(prevItems => [...prevItems, newCourse]);
    showToast("Course created", newCourse.name + " added to planned courses", "success");
  }

  const exportToFile = (data, fileName = "coursesData.json") => {
    // Get the current date
    const currentDate = new Date();

    // Format the date as YYYY-MM-DD
    const formattedDate = currentDate.toISOString().split("T")[0];

    // Append the date to the filename (useful if you have multiple saves)
    const fileNameWithDate = `coursesData_${formattedDate}.json`;

    const fileToSave = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    saveAs(fileToSave, fileNameWithDate);
  };

  const importFromFile = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const importedData = JSON.parse(event.target.result);
      // Assuming coursesData structure is valid
      setCourses(importedData);
      showToast(
        "Data Imported",
        "Your courses data has been successfully imported.",
        "success",
      );
    };
    reader.onerror = () => {
      showToast(
        "Import Failed",
        "There was an error importing the data.",
        "error",
      );
    };
    reader.readAsText(file);
  };

  const showToast = (title, description, status) => {
    toast({
      title,
      description,
      variant: status === "error" ? "destructive" : status === "success" ? "success" : "info",
      duration: 1000,
    });
  };

  const addHasCourse = (addedCourse) => {
      setCourses((prevCourses) =>
          prevCourses.map((course) =>
            course.code === addedCourse.code ? { ...course, hasCourse: true } : course
          )
      );
      showToast("Course Added", "Added " + addedCourse.name + " to planned courses", "success");
  };

  const removeHasCourse = (removedCourse) => {
      if(removedCourse.category === "MC")
      {
        const updatedArray = courses.filter(course => course.code !== removedCourse.code);
        setCourses(updatedArray);
        showToast("Custom Course Removed", "Removed " + removedCourse.name + " from courses because you dropped it.", "info");
      }
      else
      {
        setCourses((prevCourses) =>
            prevCourses.map((course) =>
              course.code === removedCourse.code ? { ...course, hasCourse: false, grade:0, isActive: false } : course
            )
        );
        showToast("Course Removed", "Removed " + removedCourse.name + " from planned courses", "info");
      }
  };

  const changeGrade = (newGrade, changedCourse) => {
    if(newGrade >= 0 && newGrade <= 10)
    {
      if(newGrade < 5 && changedCourse.grade >= 5)
        {
          showToast("Removed Passed Course", "Removed " + changedCourse.name + " from passed courses", "info");
        }
        setCourses((prevCourses) =>
            prevCourses.map((course) =>
                course.code === changedCourse.code ? { ...course, grade: newGrade } : course
            )
        );
        if(newGrade >= 5)
        {
            showToast("Passed Course!", "Added " + changedCourse.name + " to passed courses", "success");
        }
    }
  };

  const updateActivity = (newActivity, updatedCourse) => {
      setCourses((prevCourses) =>
          prevCourses.map((course) =>
              course.code === updatedCourse.code ? { ...course, isActive: newActivity } : course
          )
      );
      if(newActivity)
      {
          showToast("Added current course", "Added " + updatedCourse.name + " to current courses", "success");
      }
      else
      {
          showToast("Removed current course", "Removed " + updatedCourse.name + " from current courses", "info");
      }
  };

  const currentCourseState = (course) => {
    return course.isActive && !(course.grade >= 5) && course.hasCourse;
  }

  const plannedCourseState = (course) => {
    return course.hasCourse && !(course.isActive) && !(course.grade >= 5)
  }

  const passedCourseState = (course) => {
    return course.hasCourse && course.grade >= 5
  }

  // in case of an update to the courseData we need to transfer the user's saved data
  // into the new courseData data structure
  const syncSavedWithCourseData = () => {
    const notParsedCourses = localStorage.getItem("courses");
    if(notParsedCourses)
    {
      const savedCourses = JSON.parse(localStorage.getItem("courses"));
      let newCourses  = coursesData;
      savedCourses.forEach((itemOld) => {
        newCourses.forEach((itemNew) => {
          if(itemOld.code === itemNew.code)
          {
            itemNew.grade = itemOld.grade;
            itemNew.isActive = itemOld.isActive;
            itemNew.hasCourse = itemOld.hasCourse;
          }
        })
      })
      // add our own user courses
      savedCourses.forEach(course => {
        if(course.category === "MC")
        {
          newCourses.push(course);
        }
      });

      setCourses(newCourses);
      showToast("Synced Data", "Changes were made in the course data. Your data is synced. Look for any errors though", "success");
    }
    else
    {
      showToast("No saved data", "You have no saved data to sync", "error");
    }  
  }

  const noCurrentComponent = () => {
    return (
      <div className="w-full h-full flex items-center justify-center mt-5">
        <p className="text-center">
          You have no current classes. Find some in{" "}
          <ReactRouterLink to='/dit-planner/planned' className="text-blue-500">
            planned courses.
          </ReactRouterLink>
        </p>
      </div>
    );
  }

  const noPassedComponent = () => {
    return (
      <div className="w-full h-full flex items-center justify-center mt-5">
        <p>
          You have no passed classes. With a grade higher or equal to 5 it will be added here. Grade your classes in{" "}
          <ReactRouterLink to='/dit-planner/planned' className="text-blue-500">
            planned courses.
          </ReactRouterLink>
          {" "}or{" "}
          <ReactRouterLink to='/dit-planner/current' className="text-blue-500">
            current courses.
          </ReactRouterLink>
        </p>
      </div>
    );
  }

  const noPlannedComponent = () => {
    return (
      <div className="w-full h-full flex items-center justify-center mt-5">
        <p>
          You have no planned classes. Find some in{" "}
          <ReactRouterLink to='/dit-planner/all' className="text-blue-500">
            all courses.
          </ReactRouterLink>
        </p>
      </div>
    );
  }

  return (
    <div className={`flex w-full h-full flex-col ${theme === 'dark' ? 'dark' : ''}`}>
      <BurgerHeader/>
      <div className="overflow-auto">
        <Routes>
          <Route path="/dit-planner" element={<Home courses={courses}/>} />

          <Route path="/dit-planner/current" element=
          {<CurrentCourses courses={courses} removeHasCourse={removeHasCourse} changeGrade={changeGrade} updateActivity={updateActivity}
          currentCourseState={currentCourseState} showActivity={true} showGrade={false} noCurrentComponent={noCurrentComponent}/>}/>

          <Route path="/dit-planner/passed" element=
          {<PassedCourses courses={courses} removeHasCourse={removeHasCourse} changeGrade={changeGrade} updateActivity={updateActivity}
            passedCourseState={passedCourseState} noPassedComponent={noPassedComponent}/>}/>

          <Route path="/dit-planner/planned" element=
          {<PlannedCourses courses={courses} removeHasCourse={removeHasCourse} changeGrade={changeGrade} updateActivity={updateActivity}
            plannedCourseState={plannedCourseState} showActivity={true} showGrade={false} noPlannedComponent={noPlannedComponent}/>}/>

          <Route path='/dit-planner/all' element={<AllCourses courses={courses} onAdd={addHasCourse}/>}></Route>

          <Route path="/dit-planner/make" element={<MakeCourse onMakeCourse={makeCourse}/>} />

          <Route path="/dit-planner/settings" element={<Settings onResetData={resetData} onSyncData={syncSavedWithCourseData} onExportData={() => exportToFile(courses)} onImportData={importFromFile} version={coursesDataVersion} />} />
        </Routes>
      </div>
      <Toaster />
    </div>
  );
}

export default App;