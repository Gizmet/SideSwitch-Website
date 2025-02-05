# Chat Roulette Dashboard

A modern Electron-based dashboard application for managing multiple video chat platforms with enhanced privacy features.

## Features

- **Multi-Platform Support**: Integrated support for multiple chat platforms:
  - Ome.tv
  - Monkey
  - Uhmegle

- **Privacy Features**:
  - Smart Blur Overlay
    - Draggable and resizable blur window
    - Position and size memory
    - Enhanced blur effect (35px) with optimized visibility
    - Double-click to reset position
  - Secure webview isolation

- **Streamer Features**:
  - Quick Hotkey:
    - `B` - Toggle blur overlay (disabled while typing)
  - Instant response time
  - No delay between actions

- **User Interface**:
  - Modern, minimal design
  - Intuitive navigation
  - Responsive layout
  - Simplified controls

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Setup
1. Clone the repository:
```bash
git clone [repository-url]
cd chat-roulette-dashboard
```

2. Install dependencies:
```bash
npm run setup
```

3. Start the application:
```bash
npm start
```

## Project Structure

```
chat-roulette-dashboard/
├── src/
│   ├── main.js          # Main Electron process
│   ├── renderer.js      # Renderer process logic
│   ├── index.html       # Main application window
│   └── style.css        # Application styling
├── assets/             # Application assets
└── package.json       # Project configuration
```

## Using the Blur Overlay

The blur overlay provides a flexible way to protect your privacy:

1. **Toggle**: Click the "BLUR" button or press `B` key
2. **Move**: Click and drag the overlay to reposition it
3. **Resize**: Drag the bottom-right corner to resize
4. **Reset**: Double-click the overlay to reset to default position
5. **Memory**: The overlay remembers its last position and size between sessions

## Quick Actions

### Keyboard Shortcut
- `B` - Toggle blur overlay on/off (disabled while typing in chat)

### Mouse Actions
- Double-click overlay - Reset position
- Drag overlay - Move
- Drag corner - Resize

## Technical Details

### Dependencies
- Electron: ^28.1.0
- electron-store: ^8.1.0

### Browser Compatibility
The application uses Chromium's latest features through Electron, ensuring compatibility with modern web standards.

### Security Considerations
- Webview isolation
- Content Security Policy
- Permission handling
- Certificate verification

## Troubleshooting

### Common Issues

1. **Blank Screen**
   - Check internet connection
   - Verify site availability
   - Clear webview cache

2. **Blur Overlay Issues**
   - If overlay gets stuck, double-click to reset position
   - If overlay size is too small, drag corner to resize
   - Clear local storage if position memory causes issues

## License

ISC License

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## For Windows Users

### Easy Installation (Recommended)

1. Go to the [Releases](https://github.com/gizmetproton/streamer-app/releases) page
2. Download the latest `Streamer.App.Setup.exe`
3. Double-click the downloaded file to install
4. The app will automatically create desktop and start menu shortcuts

### Using the App

1. Launch the app from your desktop shortcut or start menu
2. Use the 'B' key to toggle blur overlay when needed
3. Click the blur button in the top-right corner to toggle blur manually

### Features

- Quick blur toggle with 'B' key
- Mouse controls for blur toggle
- Works with multiple chat sites
- Automatic updates (coming soon)

### Troubleshooting

If you encounter any issues:
1. Make sure you're using the latest version
2. Try restarting the app
3. If problems persist, please report them in the Issues section

## For Developers

### Building from Source

```bash
# Clone the repository
git clone https://github.com/gizmetproton/streamer-app.git

# Install dependencies
npm install

# Start the app in development mode
npm start

# Build for Windows
npm run build
```

The built installer will be in the `dist` folder. 