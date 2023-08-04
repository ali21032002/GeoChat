import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginButton from './loginComponents/loginButton';
import LoginInput from './loginComponents/loginInput';
import Logo from './loginComponents/logo';
import './LoginPage.css';

const isUsernameValid = (username) => {
    return username.length > 0 && username.length < 10 && !username.includes(' ');
}


const locationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
}

const LoginPage = () => {
    const [userName, setUserName] = useState('');

    const [locationErrorOccurred, setLocationErrorOccurred] = useState(false);

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/map');
    }

    const onSuccess = (position) => {
        console.log(position)
    };

    const onError = (error) => {
        console.log('Error oraced on get Location : ');
        console.log(error);

        setLocationErrorOccurred(true);

    };


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            onSuccess,
            onError,
            locationOptions
        )
    }, []);

    return (
        <div className='l_page_main_container'>
            <div className='l_page_box'>
                <Logo />
                <LoginInput userName={userName} setUserName={setUserName} />
                <LoginButton
                    onClickHandler={handleLogin}
                    disabled={!isUsernameValid(userName) || locationErrorOccurred} />
            </div>
        </div>
    )
}
export default LoginPage;

