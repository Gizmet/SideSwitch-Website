# Chat Roulette Dashboard

A lightweight, elegant Electron-based dashboard for managing multiple video chat platforms. Built with simplicity and performance in mind.

## Development Branches

### Main Branches
- `main`: Production-ready code, stable releases
- `develop`: Integration branch, latest development changes

### Feature Branches
1. `feature/ui-updates`
   - Modern UI and navigation
   - Blur overlay system
   - Splash screen and animations
   - Layout improvements

2. `feature/camera-integration`
   - Camera device detection
   - Device switching
   - WebRTC optimizations
   - Permission handling

3. `feature/build-optimization`
   - Size reduction (67MB)
   - Build optimization
   - Resource management
   - Performance improvements

## Features

- **Multi-Platform Support**: 
  - Ome.tv
  - Monkey
  - Uhmegle

- **Smart Privacy Controls**:
  - Intelligent Blur Overlay
    - Toggle with 'B' key or button
    - Smooth drag & resize functionality
    - Double-click to reset position
    - Maintains position between sessions
    - Minimum size protection (200x200)

- **Elegant Design**:
  - Zero interference with site functionality
  - Native site behavior preserved
  - Instant site switching
  - Minimal resource usage
  - Optimized build size (67MB)

## Installation

### Prerequisites
- Windows 7 or later (Windows 10/11 recommended)
- 2GB RAM minimum
- Webcam and microphone
- Stable internet connection

### Quick Start
1. Download `ChatPilot-v0.1-alpha.exe` (67MB)
2. Run the executable directly (portable, no installation needed)
3. Grant camera/microphone permissions when prompted

### For Developers
```bash
# Clone and enter directory
git clone [repository-url]
cd chat-roulette-dashboard

# Install dependencies
npm run setup

# Start development
npm start

# Create optimized build
npm run build
```

## Usage Guide

### Site Navigation
- Click site buttons on the left to switch platforms
- Each site functions exactly as intended
- Native authentication and features preserved

### Privacy Overlay
1. **Toggle**: 
   - Click "BLUR" button
   - Press 'B' key
   - Active state clearly indicated

2. **Position**:
   - Drag anywhere on overlay to move
   - Resize from bottom-right corner
   - Double-click to reset position
   - Smooth transitions

## Technical Overview

### Core Principles
- Minimal interference
- Native functionality
- Clean, focused code
- Performance first
- Optimized build size

### Build Optimization
- ASAR packaging enabled
- Maximum compression
- Essential files only
- Efficient resource usage
- Minimal dependencies

### Key Features
- Seamless site integration
- Smart event handling
- Efficient DOM updates
- Automatic error recovery

## Troubleshooting

### Common Solutions
1. **Site Issues**
   - Sites work exactly as they do in browser
   - No special handling needed
   - Restart app if needed

2. **Overlay Issues**
   - Double-click to reset position
   - Minimum size enforced
   - Clean state on site switch

3. **Camera Issues**
   - Grant permissions when prompted
   - Check Windows privacy settings
   - Ensure no other app is using camera

## For Developers

### Building
```bash
# Development mode
npm start

# Production build (67MB output)
npm run build
```

### Design Philosophy
- Keep It Simple, Stupid (KISS)
- Let sites handle their own logic
- Minimal, focused codebase
- Clean separation of concerns
- Optimized resource usage

## License

ISC License

## Contributing

1. Fork repository
2. Create feature branch
3. Keep changes simple
4. Submit pull request

Remember: Simplicity is the ultimate sophistication! 