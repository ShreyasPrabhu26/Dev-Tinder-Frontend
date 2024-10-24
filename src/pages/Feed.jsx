import React, { useEffect, useState } from 'react'
import axios from 'axios';

import { BASE_URL } from '../utils/constants';

import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../redux/slices/feedSlice';

import { showToast } from '../utils/showToast';

import UserCard from '../components/UserCard';
import Loader from '../components/Loader';

const Feed = () => {
    const [isLoading, setIsLoading] = useState(false);

    const feed = useSelector((store) => store.feed);
    const dispatch = useDispatch();

    const getFeed = async () => {
        if (feed?.length) return;
        setIsLoading(true)
        try {
            const response = await axios.get(`${BASE_URL}/user/feed`, { withCredentials: true });
            dispatch(addFeed(response.data));
        } catch (error) {
            console.error(error);
            showToast("error", error?.response?.data?.message || "Something went wrong!")
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getFeed()
    }, []);

    return (
        <div>
            {isLoading ? (
                <Loader />
            ) : (
                feed?.length ? (
                    feed.map((user) => <UserCard key={user.id} user={user} />)
                ) : (
                    <p>No feed available</p>
                )
            )}
        </div>
    );

}

export default Feed