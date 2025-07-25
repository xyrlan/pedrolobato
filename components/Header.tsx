"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  return (
    <nav className="body grid-layout bg-slate-100 !sticky top-0 !z-[100] main-bg py-4 border-solid border-b border-black/10">
      <Link href="/" className="col-span-4 col-start-1 hover:text-lime-600">
        <h1>Xyrlan</h1>
      </Link>
      <p className="col-span-6 md:col-start-7 lg:col-start-7 duration-500 md:col-span-3 lg:col-span-2 transition-opacity">
        Full Stack Developer
      </p>
      <p className="hidden col-span-3 lg:inline md:col-start-9">
        Brasília, DF
      </p>
      <div className="absolute right-0 flex justify-end col-start-12 top-[50%] translate-y-[-50%] " hidden={pathname === "/"}>
        <Link href="/" className="body">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 hover:text-lime-600 false"><path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd"></path></svg>
        </Link>
      </div>
    </nav>
  );
} 