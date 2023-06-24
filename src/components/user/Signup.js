import React, { useState } from 'react'
import classes from './User.module.css'
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [err, setErr] = useState("")
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: "",
        cpassword: ""
    })
    const changeHandler = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        await fetch("https://vk-stirringminds.onrender.com/user/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userDetails)
        }).then((response) => {
            return (response.json());
        }).then((data) => {
            if (data.status === "failed") {
                setErr(data.message)
            } else {
                navigate('/')
            }
        }).catch((err) => {
            setErr(err.message)
        })
    }

    return (
        <div className={classes.container}>
            <form className={classes.form} onSubmit={submitHandler}>

                <h1 className={classes.heading}>Sign up</h1>

                <div className={classes["input-controls"]}>
                    <label htmlFor='email'>Email:</label>
                    <input type="email" name='email' placeholder='Enter email' onChange={changeHandler} />
                </div>

                <div className={classes["input-controls"]}>
                    <label htmlFor='password'>Password:</label>
                    <input type="password" name='password' placeholder='Enter password' onChange={changeHandler} />
                </div>

                <div className={classes["input-controls"]}>
                    <label htmlFor='cpassword'>Confirm Password:</label>
                    <input type="password" name='cpassword' placeholder='Confirm password' onChange={changeHandler} />
                </div>

                <div className={classes["action-controls"]}>
                    <button type='submit' className={classes.btn}>Sign up</button>
                </div>

                <div>
                    <p className={classes.error}>{err}</p>
                </div>

                <div className={classes.check}>
                    <p>
                        Already registered ? <Link className={classes.navigate} to="/">Sign in</Link>
                    </p>
                </div>

            </form>
        </div>
    )
}

export default Signup;
