import type { Metadata } from "next";
import { CalendarClient } from "./CalendarClient";

export const metadata: Metadata = {
  title: "Calendário Agrícola — AgroAmazônia Inteligente",
  description:
    "Consulte os melhores períodos de plantio e colheita para culturas amazônicas como Mandioca, Açaí, Cacau e Cupuaçu.",
};

export default function AgriculturalCalendarPage() {
  return <CalendarClient />;
}
