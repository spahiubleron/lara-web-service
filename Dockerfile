# FROM --platform=linux/arm64 node:lts-alpine
FROM node:lts-alpine

RUN mkdir -p /opt/app
WORKDIR /opt/app
RUN adduser -S app
COPY ./ /opt/app
RUN npm install --legacy-peer-deps
RUN npm run build
USER app

EXPOSE 3010

CMD ["npm", "run", "start:prod"]