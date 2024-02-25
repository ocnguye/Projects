import { useState, useEffect } from 'react';

const Featured = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const texts = ['Featured Trading Events', 'Local Authorized Retailers', 'Smiski News'];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [texts.length]);

    return (
        <div style={{ display: "flex",flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", height: 400, background: "#F2DEDE", borderRadius: 20 }}>
            <p>{texts[currentIndex]}</p>
            <div style={{ position: "relative", top: 120, display: "flex", justifyContent: "center", }}>
                {texts.map((_, index) => (
                    <div
                        key={index}
                        style={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            margin: "0 5px",
                            background: index === currentIndex ? "black" : "gray",
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Featured;
