import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Send, Clock } from "lucide-react";

export const Route = createFileRoute("/pre-cirurgico")({
  head: () => ({ meta: [{ title: "Pré-Cirúrgico — CRM SR" }] }),
  component: PreSurgicalPage,
});

const PATIENTS = [
  { name: "Beatriz Furtado", surgery: "22/05", d60: "ok", d15: "ok", d4: "wait" },
  { name: "Mariana Albuquerque", surgery: "23/05", d60: "ok", d15: "wait", d4: "—" },
  { name: "Renata Caldas", surgery: "27/05", d60: "ok", d15: "—", d4: "—" },
];
const OCC = [
  { time: "07:42", med: "Dr. Eduardo Lima", note: "Atraso de 2 min", patients: 4 },
  { time: "08:15", med: "Dra. Marina Reis", note: "—", patients: 6 },
  { time: "13:10", med: "Dr. Otto N.", note: "Atraso de 10 min · trânsito", patients: 3 },
];
const RESCH = [
  { req: "10/05", name: "L. Mendes", med: "Dr. Eduardo Lima", oldD: "15/05", newD: "24/05", reason: "Exame pendente" },
  { req: "08/05", name: "F. Marques", med: "Dra. Marina Reis", oldD: "12/05", newD: "29/05", reason: "Solicitação do paciente" },
];
const ADMIN = [
  { name: "C. Tavares", issue: "Pagamento 2ª parcela em atraso", status: "Em cobrança" },
  { name: "A. Pinheiro", issue: "Troca de cirurgião solicitada", status: "Aguardando aprovação" },
];

function Dot({ v }: { v: string }) {
  if (v === "ok") return <span className="inline-flex h-6 w-6 rounded-full bg-mint/20 items-center justify-center"><Check className="h-3.5 w-3.5 text-mint-foreground" /></span>;
  if (v === "wait") return <span className="inline-flex h-6 w-6 rounded-full bg-amber/30 items-center justify-center"><Clock className="h-3.5 w-3.5 text-[oklch(0.35_0.1_75)]" /></span>;
  return <span className="inline-flex h-6 w-6 rounded-full bg-muted items-center justify-center text-[10px] text-muted-foreground">—</span>;
}

function PreSurgicalPage() {
  return (
    <>
      <PageHeader title="Pré-Cirúrgico" description="Centro de controle entre contrato e cirurgia" />
      <div className="px-8 py-6 space-y-5">
        <Card className="p-5 border-border/70">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-semibold">Régua de comunicação</div>
              <div className="text-xs text-muted-foreground">D-60 · D-15 · D-4 · status de envio</div>
            </div>
            <Button size="sm" variant="outline" className="gap-1.5"><Send className="h-3.5 w-3.5" />Disparar lote</Button>
          </div>
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground"><tr className="border-b"><th className="text-left py-2 font-medium">Paciente</th><th className="font-medium">Cirurgia</th><th className="font-medium">D-60</th><th className="font-medium">D-15</th><th className="font-medium">D-4</th><th /></tr></thead>
            <tbody>
              {PATIENTS.map((p) => (
                <tr key={p.name} className="border-b border-border/50">
                  <td className="py-3 font-medium">{p.name}</td>
                  <td className="text-center text-muted-foreground">{p.surgery}</td>
                  <td className="text-center"><Dot v={p.d60} /></td>
                  <td className="text-center"><Dot v={p.d15} /></td>
                  <td className="text-center"><Dot v={p.d4} /></td>
                  <td className="text-right"><Button size="sm" variant="ghost" className="text-xs">Reagendar</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Card className="p-5 border-border/70">
            <div className="text-sm font-semibold mb-3">Livro de Ocorrências</div>
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground"><tr className="border-b"><th className="text-left py-2">Hora</th><th className="text-left">Médico</th><th className="text-left">Observação</th><th>Pcts.</th></tr></thead>
              <tbody>
                {OCC.map((o, i) => (
                  <tr key={i} className="border-b border-border/50"><td className="py-2 font-mono text-xs">{o.time}</td><td>{o.med}</td><td className="text-muted-foreground">{o.note}</td><td className="text-center">{o.patients}</td></tr>
                ))}
              </tbody>
            </table>
          </Card>
          <Card className="p-5 border-border/70">
            <div className="text-sm font-semibold mb-3">Pendências</div>
            <Tabs defaultValue="resch">
              <TabsList><TabsTrigger value="resch">Reagendamentos</TabsTrigger><TabsTrigger value="adm">Administrativas</TabsTrigger></TabsList>
              <TabsContent value="resch" className="mt-3">
                <table className="w-full text-xs">
                  <thead><tr className="text-muted-foreground border-b"><th className="text-left py-2">Solic.</th><th className="text-left">Paciente</th><th className="text-left">Médico</th><th>Antiga</th><th>Nova</th><th className="text-left">Motivo</th></tr></thead>
                  <tbody>{RESCH.map((r, i) => (<tr key={i} className="border-b border-border/50"><td className="py-2">{r.req}</td><td>{r.name}</td><td>{r.med}</td><td className="text-center">{r.oldD}</td><td className="text-center text-mint-foreground">{r.newD}</td><td>{r.reason}</td></tr>))}</tbody>
                </table>
              </TabsContent>
              <TabsContent value="adm" className="mt-3 space-y-2">
                {ADMIN.map((a, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded border border-border bg-muted/30 text-sm">
                    <div><div className="font-medium">{a.name}</div><div className="text-xs text-muted-foreground">{a.issue}</div></div>
                    <span className="text-xs rounded-full bg-amber/20 text-[oklch(0.35_0.1_75)] px-2 py-0.5 border border-amber/40">{a.status}</span>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </>
  );
}