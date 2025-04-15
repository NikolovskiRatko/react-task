FROM node:20-alpine

WORKDIR /app

COPY package.json ./

RUN corepack enable && corepack prepare pnpm@8.15.4 --activate
RUN pnpm install --no-frozen-lockfile

COPY ws-server.js .

EXPOSE 1234

CMD ["node", "ws-server.js"]
