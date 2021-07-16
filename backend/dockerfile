FROM node:15

WORKDIR /backend

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

EXPOSE 8080

CMD [ "npm", "start" ]

