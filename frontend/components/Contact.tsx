//@ts-nocheck
import React from 'react';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
    const [userEmail, setUserEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [userMessage, setUserMessage] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const form = useRef();

    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        
        setFormSubmitted(true);
        e.preventDefault();

        if (!userName || !userEmail || !userMessage) {
            // Don't proceed if any field is empty
            return;
        }
    
        emailjs.sendForm(import.meta.env.VITE_EMAILJS_SERVICE_ID, 'contact_form', form.current, import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
          .then(
            () => {
                console.log('SUCCESS!');
                // Clear the input fields 
                setUserEmail("");
                setUserName("");
                setUserMessage("");
                setFormSubmitted(false); 
                alert("Message sent!")
            },
            (error) => {
                console.log('FAILED...', error.text);
            },
          );
      };

    return (
        <div className="bg-green-150 flex flex-col justify-center items-center h-screen w-screen">
                <h1 className="text-4xl font-bold"> Contact Us </h1>
                <h3 className = "text-lg font-bold pt-6"> Need additional help? Submit a form! </h3>
                <h3 className = "text-lg font-bold pt-6"> Our team will get back to you within 48 hours. </h3>

                <div className = "flex flex-col justify-between h-3/5 pt-8">
                    <form ref = {form} onSubmit = {sendEmail}>

                        {/* name input field */}
                        <p className = ""> Name </p>
                        <label>
                            <input name = "user_name" type = "name" value = {userName} onChange = {(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)} className = "bg-gray-200 w-96 rounded-lg pl-1"/>
                            <h4 className = "pt-1 text-xs">  
                            {
                                userName === "" && formSubmitted ? 
                                <p className = "text-red-500"> Please enter a name. </p> 
                                :
                                <p className = "text-green-150"> text placeholder </p>
                            }   
                            </h4>
                        </label>
                        
                        {/* email input field */}
                        <p className = ""> Email Address </p>
                        <label>
                            <input name = "user_email" type = "email" value = {userEmail} onChange = {(e: React.ChangeEvent<HTMLInputElement>) => setUserEmail(e.target.value)} className = "bg-gray-200 w-96 rounded-lg pl-1"/>
                            <h4 className = "pt-1 text-xs">  
                            {
                                userEmail === "" && formSubmitted ? 
                                <p className = "text-red-500"> Please enter an email. </p> 
                                :
                                <p className = "text-green-150"> text placeholder </p>
                            }   
                            </h4>
                        </label>

                        {/* message input field */}
                        <p className = ""> What can we do to help? </p>
                        <label>
                        <textarea
                            name="message"
                            value={userMessage}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setUserMessage(e.target.value)}
                            className="bg-gray-200 h-48 w-96 rounded-lg pl-1"
                        />
                        <h4 className="pt-1 text-xs">  
                        {
                            userMessage === "" && formSubmitted ? 
                            <p className="text-red-500"> Please enter a message. </p> 
                            :
                            <p className="text-green-150"> text placeholder </p>
                        }   
                        </h4>
                        </label>
                        
                        {/* submit button */}
                        <div className="flex justify-center mt-4">
                            <input type = "submit" value = "Send" className="hover:scale-110 w-32 bg-green-350 text-black py-2 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-green-450 outline outline-green-450 outline-3" /> 
                        </div>
                    </form>
                </div>
        </div>
        );
    };
    
export default Contact;