# === Stage 1: Builder ===
# Usamos node:20-alpine (leve) para construir
FROM node:20-alpine AS builder
WORKDIR /app

# Copia os manifestos do projeto
COPY package.json package-lock.json* ./

# Instala todas as dependências (incluindo devDependencies para o build)
RUN npm ci

# Copia todo o código-fonte
COPY . .

# Define o ambiente como 'production'
ENV NODE_ENV=production

# Constrói (build) a aplicação
# O 'output: standalone' cria a pasta .next/standalone
RUN npm run build

# === Stage 2: Runner ===
# Imagem final, muito mais leve
FROM node:20-alpine AS runner
WORKDIR /app

# Define o ambiente como 'production'
ENV NODE_ENV=production

# Copia os ficheiros de dependência da etapa 'builder'
# (package.json é necessário para o npm ci)
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json* ./package-lock.json*

# Instala APENAS as dependências de produção
RUN npm ci --omit=dev

# Copia os ficheiros da build standalone da etapa 'builder'
# Isto inclui o server.js, a pasta .next/static, etc.
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Copia a pasta 'public' (se tiver imagens, etc.)
COPY --from=builder /app/public ./public

# Expõe a porta 3000
EXPOSE 3000

# Boa prática: Executar como um utilizador não-root
USER node

# O comando para iniciar o servidor Next.js (standalone)
CMD ["node", "server.js"]