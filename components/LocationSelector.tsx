"use client";

import { useRouter } from "next/navigation";
import { MapPin } from "lucide-react";
import type { Location } from "@/services/weatherService";

interface LocationSelectorProps {
  locations: Location[];
  currentIndex: number;
}

export function LocationSelector({ locations, currentIndex }: LocationSelectorProps) {
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    router.push(`/?loc=${e.target.value}`);
  }

  return (
    <div className="flex items-center gap-2">
      <MapPin size={18} color="#2e86ab" aria-hidden="true" />
      <label htmlFor="location-select" className="sr-only">
        Selecionar cidade
      </label>
      <select
        id="location-select"
        value={currentIndex}
        onChange={handleChange}
        className="border rounded-xl px-3 py-2 text-sm font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1"
        style={{
          borderColor: "#e8eae6",
          backgroundColor: "#fff",
          color: "#1a1a1a",
          minHeight: "44px",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(15,61,46,0.08)",
        }}
        aria-label="Selecionar sua cidade"
      >
        {locations.map((loc, i) => (
          <option key={loc.name} value={i}>
            {loc.name} — {loc.state}
          </option>
        ))}
      </select>
    </div>
  );
}
