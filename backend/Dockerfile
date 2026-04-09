FROM node:24-bookworm-slim

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm run build

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]