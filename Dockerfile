##### Stage 1 - Development - Generate dist folder
# FROM node:14-alpine AS builder
# LABEL author="Swadesh Behera"
# RUN mkdir -p /app/node_modules && chown -R node:node /app
# RUN mkdir -p /app

# ARG node_env
# ENV NODE_ENV=${node_env}

# WORKDIR /usr/app
# COPY package.json ./
# CMD npm i -g yarn
# RUN yarn install --force
# COPY . .
# RUN yarn build
# RUN yarn copy .

##### Stage 2 - Production
FROM node:14 AS production
WORKDIR /app
COPY prod/package*.json .
ENV NODE_ENV=production
# RUN apt-get update || : && apt-get install python -y
RUN npm cache clean --force
RUN npm install --force

COPY prod .
# COPY .env .
# USER node
# CMD ["node", "-r", "source-map-support/register", "index.js"]
EXPOSE 4400:4400
CMD [ "npm", "start" ]

# ##### Stage 3 - Nginx
# FROM nginx:alpine
# VOLUME /var/cache/nginx
# COPY --from=builder /usr/app/dist /usr/share/nginx/html
# COPY ./config/nginx/nginx.conf /etc/nginx/conf.d/default.conf
# COPY ./config/nginx/fullchain.pem /etc/letsencrypt/live/api.litekart.in/fullchain.pem
# COPY ./config/nginx/privkey.pem /etc/letsencrypt/live/api.litekart.in/privkey.pem

# ##### Start nginx
# EXPOSE 80
# CMD ["nginx","-g","daemon off;"]
