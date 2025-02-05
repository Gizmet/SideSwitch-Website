#!/bin/bash

# Create scripts directory if it doesn't exist
mkdir -p scripts
mkdir -p build

# Create a temporary SVG file with the rocket emoji
cat > build/temp.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="512" height="512">
  <text x="50" y="80" font-size="80" text-anchor="middle" font-family="Noto Color Emoji">🚀</text>
</svg>
EOF

# Convert SVG to ICO with multiple sizes
convert build/temp.svg -background none -resize 256x256 -define icon:auto-resize="256,128,96,64,48,32,16" build/icon.ico

# Clean up temporary files
rm build/temp.svg

echo "Icon created successfully at build/icon.ico" 