# Use an official Node.js runtime as a base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that your application will run on
EXPOSE 3000

# Command to run your application
CMD ["node", "app.js"]



############################ NOTE ############################

# Since I am using an office pc to develop this app, I could not install Docker on my local machine so I didn't package it using docker
# I can demonstrate it if I am required to 
# THANK YOU FOR UNDERSTANDING

############################ NOTE ############################
