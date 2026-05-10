import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Phone, MessageSquare, Mail, FileCheck2, ShieldCheck, Check } from "lucide-react";
import { PendBadge } from "@/components/app-sidebar";

export const Route = createFileRoute("/paciente")({
  head: () => ({ meta: [{ title: "Visão 360° — CRM SR" }] }),
  component: Patient360,
});

const TIMELINE = [
  { label: "Lead Captado", date: "12/03/2026", done: true },
  { label: "Primeiro Contato", date: "12/03/2026 14:22", done: true },
  { label: "Consulta Agendada", date: "18/03/2026", done: true },
  { label: "Avaliação Realizada", date: "22/03/2026", done: true },
  { label: "Orçamento Gerado", date: "23/03/2026", done: true },
  { label: "Contrato Assinado", date: "28/03/2026", done: true },
  { label: "Exames Solicitados", date: "Entrega esperada 07/05/2026", done: true },
  { label: "Pré-Cirúrgico Iniciado", date: "Em andamento", done: true, current: true },
  { label: "Cirurgia Confirmada", date: "22/05/2026", done: false },
  { label: "1º Retorno Pós-Op", date: "—", done: false },
  { label: "Alta", date: "—", done: false },
];

function Patient360() {
  const weight = 64;
  const height = 1.65;
  const imc = (weight / (height * height)).toFixed(1);
  return (
    <>
      <PageHeader title="Visão 360° do Paciente" description="Perfil clínico e operacional unificado" />

      <div className="px-8 py-6 space-y-5">
        <Card className="p-5 border-border/70">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-gold to-amber/70 flex items-center justify-center text-graphite font-bold text-xl">BF</div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">Beatriz Furtado</h2>
                <span className="text-xs text-muted-foreground">· 34 anos · CPF XXX.XXX.XXX-21</span>
              </div>
              <div className="text-sm text-muted-foreground">Mamoplastia + Lipo · Cirurgia em 22/05/2026</div>
            </div>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div><div className="text-[11px] text-muted-foreground">Peso</div><div className="font-semibold">{weight} kg</div></div>
              <div><div className="text-[11px] text-muted-foreground">Altura</div><div className="font-semibold">{height} m</div></div>
              <div><div className="text-[11px] text-muted-foreground">IMC</div><div className="font-semibold text-mint-foreground">{imc}</div></div>
            </div>
          </div>
        </Card>

        <div className="space-y-2">
          <div className="flex items-center gap-3 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3">
            <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />
            <div className="text-sm"><span className="font-semibold">Exames pendentes</span> — faltam 12 dias para a cirurgia. Acionar paciente imediatamente.</div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-amber/40 bg-amber/15 px-4 py-3">
            <PendBadge>Pendência Documental</PendBadge>
            <div className="text-sm">Termo de Ciência de Peso ainda não assinado.</div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-mint/30 bg-mint/10 px-4 py-3">
            <ShieldCheck className="h-4 w-4 text-mint-foreground" />
            <div className="text-sm">Garantia de prótese ativa por mais 23 meses.</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <Card className="p-5 lg:col-span-1 border-border/70">
            <div className="text-sm font-semibold mb-4">Linha do tempo</div>
            <div className="relative pl-5">
              <div className="absolute left-1.5 top-1 bottom-1 w-px bg-border" />
              {TIMELINE.map((t, i) => (
                <div key={i} className="relative pb-4 last:pb-0">
                  <div className={`absolute -left-3.5 top-0.5 h-3 w-3 rounded-full border-2 ${t.current ? "bg-gold border-gold" : t.done ? "bg-mint border-mint" : "bg-background border-border"}`} />
                  <div className={`text-sm ${t.done ? "text-foreground" : "text-muted-foreground"} ${t.current ? "font-semibold" : ""}`}>{t.label}</div>
                  <div className="text-[11px] text-muted-foreground">{t.date}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5 lg:col-span-2 border-border/70">
            <Tabs defaultValue="comm">
              <TabsList>
                <TabsTrigger value="comm">Comunicações</TabsTrigger>
                <TabsTrigger value="docs">Documentos</TabsTrigger>
                <TabsTrigger value="evol">Evoluções Pós-Venda</TabsTrigger>
              </TabsList>
              <TabsContent value="comm" className="mt-4 space-y-3">
                {[
                  { icon: Phone, label: "Ligação tabulada (3CX)", date: "Hoje 09:12", text: "Confirmou presença na consulta pré-anestésica." },
                  { icon: MessageSquare, label: "WhatsApp", date: "Ontem 18:40", text: "Lembrete D-2 enviado · entregue ✓✓" },
                  { icon: Mail, label: "E-mail", date: "07/05 11:02", text: "Boas-vindas pós-contrato." },
                ].map((c, i) => (
                  <div key={i} className="flex gap-3 p-3 rounded-md bg-muted/40 border border-border/60">
                    <c.icon className="h-4 w-4 mt-0.5 text-gold" />
                    <div className="flex-1">
                      <div className="flex justify-between text-xs"><span className="font-medium">{c.label}</span><span className="text-muted-foreground">{c.date}</span></div>
                      <div className="text-sm text-foreground/80 mt-0.5">{c.text}</div>
                    </div>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="docs" className="mt-4 space-y-2">
                {[
                  { name: "Contrato cirúrgico", ok: true },
                  { name: "Orçamento nº 4012", ok: true },
                  { name: "Termo de Ciência de Peso", ok: false },
                  { name: "Termo de Ciência de Hérnia", ok: true },
                  { name: "Documento de identificação", ok: true },
                ].map((d) => (
                  <div key={d.name} className="flex items-center justify-between p-3 rounded-md border border-border bg-card">
                    <div className="flex items-center gap-2 text-sm"><FileCheck2 className="h-4 w-4 text-muted-foreground" />{d.name}</div>
                    {d.ok ? <Check className="h-4 w-4 text-mint-foreground" /> : <PendBadge>Faltando</PendBadge>}
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="evol" className="mt-4">
                <textarea className="w-full min-h-[180px] rounded-md border border-input bg-background p-3 text-sm" placeholder="Registrar reparos, refinamentos, reoperações…" />
                <Button className="mt-3 bg-gold text-graphite-foreground hover:bg-gold/90">Salvar evolução</Button>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </>
  );
}