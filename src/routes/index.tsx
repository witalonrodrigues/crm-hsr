import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDownRight, ArrowUpRight, TrendingUp } from "lucide-react";
import { KPIS, CHANNEL_DATA, MONTH_FLOW, FUNNEL, TEAM_RANKING } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Dashboard — CRM Hospital São Rafael" }] }),
  component: Dashboard,
});

function Dashboard() {
  const maxChannel = Math.max(...CHANNEL_DATA.map((c) => c.leads));
  const maxFlow = Math.max(...MONTH_FLOW.map((d) => d.agendados));
  const maxFunnel = FUNNEL[0].value;

  return (
    <>
      <PageHeader
        title="Dashboard Estratégico"
        description="Visão consolidada da operação cirúrgica · maio de 2026"
        actions={
          <Button className="bg-gold hover:bg-gold/90 text-graphite-foreground">Exportar relatório</Button>
        }
      />
      <div className="px-8 py-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {KPIS.map((kpi) => (
            <Card key={kpi.label} className="p-4 border-border/70">
              <div className="text-xs text-muted-foreground">{kpi.label}</div>
              <div className="mt-2 text-2xl font-semibold text-foreground tracking-tight">{kpi.value}</div>
              <div className={`mt-1 inline-flex items-center gap-1 text-xs ${kpi.positive ? "text-mint-foreground" : "text-destructive"}`}>
                {kpi.positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {kpi.delta} vs. mês anterior
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-5 lg:col-span-2 border-border/70">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm font-semibold">Leads por canal de origem</div>
                <div className="text-xs text-muted-foreground">Últimos 30 dias</div>
              </div>
            </div>
            <div className="space-y-3">
              {CHANNEL_DATA.map((c) => (
                <div key={c.channel} className="flex items-center gap-3">
                  <div className="w-24 text-xs text-muted-foreground">{c.channel}</div>
                  <div className="flex-1 h-7 rounded-md bg-muted overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-gold to-amber/80 rounded-md flex items-center justify-end pr-2 text-[11px] font-medium text-graphite"
                      style={{ width: `${(c.leads / maxChannel) * 100}%` }}
                    >
                      {c.leads}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5 border-border/70">
            <div className="text-sm font-semibold mb-1">Ranking da equipe</div>
            <div className="text-xs text-muted-foreground mb-4">Contratos fechados no mês</div>
            <div className="space-y-3">
              {TEAM_RANKING.map((t, i) => (
                <div key={t.name} className="flex items-center gap-3">
                  <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? "bg-gold text-graphite" : "bg-muted text-muted-foreground"}`}>
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{t.name}</div>
                    <div className="text-[11px] text-muted-foreground">Conversão {t.conv}</div>
                  </div>
                  <div className="text-sm font-semibold text-foreground">{t.contracts}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5 lg:col-span-2 border-border/70">
            <div className="text-sm font-semibold mb-1">Agendamentos vs. Faltas vs. Atendidos</div>
            <div className="text-xs text-muted-foreground mb-4">Maio/2026</div>
            <div className="h-56 relative">
              <svg viewBox="0 0 700 200" className="w-full h-full">
                {[0, 1, 2, 3].map((i) => (
                  <line key={i} x1="0" x2="700" y1={i * 50 + 10} y2={i * 50 + 10} stroke="oklch(0.92 0 0)" strokeDasharray="3 3" />
                ))}
                {(["agendados", "atendidos", "faltas"] as const).map((key, idx) => {
                  const colors = ["oklch(0.62 0.13 75)", "oklch(0.78 0.14 165)", "oklch(0.58 0.22 27)"];
                  const pts = MONTH_FLOW.map((d, i) => {
                    const x = (i / (MONTH_FLOW.length - 1)) * 680 + 10;
                    const y = 180 - (d[key] / maxFlow) * 160;
                    return `${x},${y}`;
                  }).join(" ");
                  return <polyline key={key} points={pts} fill="none" stroke={colors[idx]} strokeWidth="2.5" />;
                })}
              </svg>
              <div className="flex gap-4 text-[11px] text-muted-foreground mt-2">
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-gold" />Agendados</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-mint" />Atendidos</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-destructive" />Faltas</span>
              </div>
            </div>
          </Card>

          <Card className="p-5 border-border/70">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-gold" />
              <div className="text-sm font-semibold">Funil de Conversão</div>
            </div>
            <div className="text-xs text-muted-foreground mb-4">Lead → Cirurgia</div>
            <div className="space-y-2">
              {FUNNEL.map((f) => (
                <div key={f.stage}>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{f.stage}</span>
                    <span className="font-medium text-foreground">{f.value}</span>
                  </div>
                  <div className="mt-1 h-2 bg-muted rounded">
                    <div className="h-full bg-gold rounded" style={{ width: `${(f.value / maxFunnel) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
