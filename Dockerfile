FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npx prisma migrate dev --name mig-1
RUN npm run build
RUN npm run start
