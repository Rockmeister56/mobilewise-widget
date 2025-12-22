// ============================================
// MOBILEWISE WIDGET - FIXED ASPECT RATIO & AUDIO
// ============================================

(function() {
    console.log('🚀 MobileWise Widget loading (FIXED VERSION)...');
    
    // CONFIG
    const config = {
        voiceChatUrl: 'https://mobilewise.netlify.app/voice-chat-fusion-instant',
        videoUrl: 'https://odetjszursuaxpapfwcy.supabase.co/storage/v1/object/public/video-avatars/video_avatar_1764286430873.mp4',
        overlayImageUrl: 'https://odetjszursuaxpapfwcy.supabase.co/storage/v1/object/public/form-assets/logos/logo_5f42f026-051a-42c7-833d-375fcac74252_1764359060407_player3.png'
    };
    
    // ======== FIXED CSS - BETTER ASPECT RATIO ========
    const style = document.createElement('style');
    style.textContent = `
        /* WIDGET (same as before) */
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
        
        /* ===== FIXED OVERLAY - WIDER, LESS TALL ===== */
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
        
        /* FIXED: WIDER, LESS TALL - PERFECT 800x600 PROPORTIONS */
        #voiceChatContainer {
            width: 90%;
            max-width: 900px; /* WIDER */
            height: auto; /* NOT fixed height */
            aspect-ratio: 3/2; /* 900x600 = 3:2 ratio (wider than 4:3) */
            background: white;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            position: relative;
        }
        
        /* Fallback for older browsers */
        @supports not (aspect-ratio: 3/2) {
            #voiceChatContainer {
                height: 600px; /* Fixed fallback */
            }
        }
        
        #voiceChatIframe {
            width: 100%;
            height: 100%;
            border: none;
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
        
        /* Mobile adjustments */
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
            
            /* Mobile: Full screen */
            #voiceChatContainer {
                width: 100%;
                height: 100vh;
                max-width: none;
                aspect-ratio: unset;
                border-radius: 0;
            }
        }
        
        /* Small screens */
        @media (max-width: 600px) {
            #voiceChatContainer {
                width: 100%;
                height: 100vh;
                border-radius: 0;
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
    
    <!-- SIMPLER IFRAME - NO SANDBOX ISSUES -->
    <div id="voiceChatOverlay">
        <div id="voiceChatContainer">
            <button class="close-voice-chat" id="closeVoiceChat">×</button>
            <iframe id="voiceChatIframe" allow="microphone; camera"></iframe>
        </div>
    </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', widgetHTML);
    
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
    
    // Show widget
    setTimeout(() => {
        const widget = document.getElementById('mobilewiseAIWidget');
        const aiMessage = document.getElementById('aiMessage');
        widget.classList.add('visible');
        setTimeout(() => {
            typeText(aiMessage, "Hi! I'm Botimia your Personal AI Assistant. How can I help you?");
        }, 500);
    }, 1000);
    
    // ======== GET AI ASSISTANCE - WITH AUDIO TIMING FIX ========
    document.getElementById('getAssistanceBtn').addEventListener('click', async function() {
        console.log('🎤 Opening AI Voice Assistant...');
        
        const originalText = this.innerHTML;
        this.innerHTML = '🎤 Getting microphone...';
        this.disabled = true;
        
        try {
            // Get microphone permission
            const stream = await navigator.mediaDevices.getUserMedia({ 
                audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } 
            });
            stream.getTracks().forEach(track => track.stop());
            
            localStorage.setItem('micPermissionGranted', 'true');
            sessionStorage.setItem('startingChat', 'true');
            
            // Generate URL with LONGER DELAY for audio
            const timestamp = Date.now();
            const url = `${config.voiceChatUrl}?autoStartVoice=true&micPermissionGranted=true&gestureInitiated=true&timestamp=${timestamp}&source=mobilewise-widget&audioDelay=2000`;
            // ↑ NOTE: audioDelay=2000 tells bridge to wait longer
            
            console.log('🔗 URL with audio delay:', url);
            
            this.innerHTML = '✅ Opening...';
            document.getElementById('mobilewiseAIWidget').classList.remove('visible');
            
            // Show overlay
            setTimeout(() => {
                const iframe = document.getElementById('voiceChatIframe');
                const overlay = document.getElementById('voiceChatOverlay');
                
                iframe.src = url;
                overlay.classList.add('active');
                
                // Close handlers
                document.getElementById('closeVoiceChat').onclick = closeOverlay;
                overlay.onclick = function(e) {
                    if (e.target === overlay) closeOverlay();
                };
                document.addEventListener('keydown', function(e) {
                    if (e.key === 'Escape') closeOverlay();
                });
            }, 300);
            
            // Reset button
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 1500);
            
        } catch (error) {
            console.error('❌ Microphone error:', error);
            
            // Open without mic
            this.innerHTML = '⚠️ Opening without mic...';
            const url = `${config.voiceChatUrl}?autoStartVoice=true&micPermissionGranted=false&gestureInitiated=true&source=mobilewise-widget`;
            
            document.getElementById('mobilewiseAIWidget').classList.remove('visible');
            
            setTimeout(() => {
                const iframe = document.getElementById('voiceChatIframe');
                const overlay = document.getElementById('voiceChatOverlay');
                iframe.src = url;
                overlay.classList.add('active');
                
                document.getElementById('closeVoiceChat').onclick = closeOverlay;
            }, 300);
            
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
    
    // Just Browsing
    document.getElementById('justBrowsingBtn').addEventListener('click', function() {
        document.getElementById('mobilewiseAIWidget').classList.remove('visible');
        sessionStorage.setItem('userBrowsing', 'true');
    });
    
    console.log('✅ Fixed Widget Loaded');
})();