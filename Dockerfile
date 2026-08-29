# Imagen base de Node
FROM node:20-slim

WORKDIR /app

# Copia los manifiestos de dependencias
COPY package.json package-lock.json ./
COPY server/package.json server/package-lock.json ./server/

# Instala dependencias del frontend (raíz)
RUN npm ci

# Instala dependencias del servidor
RUN cd server && npm ci

# Copia el resto del código
COPY . .

# Compila el frontend (genera /app/dist)
RUN npm run build

# El servidor sirve /app/dist + API + MySQL
ENV NODE_ENV=production
EXPOSE $PORT

CMD ["node", "server/index.js"]
