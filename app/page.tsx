import { Suspense } from "react";
import Dashboard from "./dashboard";

interface HomeProps {
  searchParams?: Promise<{ loc?: string }>;
}

export default function Home({ searchParams }: HomeProps) {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <Dashboard searchParams={searchParams} />
    </Suspense>
  );
}

function DashboardSkeleton() {
  return (
    <div
      className="p-6 lg:p-8 space-y-6"
      aria-busy="true"
      aria-label="Carregando dados climáticos..."
      style={{ paddingTop: "4rem" }}
    >
      <div className="h-10 rounded-xl animate-pulse w-64" style={{ backgroundColor: "#e8eae6" }} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="rounded-2xl animate-pulse h-52" style={{ backgroundColor: "#e8eae6" }} />
        ))}
      </div>
      <div className="rounded-2xl animate-pulse h-72" style={{ backgroundColor: "#e8eae6" }} />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="rounded-2xl animate-pulse h-48" style={{ backgroundColor: "#e8eae6" }} />
        ))}
      </div>
      <p className="text-center text-sm" style={{ color: "#8a8f87" }}>
        Buscando dados climáticos da Amazônia...
      </p>
    </div>
  );
}
