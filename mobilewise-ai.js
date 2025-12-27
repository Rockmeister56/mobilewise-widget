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
        width: 92vw;
        max-width: 350px;
        height: 440px;
        bottom: 4px;                     /* ↓ Lowered by ~7px from 15px */
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

    /* Video container - lowered */
    .ai-video-container {
        width: 85%;
        height: 160px;
        left: 50%;
        top: 127px;                      /* ↓ Lowered by 7px from 100px */
        transform: translateX(-50%);
        border-radius: 10px;
    }

    /* Text container - lowered */
    .ai-text-container {
        bottom: 137px;                   /* ↓ Lowered by 7px from 130px */
        left: 20px;
        right: 20px;
    }

    .ai-text {
        font-size: 14px;                 /* Slightly smaller */
        padding: 10px 14px !important;   /* Tighter padding */
        min-height: 44px;
        max-height: 44px;
    }

    /* Buttons - 20% smaller and lowered */
    .ai-action-buttons {
        bottom: 10px;                    /* ↓ Lowered by 10px from 20px */
        left: 25px;
        right: 25px;
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
    
    // ======== GET AI ASSISTANCE - FIXED OVERLAY ========
    document.getElementById('getAssistanceBtn').addEventListener('click', async function() {
        console.log('🎤 Opening AI Voice Assistant as overlay...');
        
        const originalText = this.innerHTML;
        this.innerHTML = '🎤 Getting microphone...';
        this.disabled = true;
        
        try {
            // 1. Get microphone permission
            const stream = await navigator.mediaDevices.getUserMedia({ 
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true
                } 
            });
            
            stream.getTracks().forEach(track => track.stop());
            console.log('✅ Microphone permission granted');
            
            // 2. Generate parameters - USE OLD FORMAT FROM WORKING VERSION
            const timestamp = Date.now();
            
            // CRITICAL FIX: Use the OLD URL format that works
            const url = `${config.voiceChatUrl}?autoStartVoice=true&micPermissionGranted=true&gestureInitiated=true&timestamp=${timestamp}&source=mobilewise-widget`;
            
            console.log('🔗 Generated URL:', url);
            
            // 3. Update button
            this.innerHTML = '✅ Opening voice chat...';
            
            // 4. Hide widget
            document.getElementById('mobilewiseAIWidget').classList.remove('visible');
            
            // 5. Set iframe source and show overlay
            setTimeout(() => {
                const iframe = document.getElementById('voiceChatIframe');
                const overlay = document.getElementById('voiceChatOverlay');
                
                console.log('📦 Loading iframe with URL...');
                
                // CRITICAL: Set iframe src (don't use base64 encoding)
                iframe.src = url;
                overlay.classList.add('active');
                
                // Send parameters via postMessage as backup
                setTimeout(() => {
                    try {
                        iframe.contentWindow.postMessage({
                            type: 'VOICE_CHAT_PARAMS',
                            params: {
                                autoStartVoice: 'true',
                                micPermissionGranted: 'true',
                                gestureInitiated: 'true',
                                timestamp: timestamp,
                                source: 'mobilewise-widget'
                            }
                        }, '*');
                        console.log('📨 Sent params via postMessage');
                    } catch (e) {
                        console.log('⚠️ Could not send postMessage:', e.message);
                    }
                }, 1000);
                
                // Escape key to close
                document.addEventListener('keydown', function closeOnEscape(e) {
                    if (e.key === 'Escape') {
                        closeOverlay();
                        document.removeEventListener('keydown', closeOnEscape);
                    }
                });
            }, 500);
            
            // 6. Reset button
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 1500);
            
        } catch (error) {
            console.error('❌ Microphone permission denied:', error);
            
            // Open without mic
            this.innerHTML = '⚠️ Opening without mic...';
            
            // Use simple URL format
            const url = `${config.voiceChatUrl}?autoStartVoice=true&micPermissionGranted=false&gestureInitiated=true&source=mobilewise-widget`;
            
            // Show overlay with iframe
            setTimeout(() => {
                const iframe = document.getElementById('voiceChatIframe');
                const overlay = document.getElementById('voiceChatOverlay');
                
                iframe.src = url;
                overlay.classList.add('active');
            }, 500);
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 3000);
        }
    });

    // VIDEO FREEZE FUNCTION - Add this to your widget JavaScript
function setupVideoFreeze() {
    // Wait for widget to load
    setTimeout(() => {
        // Find the AI video
        const video = document.querySelector('.ai-video, .ai-video-container video, [class*="ai"] video');
        
        if (video) {
            console.log('🎥 Found video:', video);
            
            // 1. Disable HTML loop attribute
            video.removeAttribute('loop');
            video.loop = false;
            
            // 2. Add freeze on end
            video.addEventListener('ended', () => {
                console.log('❄️ Freezing video...');
                video.pause();
                video.classList.add('video-frozen');
            });
            
            // 3. Optional: Add visual freeze style
            const style = document.createElement('style');
            style.textContent = `
                .video-frozen {
                    filter: brightness(0.98) !important;
                    animation: none !important;
                }
            `;
            document.head.appendChild(style);
            
            console.log('✅ Video freeze configured');
        } else {
            console.warn('⚠️ No video found for freezing');
        }
    }, 3000); // Wait 3 seconds for everything to load
}

// Run it
setupVideoFreeze();
    
    // Close overlay function
    function closeOverlay() {
        const overlay = document.getElementById('voiceChatOverlay');
        const iframe = document.getElementById('voiceChatIframe');
        
        overlay.classList.remove('active');
        
        setTimeout(() => {
            iframe.src = '';
            document.getElementById('mobilewiseAIWidget').classList.add('visible');
        }, 300);
    }
    
    // ======== CLOSE VOICE CHAT OVERLAY ========
    document.getElementById('closeVoiceChat').addEventListener('click', closeOverlay);
    
    // Close when clicking outside
    document.getElementById('voiceChatOverlay').addEventListener('click', function(e) {
        if (e.target.id === 'voiceChatOverlay') {
            closeOverlay();
        }
    });
    
    // Just Browsing
    document.getElementById('justBrowsingBtn').addEventListener('click', function() {
        console.log('👉 Just Browsing clicked');
        document.getElementById('mobilewiseAIWidget').classList.remove('visible');
        sessionStorage.setItem('userBrowsing', 'true');
    });
    
    console.log('✅ MobileWise AI Widget loaded (FIXED OVERLAY version)');
})();