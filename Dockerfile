# Imagen base oficial de Node.js
FROM node:18-slim

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia solo los archivos de dependencias para instalarlas primero
COPY package*.json ./

# Instala las dependencias de producción
RUN npm install --production

# Copia el resto del código de la app
COPY . .

# Expone el puerto que usa tu app
EXPOSE 3000

# Comando para iniciar la app
CMD ["node", "index.js"]
