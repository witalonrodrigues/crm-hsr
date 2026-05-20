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
} from "lucide-react";

export const navItems = [
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