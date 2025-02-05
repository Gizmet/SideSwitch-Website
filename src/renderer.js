// Site configurations
const sites = {
    ome: {
        url: 'https://ome.tv',
        videoElement: 'video#remote_video',
        videoContainer: '.videochat'
    },
    monkey: {
        url: 'https://monkey.app',
        videoElement: 'video#remote-video',
        videoContainer: '.video-container'
    },
    uhmegle: {
        url: 'https://uhmegle.com',
        videoElement: 'video#othervideo',
        videoContainer: '.video-container'
    }
};

// Current site
let currentSite = 'ome';

// DOM Elements
const webview = document.getElementById('site-view');
const blurButton = document.getElementById('toggle-blur');
const dimOverlay = document.getElementById('dim-overlay');
const settingsModal = document.getElementById('settings-modal');

// Dragging state
let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;

// Resize state
let isResizing = false;
let currentWidth;
let currentHeight;
let initialWidth;
let initialHeight;
let resizeType = ''; // 'right', 'bottom', or 'corner'

// Default overlay position and size
const defaultOverlay = {
    top: '0px',
    left: '140px',
    width: 'calc(50% - 70px)',
    height: 'calc(100% - 260px)'
};

// Load saved position and size
function loadSavedPosition() {
    const saved = JSON.parse(localStorage.getItem('dimOverlayPosition') || '{}');
    if (saved.top) dimOverlay.style.top = saved.top;
    if (saved.left) dimOverlay.style.left = saved.left;
    if (saved.width) dimOverlay.style.width = saved.width;
    if (saved.height) dimOverlay.style.height = saved.height;
}

// Save current position and size
function savePosition() {
    const position = {
        top: dimOverlay.style.top,
        left: dimOverlay.style.left,
        width: dimOverlay.style.width,
        height: dimOverlay.style.height
    };
    localStorage.setItem('dimOverlayPosition', JSON.stringify(position));
}

// Handle drag start
function dragStart(e) {
    if (e.target === dimOverlay) {
        isDragging = true;
        dimOverlay.classList.add('dragging');
        
        initialX = e.clientX - dimOverlay.offsetLeft;
        initialY = e.clientY - dimOverlay.offsetTop;
    }
}

// Handle dragging
function drag(e) {
    if (isDragging) {
        e.preventDefault();
        
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;

        // Constrain to window bounds
        currentX = Math.max(140, Math.min(currentX, window.innerWidth - dimOverlay.offsetWidth));
        currentY = Math.max(0, Math.min(currentY, window.innerHeight - dimOverlay.offsetHeight));

        dimOverlay.style.left = `${currentX}px`;
        dimOverlay.style.top = `${currentY}px`;
    }
}

// Handle drag end
function dragEnd() {
    if (isDragging) {
        isDragging = false;
        dimOverlay.classList.remove('dragging');
        savePosition();
    }
}

// Initialize dragging
dimOverlay.addEventListener('mousedown', dragStart);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', dragEnd);

// Reset position and size
function resetPosition() {
    Object.assign(dimOverlay.style, defaultOverlay);
    savePosition();
}

// Double click to reset position and size
dimOverlay.addEventListener('dblclick', resetPosition);

// Handle resize start
function resizeStart(e) {
    if (e.target.classList.contains('resize-handle')) {
        isResizing = true;
        dimOverlay.classList.add('resizing');
        
        initialWidth = dimOverlay.offsetWidth;
        initialHeight = dimOverlay.offsetHeight;
        initialX = e.clientX;
        initialY = e.clientY;
        
        e.preventDefault();
        e.stopPropagation();
    }
}

// Handle resizing
function resize(e) {
    if (!isResizing) return;

    e.preventDefault();
    
    const deltaX = e.clientX - initialX;
    const deltaY = e.clientY - initialY;
    
    // Calculate new dimensions
    const newWidth = Math.max(300, initialWidth + deltaX);
    const newHeight = Math.max(200, initialHeight + deltaY);
    
    // Apply new dimensions
    dimOverlay.style.width = `${newWidth}px`;
    dimOverlay.style.height = `${newHeight}px`;
}

// Handle resize end
function resizeEnd() {
    if (isResizing) {
        isResizing = false;
        dimOverlay.classList.remove('resizing');
        savePosition();
    }
}

// Initialize resize handlers
dimOverlay.addEventListener('mousedown', resizeStart);
document.addEventListener('mousemove', resize);
document.addEventListener('mouseup', resizeEnd);

// Toggle dim with position memory
function toggleBlur() {
    const isActive = dimOverlay.classList.contains('active');
    if (!isActive) {
        const saved = JSON.parse(localStorage.getItem('dimOverlayPosition') || '{}');
        if (!saved.width || !saved.height) {
            resetPosition();
        } else {
            loadSavedPosition();
        }
    }
    dimOverlay.classList.toggle('active');
    blurButton.classList.toggle('active');
}

// Add click handler for blur button
blurButton.addEventListener('click', toggleBlur);

// Switch between sites
function switchSite(site) {
    if (sites[site]) {
        currentSite = site;
        webview.loadURL(sites[site].url);
        
        // Update active button
        document.querySelectorAll('.nav-button').forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent === site.toUpperCase()) {
                btn.classList.add('active');
            }
        });

        // Remove dim when switching sites
        dimOverlay.classList.remove('active');
        blurButton.classList.remove('active');
    }
}

// Handle webview errors
webview.addEventListener('did-fail-load', (event) => {
    console.error('Failed to load:', event);
    setTimeout(() => webview.reload(), 5000);
});

// Settings modal
function openSettings() {
    settingsModal.style.display = 'block';
}

function closeSettings() {
    settingsModal.style.display = 'none';
}

function saveSettings() {
    closeSettings();
}

// Keyboard shortcuts
document.addEventListener('keydown', (event) => {
    if (event.key === 'b' || event.key === 'B') {
        toggleBlur();
    }
});