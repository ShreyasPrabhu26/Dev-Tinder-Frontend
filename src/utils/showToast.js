import toast from "react-hot-toast";

export function showToast(status, message) {
    console.log(`Fuction called!`);
    toast[status](message);
}