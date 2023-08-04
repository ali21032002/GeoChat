
import React from "react";

const LoginButton = ({ onClickHandler, disabled }) => {
    return <button
        className='l_page_login_button'
        disabled={disabled}
        onClick={onClickHandler}>Login</button>
}

export default LoginButton;