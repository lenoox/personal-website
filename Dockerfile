FROM node:16 as build


COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.21.6-alpine
COPY --from=build /dist /usr/share/nginx/html/dist/
COPY --from=build /index.html /usr/share/nginx/html/