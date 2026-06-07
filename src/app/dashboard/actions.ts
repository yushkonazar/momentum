"use server"

import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createHabit(formData: FormData) {
    const session = await requireSession();

    const name = formData.get("name") as string;
    const frequency = formData.get("frequency") as string;
    const color = formData.get("color") as string;

    await prisma.habit.create({
        data: {
            name: name,
            frequency: frequency,
            color: color,
            userId: session.user.id
        }
    });

    revalidatePath("/dashboard")
}

export async function deleteHabit(formData: FormData) {
    const session = await requireSession();

    const id = formData.get("habitId") as string;

    await prisma.habit.deleteMany({
        where: {id, userId: session.user.id}
    })

    revalidatePath("/dashboard");
}

export async function updateHabit(formData: FormData) {
    const session = await requireSession();

    const id = formData.get("habitId") as string;
    const name = formData.get("name") as string;
    const frequency = formData.get("frequency") as string;
    const color = formData.get("color") as string;

    await prisma.habit.updateMany({
        where: {id, userId: session.user.id},
        data: {
            name,
            frequency,
            color
        }
    })

    revalidatePath("/dashboard");
    redirect("/dashboard");
}