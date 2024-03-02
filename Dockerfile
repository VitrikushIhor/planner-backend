FROM node:latest

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn add -D prisma
RUN yarn prisma generate

ENV DATABASE_URL="postgres://root:YQJJiMSkPR6a6PaKq3y3h0NxD95cb3EG@dpg-cnhpf27109ks73ffk12g-a.oregon-postgres.render.com/planner_mefo"


EXPOSE 5000

CMD ["yarn", "dev"]
