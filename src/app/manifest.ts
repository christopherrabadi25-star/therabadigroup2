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
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
