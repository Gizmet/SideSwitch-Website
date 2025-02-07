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

// Initialize first site load
document.addEventListener('DOMContentLoaded', () => {
    // Set up navigation click handlers first
    document.querySelector('#navigation').addEventListener('click', (e) => {
        const button = e.target.closest('.nav-button');
        if (button && button.dataset.site) switchSite(button.dataset.site);
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