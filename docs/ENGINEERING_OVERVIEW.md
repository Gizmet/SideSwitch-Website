# SideSwitch Engineering Overview

## Project Summary

SideSwitch is a cross-platform desktop application built with Electron that provides a unified interface for managing multiple video chat sites. The application allows users to seamlessly switch between different chat platforms (Ome.tv, Monkey, Uhmegle, and custom sites) while providing privacy controls and camera management features.

**Live Website**: [https://www.sideswitch.app/](https://www.sideswitch.app/)

## Architecture Overview

### Technology Stack
- **Frontend Framework**: Electron (v28.1.0)
- **UI Technologies**: HTML5, CSS3, JavaScript (ES6+)
- **Build System**: Electron Builder (v24.9.1)
- **Package Manager**: npm
- **Website**: Next.js (static export for GitHub Pages)
- **Deployment**: GitHub Actions + GitHub Pages

### Project Structure
```
SideSwitch/
├── src/                    # Main application source
│   ├── main.js            # Electron main process
│   ├── renderer.js        # Renderer process logic
│   ├── index.html         # Main UI layout
│   ├── splash.html        # Splash screen
│   ├── style.css          # Application styles
│   └── assets/            # Static assets
├── docs/                  # Documentation
├── website/               # Marketing website (Next.js)
├── scripts/               # Build scripts
└── .github/workflows/     # CI/CD configuration
```

## Core Components

### 1. Main Process (`src/main.js`)
The Electron main process handles:
- **Window Management**: Creates and manages application windows
- **Hardware Acceleration**: Extensive GPU and video optimization flags
- **Security Configuration**: Disabled web security for chat site compatibility
- **Permission Handling**: Media device permissions and WebRTC setup
- **Splash Screen System**: Modern HTML/CSS splash with IPC communication
- **Window Lifecycle**: Splash-first approach prevents race conditions

**Key Features**:
- Optimized for video streaming with hardware acceleration
- Custom user agent spoofing for better site compatibility
- Certificate error bypassing for development/testing
- Window lifecycle management with proper cleanup

### 2. Splash Screen System (`src/splash.html` + `src/preload-splash.js`)
Modern splash screen implementation:

**Visual Design**:
- Rotated "S" logo (90° left) in glowing blue square
- Floating particle effects around the logo
- Animated loading progress bar
- Smooth fade-out transition
- 2.6-second duration with reliable timing

**Technical Implementation**:
- Pure HTML/CSS animations (no external dependencies)
- JavaScript timing control for precise transitions
- Secure IPC communication via context bridge
- Multiple fallback methods for reliability
- 5-second timeout fallback for edge cases

### 3. Renderer Process (`src/renderer.js`)
The renderer process contains the core application logic:

**Site Management**:
- Default sites: Ome.tv, Monkey, Uhmegle
- Custom site addition/removal via localStorage
- Dynamic site button generation
- Site switching with retry logic (max 3 attempts)

**Blur Overlay System**:
- Draggable and resizable privacy overlay
- Backdrop filter effects (35px blur, 180% saturation)
- Double-click to reset position
- Corner resize handle for precise sizing

**Camera Integration**:
- Device enumeration and selection
- WebRTC stream management
- Camera switching with live stream replacement
- OBS Virtual Camera detection and prioritization

### 4. User Interface (`src/index.html` + `src/style.css`)

**Design Philosophy**:
- Dark theme optimized for low-light environments
- Modern gradient-based button design
- Smooth animations and transitions
- Responsive layout with flexbox

**Key UI Elements**:
- Left sidebar navigation (140px width)
- Main content area with embedded webview
- Modal dialogs for settings and site management
- Drag-and-drop overlay system
- Loading indicators and error states

## Technical Implementation

### Site Configuration System
```javascript
const sites = {
    siteId: {
        url: 'https://example.com',
        videoElement: 'video#remote-video',
        videoContainer: '.video-container',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)...'
    }
};
```

### WebView Integration
- Uses Electron's `<webview>` tag for site embedding
- Custom user agent for each site
- Disabled web security for compatibility
- Partition-based session management
- Event handling for navigation and errors

### State Management
- **localStorage**: Persistent custom sites and settings
- **Session State**: Current site, overlay state, camera selection
- **Error Handling**: Retry mechanisms and graceful degradation

## Build and Deployment

### Electron Build Configuration
- **Target**: Windows portable executable
- **Size Optimization**: ASAR packaging, maximum compression
- **Output**: ~67MB portable executable
- **Signing**: Code signing with timestamp server

### Build Scripts
```json
{
    "start": "electron .",
    "build": "electron-builder build --win --publish never",
    "build:portable": "npm run prebuild && electron-builder build --win portable",
    "package": "npm run build:portable && cd release && zip -r SideSwitch-v1.1.2-windows.zip win-unpacked/"
}
```

### Website Deployment
- **Framework**: Next.js with static export
- **Hosting**: GitHub Pages
- **CI/CD**: GitHub Actions workflow
- **Features**: Lemon Squeezy integration for payments

## Performance Optimizations

### Hardware Acceleration
```javascript
app.commandLine.appendSwitch('enable-features', 'VaapiVideoDecoder,VaapiVideoEncoder');
app.commandLine.appendSwitch('enable-accelerated-video');
app.commandLine.appendSwitch('enable-gpu-rasterization');
app.commandLine.appendSwitch('force-gpu-rasterization');
```

### Resource Management
- Minimal DOM manipulation
- Efficient event handling
- Clean state transitions
- Zero interference approach with native site behavior

## Security Considerations

### Current Security Model
- **Web Security**: Disabled for chat site compatibility
- **Context Isolation**: Disabled for webview communication
- **Node Integration**: Enabled for camera access
- **Certificate Validation**: Bypassed for development

### Privacy Features
- Video blur overlay for privacy protection
- Camera/microphone toggle controls
- No data collection or storage
- Local-only operation

## Development Workflow

### Branch Strategy
- **main**: Production-ready Electron app releases
- **website/main**: Production website branch
- **website/feature/***: Website feature development

### Current Branch Organization
1. `main`: SideSwitch Electron application (v1.1.2)
2. `website/main`: Production website with mobile improvements
3. `website/feature/landing-page`: Landing page development with payment integration

## Current Status and Known Issues

### Version 1.1.2 (Latest)
**Working Features**:
- **Modern Splash Screen**: HTML/CSS animation with particle effects
- **Multi-site Support**: Custom site addition and management
- **Drag-and-drop Blur Overlay**: Privacy protection with resize capability
- **Keyboard Shortcuts**: B key for blur toggle, site switching
- **Settings Management**: Persistent configuration storage
- **Camera Device Detection**: WebRTC integration with device enumeration
- **Reliable Window Management**: Splash-first approach prevents race conditions

**Recent Improvements**:
- ✅ **Splash Screen Redesign**: Modern animation system
- ✅ **Branding Consistency**: Updated from "ChatPilot" to "SideSwitch"
- ✅ **Version Management**: Consistent v1.1.2 across all components
- ✅ **Code Cleanup**: Removed debugging code and temporary files
- ✅ **IPC Communication**: Robust splash-to-main window signaling

**Known Issues**:
- Camera switching functionality temporarily disabled
- Some sites may require multiple connection attempts
- Add Site modal text fields need center alignment
- Default site buttons lack hover animations

### Technical Debt
- Camera switching code needs refactoring
- Error handling could be more robust
- UI consistency improvements needed
- Performance monitoring not implemented

## Future Roadmap

### Planned Features
- Enhanced camera switching functionality
- Additional site support
- Performance monitoring
- State persistence improvements
- Enhanced privacy controls

### Technical Improvements
- Better error handling and recovery
- UI/UX consistency improvements
- Performance optimization
- Security model review

## Dependencies

### Production Dependencies
- `electron-updater`: ^6.1.7 (Auto-update functionality)
- `electron-log`: ^5.0.1 (Logging system)

### Development Dependencies
- `electron`: ^28.1.0 (Core framework)
- `electron-builder`: ^24.9.1 (Build and packaging)

## System Requirements

### Minimum Requirements
- **OS**: Windows 7+ (Windows 10/11 recommended)
- **RAM**: 2GB minimum
- **Storage**: 100MB free space
- **Hardware**: Webcam and microphone
- **Network**: Stable internet connection

### Recommended
- **OS**: Windows 10/11
- **RAM**: 4GB+
- **Hardware**: Dedicated graphics card for hardware acceleration

## Conclusion

SideSwitch represents a well-architected Electron application focused on providing a unified interface for video chat platforms. The codebase demonstrates solid engineering practices with clear separation of concerns, efficient resource management, and user-centric design. While there are some known issues and areas for improvement, the core functionality is stable and the application successfully achieves its primary goal of simplifying multi-platform video chat management.

The project shows good potential for future enhancements, particularly in the areas of camera management, UI consistency, and performance optimization. The modular architecture and clean code structure provide a solid foundation for continued development.
