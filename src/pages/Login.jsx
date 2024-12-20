import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { BASE_URL } from '../utils/constants';
import { showToast } from '../utils/showToast';

import { useDispatch } from 'react-redux';
import { addUser } from '../redux/slices/userSlice';

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        emailId: "",
        password: ''
    });

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleLogin = async (e) => {
        try {
            e.preventDefault();
            const response = axios.post(`${BASE_URL}/auth/login`,
                formData,
                { withCredentials: true }
            )

            dispatch(addUser((await response).data))
            return navigate("/feed");

        } catch (error) {
            showToast("error", error?.response?.data?.message || "Something went wrong!")
        }
    }

    return (
        <div className='flex flex-col items-center justify-center my-7'>
            <strong className='text-3xl'>Welcome to Dev-Tiner</strong>

            <form className="w-80 flex flex-col gap-4 mx-auto my-7" onSubmit={handleLogin}>
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
                        autoFocus
                        type="text"
                        className="grow"
                        name="emailId"
                        placeholder="Email"
                        value={formData.emailId}
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
                        type="password"
                        className="grow"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </label>
                <button type='submit' onSubmit={handleLogin} className="btn btn-success">Submit</button>
            </form>
        </div>
    );
};

export default Login;
