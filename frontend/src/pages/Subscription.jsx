import React from 'react';
import styles from './subscription.css'
import Header from '../components/header/Header';

import Buttons from '../components/subscription/button/Buttons';
import SubscriptionMain from '../components/subscription/main/SubscriptionMain';
import { useTheme } from '../utils/themeContext';


function Subscription() {

    return (
        <div className='subscription app.light'>


            <div class='flex justify-center flex-col '>
                <div className="subscription-text">Subscribe to unlock unlimited access</div>

                <Buttons />
            </div>
            <SubscriptionMain />
        </div>
    );
}

export default Subscription;
