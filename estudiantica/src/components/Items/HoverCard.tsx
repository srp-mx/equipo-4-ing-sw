import React, { useState } from "react";

interface HoverCardProps {
    trigger: React.ReactNode; 
    content: React.ReactNode; 
    position?: 'top' | 'bottom' | 'left' | 'right';
}

const HoverCard = ({trigger, content, position = 'bottom'} : HoverCardProps ) => {
    const [isHovered, setIsHovered] = useState(false);
    
    const positionClasses = {
        top: 'bottom-full mb-2', 
        bottom: 'top-full mt-2', 
        left: 'right-full mr-2', 
        right: 'left-full ml-2',
    };

    return (
        <div className="relative inline-block">
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {trigger}
            </div>

            <div
                className={`absolute z-10 w-64 p-4 bg-white border border-gray-200 rounded-lg shadow-lg 
                    transition-opacity duration-300 ${
                        positionClasses[position]
                    } ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
                {content}
            </div>
        </div>
    );
};

export default HoverCard;