FROM node:20-alpine

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@8.15.4 --activate

COPY package.json pnpm-workspace.yaml tsconfig.json ./

EXPOSE 3000