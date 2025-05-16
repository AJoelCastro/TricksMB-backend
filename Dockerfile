# Usa una imagen ligera de Node.js
FROM node:18-slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala solo dependencias de producción
RUN npm install --production

# Copia el resto de los archivos del proyecto
COPY . .

# Expón el puerto que usará la app (ajusta si no es 5000)
EXPOSE 5000

# Comando para iniciar tu app
CMD ["npm", "start"]
