FROM node:20.11-alpine
# FROM node:20.11

WORKDIR /app

COPY ./package.json ./

# RUN apk add --no-cache git

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8082

CMD ["npm", "run", "start:prod"]