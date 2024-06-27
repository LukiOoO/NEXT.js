"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";


export default function TypeEmail() {
    const router = useRouter();
    const [email, setEmail] = React.useState("")
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const sendToBackend = async () => {
        try {
            
            await axios.post('/api/users/sendemailtoresetpass', { email });
            toast.success('Email sent successfully');
            router.push("/login")
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }


    return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ? "Processing" : "Reset password"}</h1>
        <hr />
        <label htmlFor="email">email</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            />
        <button
            onClick={sendToBackend}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Reset password</button>

        </div>
    )

}