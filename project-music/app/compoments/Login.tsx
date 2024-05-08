// components/LoginModal.tsx
"use client"

import React, { useState } from 'react';

const LoginModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <div className='flex w-full h-screen justify-center items-center flex-col'>
                <button onClick={openModal} className='flex justify-center items-center rounded-lg bg-yellow-400'>
                    Sign In
                </button>
                {isOpen && (
                <div className="modal">
                    <div className="modal-content">
                        {/* Login form can go here */}
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
            </div>

            
        </div>
    );
};

export default LoginModal;
