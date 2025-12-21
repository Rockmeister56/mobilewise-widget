// ============================================
// MOBILEWISE AI WIDGET - NEW TAB SOLUTION
// ============================================

(function() {
    console.log('🚀 MobileWise AI Widget loading...');
    
    // ======== CONFIGURATION ========
    const config = {
        voiceChatUrl: 'https://mobilewise.netlify.app/voice-chat-fusion-instant',
        videoUrl: 'https://odetjszursuaxpapfwcy.supabase.co/storage/v1/object/public/video-avatars/video_avatar_1764286430873.mp4',
        overlayImageUrl: 'https://odetjszursuaxpapfwcy.supabase.co/storage/v1/object/public/form-assets/logos/logo_5f42f026-051a-42c7-833d-375fcac74252_1764359060407_player3.png'
    };
    
    // ======== ADD STYLES ========
    const style = document.createElement('style');
    style.textContent = `
        /* MOBILEWISE AI WIDGET */
        #mobilewiseAIWidget {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 400px;
            height: 430px;
            z-index: 10000;
            transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transform: translateY(100px);
            opacity: 0;
        }
        
        #mobilewiseAIWidget.show {
            transform: translateY(0);
            opacity: 1;
        }
        
        /* VIDEO - Behind overlay */
        .ai-video-container {
            position: absolute;
            top: 100px;
            left: 60px;
            width: 280px;
            height: 160px;
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
        
        /* TEXT - ABOVE overlay */
        .ai-text-container {
            position: absolute;
            bottom: 145px;
            left: 40px;
            right: 40px;
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
        
        /* BUTTONS - ABOVE overlay */
        .ai-action-buttons {
            position: absolute;
            bottom: 70px;
            left: 40px;
            right: 40px;
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
        
        .play-icon {
            margin-left: 8px;
            animation: blinkPlay 2s infinite;
            display: inline-block;
        }
        
        @keyframes blinkPlay {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0.3; }
        }
        
        /* OVERLAY IMAGE */
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
        
        /* LOADING OVERLAY */
        #mobilewiseLoading {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.85);
            z-index: 9998;
            display: none;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            color: white;
            font-size: 20px;
            text-align: center;
        }
        
        .loading-spinner {
            width: 50px;
            height: 50px;
            border: 5px solid #f3f3f3;
            border-top: 5px solid #002fff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // ======== ADD HTML ========
    const html = `
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
        
        <!-- LOADING OVERLAY -->
        <div id="mobilewiseLoading">
            <div class="loading-spinner"></div>
            <div>Opening AI Voice Assistant...</div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', html);
    
    // ======== FUNCTIONALITY ========
    
    // Freeze video at end
    document.getElementById('avatarVideo').addEventListener('ended', function() {
        this.pause();
        this.classList.add('video-frozen');
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
    
    // Initialize
    setTimeout(() => {
        const aiWidget = document.getElementById('mobilewiseAIWidget');
        const getAssistanceBtn = document.getElementById('getAssistanceBtn');
        const justBrowsingBtn = document.getElementById('justBrowsingBtn');
        const aiMessage = document.getElementById('aiMessage');
        const loadingOverlay = document.getElementById('mobilewiseLoading');
        
        // Show widget
        aiWidget.classList.add('show');
        
        // Type greeting
        setTimeout(() => {
            typeText(aiMessage, "Hi! I'm Botimia your Personal AI Assistant. How can I help you?");
        }, 500);
        
        // ======== GET AI ASSISTANCE - NEW TAB VERSION ========
        getAssistanceBtn.addEventListener('click', async function() {
            console.log('🎤 Opening AI Voice Assistant (NEW TAB)...');
            
            const originalText = this.innerHTML;
            this.innerHTML = '🎤 Preparing...';
            this.disabled = true;
            
            try {
                // 1. Show loading overlay
                loadingOverlay.style.display = 'flex';
                
                // 2. Get microphone permission (user gesture)
                const stream = await navigator.mediaDevices.getUserMedia({ 
                    audio: {
                        echoCancellation: true,
                        noiseSuppression: true,
                        autoGainControl: true
                    } 
                });
                
                stream.getTracks().forEach(track => track.stop());
                console.log('✅ Microphone permission granted');
                
                // 3. Store permission
                localStorage.setItem('micPermissionGranted', 'true');
                sessionStorage.setItem('startingChat', 'true');
                
                // 4. Generate voice chat URL (EXACT same as your demo)
                const timestamp = Date.now();
                const voiceChatUrl = `${config.voiceChatUrl}?autoStartVoice=true&micPermissionGranted=true&gestureInitiated=true&timestamp=${timestamp}`;
                
                console.log('Opening URL:', voiceChatUrl);
                
                // 5. Hide widget
                aiWidget.classList.remove('show');
                
                // 6. Wait a moment for visual feedback
                await new Promise(resolve => setTimeout(resolve, 800));
                
                // 7. OPEN IN NEW TAB (not iframe) - THIS FIXES AUDIO
                const newTab = window.open(voiceChatUrl, '_blank');
                
                // 8. Hide loading overlay
                loadingOverlay.style.display = 'none';
                
                // 9. Reset button and show widget again after chat
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                    
                    // Show widget again after 3 seconds
                    setTimeout(() => {
                        aiWidget.classList.add('show');
                    }, 3000);
                }, 2000);
                
            } catch (error) {
                console.error('❌ Microphone permission denied:', error);
                
                // Still try without mic
                loadingOverlay.style.display = 'flex';
                this.innerHTML = '⚠️ Opening without mic...';
                
                const voiceChatUrl = `${config.voiceChatUrl}?autoStartVoice=true&mobilewiseMode=true&gestureInitiated=true`;
                
                aiWidget.classList.remove('show');
                
                setTimeout(() => {
                    window.open(voiceChatUrl, '_blank');
                    loadingOverlay.style.display = 'none';
                }, 800);
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                    aiWidget.classList.add('show');
                }, 3000);
            }
        });
        
        // Just Browsing
        justBrowsingBtn.addEventListener('click', function() {
            aiWidget.classList.remove('show');
            sessionStorage.setItem('userBrowsing', 'true');
        });
        
        // Session management
        const justFinishedChat = sessionStorage.getItem('justFinishedChat');
        const userBrowsing = sessionStorage.getItem('userBrowsing');
        
        if (justFinishedChat) {
            // User just finished chat - don't show widget immediately
            setTimeout(() => {
                sessionStorage.removeItem('justFinishedChat');
                aiWidget.classList.add('show');
            }, 5000);
        }
        
        if (userBrowsing) {
            // User clicked "Just Browsing" - don't show again this session
            aiWidget.classList.remove('show');
        }
        
    }, 2000);
    
    console.log('✅ MobileWise AI Widget loaded');
})();