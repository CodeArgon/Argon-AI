# Step 1: Use an official Node.js image as the base
FROM node:latest

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json files
COPY package*.json ./

# Step 4: Install the app dependencies
RUN npm install

# Step 5: Copy the rest of the app's source code to the working directory
COPY . .

# Step 6: Build the React app
RUN npm run build

# Step 7: Serve the built files using an NGINX server
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

# Step 8: Expose the port the app runs on
EXPOSE 80

# Step 9: Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
