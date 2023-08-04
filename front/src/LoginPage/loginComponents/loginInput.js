import React from "react";

const LoginInput = (props) => {

    const { userName, setUserName } = props;

    const handleValueChange = (e) => {
        setUserName(e.target.value);

        console.log(userName);
    }

    return <input
        className="l_page_input"
        value={userName}
        onChange={handleValueChange}
    />
};


export default LoginInput;