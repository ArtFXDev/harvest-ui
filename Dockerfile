FROM node:lts-alpine AS build
WORKDIR /home/
RUN mkdir -p /home/build
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /home/build /usr/share/nginx/html
