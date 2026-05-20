## Problema

O `AppSidebar` está com `hidden lg:flex`, então em telas <1024px ele desaparece e não há nenhum substituto. O usuário fica sem como navegar entre Dashboard, Leads, Agenda, etc. no mobile/tablet.

## Solução

Adicionar uma barra superior mobile (visível apenas em `<lg`) com:

1. **Topbar mobile fixa** (`src/components/mobile-topbar.tsx`)
   - Logo "SR" + nome do hospital à esquerda
   - Botão de busca (abre o mesmo `CommandDialog` do ⌘K)
   - Botão hambúrguer à direita que abre um `Sheet` (drawer lateral)

2. **Drawer de navegação** dentro do mesmo componente
   - Usa `Sheet` (`side="left"`) do shadcn (já instalado)
   - Reaproveita a mesma lista `items` do `AppSidebar` (extrair para `src/components/nav-items.ts` para evitar duplicação)
   - Cada `Link` fecha o sheet ao ser clicado (`onOpenChange(false)`)
   - Mantém o badge "Sincronizado com Tasy" no rodapé do drawer
   - Destaca rota ativa com a mesma lógica de `useRouterState`

3. **Integração no `__root.tsx`**
   - Renderizar `<MobileTopbar onOpenSearch={() => setOpen(true)} />` antes do `<Outlet />`, com `className="lg:hidden"`
   - Adicionar `pt-14 lg:pt-0` no `<main>` para compensar a topbar fixa
   - `AppSidebar` continua `hidden lg:flex` (sem mudança)

4. **Ajuste de page headers** (se necessário)
   - Verificar se `PageHeader` precisa de padding extra no mobile — provavelmente não, pois o topbar é fixo separado

## Resultado

- Desktop (≥lg): comportamento atual inalterado (sidebar fixa à esquerda).
- Mobile/tablet (<lg): topbar fixa com hambúrguer → drawer com todas as rotas + busca global acessível pelo ícone.
- Nenhuma rota nova; apenas presentation/navigation.
