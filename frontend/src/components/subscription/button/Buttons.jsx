import React, { useEffect, useState } from 'react';
import styles from './buttons.css';
import { Link } from "react-router-dom";

function Buttons() {
    const [activeSub, setActiveSub] = useState(localStorage.getItem('activeSub') || "monthly");

    // Function to handle click on a link
    const handleLinkClick = (linkName) => {
        setActiveSub(linkName === activeSub ? null : linkName);
        localStorage.setItem('activeSub', linkName === activeSub ? null : linkName);
    };

    useEffect(() => {
        const storedActiveLink = localStorage.getItem('activeSub');
        if (storedActiveLink) {
            setActiveSub(storedActiveLink);
        }
    }, []);

    return (
        <div className='Buttons'>
            <div
                className={`subscription-button monthly ${activeSub === 'monthly' ? 'active' : ''}`}
                onClick={() => handleLinkClick('monthly')}
            >
                <div className='subscription-button-text'>
                    <Link to="/subscription">Monthly</Link>
                </div>
            </div>

            <div
                className={`subscription-button annually ${activeSub === 'annually' ? 'active' : ''}`}
                onClick={() => handleLinkClick('annually')}
            >
                <div className='subscription-button-text'>
                    <Link to="/subscription-Annually">Annually</Link>
                </div>
            </div>
        </div>
    );
}

export default Buttons;
