# SideSwitch v1.1.2

Latest release of SideSwitch - Modern splash screen and branding updates

## What's New in v1.1.2

### 🎨 Modern Splash Screen
- **Complete Redesign**: New HTML/CSS-based splash screen
- **Rotated "S" Logo**: 90° left rotation in glowing blue square
- **Particle Effects**: Floating blue dots around the logo
- **Loading Bar**: Animated progress indicator
- **Smooth Transitions**: 2.6-second duration with fade-out
- **Reliable Timing**: No more splash screen timeout issues

### 🏷️ Branding Consistency
- **Name Update**: Changed from "ChatPilot" to "SideSwitch" across all files
- **Version Management**: Consistent v1.1.2 in all components
- **Build Configuration**: Updated appId, productName, and protocols
- **Documentation**: Updated all references and cross-references

### 🔧 Technical Improvements
- **Splash Architecture**: Moved from video-based to HTML/CSS animation
- **IPC Communication**: Robust splash-to-main window signaling
- **Window Management**: Splash-first approach prevents race conditions
- **Code Cleanup**: Removed all debugging code and temporary files
- **Error Handling**: Multiple fallback methods for reliability

### 📚 Documentation Updates
- **CHANGELOG.md**: Comprehensive changelog with detailed version history
- **Engineering Docs**: Updated with new splash system architecture
- **Technical Docs**: Added splash screen implementation details
- **Cross-references**: Updated all documentation links and references

## Key Features
- Multi-platform chat support (Ome.tv, Monkey, Uhmegle)
- Smart blur overlay with drag and resize
- Keyboard shortcuts for quick control
- Simple and advanced launchers included
- Optimized build size (67MB total)

## Technical Improvements
- ASAR packaging for better compression
- Maximum compression enabled
- Essential files only
- Efficient resource usage
- Minimal dependencies

## Installation
1. Download SideSwitch-v1.1.2-win64.zip
2. Extract the zip file using Windows Explorer
3. Run launch.bat for simple start
4. Or use launch.ps1 for advanced features

## System Requirements
- Windows 7 or later (Windows 10/11 recommended)
- 2GB RAM minimum
- Webcam and microphone
- Stable internet connection
- 100MB free disk space

## Known Issues
- This is an alpha release
- Camera switching temporarily disabled
- Please report any bugs on GitHub

## Controls
- 'B' key: Toggle blur overlay
- Double-click overlay: Reset position
- Click and drag: Move overlay
- Bottom-right corner: Resize overlay

## Performance Tips
1. Keep the app in its own folder
2. Close other browser windows
3. Ensure good internet connection
4. Grant necessary permissions when prompted

# Release Notes

## Version 1.1.1 (Latest)

### Bug Fixes
- Fixed 'B' key shortcut interfering with text input in modals
- Improved keyboard shortcut handling to ignore hotkeys when typing

### Known Issues
- Add Site modal text fields need center alignment
- Default site buttons (OME, MONKEY, UHMEGLE) lack hover animations
- Camera switching functionality temporarily disabled
- Some sites may require multiple attempts to connect


## Version 1.1.0

### New Features
- Added site management functionality
  - New ADD SITE button for adding custom sites
  - Remove button for deleting custom sites (appears on hover)
  - Auto-detection of common video selectors for better compatibility
- Improved UI/UX
  - Redesigned navigation with gradient buttons
  - Better visual hierarchy for site buttons
  - Smooth animations and transitions
  - Enhanced modal design for adding sites

### Improvements
- Simplified site addition process
  - Only requires site name and URL
  - Automatic video element detection
  - Better form validation and feedback
- Enhanced button styling and interactions
  - Hover effects for better interactivity
  - Clear visual feedback for actions
  - Improved spacing and alignment

### Technical Updates
- Implemented localStorage for persistent custom sites
- Added remove site functionality with cleanup
- Improved error handling for site switching
- Better state management for custom sites

### Bug Fixes
- Fixed button visibility issues
- Resolved modal display problems
- Improved site switching reliability
- Enhanced error handling for invalid sites

## Version 1.0.0 (Initial Release)

### Features
- Basic site switching functionality
- Video blur capability
- Camera selection support
- Settings management
- Multiple site support (OME, MONKEY, UHMEGLE) 