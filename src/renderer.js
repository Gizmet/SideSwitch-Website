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

// Default overlay position and size
const defaultOverlay = {
    top: '0px',
    left: '140px',
    width: 'calc(50% - 70px)',
    height: 'calc(100% - 260px)'
};

// Initialize overlay position
Object.assign(dimOverlay.style, defaultOverlay);

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

// Toggle blur
function toggleBlur() {
    dimOverlay.classList.toggle('active');
    blurButton.classList.toggle('active');
}

// Add click handler for blur button
blurButton.addEventListener('click', toggleBlur);

// Handle webview errors
webview.addEventListener('did-fail-load', (event) => {
    console.error('Failed to load:', event);
    setTimeout(() => webview.reload(), 5000);
});

// Hotkey handling
document.addEventListener('keydown', (event) => {
    // Check if we're typing in an input field
    const activeElement = document.activeElement;
    const isTyping = activeElement.tagName === 'INPUT' || 
                    activeElement.tagName === 'TEXTAREA' || 
                    activeElement.isContentEditable;
    
    // Don't trigger hotkeys if we're typing
    if (isTyping) return;

    // Handle blur toggle with 'B' key
    if (event.key.toLowerCase() === 'b') {
        event.preventDefault();
        toggleBlur();
    }
});