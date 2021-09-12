import { toast } from 'react-toastify';
export const notify = (type, msg, autoClose) => {
    toast(msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: 'foo-bar',
        autoClose: autoClose,
        type: type,
    });
}