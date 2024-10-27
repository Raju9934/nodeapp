FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
EXPOSE 8000
ENV NODE_ENV=production
CMD ["node", "index.js"]