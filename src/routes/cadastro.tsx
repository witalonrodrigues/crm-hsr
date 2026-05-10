import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { SyncBadge } from "@/components/app-sidebar";

export const Route = createFileRoute("/cadastro")({
  head: () => ({ meta: [{ title: "Cadastro de Pacientes — CRM SR" }] }),
  component: PatientForm,
});

function imcInfo(imc: number) {
  if (!isFinite(imc) || imc <= 0) return { label: "—", color: "text-muted-foreground" };
  if (imc < 18.5) return { label: "Abaixo do peso", color: "text-amber" };
  if (imc < 25) return { label: "Normal", color: "text-mint-foreground" };
  if (imc < 30) return { label: "Sobrepeso", color: "text-amber" };
  return { label: "Obesidade", color: "text-destructive" };
}

function PatientForm() {
  const [weight, setW] = useState("");
  const [height, setH] = useState("");
  const w = parseFloat(weight);
  const h = parseFloat(height) / 100;
  const imc = w && h ? w / (h * h) : 0;
  const info = imcInfo(imc);
  return (
    <>
      <PageHeader title="Cadastro de Pacientes" description="Novo cadastro · sincronização automática com Tasy" />
      <div className="px-8 py-6 max-w-5xl">
        <Card className="p-6 border-border/70">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2"><Label>Nome completo</Label><Input placeholder="Nome completo" /></div>
            <div><Label>Data de nascimento</Label><Input type="date" /></div>
            <div><Label>CPF</Label><Input placeholder="000.000.000-00" /></div>
            <div><Label>Sexo</Label><Select><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger><SelectContent><SelectItem value="f">Feminino</SelectItem><SelectItem value="m">Masculino</SelectItem><SelectItem value="o">Outro</SelectItem></SelectContent></Select></div>
            <div><Label>Profissão</Label><Input placeholder="Profissão" /></div>
            <div><Label>E-mail</Label><Input type="email" placeholder="email@exemplo.com" /></div>
            <div><Label>Telefone</Label><Input placeholder="(71) 9 9999-9999" /></div>
            <div className="col-span-2"><Label>Fonte / Origem</Label><Select><SelectTrigger><SelectValue placeholder="Selecione o canal" /></SelectTrigger><SelectContent>{["Instagram","Facebook","Google Ads","Indicação","Site","WhatsApp"].map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div>
            <div><Label>Peso (kg)</Label><Input type="number" value={weight} onChange={(e) => setW(e.target.value)} /></div>
            <div><Label>Altura (cm)</Label><Input type="number" value={height} onChange={(e) => setH(e.target.value)} /></div>
          </div>
          <div className="mt-5 rounded-lg border border-border bg-muted/30 p-4 flex items-center justify-between">
            <div><div className="text-xs text-muted-foreground">IMC calculado em tempo real</div><div className="text-2xl font-semibold">{imc ? imc.toFixed(1) : "—"}</div></div>
            <div className={`text-sm font-medium ${info.color}`}>{info.label}</div>
          </div>
          <div className="mt-5 flex justify-between items-center">
            <SyncBadge />
            <Button className="bg-gold text-graphite-foreground hover:bg-gold/90" onClick={() => toast.success("Cadastro enviado para o Tasy")}>Salvar cadastro</Button>
          </div>
        </Card>
      </div>
    </>
  );
}