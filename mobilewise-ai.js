// ============================================
// MOBILEWISE AI WIDGET - POINTS TO YOUR VOICE CHAT
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
        
        /* OVERLAY SYSTEM */
        #mobilewiseOverlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.85);
            z-index: 9998;
            display: none;
            backdrop-filter: blur(5px);
        }
        
        #mobilewiseVoiceInterface {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 95vw;
            max-width: 900px;
            height: 85vh;
            background: white;
            border-radius: 20px;
            z-index: 9999;
            display: none;
            box-shadow: 0 25px 60px rgba(0,0,0,0.4);
        }
        
        #mobilewiseCloseBtn {
            position: absolute;
            top: 20px;
            right: 20px;
            background: #002fff;
            color: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            z-index: 10000;
            font-size: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
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
        
        <!-- OVERLAY SYSTEM -->
        <div id="mobilewiseOverlay"></div>
        
        <div id="mobilewiseVoiceInterface">
            <button id="mobilewiseCloseBtn">×</button>
            <iframe id="voiceChatIframe" src="" allow="microphone; camera" style="width:100%; height:100%; border:none; border-radius:20px;"></iframe>
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
        
        // Show widget
        aiWidget.classList.add('show');
        
        // Type greeting
        setTimeout(() => {
            typeText(aiMessage, "Hi! I'm Botimia your Personal AI Assistant. How can I help you?");
        }, 500);
        
        // ======== GET AI ASSISTANCE ========
        getAssistanceBtn.addEventListener('click', async function() {
            console.log('🎤 Opening AI Voice Assistant...');
            
            const originalText = this.innerHTML;
            this.innerHTML = '🎤 Preparing microphone...';
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
                
                // 2. Generate voice chat URL - POINTS TO YOUR FILE
                const timestamp = Date.now();
                const voiceChatUrl = `${config.voiceChatUrl}?autoStartVoice=true&micPermissionGranted=true&gestureInitiated=true&timestamp=${timestamp}`;
                
                // 3. Update button
                this.innerHTML = '✅ Opening voice chat...';
                
                // 4. Hide widget and show overlay
                aiWidget.classList.remove('show');
                
                // 5. Show overlay with iframe
                document.getElementById('mobilewiseOverlay').style.display = 'block';
                document.getElementById('mobilewiseVoiceInterface').style.display = 'block';
                
                // 6. Load YOUR voice chat file
                document.getElementById('voiceChatIframe').src = voiceChatUrl;
                
                // 7. Reset button
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 1000);
                
            } catch (error) {
                console.error('❌ Microphone permission denied:', error);
                
                // Still try without mic
                this.innerHTML = '⚠️ Opening without mic...';
                
                const voiceChatUrl = `${config.voiceChatUrl}?autoStartVoice=true&mobilewiseMode=true`;
                
                aiWidget.classList.remove('show');
                document.getElementById('mobilewiseOverlay').style.display = 'block';
                document.getElementById('mobilewiseVoiceInterface').style.display = 'block';
                document.getElementById('voiceChatIframe').src = voiceChatUrl;
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 2000);
            }
        });
        
        // Just Browsing
        justBrowsingBtn.addEventListener('click', function() {
            aiWidget.classList.remove('show');
        });
        
        // Close overlay
        document.getElementById('mobilewiseCloseBtn').addEventListener('click', closeOverlay);
        document.getElementById('mobilewiseOverlay').addEventListener('click', closeOverlay);
        
        function closeOverlay() {
            document.getElementById('mobilewiseOverlay').style.display = 'none';
            document.getElementById('mobilewiseVoiceInterface').style.display = 'none';
            document.getElementById('voiceChatIframe').src = '';
            
            // Show widget again
            setTimeout(() => {
                aiWidget.classList.add('show');
            }, 1000);
        }
        
        // Escape key to close
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && document.getElementById('mobilewiseOverlay').style.display === 'block') {
                closeOverlay();
            }
        });
        
    }, 2000);
    
    console.log('✅ MobileWise AI Widget loaded');
})();