# Stage 1: Build the React app
FROM node:16-alpine AS builder

# Set working directory to /build (this can be any name, it's internal to the image)
WORKDIR /build

# Copy dependency definitions from the project root
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your project files (including /src, /public, etc.)
COPY . .

# Build the React app for production; the build output will be in /build/build
RUN npm run build

# Stage 2: Serve the app with nginx
FROM nginx:alpine

# Copy the custom nginx configuration into the container
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy the build output from the builder stage into nginx's default public folder
COPY --from=builder /build/build /usr/share/nginx/html

# Expose port 8080 for Cloud Run (Cloud Run expects the container to listen on 8080)
EXPOSE 8080

# Start nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]