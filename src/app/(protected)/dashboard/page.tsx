/** @format */
"use client";
// app/dashboard/page.tsx
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const a = useSession();
  console.log(a, "okokokokokoko");
  const router = useRouter();

  // if (!session) {
  //   if (typeof window !== "undefined") {
  //     router.push("/auth/signin");
  //   }
  //   return <div>Access Denied</div>;
  // }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, </p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
