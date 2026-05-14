"use client";

import { usePathname, useRouter } from "next/navigation";
import { MapPin } from "lucide-react";
import type { Location } from "@/services/weatherService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LocationSelectorProps {
  locations: Location[];
  currentIndex: number;
}

export function LocationSelector({ locations, currentIndex }: LocationSelectorProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-2">
      <MapPin size={18} color="#2e86ab" aria-hidden="true" />
      <Select
        value={String(currentIndex)}
        onValueChange={(val) => router.push(`${pathname}?loc=${val}`)}
      >
        <SelectTrigger
          className="min-w-[200px]"
          aria-label="Selecionar sua cidade"
        >
          <SelectValue placeholder="Selecionar cidade" />
        </SelectTrigger>
        <SelectContent>
          {locations.map((loc, i) => (
            <SelectItem key={loc.name} value={String(i)}>
              {loc.name} — {loc.state}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
