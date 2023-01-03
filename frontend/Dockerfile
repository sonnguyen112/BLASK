FROM node:lastest

WORKDIR /home/BLASK_FE/

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD [ "npm", "start" ]