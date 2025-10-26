// Importar 'os' para funções de Sistema Operacional
import os from "os";

/**
 * Define que este módulo DEVE executar no runtime Node.js
 * e não no Edge runtime. Isso nos dá acesso a 'process', 'os', 'fs', etc.
 */
export const runtime = 'nodejs';

/**
 * Esta função é exportada e chamada pelo Next.js
 * exatamente uma vez no startup do servidor.
 */
export async function register() {
  console.log("==================================================");
  console.log("🧩 [Startup] Verificação de ambiente do Next.js 15");

  // O seu código de diagnóstico
  try {
    console.log("process.release.name:", process.release.name); // Ex: 'node'
    console.log("process.versions.node:", process.versions.node);
    console.log("NODE_ENV:", process.env.NODE_ENV); // Será 'production' no Docker
    console.log("Plataforma:", os.platform()); // Ex: 'linux'
    console.log("Arquitetura:", os.arch()); // Ex: 'x64'
    console.log("✔️ Ambiente inicializado com runtime Node.js\n");
  } catch (err) {
    if (err instanceof Error) {
        console.warn("Falha ao ler detalhes do processo:", err.message);
    } else {
        console.warn("Falha ao ler detalhes do processo:", err);
    }
  }
  
  // Validar variáveis de ambiente críticas
  console.log("Verificando variáveis de ambiente...");
  if (!process.env.TESTADOR_API_URL) {
    console.error("[ERRO FATAL] TESTADOR_API_URL não está definida!");
  } else {
    console.log("✔️ TESTADOR_API_URL: Definida.");
  }

  if (!process.env.API_ACCESS_KEY) {
    console.error("[ERRO FATAL] API_ACCESS_KEY não está definida!");
  } else {
    // Apenas confirme que existe, não imprima a chave!
    console.log("✔️ API_ACCESS_KEY: Definida.");
  }

  console.log("==================================================");
}