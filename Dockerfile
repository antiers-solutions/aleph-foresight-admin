FROM node:18.19.0

WORKDIR /src

COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy all the source files
COPY . .

# Run unit tests
RUN npm test

# Build the application
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]