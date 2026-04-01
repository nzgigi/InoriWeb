// app/etsy/page.tsx
import type { Metadata } from "next";

export const metadata :Metadata = {
  title: "Etsy Dashboard — InoriTech",
  description: "Dashboard de gestion de mon shop Etsy",
};

export default function EtsyPage() {
  return (
    <iframe
      src="/etsy-dashboard.html"
      className="w-full h-screen border-0"
      title="Etsy Dashboard"
    />
  );
}
