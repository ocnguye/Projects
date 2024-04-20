import React from 'react';
import { useState } from 'react';
import image1 from './image1.png';
import image2 from './image2.png';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useSignIn } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {

  const [visibility, setVisibility] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { signIn, isLoaded, setActive } = useSignIn();

  const navigate = useNavigate();

  const onSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!isLoaded) {
      return;
    }

    try {
      const result = await signIn.create({
        identifier: userEmail,
        password: userPassword,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        navigate("/");      // navigate to home page on successful login

      }
      else {
        console.log(result);
      }

    } catch (err: any) {
      alert("Account not found, please try again.");
      console.error("error", err.errors[0].longMessage);
    }
  };

  return (
    <div className="bg-green-150 flex justify-center items-center h-screen w-screen">
      <div className="flex flex-row items-center bg-transparent h-full p-5 sm:p-10 md:p-20">
        <div className="bg-green-350 md:flex flex-col justify-between hidden h-full w-2/5 shadow-2xl">
          <h1 className="text-3xl font-bold pl-4 pt-4"> Angel Trading Co. </h1>
          <img src={image1} alt="img" className="object-contain h-4/5 w-full"></img>
          <p className="text-gray-800 text-l p-4 text-center"> The premier Smiski trading platform. </p>
        </div>

        <div className="bg-yellow-350 flex flex-col justify-start items-center h-fit p-5 md:h-full shadow-2xl">


          <div className="flex justify-end w-full pb-5 px-7 space-x-2 items-center">
            <p className="text-s"> Don't have an account? </p>
            <Link to="/signup" className="flex justify-center items-center text-s hover:scale-110 h-6 w-24 px-4 py-1 bg-green-350 text-black rounded-lg transition duration-300 ease-in-out hover:bg-green-450 outline outline-green-450 outline-3" >
              Register
            </Link>
          </div>

          <div className='flex w-fit justify-start'>
            <div className="flex flex-col w-full justify-center items-center">
              <h1 className="text-3xl font-bold "> Welcome to </h1>
              <h1 className="text-3xl font-bold "> Angel Trading Co.! </h1>
              <h3 className="text-lg font-bold pt-6"> Please sign in to your account. </h3>

              <div className="flex flex-col justify-between w-full px-3">
                <form onSubmit={onSignIn} className='w-full'>

                  {/* email input field */}
                  <p className=""> Email Address </p>
                  <label className='flex flex-col'>
                    <input name="Email" type="email" value={userEmail} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserEmail(e.target.value)} className="bg-gray-200 w-full lg:w-[300px] xl:w-96 rounded-lg" />
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
                        {
                          visibility ?
                            <AiFillEyeInvisible />
                            :
                            <AiFillEye />
                        }
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
                  {/* login button */}
                  <div className="flex justify-center mt-4">
                    <input type="submit" value="Log in!" className="hover:scale-110 w-32 bg-green-350 text-black py-2 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-green-450 outline outline-green-450 outline-3" />
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

export default Login;
