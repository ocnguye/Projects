//@ts-nocheck
import React from "react";
import { useRouteError, Link } from "react-router-dom";
import img from "./smiski404.webp"

const ErrorPage: React.FC = () => {
    const error = useRouteError();
    console.error(error);

    return (
      <div className="bg-green-150 flex flex-col justify-center items-center h-screen w-screen">
        <div className = "flex flex-row space-x-6 pb-52">
            <h1 className = "text-9xl"> 4 </h1>
            <img src = {img} className = "h-28 w-28" />
            <h1 className = "text-9xl"> 4 </h1>
        </div>

        <p className = "pb-4"> Sorry, an unexpected error has occurred. </p>
        <p className = "pb-6"> Let's get you back home. </p>

        <Link to = "/" className="flex justify-center items-center text-s hover:scale-110 h-12 w-32 bg-green-350 text-black rounded-lg transition duration-300 ease-in-out hover:bg-green-450 outline outline-green-450 outline-3" >
            Return Home
        </Link>
        
      </div>
    );
};

export default ErrorPage;
