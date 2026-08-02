"use client"
import Image from "next/image";
import Link from "next/link";
import { gallery, Gallery as GalleryType } from "@/lib/data";
import { motion } from "framer-motion";

export default function Gallery() {

  const galleryItem = (data: GalleryType) => (
    <Link href={data.isDisabled ? "#" : data.href} className={`cursor-pointer relative w-full opacity-100 inline-block select-none group ${data.isDisabled ? "pointer-events-none" : ""}`}>
      <div className={`relative game-border border-ink/30 border-solid   ${data.isDisabled ? "" : "group-hover:opacity-80"}`}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="undefined relative w-full overflow-hidden">
          {data.isDisabled && (
            <div className="absolute top-5 right-5 flex justify-center items-center p-2 bg-background/85 backdrop-blur-sm rounded-xl">
              <p className="text-foreground">Coming Soon</p>
            </div>
          )}
          {data.image.includes(".mp4") ? (
            <video src={data.image} autoPlay muted loop className="w-full h-full object-cover" />
          ) : (
            <article className="overflow-hidden object-cover w-full h-full transition duration-500 ease-out opacity-100">
              <Image src={data.image} alt={data.title} width={2495} height={1625} className="object-cover" priority />
            </article>
          )}
        </motion.div>
      </div>
      <div className="mt-3">
        <h1 className="caption text-ink">{data.title}</h1>
        <p className="caption text-ink/62">{data.projectType}</p>
      </div>
    </Link>
  )

  const columns: GalleryType[][] = [[], [], []]
  gallery.forEach((item, i) => columns[i % 3].push(item))

  return (
    <div className="grid relative z-10 col-start-1 col-end-13 md:grid-cols-3 grid-gap">
      {columns.map((col, ci) => (
        <div key={ci} className="flex flex-col gap-6">
          {col.map((item) => (
            <div key={item.id}>{galleryItem(item)}</div>
          ))}
        </div>
      ))}
    </div>
  );
}
