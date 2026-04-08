"use server";

import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prismaUnavailableMessage = "Prisma client is unavailable.";
const userDbPath = "/user_db_14";

type UserRecord = {
  id: number;
  name: string | null;
  email: string;
};

type FetchUsersResult = {
  users: UserRecord[];
  error: string | null;
};

const normalizeUserInput = (formData: FormData) => {
  const nameValue = formData.get("name");
  const emailValue = formData.get("email");

  const name = typeof nameValue === "string" ? nameValue.trim() : "";
  const email =
    typeof emailValue === "string" ? emailValue.trim().toLowerCase() : "";

  if (!email) {
    throw new Error("Email is required.");
  }

  return {
    name: name || null,
    email,
  };
};

const ensurePrisma = () => {
  if (!prisma) {
    throw new Error(prismaUnavailableMessage);
  }

  return prisma;
};

const buildFeedbackPath = (status: "success" | "error", message: string) => {
  const params = new URLSearchParams({ status, message });
  return `${userDbPath}?${params.toString()}`;
};

const redirectWithFeedback = (status: "success" | "error", message: string) => {
  redirect(buildFeedbackPath(status, message));
};

const formatActionError = (error: unknown, fallbackMessage: string) => {
  if (error instanceof Error) {
    if (error.message.includes("Unique constraint failed")) {
      return "This email is already in use.";
    }

    if (
      error.message.includes("Record to update not found") ||
      error.message.includes("Record to delete does not exist")
    ) {
      return "User not found.";
    }

    return error.message;
  }

  return fallbackMessage;
};

export const fetchUsers = async (): Promise<FetchUsersResult> => {
  if (!prisma) {
    return {
      users: [],
      error: prismaUnavailableMessage,
    };
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        id: "desc",
      },
    });

    return {
      users,
      error: null,
    };
  } catch (error) {
    return {
      users: [],
      error: error instanceof Error ? error.message : "Failed to fetch users.",
    };
  }
};

export const createUser = async (formData: FormData) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const newUser = {
    name: typeof name === "string" ? name.trim() : "",
    email: typeof email === "string" ? email.trim().toLowerCase() : "",
  };
  console.log("Creating user with data:", newUser);
  let successMessage = "";
  try {
    const db = ensurePrisma();
    const result = await db.user.create({
      data: newUser,
    });
    revalidatePath(userDbPath);
    successMessage = `Created ${result.email} successfully.`;
  } catch (error) {
    console.error("Error creating user:", error);
    redirectWithFeedback(
      "error",
      formatActionError(error, "Failed to create user."),
    );
  }

  redirectWithFeedback("success", successMessage);
};

export const createUser2 = async (_prevState: string | null, formData: FormData) => {
  try {
    const db = ensurePrisma();
    const data = normalizeUserInput(formData);

    await db.user.create({
      data,
    });

    revalidatePath(userDbPath);
    return `Created ${data.email} successfully.`;
  } catch (error) {
    redirectWithFeedback(
      "error",
      formatActionError(error, "Failed to create user."),
    );
    return "Failed to create user.";
  }
};

export const updateUser = async (id: number, formData: FormData) => {
  try {
    const db = ensurePrisma();
    const data = normalizeUserInput(formData);

    await db.user.update({
      where: { id },
      data,
    });

    revalidatePath(userDbPath);
    redirectWithFeedback("success", `Updated user #${id} successfully.`);
  } catch (error) {
    redirectWithFeedback(
      "error",
      formatActionError(error, "Failed to update user."),
    );
  }
};

export const removeUser = async (id: number) => {
  let successMessage = "";
  console.log("Removing user with ID:", id);

  try {
    const db = ensurePrisma();

    await db.user.delete({
      where: { id },
    });

    revalidatePath(userDbPath);
    successMessage = `Deleted user #${id} successfully.`;


  } catch (error) {
    redirectWithFeedback(
      "error",
      formatActionError(error, "Failed to delete user."),
    );
  }

  redirectWithFeedback("success", successMessage);
};
