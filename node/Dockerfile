FROM node:11

RUN mkdir -p /home/node/app; \
  chown node:node /home/node/app;

WORKDIR /home/node/app
RUN npm install \
  node-rdkafka \
;
RUN npm install \
  @types/node \
  ts-node \
  typescript \
;

USER node
