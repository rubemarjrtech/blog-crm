FROM node:20-alpine

WORKDIR /home/app

COPY . ./

RUN npm i

EXPOSE 4000

CMD ["npm", "run", "dev"]