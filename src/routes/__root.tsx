import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { MobileTopbar } from "@/components/mobile-topbar";
import { Toaster } from "@/components/ui/sonner";
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      { name: "description", content: "SR Health CRM manages the entire patient journey for elective plastic surgery, from lead to post-operative care." },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "SR Health CRM manages the entire patient journey for elective plastic surgery, from lead to post-operative care." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Lovable App" },
      { name: "twitter:description", content: "SR Health CRM manages the entire patient journey for elective plastic surgery, from lead to post-operative care." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/677924b8-74e8-4afa-8703-5fe3eda3d945/id-preview-763c6954--10d99f4e-d455-4a46-b92b-8d70e8dd1c29.lovable.app-1779241891426.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/677924b8-74e8-4afa-8703-5fe3eda3d945/id-preview-763c6954--10d99f4e-d455-4a46-b92b-8d70e8dd1c29.lovable.app-1779241891426.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar onOpenSearch={() => setOpen(true)} />
        <div className="flex-1 min-w-0 flex flex-col">
          <MobileTopbar onOpenSearch={() => setOpen(true)} />
          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
      <Toaster />
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Buscar paciente por nome, CPF, telefone ou ID…" />
        <CommandList>
          <CommandEmpty>Nenhum resultado.</CommandEmpty>
          <CommandGroup heading="Pacientes">
            <CommandItem onSelect={() => setOpen(false)}>Beatriz Furtado · P-2201</CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>Larissa Mendes · P-2150</CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>Camila Tavares · P-2098</CommandItem>
          </CommandGroup>
          <CommandGroup heading="Atalhos">
            <CommandItem onSelect={() => setOpen(false)}>Ir para Dashboard</CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>Novo Lead</CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>Novo Agendamento</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </QueryClientProvider>
  );
}
