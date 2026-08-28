import Sidebar from "@/components/ui/Sidebar";
import Topbar from "@/components/ui/Topbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-neutral-950 text-white">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}