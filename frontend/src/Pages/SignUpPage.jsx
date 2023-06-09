import React, { useState, setState, useEffect } from "react";
import "../css/SignUpPage.css";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
	const [name, setFirstName] = useState("");
	const [username, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [department, setDepartment] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [file, setFile] = useState([]);
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);
	const fileTypes = ["image/png", "image/jpeg", "image/jpg"];

 	const nav = useNavigate();
  	const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (id === "name") {
      setFirstName(value);
    }

    if (id === "username") {
      setLastName(value);
    }

    if (id === "email") {
      setEmail(value);
    }

    if (id === "password") {
      setPassword(value);
    }

    if (id === "confirmPassword") {
      setConfirmPassword(value);
    }

    if (id === "department") {
      setDepartment(value);
    }

    if (id === "fileInput") {
      setFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    // console.log(formErrors)
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("Form is valid");

      const formData = new FormData();
      formData.append("first_name", name);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("department", department);
      formData.append("password", password);
      formData.append("photo", file, file.name);

			console.log(formData);

			axios.post("http://127.0.0.1:5000/authentication/signup/student", formData, {
				headers: {
					"Content-Type": "multipart/form-data" // set content type header
				}
			})
            .then((Response) => {
                if(Response.status === 200){
                    console.log("User added successfully");
                    nav("/student/signin");
                }
            })
            .then((data) => console.log(data))
            .catch((error) => console.log(error));

            // !!! TODO: Redirect to login page after successful signup 
		}
	}
  )

  const validate = () => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const domain = "iith.ac.in"
    const domain_regex = /iith\.ac\.in/gm;

    if (!name) {
      errors.name = "First Name is required *";
    }

    if (!username) {
      errors.username = "Last Name is required *";
    }

    if (!email) {
      errors.email = "Email is required *";
    }

    if (!regex.test(email)) {
      errors.email = "Invalid email address !";
    }

    if(!domain_regex.test(email) || !email.includes(domain)){
      errors.email = "Email must be an iith.ac.in domain !";
    }

    if (!department) {
      errors.department = "Department is required *";
    }

    if (!password) {
      errors.password = "Password is required *";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Confirm Password is required *";
    }

    if (password && password.length < 6) {
      errors.password = "Password must be at least 6 characters !";
    }

    if (password && (password === name || password === username)) {
      errors.password = "Password cannot be the same as first or last name !";
    }

    if (password && password === email) {
      errors.password = "Password cannot be the same as email !";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match !";
    }

    if (file && !fileTypes.includes(file.type)) {
      errors.file = "File type not supported ! Use jpg, png or jpeg";
    }

    return errors;
  };

  const handleSubmit = () => {
    setFormErrors(validate());
    console.log(
      name,
      username,
      email,
      department,
      password,
      confirmPassword,
      file
    );
    setIsSubmit(true);
  };

  return (
    <div className="signupform">
      <div className="form-body">

        <h2 className="heading">Registration Form</h2>
        <div className="name">


          <label className="form__label" htmlFor="name">
            Name
          </label>
          <input
            className="form__input"
            type="text"
            id="name"
            value={name}
            onChange={(e) => handleInputChange(e)}
            placeholder="Enter your name"
          />
        </div>

			<div className="username">
				<label className="form__label" htmlFor="username">
					Username
				</label>
				<input
					type="text"
					name=""
					id="username"
					value={username}
					className="form__input"
					onChange={(e) => handleInputChange(e)}
          placeholder="Enter your username"
				/>
			</div>
			{formErrors.username && <p>{formErrors.username}</p>}

        <div className="email">
          <label className="form__label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form__input"
            value={email}
            onChange={(e) => handleInputChange(e)}
            placeholder="Enter your email"
          />
        </div>
        {formErrors.email && <p>{formErrors.email}</p>}

        <div className="department">
          <label className="form__label" htmlFor="department">
            Department
          </label>
          <input
            type="text"
            id="department"
            className="form__input"
            value={department}
            onChange={(e) => handleInputChange(e)}
            placeholder="Enter your Department"
          />
        </div>
        {formErrors.department && <p>{formErrors.department}</p>}

        <div className="password">
          <label className="form__label" htmlFor="password">
            Password
          </label>
          <input
            className="form__input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => handleInputChange(e)}
            placeholder="Enter your password"
          />
        </div>
        {formErrors.password && <p>{formErrors.password}</p>}

        <div className="confirm-password">
          <label className="form__label" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="form__input"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => handleInputChange(e)}
            placeholder="Confirm your password"
          />
        </div>
        {formErrors.confirmPassword && <p>{formErrors.confirmPassword}</p>}

			<div className="uploadfile">
				<label htmlFor="fileInput">Choose a file(max 10mb):</label>
				<input
					type="file"
					id="fileInput"
					onChange={(e) => handleInputChange(e)}
				/>
			</div>
			{formErrors.file && <p>{formErrors.file}</p>}
		{/* </div> */}

		<div className="footer">
			<button className="button-three" onClick={() => handleSubmit()} type="submit">
				Register
			</button>
		</div>

      {/* <div className="footer">
        <button
          className="fluid ui button blue"
          onClick={() => handleSubmit()}
          type="submit"
          class="btn"
        >
          Register
        </button> */}
      </div>
    </div>
  );
};