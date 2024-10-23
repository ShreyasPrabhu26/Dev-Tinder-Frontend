import toast from "react-hot-toast";

export function showToast(status, message) {
    toast[status](message);
}