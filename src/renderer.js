// Site configurations
const sites = {
    ome: {
        url: 'https://ome.tv',
        videoElement: 'video#remote_video',
        videoContainer: '.videochat',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    },
    monkey: {
        url: 'https://monkey.cool',
        videoElement: 'video#remote-video',
        videoContainer: '.video-container',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    },
    uhmegle: {
        url: 'https://uhmegle.com',
        videoElement: 'video#othervideo',
        videoContainer: '.video-container',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
};

// Current site
let currentSite = 'ome';
let loadRetries = 0;
const MAX_RETRIES = 3;

// DOM Elements
const webview = document.getElementById('site-view');
const blurButton = document.getElementById('toggle-blur');
const dimOverlay = document.getElementById('dim-overlay');
const resizeHandle = dimOverlay.querySelector('.resize-handle');

// Initialize overlay position
dimOverlay.style.top = '0px';
dimOverlay.style.left = '140px';
dimOverlay.style.width = 'calc(50% - 70px)';
dimOverlay.style.height = 'calc(100% - 260px)';

// Drag and resize functionality
let isResizing = false;
let isDragging = false;
let initialWidth, initialHeight, initialX, initialY;
let initialLeft, initialTop;

// Resize handling
resizeHandle.addEventListener('mousedown', (e) => {
    isResizing = true;
    initialWidth = dimOverlay.offsetWidth;
    initialHeight = dimOverlay.offsetHeight;
    initialX = e.clientX;
    initialY = e.clientY;
    dimOverlay.classList.add('resizing');
    e.stopPropagation(); // Prevent drag start
});

// Drag handling
dimOverlay.addEventListener('mousedown', (e) => {
    if (e.target === resizeHandle) return;
    isDragging = true;
    initialX = e.clientX;
    initialY = e.clientY;
    initialLeft = dimOverlay.offsetLeft;
    initialTop = dimOverlay.offsetTop;
    dimOverlay.classList.add('dragging');
});

// Mouse move handling for both drag and resize
document.addEventListener('mousemove', (e) => {
    if (isResizing) {
        const deltaX = e.clientX - initialX;
        const deltaY = e.clientY - initialY;
        
        const newWidth = Math.max(200, initialWidth + deltaX);
        const newHeight = Math.max(200, initialHeight + deltaY);
        
        dimOverlay.style.width = `${newWidth}px`;
        dimOverlay.style.height = `${newHeight}px`;
    } else if (isDragging) {
        const deltaX = e.clientX - initialX;
        const deltaY = e.clientY - initialY;
        
        dimOverlay.style.left = `${initialLeft + deltaX}px`;
        dimOverlay.style.top = `${initialTop + deltaY}px`;
    }
});

// Mouse up handling for both drag and resize
document.addEventListener('mouseup', () => {
    isResizing = false;
    isDragging = false;
    dimOverlay.classList.remove('resizing', 'dragging');
});

// Double click to reset position
dimOverlay.addEventListener('dblclick', (e) => {
    if (e.target === resizeHandle) return;
    dimOverlay.style.top = '0px';
    dimOverlay.style.left = '140px';
    dimOverlay.style.width = 'calc(50% - 70px)';
    dimOverlay.style.height = 'calc(100% - 260px)';
});

// Basic site switching function
async function switchSite(site) {
    if (!sites[site]) return;

    currentSite = site;
    loadRetries = 0;

    // Update button states
    document.querySelectorAll('.nav-button').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.site === site) btn.classList.add('active');
    });

    // Remove dim overlay
    dimOverlay.classList.remove('active');
    blurButton.classList.remove('active');

    // Load new site
    try {
        await webview.loadURL(sites[site].url);
    } catch (err) {
        console.error(`Failed to load ${site}:`, err);
        if (loadRetries < MAX_RETRIES) {
            loadRetries++;
            setTimeout(() => switchSite(site), 2000);
        }
    }
}

// Initialize first site load
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#navigation').addEventListener('click', (e) => {
        const button = e.target.closest('.nav-button');
        if (button && button.dataset.site) switchSite(button.dataset.site);
    });
    switchSite('ome');
});

// Toggle blur
function toggleBlur() {
    dimOverlay.classList.toggle('active');
    blurButton.classList.toggle('active');
}

blurButton.addEventListener('click', toggleBlur);

// Hotkey handling
document.addEventListener('keydown', (event) => {
    if (!document.activeElement.isContentEditable && event.key.toLowerCase() === 'b') {
        event.preventDefault();
        toggleBlur();
    }
});

// Handle new windows
webview.addEventListener('new-window', (event) => {
    event.preventDefault();
    webview.loadURL(event.url);
});