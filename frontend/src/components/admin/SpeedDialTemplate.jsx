import React, { useState } from 'react';
import { FaSlidersH } from 'react-icons/fa';

const SpeedDialTemplate = ({ actions }) => {
    const [open, setOpen] = useState(false);

    const toggleDial = () => {
        setOpen(!open);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <div className="relative">
                {/* Speed Dial Actions */}
                {open && (
                    <div className="absolute right-14 bottom-0 flex flex-col gap-3">
                        {actions.map((action, index) => (
                            <button
                                key={index}
                                onClick={action.action}
                                className="flex items-center gap-2 px-4 py-2 bg-red-700 text-white rounded shadow hover:bg-red-800 transition"
                                title={action.name}
                            >
                                {action.icon}
                                <span className="text-sm">{action.name}</span>
                            </button>
                        ))}
                    </div>
                )}

                {/* Toggle Button */}
                <button
                    onClick={toggleDial}
                    className="w-12 h-12 flex items-center justify-center bg-red-700 text-white rounded-full shadow-lg hover:bg-red-800 transition"
                    aria-label="Speed Dial Toggle"
                >
                    <FaSlidersH size={20} />
                </button>
            </div>
        </div>
    );
};

export default SpeedDialTemplate;
