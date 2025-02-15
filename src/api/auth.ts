import { User } from "@/types/user"

export const verifyEmail = () => {

}

export const verifyCode = async (email: string, code: string): Promise<User | null> => {
  try {
    // const response = await fetch("/api/auth/verify-code", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email, code }),
    // });

    // if (!response.ok) throw new Error("Invalid code or email");

    // const user: User = await response.json();
    // return user;

    return {
        id: "1",
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
        role: "instructor",
        profilePicture: "https://storage.googleapis.com/noahsproject-f916b.appspot.com/Devotional%20Theme%20Pictures/1735211953543_thefullnessofgod.jpg",
    }
  } catch (error) {
    console.error("Verification failed:", error);
    return null;
  }
};
