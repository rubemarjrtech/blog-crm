FROM node:20-alpine

WORKDIR /home/app

COPY . ./

RUN npm i

EXPOSE 3000

CMD ["npm", "run", "dev"]