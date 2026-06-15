import React, { useEffect, useState } from 'react'
import axios from 'axios'
import VolunteerDisplay from '../components/VolunteerDisplay'
import VolunteerRegister from '../components/VolunteerRegister'
const Home = () => {
    const [status, setStatus] = useState();
    const [data, setData] = useState();
    const fetchVolunteers = async () => {
        try {
            const backendUrl=import.meta.env.VITE_API_URL || 'http://localhost:3000'
            const volunteers = await axios.get(`${backendUrl}/api/admin/volunteers`)
            setStatus(volunteers.status)
            setData(volunteers)

        } catch (err) {
            setStatus(err.status);
        }
    }
    useEffect(() => {
        fetchVolunteers()
    }, [])
    return (
        <div className={`w-screen h-full relative  flex  items-center `} >
            {status == 200 ? <VolunteerDisplay data={data.data.volunteers} admin={data.data.admin} /> : <VolunteerRegister />}
        </div>
    )
}

export default Home