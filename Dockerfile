FROM node:20-slim

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
ENV DEVELOPER_NAME="Wayne Wei"
CMD ["node", "./dist/index.js"]