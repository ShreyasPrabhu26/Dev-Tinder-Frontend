import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { BASE_URL, DEFAULT_PROFILE_PICTURE } from '../utils/constants';
import { showToast } from '../utils/showToast';

import { useDispatch } from 'react-redux';
import { addUser } from '../redux/slices/userSlice';

const SignUp = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        emailId: "",
        password: "",
        firstName: "",
        lastName: "",
        age: "",
        gender: "",
        photoUrl: "",
        about: "",
        skills: []
    });

    const [tagInput, setTagInput] = useState("");
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleTagInputKeyDown = (e) => {
        if (e.key === "Enter" && tagInput.trim()) {
            e.preventDefault();
            setFormData({
                ...formData,
                skills: [...formData.skills, tagInput.trim()]
            });
            setTagInput(""); // Clear the input after adding
        }
    };

    const removeSkill = (indexToRemove) => {
        setFormData({
            ...formData,
            skills: formData.skills.filter((_, index) => index !== indexToRemove)
        });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            formData.age = parseInt(formData.age)
            formData.photoUrl = formData.photoUrl ? formData.photoUrl : DEFAULT_PROFILE_PICTURE
            formData.gender = formData.gender.toLowerCase();
            const response = await axios.post(`${BASE_URL}/auth/signup`, formData, { withCredentials: true });

            dispatch(addUser(response.data));
            navigate("/feed");
        } catch (error) {
            showToast("error", error?.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <div className='flex flex-col justify-center items-center my-6'>
            <strong className='text-3xl'>Welcome to Dev-Tiner</strong>
            <form className="w-[50%] grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto my-7 signup-form" onSubmit={handleSignUp}>

                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input
                        type="text"
                        className="grow"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input
                        type="text"
                        className="grow"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path
                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input
                        type="email"
                        className="grow"
                        name="emailId"
                        placeholder="Email"
                        value={formData.emailId}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd" />
                    </svg>
                    <input
                        type="password"
                        className="grow"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        min={8}
                        max={20}
                        required
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70"
                    >
                        <path
                            d="M3 1a1 1 0 0 1 1 1v1h8V2a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h1V2a1 1 0 1 1 2 0v1ZM1 6v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6H1Zm3 3h2v2H4V9Zm3 0h2v2H7V9Zm3 0h2v2h-2V9ZM4 12h2v2H4v-2Zm3 0h2v2H7v-2Zm3 0h2v2h-2v-2Z"
                        />
                    </svg>

                    <input
                        type="number"
                        min={18}
                        max={100}
                        className="grow"
                        name="age"
                        placeholder="Age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70"
                    >
                        <path
                            d="M16.5 3a1 1 0 1 0 0 2h1.879l-5.586 5.586a6.5 6.5 0 1 0 1.414 1.414L19.793 6.414V8.5a1 1 0 1 0 2 0V3h-5.5ZM10 20a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Z"
                        />
                    </svg>

                    <input
                        type="text"
                        className="grow"
                        name="gender"
                        placeholder="Gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70"
                    >
                        <path
                            d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6ZM4 5h2.172l1.414-1.414A2 2 0 0 1 8.586 3h6.828a2 2 0 0 1 1.414.586L18.828 5H21a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2ZM12 9a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"
                        />
                    </svg>

                    <input
                        type="photoUrl"
                        className="grow"
                        name="photoUrl"
                        placeholder="Photo Url"
                        value={formData.photoUrl}
                        onChange={handleChange}
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd" />
                    </svg>
                    <input
                        type="text"
                        className="grow"
                        name="about"
                        maxLength={50}
                        placeholder="About"
                        value={formData.about}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label className="input input-bordered flex items-center gap-2">
                    <input
                        type="text"
                        className="grow"
                        placeholder="Add Skills (press Enter)"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagInputKeyDown}
                    />
                </label>

                <div className="tags-list flex gap-2 flex-wrap">
                    {formData.skills.map((skill, index) => (
                        <span key={index} className="badge badge-secondary flex items-center gap-1">
                            {skill}
                            <button
                                type="button"
                                onClick={() => removeSkill(index)}
                                className="ml-1 text-red-500 hover:text-red-700"
                            >
                                &times;
                            </button>
                        </span>
                    ))}
                </div>

                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        </div>
    );
};

export default SignUp;
