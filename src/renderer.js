// Site configurations
const defaultSites = {
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

// Load sites from localStorage or use defaults
const sites = { ...defaultSites, ...JSON.parse(localStorage.getItem('customSites') || '{}') };

// Current site
let currentSite = 'ome';
let loadRetries = 0;
const MAX_RETRIES = 3;

// DOM Elements
const webview = document.getElementById('site-view');
const blurButton = document.getElementById('toggle-blur');
const dimOverlay = document.getElementById('dim-overlay');
const resizeHandle = dimOverlay.querySelector('.resize-handle');
const addSiteModal = document.getElementById('add-site-modal');
const addSiteForm = document.getElementById('add-site-form');
const cancelAddSiteButton = document.getElementById('cancel-add-site');
// TODO: Camera switching functionality is currently disabled and needs to be fixed
// const cameraSelect = document.getElementById('camera-select');
const loadingIndicator = document.getElementById('loading-indicator');

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

// Show/hide loading indicator
function showLoading() {
    loadingIndicator.style.display = 'block';
}

function hideLoading() {
    loadingIndicator.style.display = 'none';
}

// Modal handling functions
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        console.log('Showing modal:', modalId);
    } else {
        console.error('Modal not found:', modalId);
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        if (modalId === 'add-site-modal') {
            document.getElementById('add-site-form').reset();
        }
        console.log('Hiding modal:', modalId);
    }
}

function createSiteButton(siteId, siteName) {
    const button = document.createElement('button');
    button.className = 'nav-button';
    button.dataset.site = siteId;
    
    const rocketDiv = document.createElement('div');
    rocketDiv.className = 'rocket';
    rocketDiv.textContent = '🚀';
    
    const span = document.createElement('span');
    span.textContent = siteName.toUpperCase();
    
    // Only add remove button for custom sites (not default ones)
    if (!defaultSites[siteId]) {
        const removeBtn = document.createElement('div');
        removeBtn.className = 'remove-site';
        removeBtn.innerHTML = '×';
        removeBtn.title = 'Remove Site';
        removeBtn.onclick = (e) => {
            e.stopPropagation(); // Prevent site switching when clicking remove
            removeSite(siteId);
        };
        button.appendChild(removeBtn);
    }
    
    button.appendChild(rocketDiv);
    button.appendChild(span);
    
    return button;
}

function removeSite(siteId) {
    // Don't allow removing default sites
    if (defaultSites[siteId]) return;
    
    // Remove from sites object
    delete sites[siteId];
    
    // Remove from localStorage
    const customSites = JSON.parse(localStorage.getItem('customSites') || '{}');
    delete customSites[siteId];
    localStorage.setItem('customSites', JSON.stringify(customSites));
    
    // Remove the button from navigation
    const button = document.querySelector(`[data-site="${siteId}"]`);
    if (button) {
        button.remove();
    }
    
    // If this was the current site, switch to the first default site
    if (currentSite === siteId) {
        switchSite('ome');
    }
    
    console.log('Removed site:', siteId);
}

function addNewSite(siteData) {
    const siteId = siteData.name.toLowerCase().replace(/\s+/g, '-');
    
    // Common video element selectors to try
    const commonSelectors = {
        videoElement: ['video#remote-video', 'video#remote_video', 'video#othervideo', 'video.remote', '.video-container video', '#video-container video', 'video'],
        videoContainer: ['.video-container', '#video-container', '.videochat', '.remote-video-container']
    };
    
    // Add to sites object with auto-detected selectors
    sites[siteId] = {
        url: siteData.url,
        videoElement: commonSelectors.videoElement[0], // Default to first common selector
        videoContainer: commonSelectors.videoContainer[0], // Default to first common container
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    };
    
    // Save to localStorage
    const customSites = { ...JSON.parse(localStorage.getItem('customSites') || '{}') };
    customSites[siteId] = sites[siteId];
    localStorage.setItem('customSites', JSON.stringify(customSites));
    
    // Add button to navigation
    const button = createSiteButton(siteId, siteData.name);
    const navigation = document.querySelector('#navigation .nav-group');
    if (navigation) {
        navigation.appendChild(button);
    }
    
    console.log('Added new site:', siteId, sites[siteId]);
    return siteId;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    console.log('=== DEBUG START ===');
    const addSiteBtn = document.getElementById('add-site-btn');
    console.log('Add Site Button:', addSiteBtn);
    if (addSiteBtn) {
        console.log('Button exists, setting up click handler');
        addSiteBtn.addEventListener('click', () => {
            console.log('Add site button clicked');
            const modal = document.getElementById('add-site-modal');
            if (modal) {
                modal.style.display = 'block';
            }
        });
    }
    console.log('=== DEBUG END ===');
    
    console.log('DOM Content Loaded');
    
    // Debug navigation buttons
    const navigation = document.querySelector('#navigation');
    console.log('Navigation element:', navigation);
    
    const buttons = navigation.querySelectorAll('.nav-button');
    console.log('All nav buttons:', Array.from(buttons).map(btn => ({
        id: btn.id,
        dataset: btn.dataset,
        classes: btn.className,
        display: window.getComputedStyle(btn).display,
        visibility: window.getComputedStyle(btn).visibility,
        opacity: window.getComputedStyle(btn).opacity
    })));

    // Set up navigation click handlers
    document.querySelector('#navigation').addEventListener('click', (e) => {
        const button = e.target.closest('.nav-button');
        if (button && button.dataset.site === 'add') {
            console.log('Add site button clicked');
            const modal = document.getElementById('add-site-modal');
            if (modal) {
                modal.style.display = 'block';
            }
        } else if (button && button.dataset.site) {
            switchSite(button.dataset.site);
        }
    });

    // Load custom sites from localStorage
    const customSites = JSON.parse(localStorage.getItem('customSites') || '{}');
    
    Object.entries(customSites).forEach(([siteId, site]) => {
        const button = createSiteButton(siteId, siteId.replace(/-/g, ' ').toUpperCase());
        const addBtn = document.querySelector('[data-site="add"]');
        if (addBtn) {
            addBtn.parentNode.insertBefore(button, addBtn);
        }
    });

    // Initialize camera devices
    getCameraDevices();

    // Handle webview errors
    webview.addEventListener('did-fail-load', (event) => {
        console.error('WebView failed to load:', event);
        hideLoading();
        if (loadRetries < MAX_RETRIES) {
            loadRetries++;
            setTimeout(() => switchSite(currentSite), 2000);
        }
    });

    // Wait for webview to be ready before loading initial site
    let webviewReady = false;
    webview.addEventListener('dom-ready', () => {
        if (!webviewReady) {
            webviewReady = true;
            console.log('Initial webview ready, loading first site');
            switchSite('ome');
        }
    });

    // Form submission handler
    document.getElementById('add-site-form').addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Form submitted');
        
        const formData = {
            name: document.getElementById('site-name').value,
            url: document.getElementById('site-url').value
        };
        
        // Add the new site
        const siteId = addNewSite(formData);
        
        // Hide modal and reset form
        document.getElementById('add-site-modal').style.display = 'none';
        document.getElementById('add-site-form').reset();
        
        // Switch to the new site
        if (siteId) {
            switchSite(siteId);
        }
    });

    // Cancel button handler
    document.getElementById('cancel-add-site').addEventListener('click', () => {
        document.getElementById('add-site-modal').style.display = 'none';
        document.getElementById('add-site-form').reset();
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('add-site-modal');
        if (e.target === modal) {
            modal.style.display = 'none';
            document.getElementById('add-site-form').reset();
        }
    });
});

// Basic site switching function
async function switchSite(site) {
    if (!sites[site]) return;

    currentSite = site;
    console.log('Switching to site:', site);
    showLoading();

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
        // Load the new site
        await webview.loadURL(sites[site].url);
        console.log('Site URL loaded:', sites[site].url);
        
        // Remove any existing dom-ready handlers
        const existingHandlers = webview.listeners('dom-ready');
        existingHandlers.forEach(handler => {
            if (handler.name !== 'initialDomReady') {
                webview.removeEventListener('dom-ready', handler);
            }
        });
        
        // Set up camera when site loads
        const setupHandler = () => {
            console.log('Webview DOM ready for', site);
            hideLoading();
            
            // First check for devices
            webview.executeJavaScript(`
                navigator.mediaDevices.enumerateDevices()
                    .then(devices => {
                        console.log('Available devices in webview:', 
                            devices.map(d => ({kind: d.kind, label: d.label}))
                        );
                    })
                    .catch(err => console.error('Error enumerating devices in webview:', err));
            `);

            // Then try to set the selected camera
            const selectedCamera = localStorage.getItem('selectedCamera');
            if (selectedCamera) {
                const script = `
                    (async function() {
                        try {
                            // Stop any existing streams
                            if (window.localStream) {
                                window.localStream.getTracks().forEach(track => track.stop());
                            }

                            // Get new stream with both video and audio
                            const stream = await navigator.mediaDevices.getUserMedia({
                                video: {
                                    deviceId: { exact: '${selectedCamera}' }
                                },
                                audio: true
                            });

                            // Store stream globally
                            window.localStream = stream;

                            // Function to set up video element
                            const setupVideo = async () => {
                                const localVideo = document.querySelector('#local_video');
                                if (localVideo) {
                                    localVideo.srcObject = stream;
                                    await localVideo.play().catch(console.error);
                                    console.log('Set initial camera stream');
                                }
                            };

                            // Initial setup attempt
                            await setupVideo();

                            // Also set up a retry mechanism
                            const retrySetup = setInterval(async () => {
                                const localVideo = document.querySelector('#local_video');
                                if (localVideo && !localVideo.srcObject) {
                                    await setupVideo();
                                }
                            }, 1000);

                            // Clear retry after 10 seconds
                            setTimeout(() => clearInterval(retrySetup), 10000);

                        } catch (err) {
                            console.error('Error setting initial camera:', err);
                        }
                    })();
                `;
                webview.executeJavaScript(script);
            }
        };

        webview.addEventListener('dom-ready', setupHandler);

    } catch (err) {
        console.error(`Failed to load ${site}:`, err);
        hideLoading();
        if (loadRetries < MAX_RETRIES) {
            loadRetries++;
            setTimeout(() => switchSite(site), 2000);
        }
    }
}

// Toggle blur
function toggleBlur() {
    dimOverlay.classList.toggle('active');
    blurButton.classList.toggle('active');
}

blurButton.addEventListener('click', toggleBlur);

// Hotkey handling
document.addEventListener('keydown', (event) => {
    // Ignore 'B' key if we're typing in an input field, textarea, or contentEditable element
    const isTyping = ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName) || 
                    document.activeElement.isContentEditable;
                    
    if (!isTyping && event.key.toLowerCase() === 'b') {
        event.preventDefault();
        toggleBlur();
    }
});

// Handle new windows
webview.addEventListener('new-window', (event) => {
    event.preventDefault();
    webview.loadURL(event.url);
});

// Camera handling functions
async function getCameraDevices() {
    try {
        // Request camera permissions first
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        stream.getTracks().forEach(track => track.stop()); // Stop the test stream

        // Now enumerate devices
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        
        // Clear and update camera select options
        cameraSelect.innerHTML = '';
        
        // Add default option
        if (videoDevices.length === 0) {
            const option = document.createElement('option');
            option.value = '';
            option.text = 'No cameras found';
            cameraSelect.appendChild(option);
            return;
        }

        videoDevices.forEach(device => {
            const option = document.createElement('option');
            option.value = device.deviceId;
            
            // Check if this is the OBS Virtual Camera
            const isOBS = device.label.toLowerCase().includes('obs') || 
                         device.label.toLowerCase().includes('v4l2');
            
            // Format the label
            option.text = isOBS ? '🎥 OBS Virtual Camera' : 
                         device.label || `Camera ${cameraSelect.length + 1}`;
            
            // Move OBS camera to top if present
            if (isOBS) {
                cameraSelect.insertBefore(option, cameraSelect.firstChild);
            } else {
                cameraSelect.appendChild(option);
            }
        });

        // Set the selected camera
        const savedDeviceId = localStorage.getItem('selectedCamera');
        if (savedDeviceId && videoDevices.some(d => d.deviceId === savedDeviceId)) {
            cameraSelect.value = savedDeviceId;
        } else {
            // If no saved device or saved device not found, select first available
            localStorage.setItem('selectedCamera', videoDevices[0].deviceId);
            cameraSelect.value = videoDevices[0].deviceId;
        }

        console.log('Available cameras:', videoDevices.map(d => d.label));
    } catch (err) {
        console.error('Error getting camera devices:', err);
        cameraSelect.innerHTML = '<option value="">Error loading cameras</option>';
    }
}

// Handle camera selection change
cameraSelect.addEventListener('change', async (e) => {
    const deviceId = e.target.value;
    if (!deviceId) return;

    try {
        // Store the selected camera ID
        localStorage.setItem('selectedCamera', deviceId);
        
        // Inject the camera switching code into the webview
        if (webview && currentSite) {
            const script = `
                (async function() {
                    try {
                        // Stop any existing streams
                        if (window.localStream) {
                            window.localStream.getTracks().forEach(track => track.stop());
                        }

                        // Get new stream
                        const stream = await navigator.mediaDevices.getUserMedia({
                            video: {
                                deviceId: { exact: '${deviceId}' }
                            },
                            audio: true
                        });

                        // Store stream globally
                        window.localStream = stream;

                        // Find and update all local video elements
                        const videos = document.getElementsByTagName('video');
                        for (let video of videos) {
                            if (video.id === 'local_video' || 
                                video.classList.contains('local') || 
                                video.classList.contains('localVideo')) {
                                video.srcObject = stream;
                                video.play().catch(console.error);
                            }
                        }

                        // Update WebRTC if available
                        if (window.rtcPeerConnection) {
                            const senders = window.rtcPeerConnection.getSenders();
                            const videoTrack = stream.getVideoTracks()[0];
                            const sender = senders.find(s => s.track && s.track.kind === 'video');
                            if (sender) {
                                await sender.replaceTrack(videoTrack);
                            }
                        }

                        console.log('Camera switch successful');
                    } catch (err) {
                        console.error('Error switching camera in webview:', err);
                    }
                })();
            `;
            
            webview.executeJavaScript(script);
        }
    } catch (err) {
        console.error('Error in camera selection change:', err);
    }
});

// Watch for device changes (e.g., OBS virtual camera being enabled)
navigator.mediaDevices.addEventListener('devicechange', () => {
    console.log('Device change detected, updating camera list...');
    getCameraDevices();
});