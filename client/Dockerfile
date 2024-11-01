FROM node:20.18.0-alpine3.20 as builder
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
