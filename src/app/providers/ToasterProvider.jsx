"use client";

import { Toaster } from "react-hot-toast";;

const ToasterProvider = () => {
    return (
        <Toaster position="top-center" toastOptions={{ loading: { className: "kontakt-toast-loading" }, success: { className: "kontakt-toast-success" }, error: { className: "kontakt-toast-error" } }} containerStyle={{ zIndex: 2147483647 }} reverseOrder={false}/>
    )
}

export default ToasterProvider