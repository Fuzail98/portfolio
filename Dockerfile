# Step 1: Build the app
FROM node:20 AS build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's code
COPY . .

# Build the Remix app for SSR
RUN npm run build

# Step 2: Set up the production server
FROM node:20 AS production

# Set working directory inside the container
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/build /app/build

# # Install production dependencies (ignore dev dependencies)
# RUN npm install --production

# Expose the port your app will run on
EXPOSE 3000

# Start the Remix app in SSR mode
CMD ["npm", "run", "start"]
