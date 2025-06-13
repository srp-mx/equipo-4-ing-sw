FROM node:latest

WORKDIR /usr/src/app/

COPY package*.json yarn.lock* ./

RUN npm config set registry https://registry.npmmirror.com

RUN npm install

COPY . .

#RUN npm run build

#CMD ["npm", "run", "preview"]
