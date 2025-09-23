const { app } = require('electron');
const fs = require('fs');
const path = require('path');

const FILE = path.join(app.getPath('userData'), 'sites.json');

function ensureDir() {
    fs.mkdirSync(path.dirname(FILE), { recursive: true });
}

function loadSites() {
    try {
        ensureDir();
        if (!fs.existsSync(FILE)) return { version: 1, items: [] };
        const raw = fs.readFileSync(FILE, 'utf8');
        const db = JSON.parse(raw);
        if (!db.version) db.version = 1;
        if (!Array.isArray(db.items)) db.items = [];
        return db;
    } catch (error) {
        console.error('Error loading sites:', error);
        return { version: 1, items: [] };
    }
}

function saveSites(db) {
    try {
        ensureDir();
        const tmp = FILE + '.tmp';
        fs.writeFileSync(tmp, JSON.stringify(db, null, 2), 'utf8');
        fs.renameSync(tmp, FILE);
        return true;
    } catch (error) {
        console.error('Error saving sites:', error);
        return false;
    }
}

function isValidUrl(u) {
    try {
        const url = new URL(u);
        return ['http:', 'https:'].includes(url.protocol);
    } catch { 
        return false; 
    }
}

function hostname(u) {
    try { 
        return new URL(u).hostname.replace(/^www\./, ''); 
    } catch { 
        return ''; 
    }
}

// Default sites for new users
function getDefaultSites() {
    return [
        {
            id: 'ome-tv',
            title: 'OME',
            url: 'https://ome.tv',
            group: 'Chat',
            audio: false,
            zoom: 1.0,
            pinned: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: 'monkey-app',
            title: 'MONKEY',
            url: 'https://monkey.app',
            group: 'Chat',
            audio: false,
            zoom: 1.0,
            pinned: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: 'uhmegle-com',
            title: 'UHMEGLE',
            url: 'https://uhmegle.com',
            group: 'Chat',
            audio: false,
            zoom: 1.0,
            pinned: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    ];
}

// Pre-made site categories for quick addition
function getSiteCategories() {
    return {
        'News & Media': [
            { title: 'BBC News', url: 'https://www.bbc.com/news', icon: '📺' },
            { title: 'CNN', url: 'https://www.cnn.com', icon: '📰' },
            { title: 'Reuters', url: 'https://www.reuters.com', icon: '📊' },
            { title: 'The Guardian', url: 'https://www.theguardian.com', icon: '🛡️' },
            { title: 'NPR', url: 'https://www.npr.org', icon: '🎙️' }
        ],
        'Social Media': [
            { title: 'Twitter/X', url: 'https://twitter.com', icon: '🐦' },
            { title: 'Instagram', url: 'https://www.instagram.com', icon: '📸' },
            { title: 'TikTok', url: 'https://www.tiktok.com', icon: '🎵' },
            { title: 'Reddit', url: 'https://www.reddit.com', icon: '🤖' },
            { title: 'LinkedIn', url: 'https://www.linkedin.com', icon: '💼' }
        ],
        'Video & Streaming': [
            { title: 'YouTube', url: 'https://www.youtube.com', icon: '📺' },
            { title: 'Twitch', url: 'https://www.twitch.tv', icon: '🎮' },
            { title: 'Vimeo', url: 'https://vimeo.com', icon: '🎬' },
            { title: 'Netflix', url: 'https://www.netflix.com', icon: '🎭' },
            { title: 'Hulu', url: 'https://www.hulu.com', icon: '🍿' }
        ],
        'Communication': [
            { title: 'Discord', url: 'https://discord.com/app', icon: '💬' },
            { title: 'Slack', url: 'https://slack.com', icon: '💼' },
            { title: 'Zoom', url: 'https://zoom.us', icon: '📹' },
            { title: 'Teams', url: 'https://teams.microsoft.com', icon: '👥' },
            { title: 'WhatsApp Web', url: 'https://web.whatsapp.com', icon: '💚' }
        ],
        'Productivity': [
            { title: 'Google Drive', url: 'https://drive.google.com', icon: '☁️' },
            { title: 'Notion', url: 'https://www.notion.so', icon: '📝' },
            { title: 'Trello', url: 'https://trello.com', icon: '📋' },
            { title: 'Asana', url: 'https://asana.com', icon: '✅' },
            { title: 'Figma', url: 'https://www.figma.com', icon: '🎨' }
        ],
        'Entertainment': [
            { title: 'Spotify', url: 'https://open.spotify.com', icon: '🎵' },
            { title: 'SoundCloud', url: 'https://soundcloud.com', icon: '🎧' },
            { title: 'Pinterest', url: 'https://www.pinterest.com', icon: '📌' },
            { title: 'DeviantArt', url: 'https://www.deviantart.com', icon: '🎨' },
            { title: 'Behance', url: 'https://www.behance.net', icon: '💡' }
        ],
        'Gaming': [
            { title: 'Steam', url: 'https://store.steampowered.com', icon: '🎮' },
            { title: 'Epic Games', url: 'https://www.epicgames.com', icon: '🏆' },
            { title: 'Battle.net', url: 'https://battle.net', icon: '⚔️' },
            { title: 'Origin', url: 'https://www.origin.com', icon: '🎯' },
            { title: 'GOG', url: 'https://www.gog.com', icon: '💎' }
        ]
    };
}

module.exports = { 
    FILE, 
    loadSites, 
    saveSites, 
    isValidUrl, 
    hostname, 
    getDefaultSites,
    getSiteCategories
};
