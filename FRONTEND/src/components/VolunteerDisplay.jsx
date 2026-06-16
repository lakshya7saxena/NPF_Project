import React, { useState } from 'react'
import Logo from '../assets/Logo.avif'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const VolunteerDisplay = (props) => {
    const { data, admin } = props;
    const navigate = useNavigate();
    const [flag, setFlag] = useState(false)
    const handleClick = () => {
        setFlag(!flag)
    }
    const handleLogOut = async () => {
        const backendUrl=import.meta.env.VITE_API_URL || 'http://localhost:3000'
        await axios.post(`${backendUrl}/api/admin/logout`).then((res) => {
            alert("Logged Out Successfully")
            window.location.reload();
        }).catch((err) => {
            alert("Server Is Down")
        })
    }
    var content = ""
    if (data.length > 0) {
        content = data.map((elem, idx) => {
            return (
                <tr key={idx} className='hover:bg-[#111827]/30 transition-colors text-center'>
                    <td className='p-4 text-white whitespace-nowrap text-lg'>{elem.name}</td>
                    <td className='p-4 text-gray-300 font-mono text-lg'>{elem.email}</td>
                    <td className='p-4 text-gray-400 font-mono text-lg'>{elem.phone}</td>
                    <td className='p-4 text-gray-300 font-mono text-lg'>{elem.age}</td>
                    <td className='p-4 max-w-xs'>
                        <div className='flex flex-wrap justify-center gap-1.5'>
                            {elem.interests.map((interest, index) => {
                                return (
                                    <span key={index} className='bg-[#0D9488] border border-blue-500/20 text-white text-lg px-2 py-0.5 rounded-md'>{interest}</span>
                                )
                            })}
                        </div>
                    </td>
                    <td>
                        <div className='flex flex-col'>
                            {elem.registeredAt.slice(0,19).split('T').map((elem,idx)=>{
                                return <span key={idx}>{elem}</span>
                            })}
                        </div>
                    </td>
                </tr>
            )

        })
    } else {
        content = <div className='text-5xl  font-semibold flex flex-col items-center gap-8 m-5'>
            <tr>No Volunteers To Display...</tr>
        </div>
    }
    return (
        <div className='w-full h-screen p-3'>
            <div className='bg-[#1f2937] relative w-full max-h-5/6 mt-26 rounded-xl border border-gray-700/70 shadow-xl overflow-auto'>

                <table className='w-full  border-collapse'>
                    <thead>
                        <tr className='bg-[#111827]/60 text-xs  font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-700'>
                            <th className='p-4'>Name</th>
                            <th className='p-4'>Email</th>
                            <th className='p-4'>Phone</th>
                            <th className='p-4'>Age</th>
                            <th className='p-4'>Interests</th>
                            <th className='p-4'>Registered At</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-800 text-sm font-medium'>
                        {content}
                    </tbody>

                </table>
            </div>
            <nav className='md:text-2xl text-lg w-screen flex justify-between items-center text-[#ffccac] bg-[#0D9488] absolute top-0 p-4 left-0 font-bold'>
                <img src={Logo} alt="Logo"  className='md:w-16 md:h-16 w-8 h-8' />
                <h1 className='text-white text-center font-extrabold md:text-4xl'>Volunteer Applications Dashboard</h1>
                <button onClick={handleClick} className='bg-white cursor-pointer md:px-4 py-1 px-2 text-[#0D9488] capitalize rounded-md md:text-3xl'>{admin.username.slice(0, 1)}</button>
            </nav>
            {flag && (
                <div className='absolute top-16 right-2 mt-2 w-48 bg-[#0c0e28] border border-gray-700 rounded-xl shadow-xl z-50 py-1 overflow-hidden  duration-150 '>
                    <div className='px-4 py-2.5 border-b border-gray-700 text-lg text-gray-400'>Signed In as <br /> <span className='font-semibold text-gray-200'>{admin.username}</span> </div>
                    <button className='w-full text-left px-4 py-2 text-lg text-gray-300 hover:bg-gray-800 transition-colors'>Settings</button>
                    <button onClick={handleLogOut} className='w-full cursor-pointer text-left px-4 py-2 text-lg text-rose-400 hover:bg-rose-500/10 transition-colors font-medium border-t border-gray-700/50'>Logout</button>
                </div>
            )}
        </div>

    )
}

export default VolunteerDisplay
