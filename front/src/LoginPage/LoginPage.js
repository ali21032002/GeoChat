import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import { setMyLocation } from '../MapPage/mapSlice';
import LoginButton from './loginComponents/loginButton';
import LoginInput from './loginComponents/loginInput';
import Logo from './loginComponents/logo';
import './LoginPage.css';
import { getFakeLocation } from './FAKR_LOCATION';
import { connectWithSocketIOServer } from '../socketConnection/socketConn';
import { proceedWithLogin } from '../store/actions/loginPageActions';

const isUsernameValid = (username) => {
    return username.length > 0 && username.length < 10 && !username.includes(' ');
}

// const locationOptions = {
//     enableHighAccuracy: true,
//     timeout: 5000,
//     maximumAge: 0
// }

const LoginPage = () => {
    const [userName, setUserName] = useState('');
    const [locationErrorOccurred, setLocationErrorOccurred] = useState(false);

    const myLocation = useSelector((state) => state.map.myLocation);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = () => {
        proceedWithLogin({
            username: userName,
            coords: {
                lng: myLocation.lng,
                lat: myLocation.lat
            }
        });

        navigate('/map');
    }

    const onSuccess = (position) => {
        dispatch(setMyLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }));
    };

    const onError = (error) => {
        console.log('Error oraced on get Location : ');
        console.log(error);

        setLocationErrorOccurred(true);
    };


    useEffect(() => {
        // navigator.geolocation.getCurrentPosition(
        //     onSuccess,
        //     onError,
        //     locationOptions
        // );

        onSuccess(getFakeLocation());
    }, []);

    useEffect(() => {
        if (myLocation) {
            try {
                connectWithSocketIOServer();
            } catch (error) {
                console.log('error on connect to server ', error.message);
            }

        }
    }, [myLocation]);

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

