"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function BackButton() {
  return (
    <section className=" h-full lg:w-20 w-10 bg-transparent flex-grow-0 flex justify-center items-center">
      <motion.button whileHover={{ scale: 1.3 }}>
        <Link href="/dashboard">
          <Image
            src="/icon/left-chevron-svgrepo-com.svg"
            alt="move left"
            width={50}
            height={50}
          />
        </Link>
      </motion.button>
    </section>
  );
}
