import type { Metadata } from "next";
import { AprenderClient } from "./AprenderClient";

export const metadata: Metadata = {
  title: "Aprender — AgroAmazônia Inteligente",
  description:
    "Guias práticos sobre SENAF, CAR, CAF e o Código Florestal para o agricultor familiar amazônico.",
};

export default function AprenderPage() {
  return <AprenderClient />;
}
