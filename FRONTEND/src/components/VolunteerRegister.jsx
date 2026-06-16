import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../assets/Logo.avif'
axios.defaults.withCredentials = true
const VolunteerRegister = () => {
    const [flag, setFlag] = useState(false)
    const navigate = useNavigate();
    const handleClick = () => {
        setFlag(!flag)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const rawInterestsString = formData.get('interests');
        const cleanInterestsArray = rawInterestsString
            .split(',')
            .map(item => item.trim())
            .filter(item => item !== "");

        const finalPayload = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            age: Number(formData.get('age')),
            interests: cleanInterestsArray
        };
        const backendUrl=import.meta.env.VITE_API_URL || 'http://localhost:3000'
        await axios.post(`${backendUrl}/api/volunteers/register`, finalPayload).then((res) => {
            alert("Registration Successful!");
            e.target.reset()
        }).catch((err) => {
            alert("Server Is Down")
        })
    };
    return (
        <div className='h-screen flex flex-col gap-10'>
            <nav className='flex md:text-2xl text-sm justify-between relative font-bold bg-[#0D9488] p-4 items-center'>
                <img src={Logo} alt="Logo" className='md:w-16 md:h-16 w-8 h-8' />
                <h1 className='text-white text-center font-extrabold md:text-4xl md:tracking-widest uppercase md:ml-36 '>Naye Pankh Foundation</h1>
                <button onClick={handleClick} className='cursor-pointer rounded-2xl md:px-5 md:py-3 active:scale-95 bg-white text-[#0D9488] '>Admin DashBoard</button>
            </nav>
            {flag && (
                <div className='absolute top-18 right-5 mt-2 w-48 bg-white border border-gray-700 rounded-xl shadow-xl z-50 py-1 overflow-hidden  duration-150 '>
                    <button className='w-full cursor-pointer text-left px-4 py-2 text-lg text-[#0D9488] hover:bg-[#CCFBF1] transition-colors font-medium' onClick={()=>{navigate("/adminsignup")}}>Sign Up</button>
                    <button className='w-full cursor-pointer text-left px-4 py-2 text-lg text-[#0D9488] hover:bg-[#CCFBF1] transition-colors font-medium border-t border-gray-700/50' onClick={()=>{navigate("/adminlogin")}}>Login</button>
                </div>
            )}
            <div className="flex w-screen relative items-center justify-center p-4 font-sans">
                <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md border  border-slate-200 max-w-md w-full">

                    <div className="mb-6 text-center">
                        <h2 className="text-3xl font-extrabold text-gray-800">Volunteer Registration</h2>
                        <p className="text-lg text-gray-600 mt-1">Join NayePankh Foundation today</p>
                    </div>


                    <form onSubmit={handleSubmit} className="space-y-4">


                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-gray-800 uppercase">Full Name</label>
                            <input
                                type="text" required name="name"
                                placeholder="Aarav Patel"
                                className="px-3.5 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:bg-white text-gray-800 transition-all"
                            />
                        </div>


                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-gray-800 uppercase">Email Address</label>
                            <input
                                type="email" required name="email"
                                placeholder="aarav@gmail.com"
                                className="px-3.5 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:bg-white text-gray-800 transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="flex flex-col gap-1 col-span-2">
                                <label className="text-xs font-semibold text-gray-800 uppercase">Phone Number</label>
                                <input
                                    type="tel" required name="phone"
                                    placeholder="9876543210"
                                    className="px-3.5 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:bg-white text-gray-800 transition-all"
                                />
                            </div>
                            <div className="flex flex-col gap-1 col-span-1">
                                <label className="text-xs font-semibold text-gray-800 uppercase text-center">Age</label>
                                <input
                                    type="number" required name="age" min="1"
                                    placeholder="21"
                                    className="px-3.5 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:bg-white text-gray-800 text-center transition-all"
                                />
                            </div>
                        </div>


                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-gray-800 uppercase tracking-wide">
                                Interest/Hobbies
                            </label>
                            <input
                                type="text"
                                required
                                name="interests"
                                placeholder="e.g., Cricket, Book Reading, Diary Writing"
                                className="px-3.5 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:bg-white text-gray-800 transition-all"
                            />
                            <p className="text-[11px] text-gray-700 mt-0.5">
                                Separate your distinct interests using a comma ( , )
                            </p>
                        </div>

                        <button
                            type="submit"
                            className="w-full cursor-pointer mt-2 py-2.5 bg-[#0D9488] hover:bg-[#045d55] text-white font-bold text-sm rounded-xl transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                        >
                            Submit Form
                        </button>

                    </form>
                </div>
            </div>

        </div>
    )
}

export default VolunteerRegister

