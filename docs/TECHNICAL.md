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
1. `feature/ui-updates`
   - Modern UI implementation
   - Navigation system
   - Blur overlay functionality
   - Layout improvements
   - Splash screen animations

2. `feature/camera-integration`
   - Camera device detection
   - Device switching functionality
   - WebRTC optimizations
   - Stream management
   - Permission handling

3. `feature/build-optimization`
   - Build size reduction (67MB)
   - ASAR packaging
   - Compression settings
   - Resource optimization
   - Dependency management

### Release Process
1. Feature Development
   ```bash
   git checkout -b feature/new-feature develop
   # Development work
   git push origin feature/new-feature
   ```

2. Feature Integration
   ```bash
   git checkout develop
   git merge --no-ff feature/new-feature
   git push origin develop
   ```

3. Release Creation
   ```bash
   git checkout main
   git merge --no-ff develop
   git tag -a v0.1-alpha
   git push origin main --tags
   ```

## Core Architecture

### Main Process (`main.js`)
- Window lifecycle management
- Hardware acceleration
- Permission handling
- WebRTC optimization

### Renderer Process (`renderer.js`)
Elegant, focused implementation:
- Site configuration
- Clean site switching
- Smart overlay management
- Minimal event handling

## Implementation Details

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

## Future Considerations

### Potential Enhancements
1. Additional sites
2. Enhanced overlay features
3. Performance monitoring
4. State persistence

### Development Guidelines
- Maintain simplicity
- Preserve core design
- Smart feature addition
- Performance first

Remember: The best code is the code you don't write! 