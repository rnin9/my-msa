# gateway/Dockerfile

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY .env.extra .env

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main"]