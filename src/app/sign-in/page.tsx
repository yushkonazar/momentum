"use client"

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react";



export default function SignInPage () {
    
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setLoading(true);
        
        const { error: signInError } = await authClient.signIn.email({ email, password });

        setLoading(false);

        if (signInError) {
            setError(signInError.message ?? "Не вдалось увійти");
        } else {
            router.push("/dashboard");
        }
    }

    return (
    <main className="min-h-screen flex items-center justify-center">
        <div className="bg-gray-700 flex flex-col w-80 py-6 items-center justify-center rounded-2xl">
            <h1 className="text-2xl mb-3 uppercase">Увійти</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <input 
                    value={email} 
                    type="email" 
                    placeholder="example@gmail.com" 
                    onChange={(e) => setEmail(e.target.value)} 
                    autoComplete="email"
                    required
                    className="bg-white text-black text-sm w-60 p-2 mb-3 rounded-full border border-blue-400 hover:border-blue-800 transition-colors duration-200"
                />
                <input 
                    value={password} 
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    placeholder="Пароль"
                    required
                    className="bg-white text-black text-sm w-60 p-2 mb-3 rounded-full border border-blue-400 hover:border-blue-800 transition-colors duration-200"
                />
                <button 
                    type="submit" disabled={loading}
                    className="bg-green-600 hover:bg-green-500 text-white text-sm py-1.5 w-full rounded-full border-2 border-gray-500 hover:border-gray-400 transition-colors duration-200"   
                >Увійти</button>
            </form>
            <p className="text-sm mt-3">
                Не маєш акаунта? {" "}
                <Link href="/sign-up" className="text-blue-700 hover:text-blue-500">Зареєструватись</Link>
            </p>
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        </div>
    </main>
    )
};