ARG VERSION=12

FROM node:${VERSION}

WORKDIR /home/oshinka/Documents/node-course/nsbm-client

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
