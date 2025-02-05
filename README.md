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

1. **Toggle**: Click the "BLUR" button to show/hide the overlay
2. **Move**: Click and drag the overlay to reposition it
3. **Resize**: Drag the bottom-right corner to resize
4. **Reset**: Double-click the overlay to reset to default position
5. **Memory**: The overlay remembers its last position and size between sessions

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