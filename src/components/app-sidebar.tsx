import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  UserCircle2,
  CalendarDays,
  Stethoscope,
  ClipboardCheck,
  Receipt,
  Headphones,
  UserPlus,
  Settings,
  Search,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/leads", label: "Gestão de Leads", icon: Users },
  { to: "/paciente", label: "Visão 360° do Paciente", icon: UserCircle2 },
  { to: "/agenda", label: "Agenda Médica", icon: CalendarDays },
  { to: "/cirurgia", label: "Agendamento Cirúrgico", icon: Stethoscope },
  { to: "/pre-cirurgico", label: "Pré-Cirúrgico", icon: ClipboardCheck },
  { to: "/orcamentos", label: "Orçamentos e Vendas", icon: Receipt },
  { to: "/sac", label: "SAC / Pós-Venda", icon: Headphones },
  { to: "/cadastro", label: "Cadastro de Pacientes", icon: UserPlus },
  { to: "/configuracoes", label: "Configurações", icon: Settings },
] as const;

export function AppSidebar({ onOpenSearch }: { onOpenSearch: () => void }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border min-h-screen sticky top-0">
      <div className="px-5 py-5 border-b border-sidebar-border">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-md bg-gradient-to-br from-gold to-amber/80 flex items-center justify-center text-graphite font-bold">
            SR
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-wide">Hospital São Rafael</div>
            <div className="text-[10px] uppercase text-sidebar-foreground/60 tracking-widest">CRM Cirúrgico</div>
          </div>
        </div>
      </div>

      <button
        onClick={onOpenSearch}
        className="mx-3 mt-4 flex items-center gap-2 rounded-md bg-sidebar-accent/50 hover:bg-sidebar-accent transition px-3 py-2 text-xs text-sidebar-foreground/70"
      >
        <Search className="h-3.5 w-3.5" />
        <span>Buscar paciente, CPF, telefone…</span>
        <span className="ml-auto rounded border border-sidebar-border px-1.5 py-0.5 text-[10px] font-mono">⌘K</span>
      </button>

      <nav className="flex-1 mt-4 px-2 space-y-0.5">
        {items.map((it) => {
          const active = it.to === "/" ? path === "/" : path.startsWith(it.to);
          const Icon = it.icon;
          return (
            <Link
              key={it.to}
              to={it.to}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition relative",
                active
                  ? "bg-sidebar-accent text-white"
                  : "text-sidebar-foreground/75 hover:text-white hover:bg-sidebar-accent/50",
              )}
            >
              {active && <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-r bg-gold" />}
              <Icon className={cn("h-4 w-4", active && "text-gold")} />
              <span className="truncate">{it.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="m-3 rounded-lg border border-sidebar-border bg-sidebar-accent/40 p-3">
        <div className="flex items-center gap-2 text-xs">
          <Sparkles className="h-3.5 w-3.5 text-mint" />
          <span className="font-medium">Tasy (Philips)</span>
        </div>
        <p className="mt-1 text-[11px] text-sidebar-foreground/60 leading-snug">
          Sincronização ativa · última atualização há 2 min
        </p>
      </div>
    </aside>
  );
}

export function SyncBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-mint/15 text-mint-foreground border border-mint/40 px-2 py-0.5 text-[10px] font-medium">
      <span className="h-1.5 w-1.5 rounded-full bg-mint" />
      Sincronizado com Tasy
    </span>
  );
}

export function SLABadge({ minutes }: { minutes: number }) {
  const overdue = minutes >= 5;
  if (!overdue) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-mint/15 text-mint-foreground border border-mint/40 px-2 py-0.5 text-[10px] font-medium">
        SLA {minutes}m
      </span>
    );
  }
  return (
    <span className="pulse-sla inline-flex items-center gap-1 rounded-full bg-destructive text-destructive-foreground px-2 py-0.5 text-[10px] font-semibold">
      ● SLA vencido {minutes}m
    </span>
  );
}

export function PendBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber/20 text-[oklch(0.35_0.1_75)] border border-amber/40 px-2 py-0.5 text-[10px] font-medium">
      ⚠ {children}
    </span>
  );
}