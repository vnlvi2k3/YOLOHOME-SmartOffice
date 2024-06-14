import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { motion } from "framer-motion";
let user: User;
if (getCookie("user")) {
  user = JSON.parse(getCookie("user") as string);
}
export default function RecordButton() {
  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.1 }}>
      <Link href={`/${user.uid}`}>
        <Image
          src="/icon/document-svgrepo-com.svg"
          alt="record"
          width={45}
          height={45}
        />
      </Link>
    </motion.div>
  );
}
