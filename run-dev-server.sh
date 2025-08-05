#!/bin/bash

# Navigate to the project directory
cd /Users/mac/Downloads/kfar-final/ispeak-nextjs

# Check if node_modules exists, if not, install dependencies
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start the development server
echo "Starting Next.js development server..."
npm run dev
