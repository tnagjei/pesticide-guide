import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pesticide Guide",
    short_name: "Pesticide Guide",
    description: "Explore public pesticide monitoring data for familiar produce.",
    start_url: "/",
    display: "standalone",
    background_color: "#f3eedf",
    theme_color: "#17352b",
  };
}
