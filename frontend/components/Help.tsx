import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Help: React.FC = () => {
    // Initialize row open/closed state as an array of boolean values, all set to false initially
    const [openRows, setOpenRows] = useState<boolean[]>(new Array(6).fill(false));

    const toggleRow = (index: number) => {
        // Toggle the open state for the clicked row
        const updatedOpenRows = openRows.map((isOpen, i) => 
            i === index ? !isOpen : isOpen
        );
        setOpenRows(updatedOpenRows);
    };

    const rows = [
        { title: 'Trading', content: 'Information about trading.' },
        { title: 'Trade Listing', content: 'Details on trade listings.' },
        { title: 'Collections', content: 'Explore collections.' },
        { title: 'Verifications', content: 'Verification processes.' },
        { title: 'Report', content: 'Report issues or concerns.' },
        { title: 'Contact Us', content: <Link to='/contactus' className="text-black">Contact Us</Link> }
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
                            <div className="p-4 text-black">
                                {typeof row.content === 'string' ? row.content : row.content}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Help;
