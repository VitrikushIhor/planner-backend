FROM node:latest

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn add -D prisma
RUN yarn prisma generate

ENV DATABASE_URL="postgresql://postgres:123@postgres:5432/planner-db?schema=public"


EXPOSE 5000

CMD ["yarn", "dev"]
