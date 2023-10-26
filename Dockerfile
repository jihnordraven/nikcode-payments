FROM node:latest

WORKDIR /app

RUN npm install yarn

COPY package*.json .

RUN yarn install

COPY . .

RUN npx prisma generate

RUN yarn build

EXPOSE 4300

CMD ["yarn", "start:prod", "&&", "yarn", "ms:listen"]