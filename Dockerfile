FROM node:6.10.3-alpine
RUN apk add --no-cache libpng
WORKDIR /consert

RUN npm install
COPY . .

RUN npm run build:dll

EXPOSE 3000

VOLUME /consert

CMD ["npm","run","start:production"]
