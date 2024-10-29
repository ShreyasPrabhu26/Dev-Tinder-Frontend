import React, { useEffect } from 'react'
import axios from 'axios'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants'
import { addUser } from '../redux/slices/userSlice'

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const userData = useSelector((store) => store.user);

    const fetchUser = async () => {
        if (userData) return;
        try {
            const user = await axios.get(`${BASE_URL}/profile/view`,
                { withCredentials: true }
            )
            dispatch(addUser(user.data));
            if (location.pathname === '/') {
                navigate("/feed");
            }
        } catch (error) {
            if (error.status === 401) {
                navigate("/signup");
            }
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Body