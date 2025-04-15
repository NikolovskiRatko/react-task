FROM node:20-alpine

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@8.15.4 --activate

COPY package.json pnpm-workspace.yaml tsconfig.json ./
COPY jest.config.ts ./
COPY jest.setup.ts ./

COPY packages/ui/package.json packages/ui/
COPY packages/constants/package.json packages/constants/
COPY apps/project-a/package.json apps/project-a/
COPY apps/project-b/package.json apps/project-b/

RUN pnpm install --no-frozen-lockfile --store-dir=.pnpm-store

COPY . .

RUN pnpm --filter "@acme/constants" run build \
 && pnpm --filter "@acme/ui" run build \
 && pnpm --filter "project-a" run build \
 && pnpm --filter "project-b" run build

EXPOSE 3000
CMD ["pnpm", "--filter", "project-a", "start"]
