FROM node:latest

WORKDIR /usr/src/app/frontend

COPY package*.json yarn.lock* ./

RUN npm install

COPY . .

#RUN npm run build

#CMD ["npm", "run", "preview"]