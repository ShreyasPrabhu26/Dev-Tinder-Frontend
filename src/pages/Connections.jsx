import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { showToast } from '../utils/showToast';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addconnections } from '../redux/slices/connectionSlice';

const Connections = () => {
    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const fetchConnections = async () => {
        if (connections && connections.length) return;
        try {
            const response = await axios.get(`${BASE_URL}/user/connections`, { withCredentials: true });
            dispatch(addconnections(response?.data?.data));
        } catch (error) {
            if (error?.status === 404) {
                showToast("error", "No Connections Yet!");
            } else showToast("error", error?.message || "Something Went Wrong!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    return (
        <div className="text-center my-10">
            <h1 className="font-bold text-white text-3xl">Connections</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (!connections) ? (
                <p>No Connections!</p>
            ) : (
                connections.map((connection) => {
                    const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;
                    return (
                        <div key={_id} className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
                            <div>
                                <img
                                    alt={`${firstName} ${lastName}'s profile photo`}
                                    className="w-20 h-20 rounded-full object-cover"
                                    src={photoUrl}
                                />
                            </div>
                            <div className="text-left mx-4">
                                <h2 className="font-bold text-xl">{`${firstName} ${lastName}`}</h2>
                                {age && gender && <p>{`${age}, ${gender}`}</p>}
                                <p>{about}</p>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default Connections;
