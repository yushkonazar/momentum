"use client"

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation"
import { useState } from "react";

export default function SignOutButton() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleButton(){
        setLoading(true);

        await authClient.signOut();

        setLoading(false);

        router.push("/sign-in")
    }

    return(
        <button type="button" disabled={loading} onClick={handleButton}>Вийти</button>
    )
}