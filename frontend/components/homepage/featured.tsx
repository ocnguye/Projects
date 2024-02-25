import React, { useState, useEffect } from 'react';

const Featured = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const texts = ['Text 1', 'Text 2', 'Text 3']; // Replace with your desired texts

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, 3000); // Change the interval duration as needed

        return () => clearInterval(interval);
    }, [texts.length]);

    return (
        <div style={{ height: 300, background: "#dff0d8", borderRadius: 20 }}> {/* Add the h-300 class */}
            <h2>{texts[currentIndex]}</h2>
        </div>
    );
};

export default Featured;
