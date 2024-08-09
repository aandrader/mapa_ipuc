"use server";
import { signIn, signOut } from "@/app/api/auth/auth";

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return "success";
  } catch (error) {
    return "wrongCredentials";
  }
}

export const logout = async () => {
  await signOut();
};
