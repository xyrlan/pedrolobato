"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProjectPageProps {
  data: {
    title: string;
    description: string;
    articleImage: string;
    content: string;
    role: string[];
    tools: string[];
    integrations?: string[];
    collaborators?: string[];
    duration: string;
    features?: {
      title: string;
      description: string;
      description2?: string;
      description3?: string;
      images?: { url: string; description: string }[];
    }[];
    links?: {
      name: string;
      url: string;
      icon: string;
    }[];
  }
}

export default function ProjectPage({ data }: ProjectPageProps) {
  return (
    <main className="min-h-[70vh]">
      <section className="w-full grid grid-cols-12 grid-gap relative z-10 max-w-[1800px]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="select-none relative overflow-hidden my-2 md:my-8 h-[60vh] md:h-[49vh] object-cover w-full grid col-span-12 border border-black/10">
          {data.articleImage.includes(".mp4") ? (
            <div className="relative w-full h-full">
              <video src={data.articleImage} autoPlay muted loop className="w-full h-full object-cover" />
            </div>
          ) : (
            <Image src={data.articleImage} alt={data.title} className="overflow-hidden" width={2495} height={1625} style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              inset: "0px",
              objectFit: "cover",
              color: "transparent",
            }} />
          )}
        </motion.div>
        <div className="col-span-full md:col-end-4 md:top-[5em] text-zinc-900 md:sticky">
          <h1 className="mb-1 h1">{data.title}</h1>
          <p className="caption text-zinc-500">{data.description}</p>
        </div>
        <div className="grid-gap col-start-1 col-end-13 mb-2 md:columns-2 md:col-start-5 md:col-end-13">
          <p>{data.content}</p>
        </div>
        <div className="col-start-1 col-end-7 md:col-start-5 md:col-end-7 md:mb-8">
          <p className="text-black/40 caption">ROLE</p>
          {data.role.map((role: string) => (
            <p className=" body" key={role}>{role}</p>
          ))}
        </div>
        <div className="col-start-7 col-end-13 md:col-start-7 md:col-end-9 md:mb-8">
          <p className="text-black/40 caption">TOOLS</p>
          {data.tools.map((tool: string) => (
            <p className="body" key={tool}>{tool}</p>
          ))}
        </div>
        <div className="col-start-1 col-end-7 mb-8 md:col-start-9 md:col-end-11">
          <p className="text-black/40 caption">DURATION</p>
          <p className="body">
            {data.duration}
          </p>
        </div>
        {data.integrations && (
          <div className="col-start-7 col-end-13 mb-8 md:col-start-11 md:col-end-13">
            <p className="text-black/40 caption">INTEGRATIONS</p>
            {data.integrations.map((integration: string) => (
              <p className="body" key={integration}>{integration}</p>
            ))}
          </div>
        )}
        {data.collaborators && (
          <div className="col-start-7 col-end-13 mb-8 md:col-start-11 md:col-end-13">
            <p className="text-black/40 caption">COLLABORATORS</p>
            {data.collaborators.map((collaborator: string) => (
              <p className="body" key={collaborator}>{collaborator}</p>
            ))}
          </div>
        )}
        {data.links && data.links.map((link: { name: string; url: string; icon: string }) => (
          <Link className=" md:col-start-5 md:col-end-9 select-none caption group text-black/80 bg-black/[.05] col-span-full hover:bg-black/10 hover:text-black flex items-center flex-row p-4 rounded-md game-border" key={link.name} href={link.url}>
            <p className="body">{link.icon}</p>
            <p className="body">{link.name}</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-3 w-3 ml-auto stroke-[3px] stroke-black/30 group-hover:stroke-black"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path></svg>
          </Link>
        ))}
        {data.features && data.features.map((feature: { title: string; description: string; description2?: string; description3?: string; images?: { url: string; description: string }[] }) => (
          <React.Fragment key={feature.title}>
            <div className="grid-gap col-start-1 col-end-13 mb-2 md:col-start-5 md:col-end-13 lg:col-end-12">
              <h2 className="mt-4 mb-2 h2">{"✶ " + feature.title}</h2>
              <p>{feature.description}</p>
              {feature.description2 && <p className="mt-2">{feature.description2}</p>}
              {feature.description3 && <p className="mt-2">{feature.description3}</p>}
            </div>
            {feature.images && feature.images.map((image: { url: string; description: string }, index: number) => (
              <React.Fragment key={image.url}>
                <div className="
           grid overflow-hidden col-start-1 col-end-13 transition duration-300
           bg-gray-200 md:col-start-5 border-solid border-neutral-800 border 
"
                >
                  {image.url.includes(".mp4") ? (
                    <div className="group relative h-auto overflow-hidden undefined">
                      <div className="caption absolute top-0 w-full h-full overflow-hidden opacity-0 bg-[rgba(255,255,255,0)]">
                        <p className="text-zinc-500 flex h-full justify-center items-center">fabricating image</p>
                      </div>
                      <video src={image.url} playsInline loop autoPlay muted className="object-cover w-full h-full transition duration-1000 overflow-hidden ease-out opacity-100">
                      </video>
                    </div>
                  ) : (
                    <div className="relative">
                      <article className="z-10 w-full h-auto transition duration-500 rounded-md ease-out text-[0px] shadow-2xl opacity-100">
                        <Image src={image.url} alt={feature.title + index} width={2495} height={1625} className="object-cover" key={index} />
                      </article>
                    </div>
                  )}
                </div>
                <div className="grid-gap col-start-1 col-end-13 mb-2 text-white md:col-start-5 md:col-end-13 lg:col-end-12">
                  <p className="opacity-60 caption uppercase">{image.description}</p>
                </div>
              </React.Fragment>
            ))}
          </React.Fragment>
        ))
        }
      </section>
    </main>
  );
}