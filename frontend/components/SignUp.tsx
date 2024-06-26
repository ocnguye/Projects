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

  const navigate = useNavigate();

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
      alert(err.errors[0].message);
    }
  };

  return (
    <div className="bg-green-150 flex justify-center items-center h-screen w-screen">
      <div className="flex flex-row items-center justify-center h-full bg-transparent p-5 sm:p-10 md:p-20">
        <div className="bg-green-350 md:flex flex-col justify-between hidden h-full w-2/5 shadow-2xl">
          <h1 className="text-3xl font-bold pl-4 pt-4"> Angel Trading Co. </h1>
          <img src={image1} alt="img" className="object-contain h-4/5 w-full"></img>
          <p className="text-gray-800 text-l p-4 text-center"> The premier Smiski trading platform. </p>
        </div>

        <div className="bg-yellow-350 flex flex-col justify-start items-center h-fit p-5 md:h-full shadow-2xl">

          <div className="flex justify-end w-full pb-5 px-7 space-x-2 items-center">
            <p className="text-lg"> Already have an account? </p>
            <Link to="/login" className="flex justify-center items-center text-s hover:scale-110 h-6 w-24 bg-green-350 text-black rounded-lg transition duration-300 ease-in-out hover:bg-green-450 outline outline-green-450 outline-3" >
              Log in
            </Link>
          </div>

          <div className='flex w-full justify-start'>
            <div className="flex flex-col w-full justify-center items-center">
              <h1 className="text-3xl font-bold "> Welcome to </h1>
              <h1 className="text-3xl font-bold "> Angel Trading Co.! </h1>
              <h3 className="text-lg font-bold pt-6"> Please register your account. </h3>

              <div className="flex flex-col justify-between w-full px-3">
                <form onSubmit={onSubmit} className='w-full'>
                  {/* username input field */}
                  <p className=""> Username </p>
                  <label className='flex flex-col'>
                    <input name="Username" type="username" value={userName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)} className="bg-gray-200 w-full lg:w-[300px] xl:w-96 rounded-lg" />
                    <h4 className="pt-1 text-xs">
                      {
                        userName === "" && formSubmitted ?
                          <p className="text-red-500"> Please enter a username. </p>
                          :
                          <p className="text-yellow-350"> text placeholder </p>
                      }
                    </h4>
                  </label>

                  {/* email input field */}
                  <p className="pt-1"> Email Address </p>
                  <label className='flex flex-col'>
                    <input name="Email" type="email" value={userEmail} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserEmail(e.target.value)} className="bg-gray-200 w-full lg:w-[300px] xl:w-96 rounded-lg pl-1" />
                    <h4 className="pt-1 text-xs">
                      {
                        userEmail === "" && formSubmitted ?
                          <p className="text-red-500"> Please enter an email. </p>
                          :
                          <p className="text-yellow-350"> text placeholder </p>
                      }
                    </h4>
                  </label>

                  {/* password input field */}
                  <p className="pt-1"> Password </p>
                  <label className="flex flex-col">
                    <div className='flex space-x-2'>
                      <input name="Password" type={(visibility === false) ? "password" : "text"} value={userPassword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserPassword(e.target.value)} className="bg-gray-200 w-full lg:w-[300px] xl:w-96 rounded-lg pl-1" />
                      <div onClick={() => setVisibility(!visibility)} className="text-2xl text-gray-700 items-center">
                        {visibility ? <AiFillEyeInvisible /> : <AiFillEye />}
                      </div>
                    </div>
                    <h4 className="pt-1 text-xs">
                      {
                        userPassword === "" && formSubmitted ?
                          <p className="text-red-500"> Please enter a password. </p>
                          :
                          <p className="text-yellow-350"> text placeholder </p>
                      }
                    </h4>
                  </label>

                  {/* confirm password input field - does NOT get passed to Clerk signUp */}
                  <p className="pt-1"> Confirm Password </p>
                  <label className="flex flex-col">
                    <div className='flex space-x-2'>
                      <input name="ConfirmPassword" type={(visibilityConfirm === false) ? "password" : "text"} value={userConfirmPassword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserConfirmPassword(e.target.value)} className="bg-gray-200 w-full lg:w-[300px] xl:w-96 rounded-lg pl-1" />
                      <div onClick={() => setVisibilityConfirm(!visibilityConfirm)} className="text-2xl text-gray-700 items-center">
                        {
                          visibilityConfirm ?
                            <AiFillEyeInvisible />
                            :
                            <AiFillEye />
                        }
                      </div>
                    </div>
                  </label>

                  {/* if password field is non-empty, check if passwords match or not */}
                  <h4 className="pt-1 text-xs">
                    {
                      userPassword !== "" ?
                        (userPassword === userConfirmPassword) ?
                          <p className="text-green-600"> Passwords match! </p> : <p className="text-red-500"> ERROR: Passwords do not match. </p>
                        :
                        <p className="text-yellow-350"> btn gap placeholder </p>
                    }
                  </h4>

                  {/* register button */}
                  <div className="flex justify-center mt-4 lg:w-[300px]">
                    <input type="submit" value="Register!" className="hover:scale-110 w-32 bg-green-350 text-black py-2 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-green-450 outline outline-green-450 outline-3" />
                  </div>
                </form>
              </div>
            </div>
            <div className="hidden lg:flex place-self-end">
              <img src={image2} alt="img" className="h-96 w-64 object-cover"></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
