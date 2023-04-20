import React, { useEffect } from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import { useFormControl } from "@mui/material/FormControl";
import { FormControl } from "@mui/material";
import { Input } from "@mui/material";
import { InputLabel } from "@mui/material";
import { FormHelperText } from "@mui/material";

function CourseForm({ courseDetails, type }) {
  const [CourseName, setCourseName] = useState(
    courseDetails ? courseDetails.course_name : ""
  );
  const [CourseId, setCourseId] = useState(
    courseDetails ? courseDetails.course_id : ""
  );
  const [CourseInstructor, setCourseInstructor] = useState(
    courseDetails ? courseDetails.course_instructor : ""
  );
  const [CourseSlot, setCourseSlot] = useState(
    courseDetails ? courseDetails.course_slot : ""
  );
  const [CourseSem, setCourseSem] = useState(
    courseDetails ? courseDetails.course_sem : ""
  );
  const [CoreElective, setCoreElective] = useState(
    courseDetails ? courseDetails.core_elective : ""
  );
  const [CoursePrerequisites, setCoursePrerequisites] = useState(
    courseDetails ? courseDetails.course_prerequisites : []
  );

  const [errors, setErrors] = useState([]);
  const [CourseNameError, setCourseNameError] = useState(false);
  const [CourseIdError, setCourseIdError] = useState(false);
  const [CourseInstructorError, setCourseInstructorError] = useState(false);
  const [CourseSlotError, setCourseSlotError] = useState(false);
  const [CourseSemError, setCourseSemError] = useState(false);
  const [CoreElectiveError, setCoreElectiveError] = useState(false);

  const handleCourseNameChange = (event) => {
    setCourseName(event.target.value);
  };

  const handleCourseIdChange = (event) => {
    setCourseId(event.target.value);
  };

  const handleCourseInstructorChange = (event) => {
    setCourseInstructor(event.target.value);
  };

  const handleCourseSlotChange = (event) => {
    setCourseSlot(event.target.value);
  };

  const handleCourseSemChange = (event) => {
    setCourseSem(event.target.value);
  };

  const handleCoreElectiveChange = (event) => {
    setCoreElective(event.target.value);
  };

  const handleCoursePrerequisitesChange = (event) => {
    const course_list = event.target.value.split("\n");
    // console.log(course_list);
    setCoursePrerequisites(course_list);
  };

  const handleCourseNameBlur = () => {
    if (CourseName == "") {
      setCourseNameError(true);
    } else {
      setCourseNameError(false);
    }
  };
  const handleCourseIdBlur = () => {
    if (CourseId == "") {
      setCourseIdError(true);
    } else {
      setCourseIdError(false);
    }
  };
  const handleCourseInstructorBlur = () => {
    if (CourseInstructor == "") {
      setCourseInstructorError(true);
    } else {
      setCourseInstructorError(false);
    }
  };
  const handleCourseSlotBlur = () => {
    if (CourseSlot == "") {
      setCourseSlotError(true);
    } else {
      setCourseSlotError(false);
    }
  };
  const handleCourseSemBlur = () => {
    if (CourseSem == "") {
      setCourseSemError(true);
    } else {
      setCourseSemError(false);
    }
  };
  const handleCoreElectiveBlur = () => {
    if (CoreElective == "") {
      setCoreElectiveError(true);
    } else {
      setCoreElectiveError(false);
    }
  };

  const handleSubmit = async (event) => {
    // console.log(CourseNameError)
    event.preventDefault();
    if (
      CourseName == "" ||
      CourseId == "" ||
      CourseInstructor == "" ||
      CourseSlot == "" ||
      CourseSem == "" ||
      CoreElective == ""
    ) {
      setErrors([{ loc: [1], msg: "Input all the required fields" }]);
    } else {
      const formdata = {
        course_name: CourseName,
        course_id: CourseId,
        course_instructor: CourseInstructor,
        course_slot: CourseSlot,
        course_sem: CourseSem,
        core_elective: CoreElective,
        course_prerequisites: CoursePrerequisites,
      };

      const response =
        type == "add"
          ? axios.post("http://localhost:5000/admin/addcourse", formdata)
          : axios.put(
              `http://localhost:5000/admin/updatecourse/${formdata.course_id}`,
              formdata
            );

      const data = (await response).data;
      // console.log(data);
      if (data.success) {
        // Redirect to the success page
        
        console.log("AAAAAAAAAAAA",data)
      } else {
        // console.log("AAAAAAAAAAAA",data)
        setErrors(data.errors);
      }
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 2 },
        border: "solid",
      }}
      autoComplete
      autoCapitalize
    >
      {errors.map((error) => (
        <div key={error.loc.join("-")}>{error.msg}</div>
      ))}

      <TextField
        id="Name"
        label="Course Name"
        variant="outlined"
        required="true"
        onChange={handleCourseNameChange}
        onBlur={handleCourseNameBlur}
        error={CourseNameError}
        helperText={CourseNameError ? "This field is required" : ""}
        defaultValue={CourseName}
      />
      <TextField
        id="ID"
        label="Course ID"
        variant="outlined"
        required="true"
        onChange={handleCourseIdChange}
        onBlur={handleCourseIdBlur}
        error={CourseIdError}
        helperText={CourseIdError ? "This field is required" : ""}
        defaultValue={CourseId}
      />
      <br></br>
      <TextField
        id="Instructor"
        label="Course Instructor"
        variant="outlined"
        required="true"
        onChange={handleCourseInstructorChange}
        onBlur={handleCourseInstructorBlur}
        error={CourseInstructorError}
        helperText={CourseInstructorError ? "This field is required" : ""}
        defaultValue={CourseInstructor}
      />

      <TextField
        id="Course Slot"
        label="Course Slot"
        variant="outlined"
        required="true"
        onChange={handleCourseSlotChange}
        onBlur={handleCourseSlotBlur}
        error={CourseSlotError}
        helperText={CourseSlotError ? "This field is required" : ""}
        defaultValue={CourseSlot}
      />
      <br></br>
      <TextField
        id="Course Sem"
        label="Course Sem"
        variant="outlined"
        required="true"
        onChange={handleCourseSemChange}
        onBlur={handleCourseSemBlur}
        error={CourseSemError}
        helperText={CourseSemError ? "This field is required" : ""}
        defaultValue={CourseSem}
      />

      <TextField
        id="Core Elective"
        label="Core Elective"
        variant="outlined"
        required="true"
        onChange={handleCoreElectiveChange}
        onBlur={handleCoreElectiveBlur}
        error={CoreElectiveError}
        helperText={CoreElectiveError ? "This field is required" : ""}
        defaultValue={CoreElective}
      />
      <br></br>
      <TextField
        multiline
        id="Course Prerequisites"
        label="Course Prerequisites"
        variant="outlined"
        onChange={handleCoursePrerequisitesChange}
        helperText="Enter prerequisites in multiple lines"
        defaultValue={CoursePrerequisites.join("\r\n")}
      />
      <br></br>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
}

export default CourseForm;