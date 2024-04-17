import React from 'react';
import aboutsmiskisimg from './aboutsmiskisimg.png';
import realpicofpookies from './realpicofpookies.png';

const About: React.FC = () => {
    return (
        <div className="bg-[#DFF0D8] md:flex md:justify-evenly md:items-center md:h-screen md:w-screen md:px-10 md:py-4 md:space-x-8 grid grid-cols-1 gap-3 ">
            <div className="bg-transparent flex flex-col justify-evenly md:h-full md:w-1/2 px-15 space-y-6">

                <img src={realpicofpookies} alt="Real picture of The Pookies" className="bg-yellow-100 rounded-xl flex h-1/3 w-full shadow-md"></img>

                <div className="bg-white flex flex-col h-2/3 w-full px-6 pt-4 space-y-2 shadow-md">
                    <h3 className='white'> Meet The Pookies </h3>
                    <p className='white'>
                        The Pookies started Angel Trading as a project for a computer science course at Emory University in Atlanta, GA. They all come from different places across the country and started the project with varying levels of development experience. Over the course of just one semester, the Pookies were able to start developing this project. Oanh and Austin also adopted all the other Pookies as their children.
                        <br></br><br></br>
                        The above image shows (from left to right) Jonastin, Oansha, Jasaid, Auson, Sashathan, Zenanh, and Generation 1 Optimus Prime.</p>
                </div>
                {/* <div className="h-2/3 w-full">
                    <whitePaper header="The Pookies" content="amogus"></whitePaper>
                </div> */}

            </div>

            <div className="bg-transparent md:flex md:flex-col md:justify-evenly md:h-full md:w-1/2 px-15 space-y-4">

                <div className="bg-white flex flex-col h-2/3 w-full px-6 pt-4 space-y-2 text-right shadow-md">
                    <h3 className="white"> About Angel Trading</h3>
                    <p className='white'>
                        The long-awaited site for Smiski trading and collecting is here! Angel Trading Co. provides a space to keep track of what Smiskis you already own in your Collection, create a Wishlist of Smiskis you’re looking for, and trade and sell Smiskis with other users!
                        <br></br><br></br>
                        Angel Trading is a work in progress, so feel free to contact us with questions, suggestions, and bug reports!
                    </p>
                </div>

                <img src={aboutsmiskisimg} alt="Smiskis drawing" className="bg-yellow-100 rounded-xl flex h-1/3 w-full shadow-md"></img>

            </div>
        </div>

    );
};

export default About;
