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
                answer: 'A: To make a trade, navigate to the Trading page, select the assets you want to trade, and follow the instructions.'
            }
        },
        { 
            title: 'Trade Listing', 
            content: {
                question: 'Q: How can I list a trade?',
                answer: 'A: To list a trade, go to the Trade Listing section, fill out the form with your trade details, and submit.'
            }
        },
        { 
            title: 'Collections', 
            content: {
                question: 'Q: How do I make a trade?',
                answer: 'A: To make a trade, navigate to the Trading page, select the assets you want to trade, and follow the instructions.'
            }
        },
        { 
            title: 'Verifications', 
            content: {
                question: 'Q: How do I make a trade?',
                answer: 'A: To make a trade, navigate to the Trading page, select the assets you want to trade, and follow the instructions.'
            }
        },
        { 
            title: 'Report', 
            content: {
                question: 'Q: How do I make a trade?',
                answer: 'A: To make a trade, navigate to the Trading page, select the assets you want to trade, and follow the instructions.'
            }
        },
        { 
            title: 'Contact Us', 
            content: {
                question: 'Q: How do I make a trade?',
                answer: 'A: To make a trade, navigate to the Trading page, select the assets you want to trade, and follow the instructions.'
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
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Help;
