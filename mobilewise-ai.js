// ============================================
// MOBILEWISE AI WIDGET v1.0 - COMPLETE
// ============================================

(function() {
    console.log('🚀 MobileWise AI starting...');
    
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
        
        .ai-video-container {
            position: absolute;
            top: 100px;
            left: 60px;
            width: 280px;
            height: 160px;
            border-radius: 10px;
            overflow: hidden;
            background: black;
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
            left: 40px;
            right: 40px;
            text-align: center;
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
            left: 40px;
            right: 40px;
            display: flex;
            flex-direction: column;
            gap: 8px;
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
            background: #f8f9fa;
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
        }
        
        /* Overlay System */
        #mobilewiseOverlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            z-index: 9998;
            display: none;
            backdrop-filter: blur(5px);
        }
        
        #mobilewiseVoiceInterface {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90vw;
            max-width: 900px;
            height: 80vh;
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
        
        /* Mobile */
        @media (max-width: 768px) {
            #mobilewiseAIWidget {
                width: 350px;
                height: 380px;
                right: 10px;
            }
            
            .ai-video-container {
                top: 85px;
                left: 50px;
                width: 250px;
                height: 140px;
            }
            
            .ai-text-container {
                bottom: 130px;
                left: 30px;
                right: 30px;
            }
            
            .ai-action-buttons {
                bottom: 60px;
                left: 30px;
                right: 30px;
            }
        }
    `;
    document.head.appendChild(style);
    
    // ======== ADD HTML ========
    const html = `
        <!-- AI Widget -->
        <div id="mobilewiseAIWidget">
            <!-- Video Container -->
            <div class="ai-video-container">
                <video autoplay muted playsinline id="avatarVideo">
                    <source src="https://odetjszursuaxpapfwcy.supabase.co/storage/v1/object/public/video-avatars/video_avatar_1764286430873.mp4" type="video/mp4">
                </video>
            </div>
            
            <!-- Animated Text Area -->
            <div class="ai-text-container">
                <div class="ai-text" id="aiMessage"></div>
            </div>
            
            <!-- Action Buttons -->
            <div class="ai-action-buttons">
                <button class="ai-action-btn ai-primary-btn" id="getAssistanceBtn">
                    Get AI Assistance <span class="play-icon">▶</span>
                </button>
                <button class="ai-action-btn ai-secondary-btn" id="justBrowsingBtn">
                    Just Browsing 👉
                </button>
            </div>
            
            <!-- Overlay Image -->
            <img src="https://odetjszursuaxpapfwcy.supabase.co/storage/v1/object/public/form-assets/logos/logo_5f42f026-051a-42c7-833d-375fcac74252_1764359060407_player3.png" 
                 class="ai-overlay-image" 
                 alt="MobileWise AI Assistant">
        </div>
        
        <!-- Overlay System -->
        <div id="mobilewiseOverlay"></div>
        
        <div id="mobilewiseVoiceInterface">
            <button id="mobilewiseCloseBtn">×</button>
            <iframe id="voiceChatIframe" src="" allow="microphone; camera" style="width:100%; height:100%; border:none; border-radius:20px;"></iframe>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', html);
    
    // ======== FUNCTIONALITY ========
    
    // Freeze video at end instead of looping
    document.getElementById('avatarVideo').addEventListener('ended', function() {
        this.pause();
        this.classList.add('video-frozen');
    });

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

    // Session management
    document.addEventListener('DOMContentLoaded', function() {
        const aiWidget = document.getElementById('mobilewiseAIWidget');
        const getAssistanceBtn = document.getElementById('getAssistanceBtn');
        const justBrowsingBtn = document.getElementById('justBrowsingBtn');
        const aiMessage = document.getElementById('aiMessage');
        
        // Check if user just finished a chat session
        const justFinishedChat = sessionStorage.getItem('justFinishedChat');
        const comingFromChat = document.referrer.includes('smartaivoicebot/voice-chat');
        
        // Show widget UNLESS they just finished a chat session
        if (!justFinishedChat && !comingFromChat) {
            setTimeout(function() {
                aiWidget.classList.add('show');
                
                // Start typing animation after widget appears
                setTimeout(() => {
                    typeText(aiMessage, "Hi! I'm Botimia your Personal AI Assistant. How can I help you?");
                }, 500);
                
            }, 1000);
        } else {
            // Clear the flag so widget shows on next visit
            sessionStorage.removeItem('justFinishedChat');
        }
        
        // Get AI Assistance Button
        getAssistanceBtn.addEventListener('click', async function() {
            // Set flag that they're starting a chat session
            sessionStorage.setItem('startingChat', 'true');
            
            // Update button to show we're preparing
            const originalText = getAssistanceBtn.innerHTML;
            getAssistanceBtn.innerHTML = '🎤 Preparing microphone...';
            getAssistanceBtn.disabled = true;
            
            try {
                // Get microphone permission
                const stream = await navigator.mediaDevices.getUserMedia({ 
                    audio: {
                        echoCancellation: true,
                        noiseSuppression: true,
                        autoGainControl: true
                    } 
                });
                
                // Permission granted - stop the stream immediately
                stream.getTracks().forEach(track => track.stop());
                
                // Store that permission was granted
                localStorage.setItem('micPermissionGranted', 'true');
                
                // Generate unique timestamp to prevent caching
                const timestamp = Date.now();
                
                // Generic URL with permission bridge parameters
                const url = `https://smartaivoicebot.netlify.app/voice-chat-fusion-instant?autoStartVoice=true&micPermissionGranted=true&gestureInitiated=true&timestamp=${timestamp}`;
                
                // Update button to show success
                getAssistanceBtn.innerHTML = '✅ Opening voice chat...';
                
                // Hide widget
                aiWidget.classList.remove('show');
                
                // Brief delay for user feedback
                await new Promise(resolve => setTimeout(resolve, 800));
                
                // Show overlay and open voice chat
                document.getElementById('mobilewiseOverlay').style.display = 'block';
                document.getElementById('mobilewiseVoiceInterface').style.display = 'block';
                document.getElementById('voiceChatIframe').src = url;
                
                // Reset button after delay
                setTimeout(() => {
                    getAssistanceBtn.innerHTML = originalText;
                    getAssistanceBtn.disabled = false;
                }, 1500);
                
            } catch (error) {
                console.error("Microphone permission denied:", error);
                
                // Update button to show error
                getAssistanceBtn.innerHTML = '⚠️ Opening without mic...';
                
                // Still open voice chat but it will know mic wasn't granted
                const url = `https://smartaivoicebot.netlify.app/voice-chat-fusion-instant?autoStartVoice=true&mobilewiseMode=true`;
                
                // Hide widget
                aiWidget.classList.remove('show');
                
                // Show overlay
                document.getElementById('mobilewiseOverlay').style.display = 'block';
                document.getElementById('mobilewiseVoiceInterface').style.display = 'block';
                document.getElementById('voiceChatIframe').src = url;
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    getAssistanceBtn.innerHTML = originalText;
                    getAssistanceBtn.disabled = false;
                }, 3000);
            }
        });
        
        // Just Browsing Button
        justBrowsingBtn.addEventListener('click', function() {
            aiWidget.classList.remove('show');
            // Optional: Set a flag to not show again for this session
            sessionStorage.setItem('userBrowsing', 'true');
        });
        
        // Close overlay functionality
        document.getElementById('mobilewiseCloseBtn').addEventListener('click', closeOverlay);
        document.getElementById('mobilewiseOverlay').addEventListener('click', closeOverlay);
        
        function closeOverlay() {
            // Set flag that user just finished a chat
            sessionStorage.setItem('justFinishedChat', 'true');
            
            // Hide overlay
            document.getElementById('mobilewiseOverlay').style.display = 'none';
            document.getElementById('mobilewiseVoiceInterface').style.display = 'none';
            document.getElementById('voiceChatIframe').src = '';
            
            // Don't show widget again immediately after chat
            // User would need to refresh or come back later
        }
        
        // Escape key to close
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && document.getElementById('mobilewiseOverlay').style.display === 'block') {
                closeOverlay();
            }
        });
    });
    
    console.log('✅ MobileWise AI script loaded');
})();