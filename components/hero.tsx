'use client'

import Image from "next/image";
import logo from "@/public/logo.webp"

export default function Header() {
  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="py-8">
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          rel="noreferrer"
        >
          <Image 
          src={logo}
          alt="sbdv"
          width={200}
          height={100}
          />
        </a>
      </div>
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-5xl text-center font-semibold">
        Admin Dashboard for the Learning Management System of<br/>Sri Bodhiraja Dhamma School
      </p>
    </div>
  );
}
