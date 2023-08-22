FROM node:20-alpine3.17 
WORKDIR /application
COPY . .
RUN npm install
CMD [ "npm","run","start" ]