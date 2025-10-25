# === Stage 1: Builder ===
# Usamos uma imagem Node.js completa para construir a aplicação
FROM node:20-alpine AS builder

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os ficheiros de definição do projeto
COPY package.json package-lock.json* ./

# Instala as dependências (modo "clean install" para produção)
RUN npm ci

# Copia todo o código-fonte da aplicação
COPY . .

# Define o ambiente como 'production' (importante para o build)
ENV NODE_ENV=production

# Constrói (build) a aplicação Next.js
# Isso gera a pasta .next otimizada
RUN npm run build

# === Stage 2: Runner ===
# Usamos uma imagem Node.js "slim" (menor) para executar
FROM node:20-alpine AS runner

WORKDIR /app

# Define o ambiente como 'production' (importante para o runtime)
ENV NODE_ENV=production

# Copia os ficheiros de dependência da etapa 'builder'
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json* ./package-lock.json*

# Instala APENAS as dependências de produção
RUN npm ci --omit=dev

# Copia os ficheiros necessários para executar a aplicação
# da etapa 'builder' para a etapa 'runner'
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/next.config.mjs ./next.config.mjs

# (IMPORTANTE) Copia o ficheiro de instrumentação compilado
# O build do Next.js coloca o instrumentation.js dentro de .next/standalone
# Mas, para garantir, vamos copiar o ficheiro de configuração que o habilita.
# Nota: O `npm run build` já processou o instrumentation.ts.
# O output do build (`.next/standalone`) já contém tudo o que o `next start` precisa.

# Expõe a porta que o Next.js usa por padrão
EXPOSE 3000

# Define o utilizador para 'node' (boas práticas de segurança)
USER node

# O comando para iniciar o servidor Next.js
# Usamos 'node server.js' que é o output do build standalone
CMD ["node", "server.js"]