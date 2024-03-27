import React from 'react';
import { useState } from 'react';

const Contact: React.FC = () => {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);

    const onSend = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormSubmitted(true);
     
        // try {
        //   const result = await .create({
        //     identifier: userEmail,
        //     password: userPassword,
        //   });

        // } catch (err: any) {
        //     alert("Account not found, please try again.")
        //     console.error("error", err.errors[0].longMessage)
        // }
      };

    return (
        <div className="bg-green-150 flex justify-center items-center h-screen w-screen">
        <h1>Contact Us</h1>
        <form>
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" />
            </div>
            <div>
                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message"></textarea>
            </div>
            <div>
                <button type="submit">Send</button>
            </div>
        </form>
    </div>
        );
    };
    
export default Contact;