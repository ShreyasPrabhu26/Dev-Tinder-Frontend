import React, { useEffect, useState } from 'react'
import axios from 'axios';

import { BASE_URL } from '../utils/constants';

import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../redux/slices/feedSlice';

import { showToast } from '../utils/showToast';

import UserCard from './UserCard';
import Loader from './Loader';

const Feed = () => {
    const [isLoading, setIsLoading] = useState(true);

    const feed = useSelector((store) => store.feed);
    const dispatch = useDispatch();

    const getFeed = async () => {
        if (feed) return;
        try {
            const response = await axios.get(`${BASE_URL}/user/feed`, { withCredentials: true });
            dispatch(addFeed(response.data));
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            showToast("error", error?.response?.data?.message || "Something went wrong!")
        }
    }

    useEffect(() => {
        getFeed()
    }, []);

    return (
        <div>
            {isLoading ? <Loader /> : <UserCard user={feed[0]} />}
        </div>
    )
}

export default Feed