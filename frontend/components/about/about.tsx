import React from 'react';

function AboutPookies() {
    return (
            <p>The Pookies are a team started within a computer science course at Emory University in Atlanta, GA. They all come from different places across the country and started the project with varying levels of development experience. Over the course of just one semester, the Pookies were able to create this project, and Oanh and Austin adopted all the other Pookies as their children.

The above image shows (from left to right) Jonastin, Oansha, Jasaid, Auson, Sashathan, Zenanh, and Generation 1 Optimus Prime.</p>
    );
}


const About: React.FC = () => {
    return(
        <div className="bg-green-150 flex justify-center items-center h-screen w-screen">
            <AboutPookies />
        </div>
    );
};

export default About;
