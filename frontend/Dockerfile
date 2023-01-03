FROM node:16-alpine 

WORKDIR /home/BLASK_FE/

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install -g npm@14.19.1

RUN npm install --production

COPY . .

CMD [ "npm", "start" ]