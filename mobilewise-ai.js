// ============================================
// MOBILEWISE AI WIDGET - GUARANTEED VISIBLE VERSION
// ============================================

(function() {
    console.log('🚀 MobileWise Widget loading (GUARANTEED VISIBLE)...');
    
    // CONFIG
    const config = {
        voiceChatUrl: 'https://mobilewise.netlify.app/voice-chat-fusion-instant'
    };
    
    // ======== NUCLEAR CSS - BEATS ALL SITE STYLES ========
    const style = document.createElement('style');
    style.textContent = `
        /* NUCLEAR RESET - Widget container */
        #mobilewiseAIWidget {
            all: initial !important;
            position: fixed !important;
            bottom: 20px !important;
            right: 20px !important;
            width: 320px !important;
            height: 180px !important;
            z-index: 2147483647 !important;
            background: white !important;
            border: 3px solid #002fff !important;
            border-radius: 10px !important;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3) !important;
            padding: 15px !important;
            font-family: Arial, sans-serif !important;
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
        }
        
        /* Title */
        .widget-title {
            font-size: 18px !important;
            font-weight: bold !important;
            color: #002fff !important;
            margin-bottom: 10px !important;
            display: block !important;
        }
        
        /* Message */
        .widget-message {
            background: #002fff !important;
            color: white !important;
            padding: 12px !important;
            border-radius: 8px !important;
            margin-bottom: 15px !important;
            font-size: 14px !important;
            display: block !important;
        }
        
        /* Buttons container */
        .widget-buttons {
            display: flex !important;
            flex-direction: column !important;
            gap: 8px !important;
        }
        
        /* Primary button */
        .widget-btn-primary {
            background: #002fff !important;
            color: white !important;
            border: none !important;
            padding: 12px !important;
            border-radius: 8px !important;
            font-size: 14px !important;
            font-weight: bold !important;
            cursor: pointer !important;
            display: block !important;
        }
        
        /* Secondary button */
        .widget-btn-secondary {
            background: white !important;
            color: #002fff !important;
            border: 2px solid #002fff !important;
            padding: 12px !important;
            border-radius: 8px !important;
            font-size: 14px !important;
            cursor: pointer !important;
            display: block !important;
        }
        
        /* Voice chat overlay */
        #voiceChatOverlay {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background: rgba(0,0,0,0.9) !important;
            z-index: 2147483646 !important;
            display: none !important;
        }
        
        #voiceChatOverlay.active {
            display: block !important;
        }
        
        #voiceChatContainer {
            width: 90% !important;
            max-width: 900px !important;
            height: 600px !important;
            background: white !important;
            border-radius: 20px !important;
            position: absolute !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
        }
        
        #voiceChatIframe {
            width: 100% !important;
            height: 100% !important;
            border: none !important;
            border-radius: 20px !important;
        }
        
        .close-voice-chat {
            position: absolute !important;
            top: 15px !important;
            right: 15px !important;
            background: #ff0000 !important;
            color: white !important;
            border: none !important;
            width: 40px !important;
            height: 40px !important;
            border-radius: 50% !important;
            font-size: 24px !important;
            cursor: pointer !important;
            z-index: 10 !important;
        }
    `;
    document.head.appendChild(style);
    
    // ======== SIMPLE HTML ========
    const widgetHTML = `
    <div id="mobilewiseAIWidget">
        <div class="widget-title">🤖 AI Assistant</div>
        <div class="widget-message">Hi! I'm Botimia. How can I help you?</div>
        <div class="widget-buttons">
            <button class="widget-btn-primary" id="getAssistanceBtn">
                🎤 Get AI Assistance
            </button>
            <button class="widget-btn-secondary" id="justBrowsingBtn">
                Just Browsing 👉
            </button>
        </div>
    </div>
    
    <!-- Voice chat overlay -->
    <div id="voiceChatOverlay">
        <div id="voiceChatContainer">
            <button class="close-voice-chat" id="closeVoiceChat">×</button>
            <iframe id="voiceChatIframe" 
                    allow="microphone; autoplay"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"></iframe>
        </div>
    </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', widgetHTML);
    
    console.log('✅ Widget injected with NUCLEAR CSS');
    
    // ======== FUNCTIONALITY ========
    
    // Get Assistance button
    document.getElementById('getAssistanceBtn').addEventListener('click', async function() {
        console.log('🎤 Opening voice chat...');
        
        // Generate parameters
        const params = {
            autoStartVoice: 'true',
            micPermissionGranted: 'true',
            timestamp: Date.now(),
            source: 'mobilewise-widget'
        };
        
        const encodedParams = btoa(JSON.stringify(params));
        const url = `${config.voiceChatUrl}#voicechat=${encodedParams}`;
        
        console.log('🔗 URL:', url);
        
        // Show overlay
        const iframe = document.getElementById('voiceChatIframe');
        const overlay = document.getElementById('voiceChatOverlay');
        
        iframe.src = url;
        overlay.classList.add('active');
    });
    
    // Close overlay
    function closeOverlay() {
        document.getElementById('voiceChatOverlay').classList.remove('active');
        document.getElementById('voiceChatIframe').src = '';
    }
    
    document.getElementById('closeVoiceChat').addEventListener('click', closeOverlay);
    document.getElementById('voiceChatOverlay').addEventListener('click', function(e) {
        if (e.target.id === 'voiceChatOverlay') closeOverlay();
    });
    
    // Just Browsing
    document.getElementById('justBrowsingBtn').addEventListener('click', function() {
        document.getElementById('mobilewiseAIWidget').style.display = 'none';
    });
    
    console.log('✅ MobileWise AI Widget loaded (GUARANTEED VISIBLE)');
})();