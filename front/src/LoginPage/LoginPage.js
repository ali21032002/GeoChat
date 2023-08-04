import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginButton from './loginComponents/loginButton';
import LoginInput from './loginComponents/loginInput';
import Logo from './loginComponents/logo';

import './LoginPage.css';

const isUsernameValid = (username) => {
    return username.length > 0 && username.length < 10 && !username.includes(' ');
}

export default function LoginPage() {
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/map');
    }

    return (
        <div className='l_page_main_container'>
            <div className='l_page_box'>
                <Logo />
                <LoginInput userName={userName} setUserName={setUserName} />
                <LoginButton
                    onClickHandler={handleLogin}
                    disabled={!isUsernameValid(userName)} />
            </div>
        </div>
    )
}
