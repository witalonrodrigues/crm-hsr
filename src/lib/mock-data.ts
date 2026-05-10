export type LeadStage =
  | "Novo Lead"
  | "Em Contato"
  | "Aguardando Retorno"
  | "Consulta Agendada"
  | "Avaliação Realizada"
  | "Proposta Enviada"
  | "Contrato Fechado"
  | "Não Fechou";

export const LEAD_STAGES: LeadStage[] = [
  "Novo Lead",
  "Em Contato",
  "Aguardando Retorno",
  "Consulta Agendada",
  "Avaliação Realizada",
  "Proposta Enviada",
  "Contrato Fechado",
  "Não Fechou",
];

export interface Lead {
  id: string;
  name: string;
  procedure: string;
  channel: "Instagram" | "Facebook" | "Google Ads" | "Site" | "Indicação" | "WhatsApp";
  attendant: string;
  stage: LeadStage;
  createdMinutesAgo: number;
}

export const LEADS: Lead[] = [
  { id: "L-1042", name: "Mariana Albuquerque", procedure: "Mamoplastia de Aumento", channel: "Instagram", attendant: "Júlia M.", stage: "Novo Lead", createdMinutesAgo: 7 },
  { id: "L-1043", name: "Renata Caldas", procedure: "Abdominoplastia", channel: "Google Ads", attendant: "Beatriz S.", stage: "Novo Lead", createdMinutesAgo: 2 },
  { id: "L-1044", name: "Felipe Marques", procedure: "Rinoplastia", channel: "WhatsApp", attendant: "Carla R.", stage: "Em Contato", createdMinutesAgo: 38 },
  { id: "L-1045", name: "Patrícia Souza", procedure: "Lipoaspiração HD", channel: "Indicação", attendant: "Júlia M.", stage: "Aguardando Retorno", createdMinutesAgo: 320 },
  { id: "L-1046", name: "Larissa Mendes", procedure: "Mastopexia", channel: "Site", attendant: "Beatriz S.", stage: "Consulta Agendada", createdMinutesAgo: 1440 },
  { id: "L-1047", name: "André Pinheiro", procedure: "Otoplastia", channel: "Facebook", attendant: "Carla R.", stage: "Avaliação Realizada", createdMinutesAgo: 2880 },
  { id: "L-1048", name: "Camila Tavares", procedure: "Lipoabdominoplastia", channel: "Instagram", attendant: "Júlia M.", stage: "Proposta Enviada", createdMinutesAgo: 4320 },
  { id: "L-1049", name: "Beatriz Furtado", procedure: "Mamoplastia + Lipo", channel: "Indicação", attendant: "Beatriz S.", stage: "Contrato Fechado", createdMinutesAgo: 7200 },
  { id: "L-1050", name: "Vivian Costa", procedure: "Blefaroplastia", channel: "Site", attendant: "Carla R.", stage: "Não Fechou", createdMinutesAgo: 10080 },
  { id: "L-1051", name: "Sabrina Lopes", procedure: "Lifting Facial", channel: "Google Ads", attendant: "Júlia M.", stage: "Não Fechou", createdMinutesAgo: 14400 },
];

export interface Patient {
  id: string;
  name: string;
  age: number;
  cpfMasked: string;
  procedure: string;
  surgeryDate?: string;
  weight: number;
  height: number;
  examsDelivered: boolean;
  daysToSurgery?: number;
  monthsSinceSurgery?: number;
}

export const PATIENTS: Patient[] = [
  { id: "P-2201", name: "Beatriz Furtado", age: 34, cpfMasked: "XXX.XXX.XXX-21", procedure: "Mamoplastia + Lipo", surgeryDate: "2026-05-22", weight: 64, height: 1.65, examsDelivered: false, daysToSurgery: 12 },
  { id: "P-2150", name: "Larissa Mendes", age: 41, cpfMasked: "XXX.XXX.XXX-08", procedure: "Mastopexia", surgeryDate: "2025-02-10", weight: 70, height: 1.68, examsDelivered: true, monthsSinceSurgery: 14 },
  { id: "P-2098", name: "Camila Tavares", age: 29, cpfMasked: "XXX.XXX.XXX-77", procedure: "Lipoabdominoplastia", surgeryDate: "2024-05-05", weight: 72, height: 1.62, examsDelivered: true, monthsSinceSurgery: 23 },
];

export const KPIS = [
  { label: "Conversão Leads → Contratos", value: "27,4%", delta: "+3,1 p.p.", positive: true },
  { label: "Tempo médio de resposta (SLA)", value: "4m 12s", delta: "-32s", positive: true },
  { label: "Taxa de Faltas e Cancelamentos", value: "9,8%", delta: "+0,4 p.p.", positive: false },
  { label: "Ociosidade Médica", value: "11,2%", delta: "-1,8 p.p.", positive: true },
  { label: "Cirurgias confirmadas no mês", value: "138", delta: "+12", positive: true },
];

export const CHANNEL_DATA = [
  { channel: "Instagram", leads: 142 },
  { channel: "WhatsApp", leads: 118 },
  { channel: "Google Ads", leads: 96 },
  { channel: "Indicação", leads: 71 },
  { channel: "Site", leads: 58 },
  { channel: "Facebook", leads: 33 },
];

export const MONTH_FLOW = [
  { day: "01", agendados: 18, faltas: 2, atendidos: 16 },
  { day: "05", agendados: 22, faltas: 3, atendidos: 19 },
  { day: "10", agendados: 26, faltas: 4, atendidos: 22 },
  { day: "15", agendados: 31, faltas: 3, atendidos: 28 },
  { day: "20", agendados: 28, faltas: 5, atendidos: 23 },
  { day: "25", agendados: 34, faltas: 4, atendidos: 30 },
  { day: "30", agendados: 30, faltas: 2, atendidos: 28 },
];

export const FUNNEL = [
  { stage: "Leads captados", value: 518 },
  { stage: "Em contato", value: 412 },
  { stage: "Consulta agendada", value: 287 },
  { stage: "Avaliação realizada", value: 198 },
  { stage: "Proposta enviada", value: 162 },
  { stage: "Contrato fechado", value: 142 },
  { stage: "Cirurgia realizada", value: 128 },
];

export const TEAM_RANKING = [
  { name: "Júlia M.", contracts: 24, conv: "31%" },
  { name: "Beatriz S.", contracts: 19, conv: "28%" },
  { name: "Carla R.", contracts: 17, conv: "24%" },
  { name: "Patrícia L.", contracts: 12, conv: "19%" },
];