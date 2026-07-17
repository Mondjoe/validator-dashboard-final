export default function Sidebar() {
  return (
    <aside className="w-64 bg-black border-r border-neutral-800 p-6">
      <h1 className="text-2xl font-bold mb-8">Charm Operator</h1>

      <nav className="flex flex-col gap-4">
        <a className="text-neutral-300 hover:text-white" href="/dashboard">
          Dashboard
        </a>
        <a className="text-neutral-300 hover:text-white" href="/dashboard/validators">
          Validators
        </a>
        <a className="text-neutral-300 hover:text-white" href="/dashboard/logs">
          Logs
        </a>
        <a className="text-neutral-300 hover:text-white" href="/dashboard/terminal">
          Terminal
        </a>
      </nav>
    </aside>
  );
}