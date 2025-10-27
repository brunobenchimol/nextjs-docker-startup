// app/page.jsx
// Este é um Server Component (SC) por padrão.
// Ele roda APENAS no servidor.

import ClientComponent from './client-component';

export default function Home() {
  
  // ==========================================================
  // LADO DO SERVIDOR (TERMINAL)
  // ==========================================================
  console.log("--- ⚡️ RENDERIZAÇÃO NO SERVIDOR (page.jsx) ---");

  // 1. Acesso à variável de servidor (FUNCIONA!)
  console.log("MY_SERVER_SECRET (no Servidor):", process.env.MY_SERVER_SECRET);

  // 2. Acesso à variável de cliente (FUNCIONA!)
  // O servidor pode ler TODAS as variáveis.
  console.log("NEXT_PUBLIC_ANALYTICS_ID (no Servidor):", process.env.NEXT_PUBLIC_ANALYTICS_ID);

  console.log("-------------------------------------------------");
  // ==========================================================

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif', lineHeight: '1.6' }}>
      <h1>Exemplo de Variáveis de Ambiente (Next.js)</h1>
      
      <div style={{ background: '#f4f4f4', padding: '1rem', borderRadius: '8px' }}>
        <h2>Componente de Servidor (app/page.js)</h2>
        <p>
          Este componente roda no servidor. Ele pode acessar 
          <strong> AMBAS</strong> as variáveis de ambiente.
        </p>
        <p>
          <strong>Abra o terminal</strong> onde você rodou `npm run dev` 
          para ver os logs. Você verá tanto `MY_SERVER_SECRET` quanto 
          `NEXT_PUBLIC_ANALYTICS_ID`.
        </p>
        <p>
          Valor público lido no servidor: 
          <strong> {process.env.NEXT_PUBLIC_ANALYTICS_ID} </strong>
        </p>
        {/*
          NUNCA faça isso: <p>{process.env.MY_SERVER_SECRET}</p>
          Renderizar o segredo no HTML o enviaria para o cliente.
        */}
      </div>

      <hr style={{ margin: '2rem 0' }} />

      {/* Vamos renderizar o Componente de Cliente abaixo */}
      <ClientComponent />

    </main>
  );
}