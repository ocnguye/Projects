import React from 'react';
import image from './image.png';

const Login: React.FC = () => {

    return (
        <div className="bg-green-150 flex justify-center items-center h-screen w-screen">
            <div className="flex flex-row items-center bg-transparent h-3/4 w-4/5">
                <div className="bg-green-350 flex flex-col justify-between h-full w-1/3 shadow-2xl">
                    <h1 className="text-3xl font-bold pl-4 pt-4"> Angel Trading Co. </h1>
                    <img src = { image } alt = "img" className = "h-4/5 w-11/12 pl-4"></img>

                    <div className="flex flex-col justify-end items-center w-full">
                        <p className="text-gray-800 text-l p-4 text-center"> The premier Smiski trading platform. </p>
                    </div>
                </div>

                <div className="bg-yellow-350 flex justify-center items-center relative h-full w-2/3 shadow-2xl">
                    
                    <div className="absolute top-4 right-4"> 
                        <p> Already have an account? </p>
                    </div>

                    <div className="flex flex-col h-3/5 pr-56">
                        <h1 className="text-3xl font-bold"> Welcome to Angel Trading Co.! </h1>
                        <h3 className = "text-lg font-bold pt-6"> Please register your account. </h3>

                        <div className = "flex flex-col justify-between h-2/5 pt-12">
                            <p className = ""> Name </p>
                            <p className = ""> Email Address </p>
                            <p className = ""> Password </p>
                        </div>
                    </div>

                    

                        
                </div>
            </div>
        </div>
    );
};

export default Login;
