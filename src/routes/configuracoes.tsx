import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/configuracoes")({
  head: () => ({ meta: [{ title: "Configurações — CRM SR" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <>
      <PageHeader title="Configurações" description="Integrações, SLA e regras operacionais" />
      <div className="px-8 py-6 grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-5xl">
        <Card className="p-5 border-border/70 space-y-4">
          <div className="text-sm font-semibold">Integrações</div>
          {[{n:"Tasy (Philips)",on:true},{n:"3CX (Telefonia)",on:true},{n:"WhatsApp Business",on:true},{n:"E-mail transacional",on:true}].map((i) => (
            <div key={i.n} className="flex items-center justify-between"><div className="text-sm">{i.n}</div><Switch defaultChecked={i.on} /></div>
          ))}
        </Card>
        <Card className="p-5 border-border/70 space-y-4">
          <div className="text-sm font-semibold">SLA do Call Center</div>
          <div><Label>Tempo máximo para 1º contato (minutos)</Label><Input type="number" defaultValue={5} /></div>
          <div><Label>E-mail do setor de Guias</Label><Input defaultValue="guias@hsaorafael.com.br" /></div>
          <div><Label>Horário (seg-sex)</Label><Input defaultValue="07:40 — 20:20" /></div>
          <div><Label>Horário (sábado)</Label><Input defaultValue="07:40 — 14:00" /></div>
        </Card>
      </div>
    </>
  );
}