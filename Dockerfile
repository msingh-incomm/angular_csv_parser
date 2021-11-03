FROM node:12.7-alpine as builder
##ENV NODE_OPTIONS=--openssl-legacy-provider
##RUN mkdir -p /app
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build --prod


FROM nginx:alpine AS PROD-BUILD
COPY --from=builder /app/dist/csv-parser-demo /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx","-g","daemon off;" ]

