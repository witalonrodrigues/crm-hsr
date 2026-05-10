import { Fragment } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, AlertCircle, Phone, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/agenda")({
  head: () => ({ meta: [{ title: "Agenda Médica — CRM SR" }] }),
  component: AgendaPage,
});

const DAYS = ["Seg 12", "Ter 13", "Qua 14", "Qui 15", "Sex 16", "Sáb 17"];
const HOURS = ["07:40", "09:00", "10:20", "11:40", "13:00", "14:20", "15:40", "17:00", "18:20", "19:40"];

const SLOTS: Record<string, { patient: string; type: string; status: "Confirmado" | "Pendente" | "Falta" | "Cancelado" }> = {
  "0-1": { patient: "M. Albuquerque", type: "1ª vez", status: "Confirmado" },
  "0-3": { patient: "F. Marques", type: "Retorno", status: "Pendente" },
  "1-2": { patient: "P. Souza", type: "1ª vez", status: "Confirmado" },
  "2-4": { patient: "L. Mendes", type: "Retorno", status: "Falta" },
  "3-1": { patient: "C. Tavares", type: "1ª vez", status: "Confirmado" },
  "3-5": { patient: "A. Pinheiro", type: "Retorno", status: "Pendente" },
  "4-0": { patient: "S. Lopes", type: "1ª vez", status: "Cancelado" },
  "4-6": { patient: "V. Costa", type: "Retorno", status: "Confirmado" },
};

const REGUA = [
  { name: "B. Furtado", surgery: "22/05", d4: "ok", d2: "ok", d1: "wait", dD: "—" },
  { name: "M. Albuquerque", surgery: "23/05", d4: "ok", d2: "wait", d1: "—", dD: "—" },
  { name: "L. Mendes", surgery: "24/05", d4: "ok", d2: "ok", d1: "ok", dD: "wait" },
];

function statusColor(s: string) {
  return {
    Confirmado: "bg-mint/20 text-mint-foreground border-mint/40",
    Pendente: "bg-amber/20 text-[oklch(0.35_0.1_75)] border-amber/40",
    Falta: "bg-destructive/15 text-destructive border-destructive/40",
    Cancelado: "bg-muted text-muted-foreground border-border",
  }[s] || "";
}

function AgendaPage() {
  return (
    <>
      <PageHeader
        title="Agenda Médica"
        description="Grade ambulatorial · 12–17 de maio"
        actions={
          <div className="flex gap-2">
            <Select defaultValue="all"><SelectTrigger className="w-44"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">Todos os médicos</SelectItem><SelectItem value="dr1">Dr. Eduardo Lima</SelectItem><SelectItem value="dr2">Dra. Marina Reis</SelectItem></SelectContent></Select>
            <Button className="bg-gold text-graphite-foreground hover:bg-gold/90">Novo agendamento</Button>
          </div>
        }
      />
      <div className="px-8 py-6 grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-5">
        <Card className="p-4 border-border/70 overflow-x-auto">
          <div className="grid grid-cols-[80px_repeat(6,minmax(120px,1fr))] gap-1 min-w-[800px]">
            <div />
            {DAYS.map((d) => <div key={d} className="text-xs font-semibold text-center py-2 text-muted-foreground">{d}</div>)}
            {HOURS.map((h, hi) => (
              <Fragment key={h}>
                <div key={`h-${h}`} className="text-[11px] text-muted-foreground py-3 pr-2 text-right">{h}</div>
                {DAYS.map((_, di) => {
                  const s = SLOTS[`${di}-${hi}`];
                  return (
                    <div key={`${di}-${hi}`} className="border border-dashed border-border rounded-md min-h-[52px] p-1.5">
                      {s && (
                        <div className={`rounded text-[11px] px-1.5 py-1 border ${statusColor(s.status)}`}>
                          <div className="font-medium truncate">{s.patient}</div>
                          <div className="opacity-75">{s.type}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </Fragment>
            ))}
          </div>
        </Card>

        <Card className="p-5 border-border/70 h-fit">
          <div className="text-sm font-semibold">Régua de Confirmação</div>
          <div className="text-xs text-muted-foreground mb-4">Status D-4 → Dia D</div>
          <div className="space-y-3">
            {REGUA.map((r) => (
              <div key={r.name} className="rounded-md border border-border p-3 bg-card">
                <div className="flex justify-between"><span className="text-sm font-medium">{r.name}</span><span className="text-[11px] text-muted-foreground">Cirurgia {r.surgery}</span></div>
                <div className="grid grid-cols-4 gap-1 mt-2">
                  {(["d4", "d2", "d1", "dD"] as const).map((k, i) => {
                    const v = r[k];
                    const Icon = v === "ok" ? Check : v === "wait" ? AlertCircle : null;
                    return (
                      <div key={k} className="text-center">
                        <div className={`mx-auto h-7 w-7 rounded-full flex items-center justify-center ${v === "ok" ? "bg-mint/20 text-mint-foreground" : v === "wait" ? "bg-amber/30 text-[oklch(0.35_0.1_75)]" : "bg-muted text-muted-foreground"}`}>
                          {Icon ? <Icon className="h-3.5 w-3.5" /> : "—"}
                        </div>
                        <div className="text-[10px] mt-1 text-muted-foreground">{["D-4","D-2","D-1","Dia D"][i]}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex gap-1 mt-3">
                  <Button size="sm" variant="outline" className="flex-1 h-7 text-[11px] gap-1"><Phone className="h-3 w-3" />Ligação</Button>
                  <Button size="sm" variant="outline" className="flex-1 h-7 text-[11px] gap-1"><MessageSquare className="h-3 w-3" />WhatsApp</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}