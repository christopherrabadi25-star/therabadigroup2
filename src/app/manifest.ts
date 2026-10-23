import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Rabadi Group",
    short_name: "Rabadi Group",
    description: "Ramzi and Christopher Rabadi. $130M+ in Southern California real estate.",
    start_url: "/",
    display: "browser",
    background_color: "#121110",
    theme_color: "#121110",
    icons: [
      { src: "/rg-icon-v2-192.png", sizes: "192x192", type: "image/png" },
      { src: "/rg-icon-v2-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
