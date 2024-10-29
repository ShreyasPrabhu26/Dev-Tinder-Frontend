import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { removeUser } from '../redux/slices/userSlice';

import { BASE_URL } from '../utils/constants';
import Logo from "/Logo.png"

const NavBar = () => {
    const navigator = useNavigate();
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await axios.post(BASE_URL + "/auth/logout", {}, { withCredentials: true });
            dispatch(removeUser());
            return navigator("/login");
        } catch (error) {
            console.error(`Something went wrong!`);
        }
    }

    return (
        <div className="navbar bg-base-300">
            <Link to="/" className="flex-1 gap-3">
                <img src={Logo} alt="Dev Tinder" className='w-16 object-cover rounded-sm' />
                <strong className="text-xl">Dev Tinder</strong>
            </Link>
            {user ?
                <div className="flex-none gap-2">
                    <div className="dropdown dropdown-end flex items-center gap-4">
                        <p>Welcome, {user.firstName}</p>
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src={user.photoUrl} />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-44 w-52 p-2 shadow">
                            <li>
                                <Link to={"/profile"} className="justify-between">
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link to={"/connections"} className="justify-between">
                                    Connections
                                </Link>
                            </li>
                            <li>
                                <Link to={"/requests"} className="justify-between">
                                    Requests
                                </Link>
                            </li>
                            <li><button onClick={handleLogout}>Logout</button></li>
                        </ul>
                    </div>
                </div>
                :
                <div className="nav-buttons gap-7">
                    <button
                        className='bg-gray-600 p-2 rounded-md hover:scale-105 transition-all'
                        onClick={() => navigator("/login")}
                    >
                        Login
                    </button>
                    <button
                        className='bg-gray-600 p-2 rounded-md hover:scale-105 transition-all'
                        onClick={() => navigator("/signup")}
                    >
                        Sign Up
                    </button>
                </div>
            }
        </div>
    )
}

export default NavBar