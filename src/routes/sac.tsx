import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Send, CheckCircle2, MessageSquare, User, Calendar, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/sac")({
  head: () => ({
    meta: [
      { title: "SAC / Pós-Venda — Hospital São Rafael" },
      { name: "description", content: "Atendimento pós-cirúrgico, tickets e gestão de garantias." },
    ],
  }),
  component: SacPage,
});

type Status = "Aberto" | "Em Andamento" | "Resolvido";
type Sender = "patient" | "agent";

interface Ticket {
  id: string;
  subject: string;
  category: "Reclamação" | "Dúvida" | "Solicitação" | "Elogio";
  patient: string;
  patientId: string;
  surgery: string;
  surgeryDate: string;
  status: Status;
  ageLabel: string;
  warranty?: { type: "Reparo" | "Prótese"; monthsElapsed: number; monthsTotal: number };
  messages: { from: Sender; text: string; time: string }[];
}

const TICKETS: Ticket[] = [
  {
    id: "T-3201",
    subject: "Dúvida sobre o jejum",
    category: "Dúvida",
    patient: "Ana Clara M.",
    patientId: "P-2201",
    surgery: "Rinoplastia",
    surgeryDate: "25/03/2026",
    status: "Aberto",
    ageLabel: "Há 15 min",
    messages: [
      { from: "patient", text: "Olá, preciso saber sobre o jejum antes da cirurgia. Quanto tempo antes devo parar de comer?", time: "09:12" },
      { from: "agent", text: "Bom dia, Ana Clara! O jejum deve ser de 8 horas para sólidos e 6 horas para líquidos claros antes do horário da cirurgia.", time: "09:14" },
      { from: "patient", text: "E água? Posso tomar até quando?", time: "09:18" },
    ],
  },
  {
    id: "T-3198",
    subject: "Remarcação de consulta",
    category: "Solicitação",
    patient: "Roberto S.",
    patientId: "P-2150",
    surgery: "Lipoaspiração HD",
    surgeryDate: "12/02/2026",
    status: "Em Andamento",
    ageLabel: "Há 1h",
    warranty: { type: "Reparo", monthsElapsed: 3, monthsTotal: 15 },
    messages: [
      { from: "patient", text: "Preciso remarcar minha consulta de retorno, posso?", time: "08:30" },
      { from: "agent", text: "Claro, Roberto. Estou verificando a próxima janela disponível com a Dra. Helena.", time: "08:42" },
    ],
  },
  {
    id: "T-3192",
    subject: "Valor do procedimento",
    category: "Dúvida",
    patient: "Maria F.",
    patientId: "P-2098",
    surgery: "Mamoplastia de Aumento",
    surgeryDate: "—",
    status: "Aberto",
    ageLabel: "Há 2h",
    messages: [
      { from: "patient", text: "Gostaria de receber novamente o orçamento por e-mail, por favor.", time: "07:55" },
    ],
  },
  {
    id: "T-3180",
    subject: "Solicitação de atestado",
    category: "Solicitação",
    patient: "João Pedro A.",
    patientId: "P-2044",
    surgery: "Otoplastia",
    surgeryDate: "08/01/2026",
    status: "Resolvido",
    ageLabel: "Ontem",
    warranty: { type: "Prótese", monthsElapsed: 4, monthsTotal: 24 },
    messages: [
      { from: "patient", text: "Preciso do atestado dos dias da cirurgia.", time: "Ontem" },
      { from: "agent", text: "Atestado emitido e enviado para o seu e-mail cadastrado. ✅", time: "Ontem" },
    ],
  },
];

function statusTone(s: Status) {
  if (s === "Aberto") return "bg-destructive/10 text-destructive border-destructive/30";
  if (s === "Em Andamento") return "bg-amber/15 text-[oklch(0.4_0.12_75)] border-amber/40";
  return "bg-mint/15 text-mint-foreground border-mint/40";
}

function SacPage() {
  const [selectedId, setSelectedId] = useState(TICKETS[0].id);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");

  const list = TICKETS.filter(
    (t) =>
      t.subject.toLowerCase().includes(query.toLowerCase()) ||
      t.patient.toLowerCase().includes(query.toLowerCase()),
  );
  const ticket = TICKETS.find((t) => t.id === selectedId) ?? TICKETS[0];

  const send = () => {
    if (!draft.trim()) return;
    ticket.messages.push({ from: "agent", text: draft, time: "agora" });
    setDraft("");
    toast.success("Mensagem enviada via WhatsApp", { description: "Registrada no Tasy." });
  };

  const resolve = () => {
    ticket.status = "Resolvido";
    toast.success("Ticket resolvido", { description: `${ticket.id} marcado como resolvido no Tasy.` });
  };

  return (
    <>
      <PageHeader title="SAC / Pós-Venda" description="Gerencie tickets e atendimentos" />
      <div className="p-6 grid grid-cols-1 lg:grid-cols-[340px_1fr_280px] gap-4">
        {/* Lista de tickets */}
        <Card className="p-3 h-[calc(100vh-160px)] flex flex-col">
          <Input
            placeholder="Buscar tickets..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="mb-3"
          />
          <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
            {list.map((t) => {
              const active = t.id === selectedId;
              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedId(t.id)}
                  className={cn(
                    "w-full text-left rounded-lg border p-3 transition",
                    active
                      ? "border-gold/50 bg-gold/5"
                      : "border-border hover:bg-muted/50",
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-medium text-sm leading-tight">{t.subject}</div>
                    <Badge variant="outline" className={cn("text-[10px] shrink-0", statusTone(t.status))}>
                      {t.status}
                    </Badge>
                  </div>
                  <div className="mt-1.5 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{t.patient}</span>
                    <span>{t.ageLabel}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Conversa */}
        <Card className="h-[calc(100vh-160px)] flex flex-col overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-start justify-between gap-3">
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">{ticket.category}</div>
              <h2 className="text-lg font-semibold mt-0.5">{ticket.subject}</h2>
            </div>
            <Badge variant="outline" className={cn("text-[10px]", statusTone(ticket.status))}>
              {ticket.status}
            </Badge>
          </div>

          <div className="px-5 py-3 bg-muted/40 border-b border-border">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">
              Contexto do paciente
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
              <span className="inline-flex items-center gap-1.5"><User className="h-3.5 w-3.5 text-muted-foreground" /> {ticket.patient}</span>
              <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-muted-foreground" /> Cirurgia: {ticket.surgeryDate} — {ticket.surgery}</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 bg-background">
            {ticket.messages.map((m, i) => (
              <div key={i} className={cn("flex", m.from === "agent" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[78%] rounded-2xl px-4 py-2.5 text-sm shadow-sm",
                    m.from === "agent"
                      ? "bg-gold text-graphite rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm",
                  )}
                >
                  <div>{m.text}</div>
                  <div className={cn("mt-1 text-[10px]", m.from === "agent" ? "text-graphite/70" : "text-muted-foreground")}>{m.time}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border p-3 flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground px-2">
              <MessageSquare className="h-3.5 w-3.5" /> WhatsApp
            </div>
            <Input
              placeholder="Digite sua mensagem..."
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              className="flex-1"
            />
            <Button onClick={send} className="bg-gold text-graphite hover:bg-gold/90">
              <Send className="h-4 w-4 mr-1.5" /> Enviar
            </Button>
            <Button variant="outline" onClick={resolve}>
              <CheckCircle2 className="h-4 w-4 mr-1.5" /> Resolver
            </Button>
          </div>
        </Card>

        {/* Painel lateral - garantias / metadados */}
        <div className="space-y-4">
          <Card className="p-4">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <ShieldCheck className="h-4 w-4 text-gold" /> Garantias
            </div>
            {ticket.warranty ? (
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{ticket.warranty.type}</span>
                  <span className="font-medium">
                    {ticket.warranty.monthsElapsed}/{ticket.warranty.monthsTotal} meses
                  </span>
                </div>
                <Progress
                  value={(ticket.warranty.monthsElapsed / ticket.warranty.monthsTotal) * 100}
                  className="h-2"
                />
                <p className="text-[11px] text-muted-foreground">
                  Restam {ticket.warranty.monthsTotal - ticket.warranty.monthsElapsed} meses de cobertura.
                </p>
              </div>
            ) : (
              <p className="mt-2 text-xs text-muted-foreground">Sem garantias ativas para este paciente.</p>
            )}
          </Card>

          <Card className="p-4">
            <div className="text-sm font-semibold mb-2">Detalhes do ticket</div>
            <dl className="text-xs space-y-1.5">
              <div className="flex justify-between"><dt className="text-muted-foreground">ID</dt><dd className="font-mono">{ticket.id}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Paciente</dt><dd>{ticket.patientId}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Categoria</dt><dd>{ticket.category}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Canal</dt><dd>WhatsApp</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Aberto</dt><dd>{ticket.ageLabel}</dd></div>
            </dl>
          </Card>

          <Card className="p-4">
            <div className="text-sm font-semibold mb-2">Ações rápidas</div>
            <div className="grid grid-cols-1 gap-1.5">
              <Button variant="outline" size="sm" className="justify-start">Abrir Visão 360°</Button>
              <Button variant="outline" size="sm" className="justify-start">Encaminhar à Enfermagem</Button>
              <Button variant="outline" size="sm" className="justify-start">Registrar ocorrência</Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}