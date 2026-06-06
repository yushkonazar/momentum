import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { editHabit } from "../../actions";
import { notFound } from "next/navigation";

export default async function EditPage({
    params,
}: {
    params: Promise<{id: string}>
}) {

    const session = await requireSession();

    const { id } = await params;
    const habit = await prisma.habit.findFirst({
        where: {id, userId: session.user.id},
    })

    if (!habit) notFound();

    return(
        <>
            <form action={editHabit}>
                <input type="hidden" name="habitId" value={habit.id}/>
                <input 
                    type="text" 
                    name="name"
                    defaultValue={habit?.name}
                />
                <select name="frequency" defaultValue={habit.frequency}>
                    <option value="daily">Щодня</option>
                    <option value="weekly">Щотижня</option>
                </select>
                <input 
                    type="color" 
                    name="color"
                    defaultValue={habit.color}
                />     
                <button type="submit">Редагувати</button>                           
            </form>
        </>
    )
}