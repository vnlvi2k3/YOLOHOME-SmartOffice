"use client";
import React from "react";
import Image from "next/image";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import useAuth from "@/app/hook/useAuth";
import { AuthContextType } from "@/app/context/authContext";
import toast from "react-hot-toast";
import { auth } from "../../../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { motion } from "framer-motion";

export default function SignOutButton() {
  const { authContext, setAuthContext } = useAuth() as AuthContextType;
  const router = useRouter();
  const SignOut = () => {
    deleteCookie("user");
    deleteCookie("ns");
    deleteCookie("cs");
    deleteCookie("priority");
    setAuthContext(undefined);
    signOut(auth)
      .then(() => {})
      .catch((error) => {});

    router.push("/", { scroll: false });
  };
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1.1 }}
      onClick={() =>
        toast(
          <div className="flex flex-col items-center gap-5">
            <div>Are you sure want to sign out?</div>
            <div className="flex gap-10">
              <button
                className=" bg-red-600 rounded-xl p-2"
                onClick={() => {
                  toast.remove();
                  SignOut();
                }}
              >
                Yes
              </button>
              <button
                className=" bg-green-600 rounded-xl p-2"
                onClick={() => toast.remove()}
              >
                No
              </button>
            </div>
          </div>,
          { id: "signout" }
        )
      }
    >
      <Image
        src="/icon/sign-in-svgrepo-com.svg"
        alt="sign out"
        width={40}
        height={40}
      />
    </motion.button>
  );
}
