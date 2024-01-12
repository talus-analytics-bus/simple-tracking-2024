FROM node:20

WORKDIR /app

RUN apt-get update && apt-get install -y jq awscli python3

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000 8888

CMD [ "npm", "run", "docker-start" ]
