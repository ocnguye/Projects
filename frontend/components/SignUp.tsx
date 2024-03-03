import React from 'react';
import { useState } from 'react';
import image1 from './image1.png';
import image2 from './image2.png';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useSignUp } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {

    const [visibility, setVisibility] = useState(false);
    const [visibilityConfirm, setVisibilityConfirm] = useState(false);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userConfirmPassword, setUserConfirmPassword] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);

    const { isLoaded, setActive, signUp } = useSignUp();

    let navigate = useNavigate();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormSubmitted(true); // Set form as submitted
        
        if (!userName || !userEmail || !userPassword || !userConfirmPassword) {
            // Don't proceed if any field is empty
            return;
        }

        if (!isLoaded) {
            return;
        }

        try {
            const completeSignUp = await signUp.create({
                username: userName,
                firstName: userName,
                emailAddress: userEmail,
                password: userPassword,
            });

            await setActive({ session: completeSignUp.createdSessionId });
            navigate("/");  // navigate to home page on successful signup
            
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
            alert("There was an error signing up.");
        }
    };

    return (
        <div className="bg-green-150 flex justify-center items-center h-screen w-screen">
            <div className="flex flex-row items-center bg-transparent h-3/4 w-4/5">
                <div className="bg-green-350 flex flex-col justify-between h-full w-1/3 shadow-2xl">
                    <h1 className="text-3xl font-bold pl-4 pt-4"> Angel Trading Co. </h1>
                    <img src = { image1 } alt = "img" className = "h-4/5 w-11/12 pl-4"></img>

                    <div className="flex flex-col justify-end items-center w-full">
                        <p className="text-gray-800 text-l p-4 text-center"> The premier Smiski trading platform. </p>
                    </div>
                </div>
                
                <div className="bg-yellow-350 flex justify-center items-center relative h-full w-2/3 shadow-2xl">
                    
                    <div className="absolute top-4 right-32"> 
                        <p className = "text-s"> Already have an account? </p>
                    </div>

                    <div className="absolute top-4 right-4"> 
                        <Link to = "/login" className="flex justify-center items-center text-s hover:scale-110 h-6 w-24 px-4 py-1 bg-green-350 text-black rounded-lg transition duration-300 ease-in-out hover:bg-green-450 outline outline-green-450 outline-3" >
                        Log in
                        </Link>
                    </div>
                    

                    <div className = "absolute bottom-0 right-4">
                        <img src = { image2 } alt = "img" className = "h-96 w-64"></img>
                    </div>



                    <div className="flex flex-col h-4/5 pr-40">
                        <h1 className="text-4xl font-bold"> Welcome to </h1>
                        <h1 className="text-4xl font-bold"> Angel Trading Co.! </h1>
                        <h3 className = "text-lg font-bold pt-6"> Please register your account. </h3>

                        <div className = "flex flex-col justify-between h-2/5 pt-8">
                            <form onSubmit = {onSubmit}>

                                {/* username input field */}
                                <p className = ""> Username </p>
                                <label>
                                    <input name = "Username" type = "username" value = {userName} onChange = {(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)} className = "bg-gray-200 w-96 rounded-lg pl-1"/>
                                    <h4 className = "pt-1 text-xs">  
                                    {
                                        userName === "" && formSubmitted ? 
                                        <p className = "text-red-500"> Please enter a username. </p> 
                                        :
                                        <p className = "text-yellow-350"> text placeholder </p>
                                    }   
                                    </h4>
                                </label>

                                {/* email input field */}
                                <p className = "pt-1"> Email Address </p>
                                <label>
                                    <input name = "Email" type = "email" value = {userEmail} onChange = {(e: React.ChangeEvent<HTMLInputElement>) => setUserEmail(e.target.value)} className = "bg-gray-200 w-96 rounded-lg pl-1"/>
                                    <h4 className = "pt-1 text-xs">  
                                    {
                                        userEmail === "" && formSubmitted ? 
                                        <p className = "text-red-500"> Please enter an email. </p> 
                                        :
                                        <p className = "text-yellow-350"> text placeholder </p>
                                    }   
                                    </h4>
                                </label>

                                {/* password input field */}
                                <p className = "pt-1"> Password </p>
                                <label className="relative block">
                                    <input name="Password" type={(visibility === false) ? "password" : "text"} value = {userPassword} onChange = {(e: React.ChangeEvent<HTMLInputElement>) => setUserPassword(e.target.value)} className="bg-gray-200 w-96 rounded-lg pl-1"/>
                                    <h4 className = "pt-1 text-xs">  
                                    {
                                        userPassword === "" && formSubmitted ? 
                                        <p className = "text-red-500"> Please enter a password. </p> 
                                        :
                                        <p className = "text-yellow-350"> text placeholder </p>
                                    }   
                                    </h4>
                                    <div onClick={() => setVisibility(!visibility)} className="text-2xl text-gray-700 absolute inset-y-0 bottom-5 right-0 flex items-center pr-3">
                                        {
                                            visibility ?
                                            <AiFillEyeInvisible />
                                            :
                                            <AiFillEye />
                                        }
                                    </div>
                                </label>

                                {/* confirm password input field - does NOT get passed to Clerk signUp */}
                                <p className = "pt-1"> Confirm Password </p>
                                <label className="relative block">
                                    <input name="ConfirmPassword" type={(visibilityConfirm === false) ? "password" : "text"} value = {userConfirmPassword} onChange = {(e: React.ChangeEvent<HTMLInputElement>) => setUserConfirmPassword(e.target.value)}className="bg-gray-200 w-96 rounded-lg pl-1"/>
                                    <div onClick={() => setVisibilityConfirm(!visibilityConfirm)} className="text-2xl text-gray-700 absolute inset-y-0 right-0 flex items-center pr-3">
                                        {
                                            visibilityConfirm ?
                                            <AiFillEyeInvisible />
                                            :
                                            <AiFillEye />
                                        }
                                    </div>
                                </label>

                                {/* if password field is non-empty, check if passwords match or not */}
                                <h4 className = "pt-1 text-xs">  
                                    {
                                        userPassword !== "" ? 
                                        (userPassword === userConfirmPassword ) ?
                                        <p className = "text-green-600"> Passwords match! </p>  : <p className = "text-red-500"> ERROR: Passwords do not match. </p> 
                                        :
                                        <p className = "text-yellow-350"> btn gap placeholder </p>
                                    }   
                                </h4>
                                
                                {/* register button */}
                                <div className="flex justify-center mt-4">
                                    <input type = "submit" value = "Register!" className="hover:scale-110 w-32 bg-green-350 text-black py-2 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-green-450 outline outline-green-450 outline-3" /> 
                                </div>
                            </form>
                        </div>  

                    </div>     

                </div>
            </div>
            
        </div>
    );
};

export default SignUp;
