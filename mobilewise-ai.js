// ============================================
// MOBILEWISE WIDGET - BASED ON WORKING NCI-DEMO3
// ============================================

(function() {
    console.log('🚀 MobileWise Widget loading (based on nci-demo3)...');
    
    // CONFIG - POINT TO YOUR VOICE CHAT
    const config = {
        voiceChatUrl: 'https://mobilewise.netlify.app/voice-chat-fusion-instant',
        videoUrl: 'https://odetjszursuaxpapfwcy.supabase.co/storage/v1/object/public/video-avatars/video_avatar_1764286430873.mp4',
        overlayImageUrl: 'https://odetjszursuaxpapfwcy.supabase.co/storage/v1/object/public/form-assets/logos/logo_5f42f026-051a-42c7-833d-375fcac74252_1764359060407_player3.png'
    };
    
    // ======== INJECT EXACT NCI-DEMO3 HTML ========
    const widgetHTML = `
    <div class="ai-button-container" id="mobilewiseAIWidget">
        <div class="ai-button-wrapper">
            <video class="ai-video" autoplay muted playsinline id="avatarVideo">
                <source src="${config.videoUrl}" type="video/mp4">
            </video>
            
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
            
            <img src="${config.overlayImageUrl}" class="ai-button-overlay" alt="AI Voice Assistant">
        </div>
    </div>
    `;
    
    // ======== INJECT EXACT NCI-DEMO3 CSS ========
    const style = document.createElement('style');
    style.textContent = `
        /* EXACT COPY FROM NCI-DEMO3.HTML */
        .ai-button-container {
            position: fixed;
            bottom: -50px;
            left: 0;
            width: 100%;
            display: flex;
            justify-content: center;
            z-index: 1000;
            transform: translateY(100%);
            transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            padding-bottom: 50px;
        }
        
        .ai-button-wrapper {
            background: transparent;
            border: none;
            width: 85vw;
            max-width: 430px;
            height: auto;
            position: relative;
            display: block;
        }
        
        .ai-button-overlay {
            width: 100%;
            height: auto;
            border-radius: 15px;
            box-shadow: 0 8px 35px rgba(0,0,0,0.4);
            position: relative;
            z-index: 2;
            pointer-events: none;
            transform: scale(1.15);
            transform-origin: center center;
        }
        
        .ai-video {
            width: 100%;
            height: auto;
            border-radius: 15px;
            position: relative;
            z-index: 1;
            top: 215px;
            transform: scale(0.90);
            transform-origin: center center;
            pointer-events: auto;
        }
        
        .video-frozen {
            filter: brightness(0.98);
        }
        
        .ai-text-container {
            position: absolute;
            bottom: 84px;
            left: 0;
            width: 100%;
            text-align: center;
            z-index: 3;
            padding: 0 20px;
        }
        
        .ai-text {
            background: rgba(0, 0, 0, 0.85);
            color: white;
            padding: 10px 14px;
            border-radius: 10px;
            font-size: 15px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            min-height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: 1.3;
        }
        
        .typing-cursor {
            display: inline-block;
            width: 2px;
            height: 1em;
            background: #333;
            margin-left: 2px;
            animation: blink 1s infinite;
        }
        
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
        
        .ai-action-btn {
            padding: 10px 14px;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-align: center;
            height: 40px;
        }
        
        .ai-action-buttons {
            position: absolute;
            bottom: 3px;
            left: 0;
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 3px;
            padding: 0 20px;
            z-index: 3;
        }
        
        .ai-primary-btn {
            background: linear-gradient(135deg, #002fff 0%, #060a1c 100%);
            color: rgb(255, 255, 255);
        }
        
        .ai-secondary-btn {
            background: rgb(89, 0, 255);
            color: #ffffff;
            border: 2px solid #000000;
        }
        
        .ai-primary-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }
        
        .ai-secondary-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
            background: white;
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
        
        /* DESKTOP-ONLY adjustments */
        @media (min-width: 768px) and (hover: hover) {
            .ai-video {
                top: 320px !important;
                transform: scale(0.85) !important;
            }
            
            .ai-text-container {
                bottom: 125px !important;
            }
        }
    `;
    
    // Inject everything
    document.head.appendChild(style);
    document.body.insertAdjacentHTML('beforeend', widgetHTML);
    
    // ======== COPY EXACT NCI-DEMO3 JAVASCRIPT ========
    
    // Freeze video at end
    document.getElementById('avatarVideo').addEventListener('ended', function() {
        this.pause();
        this.classList.add('video-frozen');
    });
    
    // Typing animation (same as nci-demo3)
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
    
    // Show widget (same as nci-demo3)
    setTimeout(() => {
        const widget = document.getElementById('mobilewiseAIWidget');
        const aiMessage = document.getElementById('aiMessage');
        
        widget.style.transform = 'translateY(0)';
        
        setTimeout(() => {
            typeText(aiMessage, "Hi! I'm Botimia your Personal AI Assistant. How can I help you?");
        }, 500);
    }, 1000);
    
    // Get AI Assistance Button (SAME LOGIC, BUT WITH YOUR URL)
    document.getElementById('getAssistanceBtn').addEventListener('click', async function() {
        sessionStorage.setItem('startingChat', 'true');
        
        const originalText = this.innerHTML;
        this.innerHTML = '🎤 Preparing microphone...';
        this.disabled = true;
        
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ 
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true
                } 
            });
            
            stream.getTracks().forEach(track => track.stop());
            localStorage.setItem('micPermissionGranted', 'true');
            
            const timestamp = Date.now();
            
            // ✅ THIS IS THE KEY: Use YOUR voice chat URL
            const url = `${config.voiceChatUrl}?autoStartVoice=true&micPermissionGranted=true&gestureInitiated=true&timestamp=${timestamp}&source=mobilewise-widget`;
            
            this.innerHTML = '✅ Opening voice chat...';
            
            await new Promise(resolve => setTimeout(resolve, 800));
            
            window.open(url, '_blank');
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 1500);
            
        } catch (error) {
            console.error("Microphone permission denied:", error);
            
            this.innerHTML = '⚠️ Mic access needed';
            
            // ✅ Use YOUR voice chat URL for error case too
            const url = `${config.voiceChatUrl}?autoStartVoice=true&micPermissionGranted=false&gestureInitiated=true&source=mobilewise-widget`;
            window.open(url, '_blank');
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 3000);
        }
    });
    
    // Just Browsing Button
    document.getElementById('justBrowsingBtn').addEventListener('click', function() {
        document.getElementById('mobilewiseAIWidget').style.transform = 'translateY(100%)';
        sessionStorage.setItem('userBrowsing', 'true');
    });
    
    console.log('✅ MobileWise Widget loaded (exact nci-demo3 clone)');
})();