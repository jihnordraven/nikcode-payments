FROM node:latest

WORKDIR /app

RUN npm install yarn

COPY package*.json .

RUN yarn install

COPY . .

RUN npx prisma generate

RUN yarn build

CMD ["yarn", "start:dev"]

# FROM node:latest
# WORKDIR /app
# RUN npm install yarn
# COPY package*.json .
# RUN yarn install
# COPY . .
# RUN npx prisma generate
# RUN yarn build
# CMD ["yarn", "ms:listen"]