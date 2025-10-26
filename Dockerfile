# === Stage 1: Builder ===
# Usamos node:20-alpine (leve) para construir
FROM node:20-alpine AS builder
WORKDIR /app

# Copia os manifestos do projeto
COPY package.json package-lock.json ./

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
COPY --chown=1001:0 --from=builder /app/package.json ./package.json
COPY --chown=1001:0 --from=builder /app/package-lock.json ./package-lock.json

# Instala APENAS as dependências de produção
RUN npm ci --omit=dev


# Copia os arquivos da build standalone da etapa 'builder'
# Isto inclui o server.js, a pasta .next/, pasta 'public', e config do next
COPY --chown=1001:0 --from=builder /app/public ./public
COPY --chown=1001:0 --from=builder /app/.next ./.next
COPY --chown=1001:0 --from=builder /app/next.config.mjs ./next.config.mjs

# Expõe a porta 3000
EXPOSE 3000

# Boa prática: Executar como um utilizador não-root
USER 1001

# O comando para iniciar o servidor Next.js (standalone)
#CMD ["node", "server.js"]
CMD ["npm", "run", "start"]