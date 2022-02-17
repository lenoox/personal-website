FROM node:16 as build


COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build:prod

FROM nginx:1.21.6-alpine
COPY --from=build /dist /usr/share/nginx/html/