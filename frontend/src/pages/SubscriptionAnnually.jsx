import React from 'react';
import styles from './subscription.css'
import Header from '../components/header/Header';

import Buttons from '../components/subscription/button/Buttons';

import { useTheme } from '../utils/themeContext';
import SubscriptionAnnually from '../components/subscription/main/SubscriptionAnnually';


function Subscription() {

    return (
        <div className='subscription app.light'>


            <div class='flex justify-center flex-col '>
                <div className="subscription-text">Subscribe to unlock unlimited access</div>

                <Buttons />
            </div>
            <SubscriptionAnnually/>
        </div>
    );
}

export default Subscription;
