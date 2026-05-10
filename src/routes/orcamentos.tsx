import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Printer, ShieldPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/orcamentos")({
  head: () => ({ meta: [{ title: "Orçamentos e Vendas — CRM SR" }] }),
  component: BudgetsPage,
});

function BudgetsPage() {
  const [proc, setProc] = useState("mama");
  const isAbdomen = proc === "abdomen";
  const reports = ["Contrato","Orçamento (com nº contrato)","Termo de Ciência de Peso", ...(isAbdomen ? ["Termo de Ciência de Hérnia"] : []),"Termo de Ciência de Perda de Peso"];
  return (
    <>
      <PageHeader title="Orçamentos e Vendas" description="Geração de proposta · documentação obrigatória" />
      <div className="px-8 py-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="p-5 border-border/70 lg:col-span-2 space-y-4">
          <div className="text-sm font-semibold">Novo orçamento</div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Procedimento</Label>
              <Select value={proc} onValueChange={setProc}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>
                <SelectItem value="mama">Mamoplastia de Aumento</SelectItem><SelectItem value="abdomen">Abdominoplastia</SelectItem><SelectItem value="lipo">Lipoaspiração HD</SelectItem><SelectItem value="rino">Rinoplastia</SelectItem>
              </SelectContent></Select></div>
            <div><Label>Médico responsável</Label><Input placeholder="Dr. Eduardo Lima" /></div>
            <div><Label>Valor (R$)</Label><Input type="number" placeholder="18500" /></div>
            <div><Label>Dias de UTI</Label><Input type="number" defaultValue={1} /></div>
            <div><Label>Convênio</Label><Select defaultValue="hrs"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="hrs">HRS</SelectItem><SelectItem value="part">Particular</SelectItem></SelectContent></Select></div>
            <div><Label>Forma de pagamento</Label><Select defaultValue="pix"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="pix">PIX</SelectItem><SelectItem value="boleto">Boleto</SelectItem><SelectItem value="card">Cartão até 2x</SelectItem></SelectContent></Select></div>
          </div>
          <div className="pt-4 border-t border-border">
            <div className="text-sm font-semibold mb-3">Checklist de Relatórios Obrigatórios</div>
            <div className="space-y-2">
              {reports.map((r) => (
                <div key={r} className="flex items-center justify-between p-3 rounded-md border border-border bg-muted/30">
                  <div className="flex items-center gap-2"><Checkbox /><span className="text-sm">{r}</span></div>
                  <Button size="sm" variant="ghost" className="gap-1"><Printer className="h-3.5 w-3.5" />Imprimir</Button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button className="bg-gold text-graphite-foreground hover:bg-gold/90 flex-1" onClick={() => toast.success("Contrato fechado · boas-vindas enviadas · Tasy atualizado")}>Fechar contrato</Button>
            <Dialog>
              <DialogTrigger asChild><Button variant="outline" className="gap-1.5"><ShieldPlus className="h-4 w-4" />Seguro Cirúrgico</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Contratação de Seguro Cirúrgico</DialogTitle></DialogHeader>
                <div className="space-y-3">
                  <div><Label>Nº do contrato</Label><Input placeholder="CT-04012" /></div>
                  <div className="grid grid-cols-2 gap-3"><div><Label>Tempo cirúrgico (h)</Label><Input type="number" defaultValue={3} /></div><div><Label>Fator de risco</Label><Select defaultValue="b"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="a">A — baixo</SelectItem><SelectItem value="b">B — moderado</SelectItem><SelectItem value="c">C — alto</SelectItem></SelectContent></Select></div></div>
                  <div><Label>Pagamento</Label><Select defaultValue="pix"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="pix">PIX</SelectItem><SelectItem value="boleto">Boleto</SelectItem><SelectItem value="card">Cartão até 2x</SelectItem></SelectContent></Select></div>
                </div>
                <DialogFooter><Button onClick={() => toast.success("Seguro contratado · e-mail enviado")} className="bg-gold text-graphite-foreground">Finalizar</Button></DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </Card>
        <Card className="p-5 border-border/70 h-fit">
          <div className="text-sm font-semibold mb-3">Ordem para o Caixa</div>
          <ol className="space-y-2">
            {["Check-list","Contrato","Orçamento","Termos","Documento de identificação"].map((s, i) => (
              <li key={s} className="flex items-center gap-3 p-2 rounded border border-border bg-card">
                <span className="h-6 w-6 rounded-full bg-gold text-graphite font-bold text-xs flex items-center justify-center">{i + 1}</span>
                <span className="text-sm">{s}</span>
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </>
  );
}