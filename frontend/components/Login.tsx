import React from 'react';

const Login: React.FC = () => {
    // Inline styles for the container
    const containerStyle = {
        backgroundColor: "#DFF0D8", 
        display: "flex", 
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
        height: "100vh",
        width: "100vw",
        margin: 0 // Ensure there's no margin around the edges
    };

    // Inline styles for the heading
    const headingStyle = {
        color: "#94CF6B"
    };

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>Angel Trading Co.</h1>
            <p className="text-red-900"> test</p>
        </div>
        
    );
};

export default Login;
