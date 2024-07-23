import React, { useState } from 'react';
import Layout from '../components/Layout/layout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    const getForgetPass = async () => {
        if (!email || !newPassword || !answer) {
            toast.error("All fields are required");
            return;
        }

        try {
            const response = await axios.post(`https://ebackend-kappa.vercel.app/api/forgotPassword`, {
                email, answer,newPassword, 
            });

            if (response && response.data.success) {
                toast.success("Password reset successfully");
                navigate("/login"); // Navigate to login or another appropriate page
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
        console.log(email,newPassword,answer)
    }

    return (
        <div>
            <Layout>
                <div className="main1">
                    <div className='register'>
                        <h2 className='heading'>Forgot Password</h2>
                        <div className="inputs">
                            <div>
                                <input
                                    type="email"
                                    placeholder='Enter your email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    placeholder='Enter your new password'
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder='Enter your favourite sport'
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                />
                            </div>
                            <div>
                                <button onClick={getForgetPass}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    );
}

export default ForgetPassword;
