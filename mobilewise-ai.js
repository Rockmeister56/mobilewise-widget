// ============================================
// MOBILEWISE AI WIDGET - FIXED OVERLAY VERSION
// ============================================

(function() {
    console.log('🚀 MobileWise Widget loading (FIXED OVERLAY VERSION)...');
    
    // CONFIG - POINT TO YOUR VOICE CHAT
    const config = {
        voiceChatUrl: 'https://mobilewise.netlify.app/voice-chat-fusion-instant',
        videoUrl: 'https://odetjszursuaxpapfwcy.supabase.co/storage/v1/object/public/video-avatars/video_avatar_1764286430873.mp4',
        overlayImageUrl: 'https://odetjszursuaxpapfwcy.supabase.co/storage/v1/object/public/form-assets/logos/logo_5f42f026-051a-42c7-833d-375fcac74252_1764359060407_player3.png'
    };
    
    console.log('🔗 Using voice chat URL:', config.voiceChatUrl);
    
    // ======== INJECT CSS ========
    const style = document.createElement('style');
    style.textContent = `
        /* MOBILEWISE AI WIDGET - BOTTOM RIGHT POSITION */
        #mobilewiseAIWidget {
            position: fixed;
            bottom: 5px;
            right: 20px;
            width: 390px;
            height: 430px;
            z-index: 10000;
            transform: translateY(100px);
            opacity: 0;
            pointer-events: none;
            transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                        opacity 0.8s ease;
        }
        
        #mobilewiseAIWidget.visible {
            transform: translateY(0);
            opacity: 1;
            pointer-events: auto;
        }
        
        /* Video container */
 .ai-video-container {
    position: absolute;
    top: 100px;
    left: 50px;
    width: 300px;
    height: 175px;
    border-radius: 12px;
    overflow: hidden;
}
        
        .ai-video-container video {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .video-frozen {
            filter: brightness(0.98);
        }
        
        /* Copy and replace your current .ai-text-container and .ai-text */
.ai-text-container {
    position: absolute;
    bottom: 118px;
    left: 38px;
    right: 38px;
    text-align: center;
    z-index: 3;
}

.ai-text {
    background: none !important;
    color: white;
    padding: 12px 20px !important;
    border-radius: 20px;
    font-size: 16px;
    min-height: 50px;
    max-height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    line-height: 1.4;
    width: 100%;
}
        
        .typing-cursor {
            display: inline-block;
            width: 2px;
            height: 1em;
            background: white;
            margin-left: 2px;
            animation: blink 1s infinite;
        }
        
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
        
/* Buttons */
.ai-action-buttons {
    position: absolute;
    bottom: 12px;          /* WAS: 3px - NOW: 20px LOWER (3 + 20 = 23) */
    left: 50px;            /* WAS: 10px - Makes buttons NARROWER (20% narrower) */
    right: 50px;           /* WAS: 10px - Makes buttons NARROWER (20% narrower) */
    display: flex;
    flex-direction: column;
    gap: 9px;              /* WAS: 8px - NOW: 4px gap between buttons */
    z-index: 3;
}

.ai-action-btn {
    padding: 7px;
    border: none;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    text-align: center;
    width: 100%;           /* Ensures buttons use available width */
}

.ai-primary-btn {
    background: linear-gradient(135deg, #002fff 0%, #060a1c 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 1);
}

.ai-secondary-btn {
    background: linear-gradient(135deg, #6f00ffff 0%, #060a1c 100%);
    color: #ffffffff;
    border: 2px solid #002fff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 1);
}        
        .ai-primary-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 255, 34, 1);
        }
        
        .ai-secondary-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.1);
            background: white;
            color: #1100ffff;
        }
        
        .play-icon {
            margin-left: 8px;
            animation: blinkPlay 2s infinite;
            display: inline-block;
        }
        
        @keyframes blinkPlay {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0.3; }
        }
        
        /* Overlay Image */
        .ai-overlay-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            border-radius: 15px;
            z-index: 2;
        }
        
        /* ===== FIXED VOICE CHAT OVERLAY ===== */
        #voiceChatOverlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.85);
            z-index: 20000;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s;
            padding: 20px;
        }
        
        #voiceChatOverlay.active {
            opacity: 1;
            visibility: visible;
        }
        
        /* FIXED: PROPER IFRAME CONTAINER */
        #voiceChatContainer {
            width: 90%;
            max-width: 1000px;
            height: 80vh;
            min-height: 500px;
            background: white;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 25px 50px rgba(0,0,0,0.5);
            position: relative;
            display: flex;
            flex-direction: column;
        }
        
        #voiceChatIframe {
            width: 100%;
            height: 100%;
            border: none;
            flex: 1;
        }
        
        .close-voice-chat {
            position: absolute;
            top: 15px;
            right: 15px;
            background: rgba(255, 0, 0, 1);
            color: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 24px;
            cursor: pointer;
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.3s;
        }
        
        .close-voice-chat:hover {
            background: rgba(255, 255, 255, 1);
        }
        
 /* ===== MOBILE ADJUSTMENTS (768px and below) ===== */
@media (max-width: 768px) {
    #mobilewiseAIWidget {
        width: 94vw;
        max-width: 370px;
        height: 430px;
        bottom: 0px;                     /* ↓ Lowered by ~7px from 15px */
        right: 50%;
        transform: translateX(50%) translateY(100px);
        opacity: 0;
        pointer-events: none;
        transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                    opacity 0.8s ease;
    }

    #mobilewiseAIWidget.visible {
        transform: translateX(50%) translateY(0);
        opacity: 1;
        pointer-events: auto;
    }

/* Video container - full video display */
.ai-video-container {
    position: absolute;
    width: 90%;
    max-width: 280px;
    height: auto;
    aspect-ratio: 16 / 9;
    left: 50%;
    top:  98px;                     /* ← MAIN POSITION CONTROL */
    transform: translateX(-50%) translateY(var(--video-vertical-adjust, 0px)); /* ← FINE-TUNE CONTROL */
    border-radius: 8px;
    overflow: visible;
}

.ai-video-container video {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 8px;
}

    /* Text container - lowered */
    .ai-text-container {
        bottom: 124px;                   /* ↓ Lowered by 7px from 130px */
        left:  30px;
        right: 30px;
    }

    .ai-text {
        font-size: 16px;                 /* Slightly smaller */
        padding: 10px 14px !important;   /* Tighter padding */
        min-height: 44px;
        max-height: 44px;
    }

    /* Buttons - 20% smaller and lowered */
    .ai-action-buttons {
        bottom: 15px;                    /* ↓ Lowered by 10px from 20px */
        left: 28px;
        right: 28px;
        gap: 8px;                        /* Tighter gap */
    }

    .ai-action-btn {
        padding: 8px;                    /* ↓ Smaller padding */
        font-size: 15px;                 /* ↓ Smaller font */
        border-radius: 8px;
        transform: scale(0.9);           /* ↓ Shrinks button by 20% */
        transform-origin: center;
    }

    .ai-action-btn:hover {
        transform: scale(0.82) translateY(-2px); /* Keep hover effect scaled */
    }

    /* Voice Chat Overlay */
    #voiceChatContainer {
        width: 100%;
        height: 100vh;
        max-width: none;
        border-radius: 0;
    }

    .close-voice-chat {
        top: 10px;
        right: 10px;
        width: 36px;
        height: 36px;
        font-size: 20px;
    }
}
    .ai-emergency-btn {
    background: linear-gradient(135deg, #ff9900 0%, #cc6600 100%) !important;
    color: white !important;
    animation: pulseEmergency 1.5s infinite !important;
}

@keyframes pulseEmergency {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
}
    `;
    document.head.appendChild(style);
    
    // ======== INJECT WIDGET HTML ========
    const widgetHTML = `
    <div id="mobilewiseAIWidget">
        <div class="ai-video-container">
            <video autoplay muted playsinline loop id="avatarVideo">
                <source src="${config.videoUrl}" type="video/mp4">
            </video>
        </div>
        
        <img src="${config.overlayImageUrl}" 
             class="ai-overlay-image" 
             alt="MobileWise AI Assistant">
        
        <div class="ai-text-container">
            <div class="ai-text" id="aiMessage"></div>
        </div>
        
        <div class="ai-action-buttons">
            <button class="ai-action-btn ai-primary-btn" id="getAssistanceBtn">
                Get AI Assistance <span class="play-icon">▶</span>
            </button>
            <button class="ai-action-btn ai-secondary-btn" id="justBrowsingBtn">
                Just Browsing 👉
            </button>
        </div>
    </div>
    
    <!-- FIXED VOICE CHAT OVERLAY -->
    <div id="voiceChatOverlay">
        <div id="voiceChatContainer">
            <button class="close-voice-chat" id="closeVoiceChat">×</button>
            <iframe id="voiceChatIframe" 
                    allow="microphone; camera; autoplay"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    title="Voice Chat Interface"></iframe>
        </div>
    </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', widgetHTML);

        // Animated typing text
        function typeText(element, text, speed = 50) {
            element.innerHTML = '';
            let i = 0;
            
            function type() {
                if (i < text.length) {
                    element.innerHTML = text.substring(0, i + 1) + '<span class="typing-cursor"></span>';
                    i++;
                    setTimeout(type, speed);
                } else {
                    element.innerHTML = text;
                }
            }
            type();
        }

    
    // Show widget
    setTimeout(() => {
        console.log('📱 Showing MobileWise AI Widget...');
        
        const widget = document.getElementById('mobilewiseAIWidget');
        const aiMessage = document.getElementById('aiMessage');
        
        widget.classList.add('visible');
        
        setTimeout(() => {
            typeText(aiMessage, "Hi! I'm Botimia your Personal AI Assistant. How can I help you?");
        }, 500);
        
    }, 1000);
    
 // ======== GET AI ASSISTANCE - NEW TAB METHOD (NCI Demo 3 style) ========
document.getElementById('getAssistanceBtn').addEventListener('click', async function() {
    console.log('🎤 Widget: Using NCI Demo 3 method (new tab)...');
    
    const originalText = this.innerHTML;
    this.innerHTML = '🎤 Preparing microphone...';
    this.disabled = true;
    
    // Show emergency button after 3 seconds if stuck
    setTimeout(() => {
        if (this.innerHTML === '🎤 Preparing microphone...') {
            showSkipMicOption();
        }
    }, 3000);
    
    try {
        // First check for Android overlay issues
        await checkForAndroidOverlay();
        
        // 1. EXACT SAME PERMISSION REQUEST AS NCI DEMO 3
        const stream = await navigator.mediaDevices.getUserMedia({ 
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
                autoGainControl: true
            } 
        });
        
        // Stop stream immediately (we just need permission)
        stream.getTracks().forEach(track => track.stop());
        
        // Store permission flag (same as NCI Demo 3)
        localStorage.setItem('micPermissionGranted', 'true');
        
        // 2. Generate unique timestamp
        const timestamp = Date.now();
        
        // 3. USE THE SAME URL FORMAT as NCI Demo 3 (CRITICAL)
        const url = `https://smartaivoicebot.netlify.app/voice-chat-fusion-instant?autoStartVoice=true&micPermissionGranted=true&gestureInitiated=true&timestamp=${timestamp}&source=mobilewise-widget`;
        
        console.log('✅ Permission granted, opening:', url);
        
        // 4. UPDATE BUTTON FEEDBACK
        this.innerHTML = '✅ Opening voice chat...';
        
        // 5. HIDE WIDGET (keeps it clean)
        document.getElementById('mobilewiseAIWidget').classList.remove('visible');
        
        // 6. OPEN IN NEW TAB (CRITICAL FIX - not iframe!)
        // Check if mobile or desktop
        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        
        if (isMobile) {
            // Mobile → new tab
            window.open(url, '_blank');
        } else {
            // Desktop → iframe overlay
            const iframe = document.getElementById('voiceChatIframe');
            const overlay = document.getElementById('voiceChatOverlay');
            iframe.src = url;
            overlay.classList.add('active');
        }
        
        // 7. RESET BUTTON AFTER DELAY
        setTimeout(() => {
            this.innerHTML = originalText;
            this.disabled = false;
            // Optionally show widget again after 5 seconds
            setTimeout(() => {
                if (!document.querySelector('#voiceChatOverlay.active')) {
                    document.getElementById('mobilewiseAIWidget').classList.add('visible');
                }
            }, 5000);
        }, 1500);
        
    } catch (error) {
        console.error('❌ Microphone error:', error);
        
        // Check if it's an overlay error
        if (error.message.includes('overlay') || error.name === 'NotAllowedError') {
            // SHOW OVERLAY WARNING
            showAndroidOverlayWarning();
            showSkipMicOption();
            this.innerHTML = '⚠️ Overlay blocking mic';
            this.disabled = false;
            return;
        }
        
        // FALLBACK: Open without mic (still new tab)
        this.innerHTML = '⚠️ Opening without mic...';
        
        const fallbackUrl = `https://smartaivoicebot.netlify.app/voice-chat-fusion-instant?autoStartVoice=true&micPermissionGranted=false&gestureInitiated=true&source=mobilewise-widget`;
        
        // Open based on device
        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        
        if (isMobile) {
            window.open(fallbackUrl, '_blank');
        } else {
            const iframe = document.getElementById('voiceChatIframe');
            const overlay = document.getElementById('voiceChatOverlay');
            iframe.src = fallbackUrl;
            overlay.classList.add('active');
        }
        
        // Hide widget
        document.getElementById('mobilewiseAIWidget').classList.remove('visible');
        
        // Reset button
        setTimeout(() => {
            this.innerHTML = originalText;
            this.disabled = false;
            setTimeout(() => {
                if (!document.querySelector('#voiceChatOverlay.active')) {
                    document.getElementById('mobilewiseAIWidget').classList.add('visible');
                }
            }, 5000);
        }, 3000);
    }
});

// ======== ANDROID OVERLAY DETECTION ========
function checkForAndroidOverlay() {
    return new Promise((resolve, reject) => {
        if (!/Android/i.test(navigator.userAgent)) {
            resolve(); // Not Android, skip check
            return;
        }
        
        // Test if we can request permission
        const testPermission = navigator.permissions.query({ name: 'microphone' });
        
        testPermission.then(permissionStatus => {
            if (permissionStatus.state === 'prompt') {
                resolve(); // Can ask for permission
            } else {
                reject(new Error('Android overlay blocking detected'));
            }
        }).catch(() => {
            reject(new Error('Permission query failed - likely overlay issue'));
        });
    });
}

// ======== ANDROID OVERLAY WARNING ========
function showAndroidOverlayWarning() {
    const warningHTML = `
        <div id="androidOverlayWarning" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0,0,0,0.9);
            z-index: 30000;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        ">
            <div style="
                background: white;
                padding: 25px;
                border-radius: 15px;
                max-width: 400px;
                text-align: center;
            ">
                <h3 style="color: #ff0000; margin-bottom: 15px;">⚠️ Android Permission Issue</h3>
                <p style="margin-bottom: 15px;">
                    <strong>To fix this:</strong>
                </p>
                <ol style="text-align: left; margin-bottom: 20px; padding-left: 20px;">
                    <li>Close <strong>all other apps</strong> (especially messaging apps)</li>
                    <li>Go to <strong>Settings → Apps → Special app access → Display over other apps</strong></li>
                    <li>Disable overlays for apps like Facebook Messenger, WhatsApp, etc.</li>
                    <li>Return here and tap the button again</li>
                </ol>
                <button onclick="document.getElementById('androidOverlayWarning').remove()" 
                        style="
                            background: #002fff;
                            color: white;
                            border: none;
                            padding: 10px 20px;
                            border-radius: 8px;
                            font-weight: bold;
                            cursor: pointer;
                        ">
                    I've closed overlays
                </button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', warningHTML);
}

// ======== EMERGENCY SKIP MICROPHONE BUTTON ========
function showSkipMicOption() {
    // Check if button already exists
    let skipBtn = document.getElementById('skipMicBtn');
    
    if (!skipBtn) {
        // Create emergency button
        skipBtn = document.createElement('button');
        skipBtn.id = 'skipMicBtn';
        skipBtn.className = 'ai-action-btn ai-emergency-btn';
        skipBtn.innerHTML = '⚠️ Skip Microphone (Text Chat Only)';
        skipBtn.style.cssText = `
            background: linear-gradient(135deg, #ff9900 0%, #cc6600 100%) !important;
            color: white !important;
            margin-top: 10px;
            display: block !important;
        `;
        
        // Add to button container
        const buttonContainer = document.querySelector('.ai-action-buttons');
        if (buttonContainer) {
            buttonContainer.appendChild(skipBtn);
        }
        
        // Add click handler
        skipBtn.addEventListener('click', function() {
            const url = `https://smartaivoicebot.netlify.app/voice-chat-fusion-instant?autoStartVoice=true&micPermissionGranted=false&textOnly=true`;
            window.open(url, '_blank');
            document.getElementById('mobilewiseAIWidget').classList.remove('visible');
        });
    }
    
    // Make it visible
    skipBtn.style.display = 'block';
}

// ======== VIDEO FREEZE FUNCTION ========
function setupVideoFreeze() {
    setTimeout(() => {
        const video = document.querySelector('.ai-video, .ai-video-container video, [class*="ai"] video');
        
        if (video) {
            console.log('🎥 Found video:', video);
            video.removeAttribute('loop');
            video.loop = false;
            
            video.addEventListener('ended', () => {
                console.log('❄️ Freezing video...');
                video.pause();
                video.classList.add('video-frozen');
            });
            
            const style = document.createElement('style');
            style.textContent = `
                .video-frozen {
                    filter: brightness(0.98) !important;
                    animation: none !important;
                }
            `;
            document.head.appendChild(style);
        }
    }, 3000);
}

// ======== CLOSE OVERLAY FUNCTION ========
function closeOverlay() {
    const overlay = document.getElementById('voiceChatOverlay');
    const iframe = document.getElementById('voiceChatIframe');
    
    overlay.classList.remove('active');
    
    setTimeout(() => {
        iframe.src = '';
        document.getElementById('mobilewiseAIWidget').classList.add('visible');
    }, 300);
}

// ======== EVENT LISTENERS ========
document.getElementById('closeVoiceChat').addEventListener('click', closeOverlay);

document.getElementById('voiceChatOverlay').addEventListener('click', function(e) {
    if (e.target.id === 'voiceChatOverlay') {
        closeOverlay();
    }
});

document.getElementById('justBrowsingBtn').addEventListener('click', function() {
    console.log('👉 Just Browsing clicked');
    document.getElementById('mobilewiseAIWidget').classList.remove('visible');
    sessionStorage.setItem('userBrowsing', 'true');
});

// Run video freeze
setupVideoFreeze();

console.log('✅ MobileWise AI Widget loaded (FIXED VERSION)');
})();