import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {createHabit, deleteHabit} from "./actions";
import SignOutButton from "@/components/SignOutButton";
import { requireSession } from "@/lib/session";


export default async function DashboardPage() {
    const session = await requireSession();

    const habits = await prisma.habit.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" }
    });

    return(
        <main>
            <h1>Вітаю, {session.user.name}</h1>
            <p>{session.user.email}</p> 
            <SignOutButton />
            {habits.length === 0 
                ? <p>Поки немає звичок</p> 
                : <ul>{habits.map(habit => 
                        <li key={habit.id} className="flex gap-2">
                            <p>{habit.name}</p>
                            <Link href={`/dashboard/${habit.id}/edit`}>Редагувати</Link>
                            <form action={deleteHabit}>
                                <input type="hidden" name="habitId" value={habit.id} />
                                <button type="submit">Видалити</button>
                            </form>
                        </li>
                )}</ul>}
            <form action={createHabit}>
                <input type="text" name="name" />
                <select name="frequency">
                    <option value="daily">Щодня</option>
                    <option value="weekly">Щотижня</option>
                </select>
                <input type="color" name="color" defaultValue="#3b82f6" />
                <button type="submit">Створити</button>
            </form>

        </main>
    )
}