# Chat Roulette Dashboard

A lightweight, elegant Electron-based dashboard for managing multiple video chat platforms. Built with simplicity and performance in mind.

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

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Quick Start
```bash
# Clone and enter directory
git clone [repository-url]
cd chat-roulette-dashboard

# Install dependencies
npm run setup

# Start application
npm start
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

## For Developers

### Building
```bash
# Development mode
npm start

# Production build
npm run build
```

### Design Philosophy
- Keep It Simple, Stupid (KISS)
- Let sites handle their own logic
- Minimal, focused codebase
- Clean separation of concerns

## License

ISC License

## Contributing

1. Fork repository
2. Create feature branch
3. Keep changes simple
4. Submit pull request

Remember: Simplicity is the ultimate sophistication! 