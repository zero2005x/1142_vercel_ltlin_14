'use server';

import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

//fetchGroceryItems
export const fetchGroceryItems = async () => {
    if (!prisma) {
        throw new Error("Prisma client is not initialized");
    }
    const items = await prisma.groceryItem.findMany({
        orderBy: {
            name: 'asc',
        }
    });
    return items;
}

// createGroceryItem
export const createGroceryItem = async (name: string) => {

    if (!prisma) {
        throw new Error("Prisma client is not initialized");
    }
  
try{    
    await prisma.groceryItem.create({
        data: {
            name,
            completed: false,
        },
    });

}catch(error){
    console.error("Error creating grocery item:", error);
    throw error;
}

    revalidatePath("/grocery_db_14");
}

// deleteGroceryItem
export const deleteGroceryItem = async (id: string) => {
    if (!prisma) {
        throw new Error("Prisma client is not initialized");
    }
    await prisma.groceryItem.delete({
        where: { id },
    });
    revalidatePath("/grocery_db_14");
}

// toggleGroceryItem (edit completed)
export const toggleGroceryItem = async (id: string, completed: boolean) => {
    if (!prisma) {
        throw new Error("Prisma client is not initialized");
    }
    await prisma.groceryItem.update({
        where: { id },
        data: { completed },
    });
    revalidatePath("/grocery_db_14");
}
    