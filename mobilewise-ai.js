// ============================================
// MOBILEWISE AI WIDGET
// Version: 1.0
// Load with: <script src="https://mobilewise.netlify.app/mobilewise-ai.js"></script>
// ============================================

(function() {
    'use strict';
    
    console.log('🚀 MobileWise AI loading...');
    
    // ======== ADD CSS ========
    const style = document.createElement('style');
    style.textContent = `
        #mwAIWidget {
            position: fixed !important;
            bottom: 20px !important;
            right: 20px !important;
            width: 400px !important;
            height: 430px !important;
            z-index: 10000 !important;
            transition: bottom 0.8s ease-out !important;
            display: none;
        }
        
        #mwAIWidget .mw-video {
            position: absolute !important;
            top: 100px !important;
            left: 60px !important;
            width: 280px !important;
            height: 160px !important;
            border-radius: 10px !important;
            overflow: hidden !important;
            background: black !important;
        }
        
        #mwAIWidget .mw-video video {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
        }
        
        #mwAIWidget .mw-text {
            position: absolute !important;
            bottom: 145px !important;
            left: 40px !important;
            right: 40px !important;
            background: rgba(0,0,0,0.9) !important;
            color: white !important;
            padding: 12px 15px !important;
            border-radius: 10px !important;
            text-align: center !important;
            font-size: 14px !important;
            min-height: 60px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
        }
        
        #mwAIWidget .mw-buttons {
            position: absolute !important;
            bottom: 70px !important;
            left: 40px !important;
            right: 40px !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 8px !important;
        }
        
        #mwAIWidget .mw-btn {
            padding: 13px !important;
            border: none !important;
            border-radius: 10px !important;
            font-size: 15px !important;
            font-weight: bold !important;
            cursor: pointer !important;
            transition: all 0.3s !important;
        }
        
        #mwAIWidget .mw-btn-primary {
            background: linear-gradient(135deg, #002fff, #060a1c) !important;
            color: white !important;
        }
        
        #mwAIWidget .mw-btn-secondary {
            background: white !important;
            color: #333 !important;
            border: 2px solid #002fff !important;
        }
        
        #mwAIWidget .mw-overlay {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            pointer-events: none !important;
            border-radius: 15px !important;
        }
        
        /* Mobile responsive */
        @media (max-width: 768px) {
            #mwAIWidget {
                width: 350px !important;
                height: 380px !important;
                right: 10px !important;
            }
        }
        
        /* Overlay system */
        #mwOverlay {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background: rgba(0,0,0,0.9) !important;
            z-index: 9998 !important;
            display: none !important;
        }
        
        #mwChatWindow {
            position: fixed !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            width: 90vw !important;
            max-width: 900px !important;
            height: 80vh !important;
            background: white !important;
            border-radius: 20px !important;
            z-index: 9999 !important;
            display: none !important;
        }
        
        #mwCloseBtn {
            position: absolute !important;
            top: 20px !important;
            right: 20px !important;
            background: #002fff !important;
            color: white !important;
            border: none !important;
            width: 40px !important;
            height: 40px !important;
            border-radius: 50% !important;
            cursor: pointer !important;
            font-size: 24px !important;
            z-index: 10000 !important;
        }
    `;
    document.head.appendChild(style);
    
    // ======== ADD HTML ========
    const html = `
        <div id="mwAIWidget">
            <div class="mw-video">
                <video autoplay muted playsinline loop>
                    <source src="https://odetjszursuaxpapfwcy.supabase.co/storage/v1/object/public/video-avatars/video_avatar_1764286430873.mp4" type="video/mp4">
                </video>
            </div>
            
            <div class="mw-text" id="mwMessage">
                Hi! I'm your MobileWise AI Assistant
            </div>
            
            <div class="mw-buttons">
                <button class="mw-btn mw-btn-primary" id="mwGetHelp">
                    Get AI Assistance ▶
                </button>
                <button class="mw-btn mw-btn-secondary" id="mwJustBrowse">
                    Just Browsing 👉
                </button>
            </div>
            
            <img src="https://odetjszursuaxpapfwcy.supabase.co/storage/v1/object/public/form-assets/logos/logo_5f42f026-051a-42c7-833d-375fcac74252_1764359060407_player3.png" 
                 class="mw-overlay" 
                 alt="MobileWise AI">
        </div>
        
        <div id="mwOverlay"></div>
        
        <div id="mwChatWindow">
            <button id="mwCloseBtn">×</button>
            <iframe id="mwChatIframe" src="" allow="microphone" style="width:100%; height:100%; border:none; border-radius:20px;"></iframe>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', html);
    
    // ======== ADD FUNCTIONALITY ========
    setTimeout(() => {
        console.log('📱 Showing MobileWise AI');
        
        // Show widget
        document.getElementById('mwAIWidget').style.display = 'block';
        
        // Get AI Assistance
        document.getElementById('mwGetHelp').addEventListener('click', function() {
            console.log('Opening AI chat...');
            
            // Hide widget
            document.getElementById('mwAIWidget').style.display = 'none';
            
            // Show overlay and chat
            document.getElementById('mwOverlay').style.display = 'block';
            document.getElementById('mwChatWindow').style.display = 'block';
            
            // Load voice chat
            const url = 'https://smartaivoicebot.netlify.app/voice-chat-fusion-instant?mobilewiseMode=true';
            document.getElementById('mwChatIframe').src = url;
        });
        
        // Just Browsing
        document.getElementById('mwJustBrowse').addEventListener('click', function() {
            document.getElementById('mwAIWidget').style.display = 'none';
        });
        
        // Close chat
        document.getElementById('mwCloseBtn').addEventListener('click', closeChat);
        document.getElementById('mwOverlay').addEventListener('click', closeChat);
        
        function closeChat() {
            document.getElementById('mwOverlay').style.display = 'none';
            document.getElementById('mwChatWindow').style.display = 'none';
            document.getElementById('mwChatIframe').src = '';
            
            // Show widget again
            setTimeout(() => {
                document.getElementById('mwAIWidget').style.display = 'block';
            }, 1000);
        }
        
        console.log('✅ MobileWise AI ready!');
        
    }, 2000); // Wait 2 seconds
    
})();