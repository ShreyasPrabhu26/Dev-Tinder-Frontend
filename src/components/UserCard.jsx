import React from 'react'
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../redux/slices/feedSlice';

import { showToast } from '../utils/showToast';
import { BASE_URL } from '../utils/constants';

const UserCard = ({ user, isProfileEdit = false }) => {
    const dispatch = useDispatch()
    const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
    const fullName = `${firstName} ${lastName}`;

    const handleSendRequest = async (status, userId) => {
        try {
            const res = await axios.post(
                `${BASE_URL}/request/send/${status}/${userId}`,
                {},
                { withCredentials: true }
            );
            dispatch(removeUserFromFeed(userId));
        } catch (error) {
            showToast("error", error?.message)
        }
    };


    return (
        <div className="card bg-base-100 w-96 shadow-xl mx-auto">
            <figure>
                <img
                    src={photoUrl}
                    alt={fullName}
                />
            </figure>
            <div className="card-body flex items-center justify-center">
                <strong className="card-title">{fullName}</strong>
                <p>{about}</p>
                <p>Age: {age}</p>
                {!isProfileEdit &&
                    <div className="card-actions gap-10">
                        <button
                            className="btn btn-error"
                            onClick={() => handleSendRequest("ignore", _id)}>
                            IGNORE
                        </button>
                        <button
                            className="btn btn-success"
                            onClick={() => handleSendRequest("intrested", _id)}>
                            INTRESTED
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}

export default UserCard;