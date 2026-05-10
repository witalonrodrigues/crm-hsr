import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LEAD_STAGES, LEADS } from "@/lib/mock-data";
import { SLABadge } from "@/components/app-sidebar";
import { Plus, RotateCcw } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/leads")({
  head: () => ({ meta: [{ title: "Gestão de Leads — CRM SR" }] }),
  component: LeadsPage,
});

function LeadsPage() {
  return (
    <>
      <PageHeader
        title="Gestão de Leads"
        description="Funil de acolhimento · pipeline em tempo real"
        actions={
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gold hover:bg-gold/90 text-graphite-foreground gap-1.5">
                <Plus className="h-4 w-4" /> Iniciar Acolhimento
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Iniciar Acolhimento de Lead</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <div><Label>Nome</Label><Input placeholder="Nome completo" /></div>
                <div><Label>Telefone</Label><Input placeholder="(71) 9 9999-9999" /></div>
                <div><Label>Procedimento de interesse</Label><Input placeholder="Ex.: Mamoplastia" /></div>
                <div><Label>Tabulação do contato</Label><Textarea placeholder="Observações livres conforme workflow 3CX…" /></div>
              </div>
              <DialogFooter>
                <Button onClick={() => toast.success("Lead registrado · sincronizado com Tasy")} className="bg-gold text-graphite-foreground">Salvar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />
      <div className="px-6 py-6 overflow-x-auto">
        <div className="flex gap-4 min-w-max">
          {LEAD_STAGES.map((stage) => {
            const cards = LEADS.filter((l) => l.stage === stage);
            const isLost = stage === "Não Fechou";
            return (
              <div key={stage} className="w-72 shrink-0">
                <div className="flex items-center justify-between mb-2 px-1">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{stage}</div>
                  <span className="text-[11px] rounded-full bg-muted px-2 py-0.5 font-medium">{cards.length}</span>
                </div>
                <div className="space-y-2 bg-muted/40 rounded-lg p-2 min-h-[400px]">
                  {cards.map((c) => (
                    <Card key={c.id} className="p-3 hover:shadow-md hover:-translate-y-0.5 transition cursor-pointer border-border/70">
                      <Link to="/paciente" className="block space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="font-medium text-sm leading-tight">{c.name}</div>
                          {stage === "Novo Lead" && <SLABadge minutes={c.createdMinutesAgo} />}
                        </div>
                        <div className="text-xs text-muted-foreground">{c.procedure}</div>
                        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                          <span className="rounded bg-background px-1.5 py-0.5 border border-border">{c.channel}</span>
                          <span>{c.attendant}</span>
                        </div>
                      </Link>
                      {isLost && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full mt-2 h-7 text-xs gap-1"
                          onClick={() => toast.success("Reabordagem agendada via WhatsApp")}
                        >
                          <RotateCcw className="h-3 w-3" /> Reabordagem
                        </Button>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}