//@ts-nocheck
import React from 'react';
// import Contact from './Contact';

const Help: React.FC = () => {
    return (
        <div className="bg-green-100 h-4/5 flex flex-col items-center justify-center px-4 py-8">
            <div className="bg-green-150 w-3/4 md:w-1/2 lg:w-2/5 h-24 rounded-3xl flex items-center justify-center mb-24 shadow-lg">
                <p className="text-pink-300 text-3xl font-bold">Hi Pookie, how may we help?</p>
            </div>
            
            {/* grid */}
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {/* grid items */}
                    <div className="bg-green-150 h-48 rounded-xl flex items-center justify-center shadow-md">
                        <a href="#" className="text-black text-xl font-bold"> Trading </a>
                    </div>
                    <div className="bg-green-150 h-48 rounded-xl flex items-center justify-center shadow-md">
                        <a href="#" className="text-black text-xl font-bold"> Trade Listing </a>
                    </div>
                    <div className="bg-green-150 h-48 rounded-xl flex items-center justify-center shadow-md">
                        <a href="#" className="text-black text-xl font-bold"> Collections </a>
                    </div>
                    <div className="bg-green-150 h-48 rounded-xl flex items-center justify-center shadow-md">
                        <a href="#" className="text-black text-xl font-bold"> Verifications </a>
                    </div>
                    <div className="bg-green-150 h-48 rounded-xl flex items-center justify-center shadow-md">
                        <a href="#" className="text-black text-xl font-bold"> Report </a>
                    </div>
                    <div className="bg-green-150 h-48 rounded-xl flex items-center justify-center shadow-md">
                        <a href="#" className="text-black text-xl font-bold"> Contact Us </a>
                    </div>
            </div>
        </div>
    );
};

export default Help;
