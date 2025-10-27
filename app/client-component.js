// app/client-component.jsx
"use client"; // ESSENCIAL! Isso marca como um Client Component.

import { useEffect } from 'react';

export default function ClientComponent() {

  // Usamos useEffect para garantir que este código rode 
  // APENAS no navegador.
  useEffect(() => {
    // ==========================================================
    // LADO DO CLIENTE (NAVEGADOR)
    // ==========================================================
    console.log("--- 💧 RENDERIZAÇÃO NO CLIENTE (client-component.jsx) ---");
    
    // 1. Acesso à variável de cliente (FUNCIONA!)
    // A variável com prefixo NEXT_PUBLIC_ está disponível.
    console.log("NEXT_PUBLIC_ANALYTICS_ID (no Cliente):", process.env.NEXT_PUBLIC_ANALYTICS_ID);

    // 2. TENTATIVA de acesso à variável de servidor (FALHA!)
    // Esta variável NÃO FOI enviada ao navegador.
    // O resultado será 'undefined'.
    console.log("MY_SERVER_SECRET (no Cliente):", process.env.MY_SERVER_SECRET);

    console.log("------------------------------------------------------");
    // ==========================================================
  }, []);

  return (
    <div style={{ background: '#e6f7ff', padding: '1rem', borderRadius: '8px' }}>
      <h2>Componente de Cliente (app/client-component.js)</h2>
      <p>
        Este componente (marcado com `"use client"`) roda no navegador.
      </p>
      <p>
        <strong>Abra o Console do Desenvolvedor do seu navegador</strong> (F12)
        para ver os logs.
      </p>
      <p>
        Você verá que `NEXT_PUBLIC_ANALYTICS_ID` tem um valor, 
        mas `MY_SERVER_SECRET` será <strong>undefined</strong>.
      </p>

      <h3>Valores lidos no Cliente (Browser):</h3>
      <p>
        <strong>NEXT_PUBLIC_ANALYTICS_ID:</strong>
        <span> {process.env.NEXT_PUBLIC_ANALYTICS_ID}</span>
      </p>
      <p>
        <strong>MY_SERVER_SECRET (Tentativa):</strong>
        <span> {process.env.MY_SERVER_SECRET || "undefined (como esperado)"}</span>
      </p>
    </div>
  );
}