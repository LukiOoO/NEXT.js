"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import {useRouter} from "next/navigation";

export default function ChangeUserPass() {
    
    const rouetr = useRouter(); 
    const [token, setToken] = useState("");
    const [canChange, setCanChange] = useState(false);
    const [password, setPassword] = useState({
        password_1: "",
        password_2: "",
    })
    const [noToken, setNoToken] = useState(false);
    const changePassword = async () => {
        try {
            await axios.post('/api/users/changeuserpass', {password : password.password_1, token: token});
            rouetr.push('/login');
        } catch (error:any) {
            console.log(error.response.data);
        }
    } 

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if(token.length > 0){
            setNoToken(false);
        }else{
            setNoToken(true);
        }
    }, [token])
    
    useEffect(() => {
        if (password.password_1 && password.password_2 != "" && password.password_1 === password.password_2){
            setCanChange(true);
        }else{
            setCanChange(false);
        }
    },[password.password_1, password.password_2])

    
    return (

        <div className="flex flex-col items-center justify-center min-h-screen py-2">
              <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="1password"
            type="password"
            value={password.password_1}
            onChange={(e) => setPassword({...password, password_1: e.target.value})}
            placeholder="first password"
            />
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="2password"
            type="password"
            value={password.password_2}
            onChange={(e) => setPassword({...password, password_2: e.target.value})}
            placeholder="seccond password"
            />
            {canChange && !noToken &&(
                <button
                onClick={changePassword}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Reset password</button>
            )}
            {!canChange && !noToken && (
                <div>
                    <h2 className="text-2xl bg-yellow-500 text-black">Passwords don't match</h2>
                </div>
            )}
            {noToken && (
                <div>
                    <h2 className="text-2xl bg-yellow-500 text-black">Auth porblem</h2>
                </div>
            )}
            </div>
    )
}