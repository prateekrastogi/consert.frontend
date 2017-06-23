FROM node:8.1.2-alpine

# Create app directory
RUN mkdir -p /frontend
WORKDIR /frontend

# Bundle app source
COPY package.json package-lock.json server.js redirects.production.js /frontend/
COPY /pages /frontend/pages
COPY /static /frontend/static
COPY /lib /frontend/lib
COPY /components /frontend/components

# Install app dependencies
RUN npm install --production
RUN npm run build

#Finally setting container parameters
ENV NODE_ENV 'production'
EXPOSE 3000
CMD [ "npm", "start" ]