# Build React static files
FROM node:16.13.2-alpine as build

WORKDIR ./home/app

# Install dependencies
COPY package*.json ./
RUN npm ci --silent

# Add app
COPY . .

# Build React
RUN npm run build

# Create NGINX Server with static files
FROM nginx:1.21-alpine
COPY --from=build /home/app/build /var/www/app
COPY ./nginx-setup.conf ./etx/nginx/conf.d/default.conf