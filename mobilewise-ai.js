// ============================================
// MOBILEWISE WIDGET - COMPLETE FIXED VERSION
// ============================================

// Add this right before window.open():
console.log('🔗 FINAL URL BEING SENT:');
console.log('  autoStartVoice:', true);
console.log('  micPermissionGranted:', true);
console.log('  gestureInitiated:', true);
console.log('  Full URL:', url);

(function() {
    console.log('🚀 MobileWise Widget loading (FIXED VERSION)...');
    
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
    
    // Show widget with animation
    setTimeout(() => {
        console.log('📱 Showing MobileWise AI Widget...');
        
        const widget = document.getElementById('mobilewiseAIWidget');
        const aiMessage = document.getElementById('aiMessage');
        
        // Make widget visible
        widget.classList.add('visible');
        
        // Start typing animation
        setTimeout(() => {
            typeText(aiMessage, "Hi! I'm Botimia your Personal AI Assistant. How can I help you?");
        }, 500);
        
    }, 1000);
    
    // ======== GET AI ASSISTANCE WITH PERMISSION BRIDGE ========
    document.getElementById('getAssistanceBtn').addEventListener('click', async function() {
        console.log('🎤 Opening AI Voice Assistant...');
        console.log('🔗 Voice chat file:', config.voiceChatUrl);
        
        const originalText = this.innerHTML;
        this.innerHTML = '🎤 Preparing microphone...';
        this.disabled = true;
        
        try {
            // 1. Get microphone permission ON WIDGET PAGE
            const stream = await navigator.mediaDevices.getUserMedia({ 
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true
                } 
            });
            
            stream.getTracks().forEach(track => track.stop());
            console.log('✅ Microphone permission granted on widget page');
            
            // 2. Store permission
            localStorage.setItem('micPermissionGranted', 'true');
            sessionStorage.setItem('startingChat', 'true');
            
            // 3. Generate URL WITH ALL PERMISSION BRIDGE PARAMETERS
            const timestamp = Date.now();
            const url = `${config.voiceChatUrl}?autoStartVoice=true&micPermissionGranted=true&gestureInitiated=true&timestamp=${timestamp}&source=mobilewise-widget&permissionBridge=true&popupMode=true&userGesture=widget-click`;
            
            console.log('🔗 Opening with permission bridge:', url);
            
            // 4. Update button
            this.innerHTML = '✅ Opening voice chat...';
            
            // 5. Hide widget
            document.getElementById('mobilewiseAIWidget').classList.remove('visible');
            
            // 6. Wait for visual feedback
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // 7. OPEN AS POPUP (NOT NEW TAB) - THIS IS KEY FOR AUDIO PERMISSIONS
            const popupWidth = 800;
            const popupHeight = 900;
            const left = (window.screen.width - popupWidth) / 2;
            const top = (window.screen.height - popupHeight) / 2;
            
            const popup = window.open(url, 'VoiceChatPopup', 
                `width=${popupWidth},height=${popupHeight},left=${left},top=${top},resizable=yes,scrollbars=yes,toolbar=no,location=no,status=no,menubar=no`
            );
            
            if (!popup) {
                console.error('❌ Popup blocked! Please allow popups for this site.');
                alert('Please allow popups to open the voice chat.');
                
                // Fallback: Show URL for manual copy
                prompt('Popup blocked. Please copy this URL and open manually:', url);
            } else {
                console.log('✅ Voice chat opened in popup');
            }
            
            // 8. Reset button
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                
                // Show widget again after 3 seconds
                setTimeout(() => {
                    document.getElementById('mobilewiseAIWidget').classList.add('visible');
                }, 3000);
            }, 1500);
            
        } catch (error) {
            console.error('❌ Microphone permission denied:', error);
            
            // Still try without mic
            this.innerHTML = '⚠️ Opening without mic...';
            
            const url = `${config.voiceChatUrl}?autoStartVoice=true&micPermissionGranted=false&gestureInitiated=true&source=mobilewise-widget&popupMode=true`;
            
            document.getElementById('mobilewiseAIWidget').classList.remove('visible');
            
            const popup = window.open(url, 'VoiceChatPopup', 'width=800,height=900');
            
            if (!popup) {
                prompt('Popup blocked. Please copy this URL:', url);
            }
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                
                setTimeout(() => {
                    document.getElementById('mobilewiseAIWidget').classList.add('visible');
                }, 3000);
            }, 3000);
        }
    });
    
    // Just Browsing
    document.getElementById('justBrowsingBtn').addEventListener('click', function() {
        console.log('👉 Just Browsing clicked');
        document.getElementById('mobilewiseAIWidget').classList.remove('visible');
        sessionStorage.setItem('userBrowsing', 'true');
    });
    
    console.log('✅ MobileWise AI Widget loaded (with permission bridge)');
})();