// ============================================
// HYBRID WIDGET - MOBILE NEW TAB + DESKTOP OVERLAY
// COMPLETE WITH 800x600 ASPECT RATIO
// ============================================

(function() {
    console.log('🚀 Hybrid Widget Loading (Mobile-NewTab / Desktop-Overlay)...');
    
    // CONFIG
    const config = {
        voiceChatUrl: 'https://mobilewise.netlify.app/voice-chat-fusion-instant',
        videoUrl: 'https://odetjszursuaxpapfwcy.supabase.co/storage/v1/object/public/video-avatars/video_avatar_1764286430873.mp4',
        overlayImageUrl: 'https://odetjszursuaxpapfwcy.supabase.co/storage/v1/object/public/form-assets/logos/logo_5f42f026-051a-42c7-833d-375fcac74252_1764359060407_player3.png'
    };
    
    // Detect device type
    const isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i.test(navigator.userAgent);
    const isDesktop = !isMobile && window.innerWidth > 768;
    
    console.log(`📱 Device: ${isMobile ? 'Mobile' : isDesktop ? 'Desktop' : 'Tablet'}`);
    
    // ======== COMPLETE MOBILE-FRIENDLY CSS ========
    const style = document.createElement('style');
    style.textContent = `
        /* MOBILEWISE AI WIDGET - BOTTOM RIGHT */
        #mobilewiseAIWidget {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 320px;
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
            top: 120px;
            left: 40px;
            width: 240px;
            height: 140px;
            border-radius: 10px;
            overflow: hidden;
            background: black;
            z-index: 1;
        }
        
        .ai-video-container video {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .video-frozen {
            filter: brightness(0.98);
        }
        
        /* Text */
        .ai-text-container {
            position: absolute;
            bottom: 145px;
            left: 20px;
            right: 20px;
            text-align: center;
            z-index: 3;
        }
        
        .ai-text {
            background: rgba(0, 0, 0, 0.85);
            color: white;
            padding: 12px 15px;
            border-radius: 10px;
            font-size: 14px;
            min-height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            line-height: 1.4;
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
            bottom: 70px;
            left: 20px;
            right: 20px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            z-index: 3;
        }
        
        .ai-action-btn {
            padding: 13px;
            border: none;
            border-radius: 10px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            text-align: center;
        }
        
        .ai-primary-btn {
            background: linear-gradient(135deg, #002fff 0%, #060a1c 100%);
            color: white;
            box-shadow: 0 4px 15px rgba(0,47,255,0.3);
        }
        
        .ai-secondary-btn {
            background: white;
            color: #333;
            border: 2px solid #002fff;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        
        .ai-primary-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,47,255,0.4);
        }
        
        .ai-secondary-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.1);
            background: white;
            color: #333;
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
        
        /* ===== DESKTOP OVERLAY - 800x600 ASPECT RATIO ===== */
        #voiceChatOverlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 20000;
            display: none;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        
        #voiceChatOverlay.active {
            display: flex;
            opacity: 1;
        }
        
        #voiceChatContainer {
            width: 90%;
            max-width: 800px;
            height: 0; /* For aspect ratio */
            padding-bottom: 75%; /* 600/800 = 0.75 (4:3 aspect ratio) */
            background: white;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            position: relative;
        }
        
        #voiceChatIframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
            display: block;
        }
        
        .close-voice-chat {
            position: absolute;
            top: 15px;
            right: 15px;
            background: rgba(0,0,0,0.7);
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
            background: rgba(255,0,0,0.8);
        }
        
        /* ===== MOBILE OVERLAY - FULL SCREEN ===== */
        @media (max-width: 768px) {
            #mobilewiseAIWidget {
                width: 300px;
                height: 400px;
                right: 10px;
                bottom: 10px;
            }
            
            .ai-video-container {
                width: 220px;
                left: 40px;
                top: 110px;
            }
            
            /* Mobile overlay adjustments */
            #voiceChatContainer {
                width: 100%;
                height: 100vh; /* Full screen on mobile */
                padding-bottom: 0; /* Override aspect ratio */
                max-width: none;
                border-radius: 0;
            }
            
            #voiceChatIframe {
                height: 100vh;
            }
            
            .close-voice-chat {
                top: 10px;
                right: 10px;
                background: rgba(255,0,0,0.8);
            }
        }
        
        /* Small mobile adjustments */
        @media (max-width: 480px) {
            #mobilewiseAIWidget {
                width: 280px;
                right: 5px;
                bottom: 5px;
            }
            
            .ai-video-container {
                width: 200px;
                left: 40px;
            }
        }
    `;
    document.head.appendChild(style);
    
    // ======== INJECT HTML ========
    const widgetHTML = `
    <div id="mobilewiseAIWidget">
        <div class="ai-video-container">
            <video autoplay muted playsinline id="avatarVideo">
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
    
    <!-- DESKTOP OVERLAY (injected only on desktop) -->
    ${isDesktop ? `
    <div id="voiceChatOverlay">
        <div id="voiceChatContainer">
            <button class="close-voice-chat" id="closeVoiceChat">×</button>
            <iframe id="voiceChatIframe" 
                    allow="microphone; camera"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups">
            </iframe>
        </div>
    </div>
    ` : ''}
    `;
    
    document.body.insertAdjacentHTML('beforeend', widgetHTML);
    
    // ======== MAIN FUNCTIONALITY ========
    
    // Show widget
    setTimeout(() => {
        document.getElementById('mobilewiseAIWidget').classList.add('visible');
        setTimeout(() => {
            const aiMessage = document.getElementById('aiMessage');
            typeText(aiMessage, "Hi! I'm Botimia your Personal AI Assistant. How can I help you?");
        }, 500);
    }, 1000);
    
    // Typing animation function
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
    
    // Freeze video at end
    document.getElementById('avatarVideo').addEventListener('ended', function() {
        this.pause();
        this.classList.add('video-frozen');
    });
    
    // ======== HYBRID CLICK HANDLER ========
    document.getElementById('getAssistanceBtn').addEventListener('click', async function() {
        console.log(`🎤 Hybrid click: ${isMobile ? 'Mobile (new tab)' : 'Desktop (overlay)'}`);
        
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
            
            localStorage.setItem('micPermissionGranted', 'true');
            sessionStorage.setItem('startingChat', 'true');
            
            // 2. Generate URL
            const timestamp = Date.now();
            const url = `${config.voiceChatUrl}?autoStartVoice=true&micPermissionGranted=true&gestureInitiated=true&timestamp=${timestamp}&source=hybrid-widget&device=${isMobile ? 'mobile' : 'desktop'}`;
            
            console.log('🔗 Generated URL:', url);
            
            this.innerHTML = '✅ Opening...';
            document.getElementById('mobilewiseAIWidget').classList.remove('visible');
            
            // 3. HYBRID DECISION
            if (isMobile) {
                // MOBILE: Open in new tab
                console.log('📱 Mobile → Opening new tab');
                const newTab = window.open(url, '_blank', 'noopener,noreferrer');
                
                if (!newTab) {
                    // Fallback for popup blockers
                    window.location.href = url;
                }
                
                // Show widget again after 4 seconds
                setTimeout(() => {
                    document.getElementById('mobilewiseAIWidget').classList.add('visible');
                }, 4000);
                
            } else {
                // DESKTOP: Open in overlay
                console.log('🖥️ Desktop → Opening overlay');
                await new Promise(resolve => setTimeout(resolve, 500));
                
                const iframe = document.getElementById('voiceChatIframe');
                const overlay = document.getElementById('voiceChatOverlay');
                
                if (iframe && overlay) {
                    setTimeout(() => {
                        iframe.src = url;
                        overlay.classList.add('active');
                        
                        // Setup close handlers
                        setupOverlayClose();
                    }, 300);
                } else {
                    // Fallback to new tab
                    window.open(url, '_blank');
                }
            }
            
            // Reset button
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 1500);
            
        } catch (error) {
            console.error('❌ Microphone error:', error);
            
            // Open without mic permission
            const url = `${config.voiceChatUrl}?autoStartVoice=true&micPermissionGranted=false&gestureInitiated=true&source=hybrid-widget`;
            
            if (isMobile) {
                window.open(url, '_blank');
            } else if (document.getElementById('voiceChatOverlay')) {
                const iframe = document.getElementById('voiceChatIframe');
                const overlay = document.getElementById('voiceChatOverlay');
                iframe.src = url;
                overlay.classList.add('active');
                setupOverlayClose();
            } else {
                window.open(url, '_blank');
            }
            
            // Show widget again after 3 seconds
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                document.getElementById('mobilewiseAIWidget').classList.add('visible');
            }, 3000);
        }
    });
    
    // Overlay close setup function
    function setupOverlayClose() {
        const overlay = document.getElementById('voiceChatOverlay');
        const iframe = document.getElementById('voiceChatIframe');
        
        // Close button
        document.getElementById('closeVoiceChat').onclick = function() {
            overlay.classList.remove('active');
            setTimeout(() => {
                iframe.src = '';
                document.getElementById('mobilewiseAIWidget').classList.add('visible');
            }, 300);
        };
        
        // Click outside to close
        overlay.onclick = function(e) {
            if (e.target === overlay) {
                overlay.classList.remove('active');
                setTimeout(() => {
                    iframe.src = '';
                    document.getElementById('mobilewiseAIWidget').classList.add('visible');
                }, 300);
            }
        };
        
        // ESC key to close
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape' && overlay.classList.contains('active')) {
                overlay.classList.remove('active');
                setTimeout(() => {
                    iframe.src = '';
                    document.getElementById('mobilewiseAIWidget').classList.add('visible');
                }, 300);
                document.removeEventListener('keydown', escHandler);
            }
        });
    }
    
    // Just Browsing button
    document.getElementById('justBrowsingBtn').addEventListener('click', function() {
        document.getElementById('mobilewiseAIWidget').classList.remove('visible');
        sessionStorage.setItem('userBrowsing', 'true');
    });
    
    console.log('✅ Complete Hybrid Widget Loaded');
})();