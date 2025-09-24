@echo off
echo Syncing website changes to public repo...
git add .
git commit -m "Update website"
git push origin main

echo Creating website-only branch...
git checkout -b website-only-temp
git rm src/main.js src/renderer.js src/preload.js src/preload-splash.js src/splash.html src/index.html src/style.css src/main/sites-store.js electron-builder.json
git rm -r scripts/
git add .
git commit -m "Clean up: Remove Electron files for website deployment"
git push website website-only-temp:main
git checkout main
git branch -D website-only-temp
echo Done! Website synced to public repo (Electron files excluded).
