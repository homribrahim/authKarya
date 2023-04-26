import { connect } from 'mongoose'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './comps/navbar'

const Home = () => {

    const [connectedUser, setConnectedUser] = useState({})

    const navigate = useNavigate()

    const getConnectedUserData = () => {

        setConnectedUser(JSON.parse(localStorage.getItem("user_data")))
    }

    useEffect(() => {

        getConnectedUserData()
        if (localStorage.getItem("user_data") === null) { //user not connected
            //redirect to login
            navigate("/login")
        }

    }, [])


    const em = (connectedUser.email)

    /* const lname = connectedUser.lastname .charAt(0).toUpperCase() + connectedUser.lastname.slice(1) */

    return (
        <>
            <Navbar />
            <h1>Hello <span style={{ color: "darkblue" }}>{em} </span></h1>
        </>
    )
}

export default Home