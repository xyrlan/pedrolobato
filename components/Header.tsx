"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  return (
    <nav className="body grid-layout bg-background !sticky top-0 !z-[100] main-bg py-4 border-solid border-b border-ink/12">
      <Link href="/" className="col-span-4 col-start-1 hover:text-accent">
        <h1>Xyrlan</h1>
      </Link>
      <p className="col-span-6 md:col-start-7 lg:col-start-7 duration-500 md:col-span-3 lg:col-span-2 transition-opacity">
        Full Stack Developer
      </p>
      <p className="hidden col-span-2 lg:inline md:col-start-9">
        Brasília, DF
      </p>
      {/* The CV link and the icon share one cell; pr-8 keeps them clear of the
          absolute close button on the right. */}
      <div className="col-start-10 col-end-12 md:col-start-11 md:col-end-13 pr-8 flex items-center gap-2 md:gap-3 whitespace-nowrap justify-end md:justify-start">
        <Link
          href="/cv"
          className={`hover:text-accent ${pathname.startsWith("/cv") ? "text-accent" : ""}`}
        >
          CV
        </Link>
        <a
          href="https://wa.me/5561999936169"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          title="WhatsApp"
          className="hover:text-accent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="w-[1.15em] h-[1.15em]"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
          </svg>
        </a>
      </div>
      <div className="absolute right-0 flex justify-end col-start-12 top-[50%] translate-y-[-50%] " hidden={pathname === "/"}>
        <Link href="/" className="body">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 hover:text-accent false"><path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd"></path></svg>
        </Link>
      </div>
    </nav>
  );
} 