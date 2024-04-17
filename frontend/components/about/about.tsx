import React from 'react';
import aboutsmiskisimg from './aboutsmiskisimg.png';
import realpicofpookies from './realpicofpookies.png';


const About: React.FC = () => {
    return(
        <div className="bg-[#DFF0D8] md:flex md:justify-evenly md:items-center md:h-screen md:w-screen md:px-10 md:py-4 md:space-x-8 grid grid-cols-1 gap-3 ">
            <div className="bg-transparent flex flex-col justify-evenly md:h-full md:w-1/2 px-15 space-y-4">

                <img src = {realpicofpookies} alt = "Real picture of The Pookies" className="bg-yellow-100 rounded-xl flex h-1/3 w-full"></img>
                
                <div className="bg-[#C3F49D] rounded-xl flex flex-col h-2/3 w-full">
                    
                    <strong className="text-green-600 text-3xl font-bold px-4 py-2 pt-4"> About The Pookies </strong> 
                        <p className='text-left px-4'>The Pookies are a team started within a computer science course at Emory University in Atlanta, GA. They all come from different places across the country and started the project with varying levels of development experience. Over the course of just one semester, the Pookies were able to create this project, and Oanh and Austin adopted all the other Pookies as their children.

The above image shows (from left to right) Jonastin, Oansha, Jasaid, Auson, Sashathan, Zenanh, and Generation 1 Optimus Prime.</p>
                </div>

            </div>

            <div className="bg-transparent md:flex md:flex-col md:justify-evenly md:h-full md:w-1/2 px-15 space-y-4">
                <div className="bg-[#C3F49D] rounded-xl flex flex-col h-2/3 w-full">
                    <h1 className="text-green-600 text-3xl text-right font-bold px-4 py-2 pt-4"> Angel Trading Co. </h1> 
                    <p className='text-right px-4'>The long-awaited site for Smiski trading is here! Angel Trading Co. provides a space to keep track of what Smiskis you already own in your Collection, create a Wishlist of Smiskis you’re looking for, and plan Smiski trades with other users!

Currently, Angel Trading Co. only offers [no trading yet. but you can totally make an account and read the about page! yayyyy]</p>
                </div>
                
                <img src = {aboutsmiskisimg} alt = "Smiskis drawing" className="bg-yellow-100 rounded-xl flex h-1/3 w-full"></img>

            </div>
        </div>

    );
};

export default About;
