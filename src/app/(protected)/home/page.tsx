/** @format */
"use client";
import Menu from "@/components/Drawer";
import { useContext } from "react";
import { UidContext } from "@/app/layout";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { setUser, user } = useContext(UidContext);
  if (!user) {
    router.push("/auth/signin");
    return <></>;
  }
  return <Menu />;
}
