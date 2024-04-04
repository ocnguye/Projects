//@ts-nocheck
import React, { useState } from 'react';
//import { Link } from 'react-router-dom';

const Help: React.FC = () => {
    const [openRows, setOpenRows] = useState<boolean[]>(new Array(6).fill(false));

    const toggleRow = (index: number) => {
        const updatedOpenRows = openRows.map((isOpen, i) => 
            i === index ? !isOpen : isOpen
        );
        setOpenRows(updatedOpenRows);
    };

    // Modify each row to include a question and answer
    const rows = [
        { 
            title: 'Trading', 
            content: {
                question: 'Q: How do I make a trade?',
                answer: 'A: To make a trade, navigate to the Trading page, select the assets you want to trade, and follow the instructions.',
                question1: 'Q: What if I dont like a certain trade?',
                answer1: 'A: You can always decline the trade offer or counter back with a new offer with less or more smiskis.',
                question2: 'Q: How long does a trade take to go through?',
                answer2: 'A: Once both parties accept it, the trade has been finalized, it is then up to both parties to determine how to ship and complete the trade.',
                question3: 'What if I never received my item?',
                answer3: 'A: You can use our report feature to report the user and submit evidence / proof including chat logs and pictures of the item you sent. You can also rate the user on their user profile to let other users know. We hold no liability for scams and frauds.'
            }
        },
        { 
            title: 'Trade Listing', 
            content: {
                question: 'Q: How can I list a trade?',
                answer: 'A: To list a trade, go to the Trade Listing section, fill out the form with your trade details, and submit.',
                question1: 'Q: What if I dont want to trade a specific smiski?',
                answer1: 'A: You can hide certain smiskis from your collection and remove it from your open trades listings',
                question2: 'Q: What happens after a trade?',
                answer2: 'A: The listing is automatically removed from your lists! Enjoy the new smiski!'
            }
        },
        { 
            title: 'Collections', 
            content: {
                question: 'Q: How do I log a smiski into my collection?',
                answer: 'A: To add a new smiski, simply go to the collections tab of your user profile and click the + sign. From there select the smiski you want or search for it and add it.',
                question1: 'Q: How do I view my collection?',
                answer1: 'A: Simply click on the collections tab in your user profile and scroll.'
            }
        },
        { 
            title: 'Verifications', 
            content: {
                question: 'Q: How do I know that my smiski is real?',
                answer: 'A: While we cannot give away the secrets of our verification process, you can trust with 100% certainty through our algorithm that the smiski is verified. They are verified through a rigous testing process with pictures and smiski experts.',
                question2: 'Q: What if my smiski does not get verified?',
                answer2: 'A: You can trust it will but if it does not there are two options. You can either resubmit it for verification through a ticket to our support team, or you may have a fraudulent smiski :('
            }
        },
        { 
            title: 'Report', 
            content: {
                question: 'Q: How do I report a user?',
                answer: 'A: If you believe a user has scammed you or sent a fraudulent smiski. Please submit a support ticket in our contact us tab as fast as possible. Be sure to provide chat logs, pictures, and anything else that may help. Unfortunately as we are only facilitating the trade, we cannot guarantee there are no fraudulent users, but we will try our best to resolve the dispute',
                question1: 'Q: How do I report a user?',
                answer1: 'A: You can leave them a bad review, letting others know of their fraudulant behavior, and submit a report ticket. If our team does find the user indicted of criminal behavior, we will ban them from the website.'
            }
        },
        { 
            title: 'Contact Us', 
            content: {
                question: 'Q: How do I contact Angel Trading?',
                answer: 'A: Simply scroll and click on the contact us page task bar and you can submit a request',
                question1: 'Q: What can I contact about?',
                answer1: 'A: You can contact us for help, reporting users, or anything that comes to mind. We will be happy to assist with anything even if thats just answering fanmail. You may leave us criticism and future updates youd like to see implemented in the website as well. '
            }
        },
    ];

    return (
        <div className="bg-green-100 flex flex-col items-center justify-center px-4 py-8 min-h-screen">
            <div className="bg-green-150 w-3/4 md:w-1/2 lg:w-2/5 h-24 rounded-3xl flex items-center justify-center mb-24 shadow-lg">
                <p className="text-pink-300 text-3xl font-bold">Hi Pookie, how may we help?</p>
            </div>
            <div className="w-full max-w-6xl flex flex-col gap-4">
                {rows.map((row, index) => (
                    <div key={index} className="bg-green-150 rounded-xl shadow-md overflow-hidden">
                        <div 
                            className="cursor-pointer p-4 text-black text-xl font-bold flex justify-between items-center transition duration-300 ease-in-out" 
                            onClick={() => toggleRow(index)}
                        >
                            {row.title}
                            <span className="text-lg">{openRows[index] ? '-' : '+'}</span>
                        </div>
                        <div
                            className={`transition-max-height duration-700 ease-in-out ${openRows[index] ? 'max-h-96' : 'max-h-0'} overflow-hidden`}
                        >
                            <div className="p-4 text-black bg-white">
                                {/* Display the question and answer */}
                                <p>{row.content.question}</p>
                                <p className="pt-2">{row.content.answer}</p>
                                <p className="pt-4">{row.content.question1}</p>
                                <p className="pt-2">{row.content.answer1}</p>
                                <p className="pt-4">{row.content.question2}</p>
                                <p className="pt-2">{row.content.answer2}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Help;