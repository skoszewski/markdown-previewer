FROM node:24-alpine

WORKDIR /app

# Copy package files (package.json and package-lock.json if it exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy configuration and source files
COPY vite.config.ts tsconfig.json index.html ./
COPY src/ ./src/

# Copy markdown files to /docs
COPY README.md /docs/

# Set environment variables
ENV MDPREVIEW_ROOT=/docs

# Expose both ports
EXPOSE 5173 3000

# Run both servers concurrently with host binding for external access
CMD ["npm", "run", "dev:host"]
