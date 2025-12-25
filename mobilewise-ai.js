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
       /* ======== MOBILEWISE AI WIDGET - PRECISE POSITIONING ======== */
#mobilewiseAIWidget {
    position: fixed;
    bottom: 0px;  /* Start at absolute bottom */
    right: 20px;
    width: 400px;
    height: 445px;
    z-index: 10000;
    transform: translateY(120px);
    opacity: 0;
    pointer-events: none;
    transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                opacity 0.8s ease;
}

#mobilewiseAIWidget.visible {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
    bottom: 0px !important; /* FORCE to bottom - NO GAP */
}

/* ===== VIDEO CONTAINER - KEEP AS IS ===== */
.ai-video-container {
    position: absolute;
    top: 100px;
    left: 50px;
    width: 300px;
    height: 175px;
    border-radius: 12px;
    overflow: hidden;
    background: black;
    z-index: 1;
    box-shadow: 0 8px 25px rgba(0,0,0,0.4);
}

/* ===== TEXT CONTAINER - 40% SMALLER & 20px LOWER ===== */
.ai-text-container {
    position: absolute;
    bottom: 175px; /* LOWERED 20px: Was 155px, now 175px */
    left: 40px;    /* WIDER MARGINS for smaller container */
    right: 40px;
    text-align: center;
    z-index: 3;
}

.ai-text {
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 10px 14px; /* SMALLER PADDING: Was 14px 18px */
    border-radius: 10px; /* Slightly smaller radius */
    font-size: 13.5px;   /* SMALLER TEXT: Was 14.5px */
    min-height: 55px;    /* 40% SMALLER: Was 70px (55 is ~21% smaller, adjust as needed) */
    max-height: 55px;    /* FIXED HEIGHT */
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 15px rgba(0,0,0,0.4);
    line-height: 1.4;
    backdrop-filter: blur(10px);
    overflow: hidden; /* Prevent text overflow */
}

/* ===== BUTTONS - 20% SMALLER & 30px LOWER ===== */
.ai-action-buttons {
    position: absolute;
    bottom: 110px; /* LOWERED 30px: Was 80px, now 110px */
    left: 40px;    /* Align with text container */
    right: 40px;
    display: flex;
    flex-direction: column;
    gap: 8px;      /* Tighter gap for smaller buttons */
    z-index: 3;
}

.ai-action-btn {
    padding: 12px !important; /* 20% SMALLER: Was 16px, now 12px */
    border: none;
    border-radius: 10px;      /* Slightly smaller radius */
    font-size: 14px;          /* SMALLER TEXT: Was 16px */
    font-weight: 600;         /* Slightly less bold */
    cursor: pointer;
    transition: all 0.3s;
    text-align: center;
    height: 42px;             /* 20% SMALLER: Was 52px, now 42px */
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: 100%;              /* Full width of container */
}

/* Button-specific adjustments */
.ai-primary-btn {
    background: linear-gradient(135deg, #002fff 0%, #060a1c 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(0,47,255,0.4); /* Smaller shadow */
    border: 1px solid rgba(255,255,255,0.1);
}

.ai-secondary-btn {
    background: white;
    color: #333;
    border: 1px solid #002fff; /* Thinner border */
    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
}

.ai-primary-btn:hover {
    transform: translateY(-2px); /* Smaller hover lift */
    box-shadow: 0 6px 18px rgba(0,47,255,0.5);
}

.ai-secondary-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(0,0,0,0.15);
    background: #f8f9fa;
}

/* ===== FORCE BOTTOM POSITIONING - NO GAP ===== */
body.has-mobilewise-widget {
    margin-bottom: 0 !important;
    padding-bottom: 0 !important;
}

/* Add this if there's still a gap */
#mobilewiseAIWidget::after {
    content: '';
    position: absolute;
    bottom: -1px; /* Cover any remaining gap */
    left: 0;
    width: 100%;
    height: 1px;
    background: transparent;
}

/* ===== MOBILE ADJUSTMENTS - PROPORTIONAL ===== */
@media (max-width: 768px) {
    #mobilewiseAIWidget {
        width: 350px;
        height: 420px;
        right: 50%;
        transform: translateX(50%) translateY(120px);
        bottom: 0px; /* Start at bottom on mobile */
    }
    
    #mobilewiseAIWidget.visible {
        transform: translateX(50%) translateY(0);
        bottom: 0px !important; /* FORCE to bottom */
    }
    
    .ai-video-container {
        width: 260px;
        height: 150px;
        left: 45px;
        top: 90px;
    }
    
    .ai-text-container {
        bottom: 160px; /* Adjusted proportionally */
        left: 35px;
        right: 35px;
    }
    
    .ai-text {
        padding: 9px 12px;
        font-size: 12.5px;
        min-height: 50px;
        max-height: 50px;
    }
    
    .ai-action-buttons {
        bottom: 100px; /* Adjusted proportionally */
        left: 35px;
        right: 35px;
    }
    
    .ai-action-btn {
        padding: 10px !important;
        height: 38px;
        font-size: 13px;
        border-radius: 8px;
    }
}

/* ===== SMALL MOBILE - FURTHER ADJUSTMENTS ===== */
@media (max-width: 480px) {
    #mobilewiseAIWidget {
        width: 320px;
        height: 400px;
        bottom: 0px;
    }
    
    #mobilewiseAIWidget.visible {
        bottom: 0px !important;
    }
    
    .ai-video-container {
        width: 240px;
        height: 140px;
        left: 40px;
        top: 85px;
    }
    
    .ai-text-container {
        bottom: 150px;
        left: 30px;
        right: 30px;
    }
    
    .ai-text {
        font-size: 12px;
        min-height: 45px;
        max-height: 45px;
        padding: 8px 10px;
    }
    
    .ai-action-buttons {
        bottom: 90px;
        left: 30px;
        right: 30px;
    }
    
    .ai-action-btn {
        padding: 8px !important;
        height: 36px;
        font-size: 12.5px;
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