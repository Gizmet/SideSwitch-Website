# Technical Documentation

## Branch Management

### Main Branches
1. `main`
   - Production-ready code
   - Stable releases only
   - Protected branch
   - Contains optimized builds

2. `develop`
   - Integration branch
   - Latest development changes
   - Pre-release testing
   - Feature integration

### Feature Branches
1. `website/main`
   - Production website branch
   - Mobile improvements and responsive design
   - Deployment fixes and optimizations
   - Landing page content

2. `website/feature/landing-page`
   - Landing page development
   - LemonSqueezy payment integration
   - Marketing website features
   - User onboarding flow

### Release Process
1. App Feature Development
   ```bash
   git checkout -b feature/new-app-feature main
   # Development work
   git push origin feature/new-app-feature
   ```

2. Website Feature Development
   ```bash
   git checkout -b website/feature/new-website-feature website/main
   # Development work
   git push origin website/feature/new-website-feature
   ```

3. App Release Creation
   ```bash
   git checkout main
   git merge --no-ff feature/new-app-feature
   git tag -a v1.1.3
   git push origin main --tags
   ```

4. Website Release
   ```bash
   git checkout website/main
   git merge --no-ff website/feature/new-website-feature
   git push origin website/main
   ```

## Core Architecture

### Main Process (`main.js`)
- Window lifecycle management
- Hardware acceleration
- Permission handling
- WebRTC optimization
- Splash screen coordination
- IPC communication handling

### Splash Screen System (`splash.html` + `preload-splash.js`)
Modern animation implementation:
- HTML/CSS-based animations
- Secure IPC communication
- Particle effects and loading bar
- Reliable timing control
- Multiple fallback methods

### Renderer Process (`renderer.js`)
Elegant, focused implementation:
- Site configuration
- Clean site switching
- Smart overlay management
- Minimal event handling

## Implementation Details

### Splash Screen Animation
```javascript
// Splash screen timing and animation control
const DURATION = 2600; // 2.6 seconds
const FADE_DELAY = 500; // 0.5 second fade

// Animation sequence:
// 1. Logo appears with pulse effect
// 2. Particles float around logo
// 3. Loading bar fills from 0% to 100%
// 4. Fade to black
// 5. Signal main process to show main window
```

### IPC Communication
```javascript
// Secure communication between splash and main process
contextBridge.exposeInMainWorld('electronAPI', {
  splashDone: () => ipcRenderer.invoke('splash:done')
});

// Main process handler
ipcMain.handle('splash:done', () => {
  // Close splash, create/show main window
});
```

### Site Configuration
```javascript
const sites = {
    siteName: {
        url: string,           // Site URL
        videoElement: string,  // Video element selector
        videoContainer: string // Container selector
        userAgent: string      // Chrome user agent
    }
};
```

### Blur Overlay Implementation
```javascript
// Core state management
let isResizing = false;
let isDragging = false;
let initialWidth, initialHeight, initialX, initialY;
let initialLeft, initialTop;

// Smart event handling
dimOverlay.addEventListener('mousedown', (e) => {
    if (e.target === resizeHandle) return;
    isDragging = true;
    // ... position tracking
});

// Efficient resize handling
document.addEventListener('mousemove', (e) => {
    if (isResizing) {
        // ... resize logic
    } else if (isDragging) {
        // ... drag logic
    }
});
```

### Event Architecture
- Minimal event listeners
- Clean event propagation
- Smart state management
- Efficient DOM updates

## Performance Features

### Hardware Acceleration
```javascript
app.commandLine.appendSwitch('enable-features', 'VaapiVideoDecoder');
app.commandLine.appendSwitch('enable-accelerated-video');
app.commandLine.appendSwitch('enable-gpu-rasterization');
```

### Resource Management
- Zero interference approach
- Native site behavior
- Minimal DOM manipulation
- Clean state transitions

## Design Principles

### Core Philosophy
1. Simplicity over complexity
2. Let sites handle their logic
3. Minimal interference
4. Clean, focused code

### Implementation Guidelines
1. No site-specific hacks
2. Native functionality preservation
3. Smart event handling
4. Efficient state management

## Testing Strategy

### Key Test Areas
1. Site switching reliability
2. Overlay functionality
3. Event handling
4. Error recovery

### Common Scenarios
1. Rapid site switching
2. Overlay manipulation
3. Network changes
4. Permission handling

## Error Handling

### Core Strategy
- Automatic retry mechanism
- Clean error recovery
- State preservation
- User feedback

### Implementation
```javascript
async function switchSite(site) {
    try {
        await webview.loadURL(sites[site].url);
    } catch (err) {
        if (loadRetries < MAX_RETRIES) {
            loadRetries++;
            setTimeout(() => switchSite(site), 2000);
        }
    }
}
```

## Recent Updates (v1.1.2)

### Splash Screen Redesign
- **Architecture**: Moved from video-based to HTML/CSS animation
- **Reliability**: Eliminated splash screen timeout issues
- **Performance**: Pure CSS animations with JavaScript timing
- **Maintainability**: No external dependencies or complex rendering

### Branding Consistency
- **Name Change**: Updated from "ChatPilot" to "SideSwitch" across all files
- **Version Management**: Consistent v1.1.2 in package.json, splash, and docs
- **Build Configuration**: Updated appId, productName, and protocols

### Code Quality Improvements
- **Cleanup**: Removed all debugging code and temporary files
- **Documentation**: Comprehensive changelog and updated technical docs
- **Architecture**: Better separation of concerns with dedicated splash system

## Future Considerations

### Potential Enhancements
1. Additional sites
2. Enhanced overlay features
3. Performance monitoring
4. State persistence
5. Video splash option for complex animations
6. Configurable splash duration

### Development Guidelines
- Maintain simplicity
- Preserve core design
- Smart feature addition
- Performance first
- Document all changes in CHANGELOG.md

Remember: The best code is the code you don't write! 