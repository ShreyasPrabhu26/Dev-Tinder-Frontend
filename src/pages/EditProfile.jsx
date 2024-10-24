import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/slices/userSlice";
import { BASE_URL } from "../utils/constants";
import UserCard from "../components/UserCard";
import { showToast } from "../utils/showToast";

const EditProfile = () => {
    const user = useSelector((store) => store.user);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        photoUrl: '',
        age: '',
        gender: '',
        about: '',
    });

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const saveProfile = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.patch(
                `${BASE_URL}/profile/edit`,
                formData,
                { withCredentials: true }
            );
            dispatch(addUser(res?.data?.data));
            showToast("success", "Profile updated successfully.");
        } catch (error) {
            if (error.status === 400) {
                showToast("error", "Data Validation Failed!")
            } else {
                showToast("error", "Something went wrong!");
            }
        }
    };

    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                photoUrl: user.photoUrl || '',
                age: user.age || '',
                gender: user.gender || '',
                about: user.about || '',
            });
        }
    }, [user]);

    return (
        <>
            <div className="flex justify-center my-10">
                <UserCard
                    user={formData}
                    isProfileEdit={true}
                />
                <div className=" flex justify-center mx-10 card bg-base-300 w-[50%] shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title justify-center">Edit Profile</h2>
                        <div className="grid grid-cols-2 gap-3">
                            <label className="form-control w-full max-w-xs my-2">
                                <div className="label">
                                    <span className="label-text">First Name:</span>
                                </div>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    className="grow input input-bordered w-full max-w-xs"
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="form-control w-full max-w-xs my-2">
                                <div className="label">
                                    <span className="label-text">Last Name:</span>
                                </div>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    className="grow input input-bordered w-full max-w-xs"
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="form-control w-full max-w-xs my-2">
                                <div className="label">
                                    <span className="label-text">Photo URL :</span>
                                </div>
                                <input
                                    type="text"
                                    name="photoUrl"
                                    value={formData.photoUrl}
                                    className="grow input input-bordered w-full max-w-xs"
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="form-control w-full max-w-xs my-2">
                                <div className="label">
                                    <span className="label-text">Age:</span>
                                </div>
                                <input
                                    type="text"
                                    name="age"
                                    value={formData.age}
                                    className="grow input input-bordered w-full max-w-xs"
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="form-control w-full max-w-xs my-2">
                                <div className="label">
                                    <span className="label-text">Gender:</span>
                                </div>
                                <input
                                    type="text"
                                    name="gender"
                                    value={formData.gender}
                                    className="grow input input-bordered w-full max-w-xs"
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <label className="form-control w-full max-w-xs my-2">
                            <div className="label">
                                <span className="label-text">About:</span>
                            </div>
                            <textarea
                                type="text"
                                name="about"
                                maxLength={50}
                                value={formData.about}
                                className="grow input input-bordered w-full max-w-xs"
                                onChange={handleChange}
                            />
                        </label>
                        <div className="card-actions justify-center m-2">
                            <button className="btn btn-primary" onClick={saveProfile}>
                                Save Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditProfile;
