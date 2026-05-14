import { Sidebar } from "@/components/Sidebar";
import { MockChatbot } from "@/components/MockChatbot";

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
      <MockChatbot />
    </div>
  );
}
