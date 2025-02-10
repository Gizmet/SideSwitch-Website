# ChatPilot v0.1-alpha

First alpha release of ChatPilot - Optimized for performance and size

## Development Status
This release integrates features from three main development branches:

1. UI Updates (`feature/ui-updates`)
   - Modern navigation system
   - Smart blur overlay
   - Animated splash screen
   - Responsive layout

2. Camera Integration (`feature/camera-integration`)
   - Device detection system
   - WebRTC optimizations
   - Permission handling
   - Stream management

3. Build Optimization (`feature/build-optimization`)
   - Reduced size to 67MB
   - ASAR packaging
   - Resource optimization
   - Performance improvements

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
1. Download ChatPilot-v0.1-alpha-win64.zip
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

## Version 1.1.0 (Latest)

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