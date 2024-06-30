FROM node:16-alpine

WORKDIR /app

COPY shuemo/package.json shuemo/package-lock.json ./

RUN npm install

COPY shuemo/ .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]