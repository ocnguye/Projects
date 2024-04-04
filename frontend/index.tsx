import React from 'react';

// reusable white "paper" component: a white card with a drop shadow.
// header: the text in the header.
// content: text, can include any content. should follow the "white" color scheme.
// wrap inside a div of proper size.
const whitePaper = ({ header, content }) => {
    return (
        <div className='bg-white flex flex-col h-full w-full px-6 pt-4 space-y-2 shadow-2x1'>
            <h3 className='white'>
                {header}
            </h3>
            <div>
                {content}
            </div>

        </div>
    );
};

// reusable yellow "paper" component: yellow card with a drop shadow.
// header: the text in the header.
// content: text, can include any content. should follow the "yellow" color scheme.
const yellowPaper = ({ header, content }) => {
    return (
        <div className='bg-yellow-350 flex flex-col justify-evenly items-center shadow-2x1'>
            <h3 className='yellow'>
                {header}
            </h3>
            <div>
                {content}
            </div>

        </div>
    );
};
