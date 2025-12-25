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
       /* ======== MOBILEWISE AI WIDGET - PERFECTED VERSION ======== */
#mobilewiseAIWidget {
    position: fixed;
    bottom: 0px;  /* Start at bottom */
    right: 20px;
    width: 400px;  /* WIDER: 400px exactly */
    height: 445px; /* HEIGHT: 445px exactly (400x445 ratio) */
    z-index: 10000;
    transform: translateY(120px); /* Start further down */
    opacity: 0;
    pointer-events: none;
    transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                opacity 0.8s ease,
                bottom 0.3s ease; /* Smooth bottom adjustment */
}

#mobilewiseAIWidget.visible {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
    bottom: 40px; /* COMES DOWN 20px MORE when settled */
}

/* ===== VIDEO CONTAINER - PERFECTED ===== */
.ai-video-container {
    position: absolute;
    top: 100px; /* LOWERED: Was 120px, now 100px */
    left: 50px; /* CENTERED BETTER: Was 40px, now 50px */
    width: 300px; /* WIDER: Was 240px, now 300px */
    height: 175px; /* TALLER: Was 140px, now 175px (400x445 ratio) */
    border-radius: 12px; /* Slightly larger radius */
    overflow: hidden;
    background: black;
    z-index: 1;
    box-shadow: 0 8px 25px rgba(0,0,0,0.4); /* Better shadow */
}

.ai-video-container video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
}

/* ===== TEXT CONTAINER - ADJUSTED ===== */
.ai-text-container {
    position: absolute;
    bottom: 155px; /* LOWERED: Was 145px, now 155px */
    left: 25px;    /* BETTER MARGINS */
    right: 25px;
    text-align: center;
    z-index: 3;
}

.ai-text {
    background: rgba(0, 0, 0, 0.9); /* Darker for better contrast */
    color: white;
    padding: 14px 18px; /* More padding */
    border-radius: 12px;
    font-size: 14.5px; /* Slightly larger */
    min-height: 70px;   /* Taller: Was 60px */
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 6px 20px rgba(0,0,0,0.4);
    line-height: 1.5;   /* Better line spacing */
    backdrop-filter: blur(10px); /* Glass effect */
}

/* ===== BUTTONS - HEIGHT FIXED ===== */
.ai-action-buttons {
    position: absolute;
    bottom: 80px; /* LOWERED: Was 70px, now 80px */
    left: 25px;   /* Better margins */
    right: 25px;
    display: flex;
    flex-direction: column;
    gap: 10px;    /* More spacing */
    z-index: 3;
}

.ai-action-btn {
    padding: 16px !important; /* TALLER: Was 13px, now 16px */
    border: none;
    border-radius: 12px; /* Larger radius */
    font-size: 16px;     /* Slightly larger text */
    font-weight: 700;    /* Bolder */
    cursor: pointer;
    transition: all 0.3s;
    text-align: center;
    height: 52px;        /* FIXED HEIGHT */
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.ai-primary-btn {
    background: linear-gradient(135deg, #002fff 0%, #060a1c 100%);
    color: white;
    box-shadow: 0 6px 20px rgba(0,47,255,0.4);
    border: 2px solid rgba(255,255,255,0.1);
}

.ai-secondary-btn {
    background: white;
    color: #333;
    border: 2px solid #002fff;
    box-shadow: 0 4px 15px rgba(0,0,0,0.15);
}

.ai-primary-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0,47,255,0.5);
}

.ai-secondary-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    background: #f8f9fa;
}

/* ===== OVERLAY IMAGE - ADJUSTED ===== */
.ai-overlay-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    border-radius: 20px; /* Larger radius */
    z-index: 2;
    filter: brightness(1.05) contrast(1.1);
}

/* ===== VOICE CHAT OVERLAY - IMPROVED ===== */
#voiceChatOverlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.92); /* Darker */
    z-index: 20000;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s ease, visibility 0.4s;
    padding: 20px;
    backdrop-filter: blur(10px); /* Blur background */
}

#voiceChatContainer {
    width: 92%;
    max-width: 1100px; /* Wider */
    height: 85vh; /* Taller */
    min-height: 600px;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); /* Dark theme */
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 30px 60px rgba(0,0,0,0.6);
    position: relative;
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(255,255,255,0.1);
}

/* ===== MOBILE RESPONSIVE - PERFECTED ===== */
@media (max-width: 768px) {
    #mobilewiseAIWidget {
        width: 350px;   /* Wider on mobile */
        height: 420px;  /* Proportional */
        right: 50%;
        transform: translateX(50%) translateY(120px); /* Center horizontally */
        bottom: 10px;
    }
    
    #mobilewiseAIWidget.visible {
        transform: translateX(50%) translateY(0);
        bottom: 30px; /* Comes down on mobile too */
    }
    
    .ai-video-container {
        width: 260px;   /* Proportional */
        height: 150px;
        left: 45px;
        top: 90px;
    }
    
    .ai-text-container {
        bottom: 140px;
        left: 20px;
        right: 20px;
    }
    
    .ai-action-buttons {
        bottom: 70px;
        left: 20px;
        right: 20px;
    }
    
    .ai-action-btn {
        padding: 14px !important;
        height: 48px;
        font-size: 15px;
    }
    
    #voiceChatContainer {
        width: 100%;
        height: 100vh;
        max-width: none;
        border-radius: 0;
    }
}

/* ===== SMALL MOBILE ===== */
@media (max-width: 480px) {
    #mobilewiseAIWidget {
        width: 320px;
        height: 400px;
        bottom: 5px;
    }
    
    #mobilewiseAIWidget.visible {
        bottom: 25px;
    }
    
    .ai-video-container {
        width: 240px;
        height: 140px;
        left: 40px;
        top: 85px;
    }
    
    .ai-text {
        font-size: 13.5px;
        min-height: 65px;
        padding: 12px 15px;
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
    
    // ======== FUNCTIONALITY ========
    
    // Video loop
    const video = document.getElementById('avatarVideo');
    video.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    });
    
    // Typing animation
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