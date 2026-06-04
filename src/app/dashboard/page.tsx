import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";


export default async function DashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/sign-in")
    }

    return(
        <main>
            <h1>Вітаю, {session?.user.name}</h1>
            <p>{session?.user.email}</p> 
        </main>
    )
}