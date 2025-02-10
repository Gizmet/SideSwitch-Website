# Video Chat Site Manager

A desktop application for managing and interacting with various video chat sites. Built with Electron for optimal performance and user experience.

## Features

### Site Management
- Support for multiple video chat sites
- Easy addition of custom sites via the ADD SITE button
- Simple removal of custom sites (hover over site button to remove)
- Automatic video element detection for better compatibility

### Video Controls
- Real-time video blur effect
- Adjustable blur intensity
- Camera device selection
- Video/Audio toggle controls

### User Interface
- Modern, intuitive design
- Smooth animations and transitions
- Dark theme optimized for low-light environments
- Responsive layout with resizable elements

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/video-chat-manager.git
cd video-chat-manager
```

2. Install dependencies
```bash
npm install
```

3. Start the application
```bash
npm start
```

## Usage

### Managing Sites
1. Click the ADD SITE button in the navigation panel
2. Enter the site name and URL
3. Click Add to save the site
4. To remove a custom site, hover over its button and click the × icon

### Video Controls
- Click the BLUR button or press 'B' to toggle blur effect
- Use the camera dropdown to switch between available cameras
- Adjust blur intensity using the slider
- Toggle video/audio using the respective buttons

## Development

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Electron

### Building
```bash
npm run build
```

### Testing
```bash
npm test
```

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Version History
See [RELEASE_NOTES.md](RELEASE_NOTES.md) for detailed version history. 