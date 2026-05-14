import { Sidebar } from "@/components/Sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh">
      <Sidebar />
      <main
        className="flex-1 min-w-0"
        id="main-content"
        tabIndex={-1}
        aria-label="Conteúdo principal"
      >
        {children}
      </main>
    </div>
  );
}
