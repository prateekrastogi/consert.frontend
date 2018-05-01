FROM node:8.11.0-alpine

# Create app directory
RUN mkdir -p /frontend
WORKDIR /frontend

# Bundle app source
COPY package.json package-lock.json server.js redirects.production.js .babelrc .env.production.config next.config.js /frontend/
COPY /pages /frontend/pages
COPY /assets /frontend/assets
COPY /lib /frontend/lib
COPY /components /frontend/components
COPY /semantic/dist /frontend/semantic/dist

# Install app dependencies
RUN apk add --no-cache \
    autoconf \
    automake \
    bash \
    g++ \
    libc6-compat \
    libjpeg-turbo-dev \
    libpng-dev \
    make \
    nasm\
    && npm install --production\
    && npm run build\
    && apk del autoconf \
    automake \
    bash \
    g++ \
    make \
    nasm

#Finally setting container parameters
ENV NODE_ENV 'production'
EXPOSE 3000

#Container Start-up
CMD [ "npm", "start" ]
