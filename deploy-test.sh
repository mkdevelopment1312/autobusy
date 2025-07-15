#!/bin/bash
# Test lokalny deploymentu GitHub Pages

echo "🔨 Building project..."
npm run build

echo "📦 Copying 404.html to dist/..."
cp public/404.html dist/

echo "✅ Build completed successfully!"
echo "📁 Files in dist:"
ls -la dist/

echo ""
echo "🚀 To deploy to GitHub Pages, run:"
echo "npm run deploy"
echo ""
echo "🌐 After deployment, visit:"
echo "https://mkdevelopment1312.github.io/autobusy/"
