import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../redux/slices/requestSlice";
import { BASE_URL } from "../utils/constants";
import { showToast } from '../utils/showToast';

const Requests = () => {
    const request = useSelector((store) => store.request);
    const dispatch = useDispatch();

    const reviewRequest = async (status, _id) => {
        try {
            await axios.post(
                `${BASE_URL}/request/review/${status}/${_id}`,
                {},
                { withCredentials: true }
            );
            dispatch(removeRequest(_id));
        } catch (err) {
            showToast("error", err?.message || "Something Went Wrong!");
        }
    };

    const fetchRequests = async () => {
        if (request) return;
        try {
            const res = await axios.get(`${BASE_URL}/user/requests/recived`, {
                withCredentials: true,
            });
            dispatch(addRequest(res.data.data));
        } catch (err) {
            showToast("error", err?.message || "Failed to fetch requests!");
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    return (
        <div className="text-center my-10">
            <h1 className="font-bold text-white text-3xl">Connection Requests</h1>
            {!request || request.length === 0 ? ( // Ensure you check if request exists and has items
                <h1 className="flex justify-center my-10">No Requests Found</h1>
            ) : (
                request.map((request) => {
                    const { _id, firstName, lastName, photoUrl, age, gender, about } =
                        request.fromUserId;

                    return (
                        <div
                            key={_id}
                            className="flex justify-evenly items-center m-4 p-4 rounded-lg bg-base-300 mx-auto w-[70%]"
                        >
                            <div>
                                <img
                                    alt="photo"
                                    className="w-20 h-20 rounded-full object-cover"
                                    src={photoUrl}
                                />
                            </div>
                            <div className="text-left mx-4">
                                <h2 className="font-bold text-xl">
                                    {firstName + " " + lastName}
                                </h2>
                                {age && gender && <p>{age + ", " + gender}</p>}
                                <p>{about}</p>
                            </div>
                            <div>
                                <button
                                    className="btn btn-error mx-2"
                                    onClick={() => reviewRequest("rejected", request._id)}
                                >
                                    Reject
                                </button>
                                <button
                                    className="btn btn-success mx-2"
                                    onClick={() => reviewRequest("accepted", request._id)}
                                >
                                    Accept
                                </button>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default Requests;
