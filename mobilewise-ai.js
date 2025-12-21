// ============================================
// MOBILEWISE AI WIDGET - DEBUG VERSION
// ============================================

(function() {
    console.log('🚀 MobileWise AI Widget - DEBUG starting...');
    
    // ======== ADD STYLES ========
    const style = document.createElement('style');
    style.textContent = `
        /* MOBILEWISE AI WIDGET - SIMPLE */
        #mobilewiseAIWidget {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 400px;
            height: 430px;
            z-index: 99999; /* VERY HIGH */
            border: 3px solid red; /* VISIBLE BORDER */
            background: rgba(255,255,255,0.9); /* VISIBLE BACKGROUND */
        }
        
        /* VIDEO */
        .ai-video-container {
            position: absolute;
            top: 100px;
            left: 60px;
            width: 280px;
            height: 160px;
            border-radius: 10px;
            overflow: hidden;
            background: black;
            border: 2px solid blue;
        }
        
        .ai-video-container video {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        /* TEXT */
        .ai-text-container {
            position: absolute;
            bottom: 145px;
            left: 40px;
            right: 40px;
            text-align: center;
        }
        
        .ai-text {
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 12px 15px;
            border-radius: 10px;
            font-size: 14px;
            min-height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid green;
        }
        
        /* BUTTONS */
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
            border: 2px solid purple;
        }
        
        .ai-primary-btn {
            background: linear-gradient(135deg, #002fff 0%, #060a1c 100%);
            color: white;
        }
        
        .ai-secondary-btn {
            background: white;
            color: #333;
            border: 2px solid #002fff;
        }
        
        /* OVERLAY IMAGE - TRANSPARENT */
        .ai-overlay-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            border-radius: 15px;
            opacity: 0.5; /* SEMI-TRANSPARENT FOR DEBUGGING */
        }
    `;
    document.head.appendChild(style);
    console.log('✅ Styles added');
    
    // ======== ADD HTML ========
    const html = `
        <div id="mobilewiseAIWidget" style="display: block; opacity: 1; transform: translateY(0);">
            <div class="ai-video-container">
                <video autoplay muted playsinline>
                    <source src="https://odetjszursuaxpapfwcy.supabase.co/storage/v1/object/public/video-avatars/video_avatar_1764286430873.mp4" type="video/mp4">
                </video>
            </div>
            
            <img src="https://odetjszursuaxpapfwcy.supabase.co/storage/v1/object/public/form-assets/logos/logo_5f42f026-051a-42c7-833d-375fcac74252_1764359060407_player3.png" 
                 class="ai-overlay-image" 
                 alt="MobileWise AI Assistant">
            
            <div class="ai-text-container">
                <div class="ai-text" id="aiMessage">
                    DEBUG: Widget is visible!
                </div>
            </div>
            
            <div class="ai-action-buttons">
                <button class="ai-action-btn ai-primary-btn" id="getAssistanceBtn">
                    Get AI Assistance ▶
                </button>
                <button class="ai-action-btn ai-secondary-btn" id="justBrowsingBtn">
                    Just Browsing 👉
                </button>
            </div>
        </div>
        
        <!-- DEBUG INFO -->
        <div style="position: fixed; top: 10px; left: 10px; background: yellow; color: black; padding: 10px; z-index: 100000; font-size: 14px;">
            MobileWise AI Debug<br>
            Widget should be bottom-right<br>
            Look for red/blue/green borders
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', html);
    console.log('✅ HTML added');
    
    // ======== CHECK IF ELEMENTS EXIST ========
    setTimeout(() => {
        const widget = document.getElementById('mobilewiseAIWidget');
        const video = document.querySelector('.ai-video-container video');
        const text = document.getElementById('aiMessage');
        const buttons = document.querySelectorAll('.ai-action-btn');
        
        console.log('🔍 Checking elements:');
        console.log('- Widget exists:', !!widget);
        console.log('- Video exists:', !!video);
        console.log('- Text exists:', !!text);
        console.log('- Buttons exist:', buttons.length);
        
        if (widget) {
            console.log('✅ Widget found at:', widget.getBoundingClientRect());
        } else {
            console.error('❌ Widget NOT FOUND in DOM!');
        }
    }, 500);
    
    // ======== SIMPLE FUNCTIONALITY ========
    document.getElementById('getAssistanceBtn').addEventListener('click', function() {
        console.log('🎤 Get Assistance clicked');
        alert('Opening voice chat in new tab...');
        
        const timestamp = Date.now();
        const voiceChatUrl = `https://mobilewise.netlify.app/voice-chat-fusion-instant?autoStartVoice=true&micPermissionGranted=true&gestureInitiated=true&timestamp=${timestamp}`;
        
        window.open(voiceChatUrl, '_blank');
    });
    
    document.getElementById('justBrowsingBtn').addEventListener('click', function() {
        console.log('👉 Just Browsing clicked');
        document.getElementById('mobilewiseAIWidget').style.display = 'none';
    });
    
    console.log('✅ MobileWise AI Widget DEBUG loaded');
})();