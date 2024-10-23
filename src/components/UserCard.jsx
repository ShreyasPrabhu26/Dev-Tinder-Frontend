import React from 'react'

const UserCard = ({ user }) => {
    const { firstName, lastName, photoUrl, age, gender, about } = user;
    const fullName = `${firstName} ${lastName}`;
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
                <div className="card-actions gap-10">
                    <button className="btn btn-error">IGNORE</button>
                    <button className="btn btn-success">INTRESTED</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard;