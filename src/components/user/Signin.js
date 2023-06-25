import React, { useState } from 'react'
import classes from './User.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

const Signin = () => {
    const [type, setType] = useState("password");
    const [icons, setIcons] = useState(faEyeSlash);

    const toggleHandler = () => {
        if (type === "password") {
            setIcons(faEye);
            setType("text");
        } else {
            setIcons(faEyeSlash);
            setType("password");
        }
    }

    const navigate = useNavigate();
    const [err, setErr] = useState("");
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: ""
    })
    const changeHandler = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        await fetch("https://vk-stirringminds.onrender.com/user/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userDetails)
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.status === "failed") {
                setErr(data.message)
            } else {
                localStorage.setItem("TOKEN", data.token);
                navigate("/homepage")
            }
        }).catch((err) => {
            setErr(err.message);
        })
    }

    return (
        <div className={classes.container}>
            <form className={classes.form} onSubmit={submitHandler}>

                <h1 className={classes.heading}>Sign in</h1>

                <div className={classes["input-controls"]}>
                    <label htmlFor='email'>Email:</label>
                    <input type="email" name='email' placeholder='Enter email' onChange={changeHandler} />
                </div>

                <div className={classes["input-controls"]}>
                    <label htmlFor='password'>Password:</label>
                    <div className={classes["inp-toggle"]}>
                        <input type={type} name='password' placeholder='Enter password' onChange={changeHandler} />
                        <span onClick={toggleHandler} ><FontAwesomeIcon icon={icons} /></span>
                    </div>
                </div>

                <div className={classes["action-controls"]}>
                    <button type='submit' className={classes.btn}>Sign in</button>
                </div>

                <div>
                    <p className={classes.error}>{err}</p>
                </div>

                <div className={classes.check}>
                    <p>
                        Don't have an account ? <Link className={classes.navigate} to="/signup">Sign up</Link>
                    </p>
                </div>

            </form>
        </div>
    )
}

export default Signin;
