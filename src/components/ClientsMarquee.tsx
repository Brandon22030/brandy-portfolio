"use client";

import Image from "next/image";
import type { Client } from "@/lib/data";

export default function ClientsMarquee({ clients }: { clients: Client[] }) {
  // Duplicate the list so the CSS animation (translateX 0 -> -50%) loops seamlessly.
  const track = [...clients, ...clients];

  return (
    <div className="overflow-hidden" style={{ maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)" }}>
      <div className="flex w-max animate-marquee items-center gap-12 py-2">
        {track.map((client, index) => {
          const logo = (
            <Image
              src={client.logoUrl}
              alt={client.name}
              width={120}
              height={40}
              className="h-8 w-auto object-contain opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0 sm:h-10"
            />
          );

          return (
            <div key={`${client.name}-${index}`} className="shrink-0">
              {client.websiteUrl ? (
                <a href={client.websiteUrl} target="_blank" rel="noreferrer" aria-label={client.name}>
                  {logo}
                </a>
              ) : (
                logo
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
