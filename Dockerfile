# Use a lightweight web server as a parent image
FROM nginx:alpine

# Copy the contents of the current directory into the container
COPY . /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Command to run the web server
CMD ["nginx", "-g", "daemon off;"]
