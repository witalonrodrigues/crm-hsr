import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Search, Sparkles } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { navItems } from "./nav-items";

export function MobileTopbar({ onOpenSearch }: { onOpenSearch: () => void }) {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="lg:hidden sticky top-0 z-40 h-14 flex items-center gap-2 px-3 bg-sidebar text-sidebar-foreground border-b border-sidebar-border">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          aria-label="Abrir menu"
          className="h-9 w-9 inline-flex items-center justify-center rounded-md hover:bg-sidebar-accent/60"
        >
          <Menu className="h-5 w-5" />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-72 p-0 bg-sidebar text-sidebar-foreground border-sidebar-border"
        >
          <div className="px-5 py-5 border-b border-sidebar-border">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-md bg-gradient-to-br from-gold to-amber/80 flex items-center justify-center text-graphite font-bold">
                SR
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold tracking-wide">Hospital São Rafael</div>
                <div className="text-[10px] uppercase text-sidebar-foreground/60 tracking-widest">
                  CRM Cirúrgico
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setOpen(false);
              onOpenSearch();
            }}
            className="mx-3 mt-4 flex w-[calc(100%-1.5rem)] items-center gap-2 rounded-md bg-sidebar-accent/50 hover:bg-sidebar-accent transition px-3 py-2 text-xs text-sidebar-foreground/70"
          >
            <Search className="h-3.5 w-3.5" />
            <span>Buscar paciente, CPF, telefone…</span>
          </button>

          <nav className="mt-4 px-2 space-y-0.5 overflow-y-auto">
            {navItems.map((it) => {
              const active = it.to === "/" ? path === "/" : path.startsWith(it.to);
              const Icon = it.icon;
              return (
                <Link
                  key={it.to}
                  to={it.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition relative",
                    active
                      ? "bg-sidebar-accent text-white"
                      : "text-sidebar-foreground/75 hover:text-white hover:bg-sidebar-accent/50",
                  )}
                >
                  {active && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-r bg-gold" />
                  )}
                  <Icon className={cn("h-4 w-4", active && "text-gold")} />
                  <span className="truncate">{it.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="m-3 mt-6 rounded-lg border border-sidebar-border bg-sidebar-accent/40 p-3">
            <div className="flex items-center gap-2 text-xs">
              <Sparkles className="h-3.5 w-3.5 text-mint" />
              <span className="font-medium">Tasy (Philips)</span>
            </div>
            <p className="mt-1 text-[11px] text-sidebar-foreground/60 leading-snug">
              Sincronização ativa · última atualização há 2 min
            </p>
          </div>
        </SheetContent>
      </Sheet>

      <Link to="/" className="flex items-center gap-2 min-w-0">
        <div className="h-8 w-8 rounded-md bg-gradient-to-br from-gold to-amber/80 flex items-center justify-center text-graphite font-bold text-xs">
          SR
        </div>
        <div className="leading-tight min-w-0">
          <div className="text-xs font-semibold tracking-wide truncate">Hospital São Rafael</div>
          <div className="text-[9px] uppercase text-sidebar-foreground/60 tracking-widest">
            CRM Cirúrgico
          </div>
        </div>
      </Link>

      <button
        onClick={onOpenSearch}
        aria-label="Buscar"
        className="ml-auto h-9 w-9 inline-flex items-center justify-center rounded-md hover:bg-sidebar-accent/60"
      >
        <Search className="h-4.5 w-4.5" />
      </button>
    </header>
  );
}