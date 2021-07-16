FROM node:15

COPY backend/package.json backend/yarn.lock /backend/

RUN yarn install

COPY ./backend /backend/
COPY ./common /common/

EXPOSE 8080

WORKDIR /backend

CMD [ "yarn", "start" ]

