import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Printer } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/cirurgia")({
  head: () => ({ meta: [{ title: "Agendamento Cirúrgico — CRM SR" }] }),
  component: SurgeryScheduling,
});

const PRE = [
  { id: 1, p: "Beatriz Furtado", surgeon: "Dr. Eduardo Lima", anesth: "Dra. Helena Sá", proc: "Mamoplastia + Lipo", room: "—", payment: "Particular" },
  { id: 2, p: "Mariana Albuquerque", surgeon: "Dra. Marina Reis", anesth: "Dr. Otto N.", proc: "Abdominoplastia", room: "—", payment: "HRS" },
];
const CONF = [
  { id: 3, p: "Larissa Mendes", surgeon: "Dr. Eduardo Lima", anesth: "Dra. Helena Sá", proc: "Mastopexia", room: "Sala 3", payment: "Particular", date: "22/05 08:00" },
  { id: 4, p: "Camila Tavares", surgeon: "Dra. Marina Reis", anesth: "Dr. Otto N.", proc: "Lipoabdominoplastia", room: "Sala 1", payment: "HRS", date: "22/05 13:00" },
];

function Row({ r, confirmed }: { r: any; confirmed?: boolean }) {
  return (
    <Card className="p-4 border-border/70">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="font-medium">{r.p}</div>
          <div className="text-xs text-muted-foreground">{r.proc} · {r.surgeon} · Anest. {r.anesth}</div>
          <div className="text-[11px] text-muted-foreground mt-1">Sala: {r.room} · Pagto: {r.payment}{confirmed && ` · ${r.date}`}</div>
        </div>
        {confirmed ? (
          <Button variant="outline" size="sm" className="gap-1"><Printer className="h-3.5 w-3.5" />Mapa</Button>
        ) : (
          <Button size="sm" className="bg-gold text-graphite-foreground hover:bg-gold/90 gap-1" onClick={() => toast.success("Cirurgia confirmada · e-mail enviado · Tasy atualizado")}>Confirmar <ArrowRight className="h-3.5 w-3.5" /></Button>
        )}
      </div>
    </Card>
  );
}

function SurgeryScheduling() {
  return (
    <>
      <PageHeader title="Agendamento Cirúrgico" description="Centro cirúrgico · planejamento e confirmação" actions={
        <Button variant="outline" className="gap-1.5"><Printer className="h-4 w-4" />Mapa do dia</Button>
      } />
      <div className="px-8 py-6 grid grid-cols-1 lg:grid-cols-2 gap-5">
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Pré-Agenda</h3>
            <span className="text-xs text-muted-foreground">{PRE.length} solicitações</span>
          </div>
          <div className="space-y-2">{PRE.map((r) => <Row key={r.id} r={r} />)}</div>
        </section>
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Agenda Confirmada</h3>
            <span className="text-xs text-mint-foreground">{CONF.length} confirmadas</span>
          </div>
          <div className="space-y-2">{CONF.map((r) => <Row key={r.id} r={r} confirmed />)}</div>
        </section>
      </div>
    </>
  );
}