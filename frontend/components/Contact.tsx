// @ts-nocheck
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
        <div className="bg-transparent flex flex-col justify-center items-center h-full w-full p-2">
            <div className="flex flex-col justify-center items-center pb-10">
                <h2 className="pb-6"> Contact Us </h2>
                <h3 className="green"> Need additional help? Submit a form! </h3>
                <h3 className="green"> Our team will get back to you within 2 business days. </h3>
            </div>

            <div className="bg-white flex flex-col items-center pt-4 pb-10 w-full sm:w-fit px-5 shadow-lg h-fit">
                <form ref={form} onSubmit={sendEmail}>

                    {/* name input field */}
                    <p className=""> Name </p>
                    <label>
                        <input name="user_name" type="name" value={userName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)} className="bg-gray-200 w-full rounded-lg pl-1" />
                        <h4 className="pt-1 text-xs">
                            {
                                userName === "" && formSubmitted ?
                                    <p className="text-red-500"> Please enter a name. </p>
                                    :
                                    <p className="text-transparent"> text placeholder </p>
                            }
                        </h4>
                    </label>

                    {/* email input field */}
                    <p className=""> Email Address </p>
                    <label>
                        <input name="user_email" type="email" value={userEmail} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserEmail(e.target.value)} className="bg-gray-200 w-full rounded-lg pl-1" />
                        <h4 className="pt-1 text-xs">
                            {
                                userEmail === "" && formSubmitted ?
                                    <p className="text-red-500"> Please enter an email. </p>
                                    :
                                    <p className="text-transparent"> text placeholder </p>
                            }
                        </h4>
                    </label>

                    {/* message input field */}
                    <p className=""> What can we do to help? </p>
                    <label>
                        <textarea
                            name="message"
                            value={userMessage}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setUserMessage(e.target.value)}
                            className="bg-gray-200 h-48 w-full sm:w-96 rounded-lg pl-1"
                        />
                        <h4 className="pt-1 text-xs">
                            {
                                userMessage === "" && formSubmitted ?
                                    <p className="text-red-500"> Please enter a message. </p>
                                    :
                                    <p className="text-transparent"> text placeholder </p>
                            }
                        </h4>
                    </label>

                    {/* submit button */}
                    <div className="flex justify-center mt-4">
                        <input type="submit" value="Send" className="hover:scale-110 w-32 bg-green-350 text-black py-2 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-green-450 outline outline-green-450 outline-3" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Contact;
