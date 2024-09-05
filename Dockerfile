FROM node:alpine

WORKDIR /blog-api

COPY ./package.json .

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]