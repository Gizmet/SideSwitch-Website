# Changelog

All notable changes to SideSwitch will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.2] - 2024-12-19

### Added
- **New Splash Screen System**: Complete redesign with modern animation
  - Rotated "S" logo (90° left) in glowing blue square
  - Floating particle effects around the logo
  - Animated loading progress bar
  - Smooth fade-out transition
  - 2.6-second duration with reliable timing
- **Enhanced IPC Communication**: Robust splash-to-main window communication
  - `preload-splash.js` for secure Electron communication
  - Multiple fallback methods for reliability
  - 5-second timeout fallback for edge cases
- **Improved Window Management**: Better splash/main window coordination
  - Main window created only after splash completion
  - Clean window lifecycle management
  - No more race conditions between windows

### Changed
- **Branding Consistency**: Updated all references from "ChatPilot" to "SideSwitch"
  - `package.json`: name, version, and build scripts
  - `electron-builder.json`: appId, productName, and protocols
  - All documentation and release notes
  - Splash screen branding and version display
- **Splash Screen Architecture**: Moved from video-based to HTML/CSS animation
  - Removed dependency on `splash.webm` file
  - Pure CSS animations with JavaScript timing
  - More reliable and maintainable implementation
- **Version Management**: Updated to v1.1.2 across all files
  - Consistent versioning in package.json, splash screen, and docs
  - Updated build artifacts naming convention

### Fixed
- **Splash Screen Issues**: Resolved multiple splash screen problems
  - Fixed JavaScript animation not playing
  - Eliminated IPC communication failures
  - Removed splash screen timeout issues
  - Fixed window creation race conditions
- **Window Display Problems**: Corrected main window not appearing
  - Proper splash completion signaling
  - Reliable window transition timing
  - Clean window cleanup and management

### Removed
- **Legacy Video Splash**: Removed `src/assets/splash.webm` dependency
- **Debug Code**: Cleaned up all debugging console.log statements
- **Temporary Files**: Removed debugging scripts and generated files
  - `scripts/generate-splash.js`
  - `scripts/create-simple-splash.js`
  - `scripts/package.json`
  - `scripts/frames/` directory

### Technical Details
- **Splash Screen**: HTML/CSS with JavaScript timing control
- **Animation**: CSS keyframes with transform and opacity effects
- **Particles**: Dynamic JavaScript-generated floating elements
- **IPC**: Secure context bridge with multiple fallback methods
- **Timing**: 2.6-second splash with 0.5-second fade transition

## [1.1.1] - Previous Release

### Bug Fixes
- Fixed 'B' key shortcut interfering with text input in modals
- Improved keyboard shortcut handling to ignore hotkeys when typing

### Known Issues
- Add Site modal text fields need center alignment
- Default site buttons (OME, MONKEY, UHMEGLE) lack hover animations
- Camera switching functionality temporarily disabled
- Some sites may require multiple attempts to connect

## [1.1.0] - Previous Release

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

## [1.0.0] - Initial Release

### Features
- Basic site switching functionality
- Video blur capability
- Camera selection support
- Settings management
- Multiple site support (OME, MONKEY, UHMEGLE)

---

## Development Notes

### Splash Screen Evolution
The splash screen has evolved through several iterations:
1. **Original**: Video-based splash using `splash.webm`
2. **Debug Phase**: Complex JavaScript canvas animations (unreliable)
3. **Current**: Clean HTML/CSS with JavaScript timing (reliable)

### Architecture Decisions
- **IPC Communication**: Uses context bridge for security
- **Window Management**: Splash-first approach prevents race conditions
- **Animation**: CSS-based for performance and reliability
- **Fallbacks**: Multiple timeout and communication methods

### Future Considerations
- Video splash option for more complex animations
- Configurable splash duration
- Theme-based splash variations
- Performance monitoring for splash timing
