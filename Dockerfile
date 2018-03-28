FROM node:8.10.0-alpine

# Create app directory
RUN mkdir -p /frontend
WORKDIR /frontend

# Bundle app source
COPY package.json package-lock.json server.js redirects.production.js .babelrc .env.production.config next.config.js /frontend/
COPY /pages /frontend/pages
COPY /assets /frontend/assets
COPY /lib /frontend/lib
COPY /components /frontend/components
COPY /semantic/dist/semantic.min.css /frontend/semantic/dist/semantic.min.css

# Install app dependencies
RUN npm install --production
RUN npm run build

#Finally setting container parameters
ENV NODE_ENV 'production'
EXPOSE 3000

#Container Start-up
CMD [ "npm", "start" ]
