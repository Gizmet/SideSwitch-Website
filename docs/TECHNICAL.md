# Technical Documentation

## Architecture

### Main Process (`main.js`)
The main process handles the core application lifecycle and window management:

- **Window Management**: Creates and manages the main application window with specific configurations for security and performance
- **IPC Communication**: Handles communication between main and renderer processes
- **Security Configuration**: Implements Content Security Policy and permission handling
- **Performance Optimization**: Configures hardware acceleration and video processing

### Renderer Process (`renderer.js`)
Manages the user interface and site integration:

- **Site Management**: Handles site switching and configuration
- **Media Controls**: Manages video/audio streams
- **Event Handling**: Processes user interactions and keyboard shortcuts
- **WebView Integration**: Controls site loading and interaction

## Implementation Details

### Security Implementation

#### Content Security Policy
```javascript
'Content-Security-Policy': [
    "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;",
    "img-src * 'self' data: blob:;",
    "media-src * 'self' data: blob:;",
    "connect-src * 'self' data: blob:;",
    "frame-src * 'self' data: blob:;"
]
```

#### WebView Configuration
```html
<webview
    allowpopups
    webpreferences="allowRunningInsecureContent=true, webSecurity=false, experimentalFeatures=true"
    useragent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    partition="persist:main"
    httpreferrer="https://www.google.com"
    disablewebsecurity
    allowtransparency
    plugins>
```

### Site Integration

#### Site Configuration Structure
```javascript
{
    url: string,           // Site URL
    skipButton: string,    // Skip button selector
    nextButton: string,    // Next button selector
    videoElement: string,  // Remote video element selector
    localVideo: string     // Local video element selector
}
```

#### Video Management
- Remote video detection and handling
- Local video stream management
- Media permission handling

### Performance Optimizations

#### Hardware Acceleration
```javascript
app.commandLine.appendSwitch('enable-features', 'VaapiVideoDecoder');
app.commandLine.appendSwitch('enable-accelerated-mjpeg-decode');
app.commandLine.appendSwitch('enable-accelerated-video');
app.commandLine.appendSwitch('ignore-gpu-blacklist');
app.commandLine.appendSwitch('enable-gpu-rasterization');
app.commandLine.appendSwitch('enable-zero-copy');
```

#### Resource Management
- Background throttling disabled
- Efficient DOM updates
- Memory leak prevention

### User Interface

#### Theme Implementation
- Dark/Light mode support
- CSS variables for consistent theming
- Dynamic theme switching

#### Layout Structure
```
app
├── navigation
│   └── nav-group
│       └── nav-button
├── content
│   ├── webview-container
│   │   └── webview
│   └── controls
│       └── control-group
└── settings-modal
```

### Event Handling

#### Keyboard Shortcuts
```javascript
document.addEventListener('keydown', (event) => {
    if (event.key === 's' || event.key === 'S') {
        skipUser();
    } else if (event.key === 'a' || event.key === 'A') {
        toggleAutoSkip();
    } else if (event.key === 'v' || event.key === 'V') {
        toggleVideo();
    } else if (event.key === 'm' || event.key === 'M') {
        toggleAudio();
    }
});
```

#### WebView Events
- `dom-ready`: Initial setup and style injection
- `did-fail-load`: Error handling and retry logic
- Media stream events handling

## Data Flow

### State Management
- Current site tracking
- Auto-skip state
- Settings persistence
- Window state management

### IPC Communication
- Main to renderer process communication
- WebView to main process communication
- Error handling and logging

## Testing

### Manual Testing Points
1. Site navigation and loading
2. Video/Audio controls
3. Auto-skip functionality
4. Settings persistence
5. Error handling
6. Performance under load

### Security Testing
1. Content Security Policy effectiveness
2. Permission handling
3. Certificate verification
4. WebView isolation

## Build Process

### Development
```bash
NODE_ENV=development npm start
```

### Production
```bash
npm run build
```

## Future Improvements

### Planned Features
1. Additional site integrations
2. Enhanced privacy features
3. Advanced video filters
4. Chat logging and analysis
5. Custom themes support

### Performance Optimizations
1. Lazy loading of site modules
2. Enhanced caching mechanisms
3. Reduced memory footprint
4. Improved video processing

### Security Enhancements
1. Enhanced permission system
2. Improved content filtering
3. Additional privacy controls
4. Enhanced certificate handling 