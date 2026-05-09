'use server';

import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

//fetchGroceryItems
export const fetchGroceryItems = async () => {
    if (!prisma) return [];
    try {
        return await prisma.groceryItem.findMany({ orderBy: { name: 'asc' } });
    } catch {
        return [];
    }
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

// W11: FormData-based server actions for RSC form pattern
export const addGroceryItem = async (formData: FormData) => {
    const name = (formData.get('name') as string)?.trim();
    if (!name) return;
    if (!prisma) return;
    try {
        await prisma.groceryItem.create({ data: { name, completed: false } });
    } catch (error) {
        console.error('Error creating grocery item:', error);
        throw error;
    }
    revalidatePath('/grocery_db_14');
};

export const removeGroceryItem = async (id: string, formData: FormData) => {
    if (!prisma) return;
    await prisma.groceryItem.delete({ where: { id } });
    revalidatePath('/grocery_db_14');
};
    