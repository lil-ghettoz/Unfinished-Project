FROM node:20-alpine

WORKDIR /app

COPY package.json package.json
COPY tsconfig.json tsconfig.json
COPY src src

RUN npm install

EXPOSE 5000

CMD ["npm", "run", "dev"]
