"use client"

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SignUpPage(){

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setLoading(true);

        const { error: signUpError  } = await authClient.signUp.email({email, password, name});

        setLoading(false);
        if (signUpError) {
            setError(signUpError.message ?? "Не вдалося зареєструватись")
        } else {
            router.push("/dashboard");
        }
    }

    return(
    <main className="min-h-screen flex items-center justify-center">
        <div className="bg-gray-700 flex flex-col w-80 py-6 items-center justify-center rounded-2xl">
            <h1 className="text-2xl mb-3 uppercase">Реєстрація</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <input 
                    value={name} 
                    type="text" 
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ім'я користувача"
                    required
                    className="bg-white text-black w-60 px-1.5 py-1.5 mb-3 rounded-full border border-blue-400 hover:border-blue-800 transition-colors duration-200"
                />
                <input 
                    value={email} 
                    type="email" 
                    placeholder="example@gmail.com" 
                    onChange={(e) => setEmail(e.target.value)} 
                    autoComplete="email"
                    required
                    className="bg-white text-black w-60 px-1.5 py-1.5 mb-3 rounded-full border border-blue-400 hover:border-blue-800 transition-colors duration-200"
                />
                <input 
                    value={password} 
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    placeholder="Пароль"
                    required
                    className="bg-white text-black w-60 px-1.5 py-1.5 mb-3 rounded-full border border-blue-400 hover:border-blue-800 transition-colors duration-200"
                />
                <button 
                    type="submit" disabled={loading}
                    className="bg-green-600 hover:bg-green-500 text-white text-sm py-1.5 w-40 rounded-full border-2 border-gray-500 hover:border-gray-400 transition-colors duration-200"   
                >Зареєструватись</button>
            </form>
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        </div>
    </main>
    );
}