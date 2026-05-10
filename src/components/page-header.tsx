import { SyncBadge } from "./app-sidebar";

export function PageHeader({
  title,
  description,
  actions,
  showSync = true,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  showSync?: boolean;
}) {
  return (
    <header className="border-b border-border bg-card/60 backdrop-blur sticky top-0 z-10">
      <div className="px-8 py-5 flex items-center gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold tracking-tight text-foreground truncate">{title}</h1>
            {showSync && <SyncBadge />}
          </div>
          {description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
        </div>
        {actions}
      </div>
    </header>
  );
}