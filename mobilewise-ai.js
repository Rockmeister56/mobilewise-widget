// ============================================
// HYBRID WIDGET - MOBILE (NEW TAB) + DESKTOP (OVERLAY)
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
    
    console.log(`📱 Device detected: ${isMobile ? 'Mobile' : isDesktop ? 'Desktop' : 'Tablet'}`);
    
    // ======== INJECT CSS ========
    const style = document.createElement('style');
    style.textContent = `
        /* Widget styles (same as before) */
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
        
        /* DESKTOP OVERLAY STYLES */
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
            height: 80vh;
            background: white;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            position: relative;
        }
        
        #voiceChatIframe {
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
        }
        
        /* Mobile overlay adjustments */
        @media (max-width: 768px) {
            #voiceChatContainer {
                width: 100%;
                height: 100vh;
                border-radius: 0;
                max-width: none;
            }
            
            .close-voice-chat {
                top: 10px;
                right: 10px;
                background: rgba(255,0,0,0.8);
            }
        }
        
        /* ... rest of your widget CSS ... */
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
    
    <!-- DESKTOP OVERLAY (only injected on desktop) -->
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
            aiMessage.innerHTML = "Hi! I'm Botimia your Personal AI Assistant. How can I help you?";
        }, 500);
    }, 1000);
    
    // ======== HYBRID CLICK HANDLER ========
    document.getElementById('getAssistanceBtn').addEventListener('click', async function() {
        console.log(`🎤 Hybrid click: ${isMobile ? 'Mobile (new tab)' : 'Desktop (overlay)'}`);
        
        const originalText = this.innerHTML;
        this.innerHTML = '🎤 Getting microphone...';
        this.disabled = true;
        
        try {
            // 1. Get microphone permission (works for both)
            const stream = await navigator.mediaDevices.getUserMedia({ 
                audio: { echoCancellation: true, noiseSuppression: true }
            });
            stream.getTracks().forEach(track => track.stop());
            
            localStorage.setItem('micPermissionGranted', 'true');
            sessionStorage.setItem('startingChat', 'true');
            
            // 2. Generate URL with parameters
            const timestamp = Date.now();
            const url = `${config.voiceChatUrl}?autoStartVoice=true&micPermissionGranted=true&gestureInitiated=true&timestamp=${timestamp}&source=hybrid-widget&device=${isMobile ? 'mobile' : 'desktop'}`;
            
            console.log('🔗 Generated URL:', url);
            
            this.innerHTML = '✅ Opening...';
            document.getElementById('mobilewiseAIWidget').classList.remove('visible');
            
            // 3. HYBRID DECISION: Mobile vs Desktop
            if (isMobile) {
                // MOBILE: Open in new tab (reliable)
                console.log('📱 Mobile detected → Opening new tab');
                const newTab = window.open(url, '_blank', 'noopener,noreferrer');
                
                if (!newTab) {
                    // Fallback for popup blockers
                    window.location.href = url;
                }
                
            } else {
                // DESKTOP: Open in overlay
                console.log('🖥️ Desktop detected → Opening overlay');
                await new Promise(resolve => setTimeout(resolve, 500));
                
                const iframe = document.getElementById('voiceChatIframe');
                const overlay = document.getElementById('voiceChatOverlay');
                
                if (iframe && overlay) {
                    // Load with slight delay for smooth transition
                    setTimeout(() => {
                        iframe.src = url;
                        overlay.classList.add('active');
                        
                        // Add close handlers
                        document.getElementById('closeVoiceChat').onclick = closeOverlay;
                        overlay.onclick = function(e) {
                            if (e.target === overlay) closeOverlay();
                        };
                        
                        // ESC key to close
                        document.addEventListener('keydown', function escHandler(e) {
                            if (e.key === 'Escape') {
                                closeOverlay();
                                document.removeEventListener('keydown', escHandler);
                            }
                        });
                    }, 300);
                } else {
                    // Fallback to new tab if overlay fails
                    window.open(url, '_blank');
                }
            }
            
            // 4. Reset button
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                // Show widget again after delay
                setTimeout(() => {
                    if (!document.querySelector('#voiceChatOverlay.active')) {
                        document.getElementById('mobilewiseAIWidget').classList.add('visible');
                    }
                }, 3000);
            }, 1500);
            
        } catch (error) {
            console.error('❌ Microphone error:', error);
            
            // Open without mic permission
            const url = `${config.voiceChatUrl}?autoStartVoice=true&micPermissionGranted=false&gestureInitiated=true&source=hybrid-widget`;
            
            if (isMobile) {
                window.open(url, '_blank');
            } else if (document.getElementById('voiceChatOverlay')) {
                document.getElementById('voiceChatIframe').src = url;
                document.getElementById('voiceChatOverlay').classList.add('active');
            } else {
                window.open(url, '_blank');
            }
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                document.getElementById('mobilewiseAIWidget').classList.add('visible');
            }, 3000);
        }
    });
    
    // Overlay close function
    function closeOverlay() {
        const overlay = document.getElementById('voiceChatOverlay');
        const iframe = document.getElementById('voiceChatIframe');
        
        overlay.classList.remove('active');
        
        setTimeout(() => {
            iframe.src = '';
            document.getElementById('mobilewiseAIWidget').classList.add('visible');
        }, 300);
    }
    
    // Just Browsing button
    document.getElementById('justBrowsingBtn').addEventListener('click', function() {
        document.getElementById('mobilewiseAIWidget').classList.remove('visible');
        sessionStorage.setItem('userBrowsing', 'true');
    });
    
    console.log('✅ Hybrid Widget Loaded');
})();