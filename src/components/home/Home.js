import React from 'react'
import { useNavigate } from 'react-router-dom'
import classes from './Home.module.css'
const Home = () => {
    const navigate = useNavigate()
    const logoutHandler = () => {
        localStorage.removeItem("TOKEN");
        navigate('/')
    }
    return (
        <div className={classes.container}>
            <h1 className={classes.heading}>Welcome to Stirring Minds</h1>
            <div className={classes.content}>
                <h1>What We Do</h1>
                <p>Stirring Minds maintains a portfolio spanning multiple sectors. Disruptive technology is our unifying theme.</p>
            </div>
            <div>
                <button className={classes.btn} onClick={logoutHandler}>Logout</button>
            </div>

        </div >
    )
}

export default Home
