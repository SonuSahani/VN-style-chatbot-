<div class="vn-chatbot-container">
    <div class="vn-avatar" id="vnAvatar">
        <img src="http://www.sevendestination.com/wp-content/uploads/2025/10/normal.png" alt="Travel Assistant" class="vn-sprite" id="vnSprite">
        <div class="vn-pulse"></div>
    </div>
    <div class="vn-overlay" id="vnOverlay"></div>
    <div class="vn-dialogue" id="vnDialogue" role="dialog" aria-labelledby="vnCharacterName" aria-live="polite">
        <div class="vn-character-panel">
            <img src="http://www.sevendestination.com/wp-content/uploads/2025/10/normal.png" alt="Travel Assistant Character" class="vn-character-sprite" id="vnCharacterSprite" role="img" aria-label="Travel Assistant">
        </div>
        <div class="vn-dialogue-bar">
            <div class="vn-character-name" id="vnCharacterName">Saheli</div>
            <div class="vn-dialogue-text" id="vnDialogueText" aria-describedby="vnCharacterName"></div>
            <div class="vn-choices-bar">
                <div class="vn-choices" id="vnChoices" role="menu"></div>
                <div class="vn-fixed-actions">
                    <button class="vn-action-btn" id="vnCallBtn" aria-label="Call">Phone</button>
                    <button class="vn-action-btn" id="vnWhatsappBtn" aria-label="WhatsApp">WhatsApp</button>
                    <button class="vn-action-btn" id="vnAIPageBtn" aria-label="AI Page">Rocket</button>
                    <button class="vn-action-btn vn-back-btn" id="vnBackBtn" aria-label="Back">Back</button>
                </div>
            </div>
        </div>
        <button class="vn-close" id="vnClose" aria-label="Close">&times;</button>
    </div>
</div>
<audio id="typeSound" preload="auto">
    <source src="https://assets.mixkit.co/sfx/preview/mixkit-typewriter-136.wav" type="audio/wav">
</audio>
<audio id="clickSound" preload="auto">
    <source src="https://assets.mixkit.co/sfx/preview/mixkit-select-click-136.wav" type="audio/wav">
</audio>
<style>
    :root {
        --primary-color: #ff6b35;
        --text-primary: #fff;
        --text-secondary: #ccc;
        --bar-bg: rgba(0, 0, 0, 0.25);
        --shadow: 0 4px 20px rgba(0,0,0,0.3);
        --transition: all 0.3s ease;
    }
    .vn-chatbot-container {
        position: fixed;
        z-index: 10000;
        font-family: 'Noto Sans JP', 'Poppins', sans-serif;
        bottom: 20px;
        right: 20px;
    }
    .vn-avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        overflow: hidden;
        cursor: pointer;
        box-shadow: var(--shadow);
        border: 2px solid #fff;
        background: #fff;
        transition: var(--transition);
        display: block;
    }
    .vn-avatar.overlay-hidden {
        display: none;
    }
    .vn-avatar:hover {
        transform: scale(1.1);
    }
    .vn-sprite {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .vn-pulse {
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        border-radius: 50%;
        background: rgba(255, 107, 53, 0.4);
        animation: vn-pulse 2s infinite;
    }
    @keyframes vn-pulse {
        0% { transform: scale(0.95); opacity: 1; }
        100% { transform: scale(1.05); opacity: 0; }
    }
    .vn-overlay {
        position: fixed;
        top: 0; left: 0;
        width: 100vw; height: 100vh;
        background: rgba(0, 0, 0, 0.02);
        backdrop-filter: blur(1px);
        -webkit-backdrop-filter: blur(1px);
        z-index: 9999;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease;
        pointer-events: none;
    }
    .vn-overlay.active {
        opacity: 1;
        visibility: visible;
    }
    .vn-dialogue {
        position: fixed;
        bottom: 0; left: 0; right: 0;
        height: 100vh;
        background: none;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
        z-index: 10001;
        display: flex;
        align-items: flex-end;
    }
    .vn-dialogue.active {
        opacity: 1;
        pointer-events: all;
    }
    .vn-character-panel {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 350px;
        height: 100vh;
        display: flex;
        align-items: flex-end;
        justify-content: flex-start;
        padding: 0;
        z-index: 1;
    }
    .vn-character-sprite {
        width: 100%;
        height: 100%;
        max-width: 350px;
        max-height: 100vh;
        object-fit: contain;
        transition: var(--transition);
        padding: 0;
        margin: 0;
        animation: vn-breathe 4s infinite ease-in-out;
    }
    @keyframes vn-breathe {
        0%, 100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-5px) scale(1.01); }
    }
    .vn-dialogue-bar {
        width: 100%;
        height: 140px;
        background: var(--bar-bg);
        backdrop-filter: blur(2px);
        display: flex;
        flex-direction: column;
        padding: 10px 5%;
        box-sizing: border-box;
        border-top: 2px solid rgba(255,255,255,0.2);
        position: relative;
        z-index: 2;
    }
    .vn-character-name {
        font-size: 1rem;
        color: var(--text-primary);
        font-weight: bold;
        margin-bottom: 5px;
        padding-left: 10px;
        text-shadow: 0 1px 3px rgba(0,0,0,0.8);
    }
    .vn-dialogue-text {
        flex: 1;
        color: var(--text-primary);
        font-size: 1rem;
        line-height: 1.4;
        text-align: center;
        padding: 0 20px;
        overflow: hidden;
        white-space: pre-wrap;
        position: relative;
        max-height: 60px;
        text-shadow: 0 1px 3px rgba(0,0,0,0.8);
    }
    .vn-dialogue-text a {
        color: #ff9a76;
        text-decoration: underline;
        font-weight: bold;
        pointer-events: auto;
    }
    .vn-dialogue-text a:hover {
        color: var(--primary-color);
    }
    .vn-dialogue-text::after {
        content: '';
        position: absolute;
        right: 50%;
        bottom: 0;
        width: 2px;
        height: 20px;
        background: var(--primary-color);
        animation: vn-cursor 1s infinite;
    }
    @keyframes vn-cursor {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    .vn-choices-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 5px;
        padding: 0 10px;
    }
    .vn-choices {
        display: flex;
        gap: 10px;
        flex: 1;
        flex-wrap: wrap;
    }
    .vn-choice-btn {
        background: rgba(255, 255, 255, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.4);
        color: var(--text-primary);
        padding: 8px 16px;
        border-radius: 20px;
        cursor: pointer;
        transition: var(--transition);
        font-size: 0.9rem;
        min-width: 80px;
        text-align: center;
        font-weight: 500;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
    }
    .vn-choice-btn:hover {
        background: rgba(255,107,53,0.3);
        border-color: var(--primary-color);
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.4);
    }
    .vn-fixed-actions {
        display: flex;
        gap: 5px;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    .vn-fixed-actions.visible {
        opacity: 1;
    }
    .vn-action-btn {
        background: rgba(255, 255, 255, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.4);
        color: var(--text-secondary);
        font-size: 1.2rem;
        cursor: pointer;
        transition: var(--transition);
        padding: 5px;
        border-radius: 50%;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        position: relative;
        overflow: hidden;
    }
    .vn-action-btn:hover {
        color: var(--primary-color);
        background: rgba(255, 255, 255, 0.3);
        border-color: var(--primary-color);
        transform: scale(1.1);
        box-shadow: 0 4px 8px rgba(0,0,0,0.4);
    }
    .vn-action-btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
    }
    .vn-action-btn.highlight::before {
        opacity: 1;
        animation: vn-shine 0.8s ease-out;
    }
    .vn-action-btn.highlight {
        animation: vn-jump 0.5s ease-out;
    }
    @keyframes vn-jump {
        0%, 100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-10px) scale(1.2); }
    }
    @keyframes vn-shine {
        0% { opacity: 0; transform: scale(0.5); }
        50% { opacity: 1; }
        100% { opacity: 0; transform: scale(1.5); }
    }
    .vn-back-btn {
        display: none;
    }
    .vn-back-btn.visible {
        display: flex;
    }
    .vn-close {
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(0,0,0,0.6);
        border: none;
        color: #fff;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;
        z-index: 3;
        transition: var(--transition);
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
    }
    .vn-close:hover {
        background: var(--primary-color);
        transform: scale(1.1);
    }
    @media (max-width: 1024px) {
        .vn-character-panel {
            width: 300px;
        }
        .vn-character-sprite {
            max-width: 300px;
        }
        .vn-dialogue-bar {
            padding: 10px 4%;
        }
        .vn-dialogue-text {
            font-size: 0.95rem;
            max-height: 65px;
        }
        .vn-choice-btn {
            font-size: 0.85rem;
            padding: 7px 14px;
            min-width: 75px;
        }
    }
    @media (max-width: 768px) {
        .vn-chatbot-container {
            bottom: 15px;
            right: 15px;
        }
        .vn-avatar {
            width: 70px;
            height: 70px;
        }
        .vn-character-panel {
            width: 40vw;
            max-width: 180px;
        }
        .vn-character-sprite {
            width: 100%;
            height: auto;
            object-fit: contain;
        }
        .vn-dialogue-bar {
            height: 200px;
            padding: 15px 3%;
            border-radius: 20px 20px 0 0;
        }
        .vn-character-name {
            font-size: 0.9rem;
            margin-bottom: 8px;
            padding-left: 5px;
        }
        .vn-dialogue-text {
            font-size: 0.85rem;
            line-height: 1.3;
            max-height: 80px;
            padding: 0 15px;
            margin-bottom: 10px;
        }
        .vn-choices-bar {
            flex-direction: column;
            gap: 12px;
            margin-top: 8px;
            padding: 0 5px;
        }
        .vn-choices {
            justify-content: center;
            gap: 8px;
            flex-wrap: wrap;
            width: 100%;
        }
        .vn-choice-btn {
            padding: 8px 12px;
            font-size: 0.8rem;
            min-width: 60px;
            max-width: none;
            flex: 1 1 calc(50% - 4px);
            height: 36px;
            min-height: 36px;
            border-radius: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .vn-fixed-actions {
            justify-content: center;
            width: 100%;
        }
        .vn-action-btn {
            width: 32px;
            height: 32px;
            font-size: 1rem;
        }
        .vn-close {
            width: 28px;
            height: 28px;
            top: 8px;
            right: 8px;
        }
    }
    @media (max-width: 480px) {
        .vn-chatbot-container {
            bottom: 10px;
            right: 10px;
        }
        .vn-avatar {
            width: 60px;
            height: 60px;
        }
        .vn-character-panel {
            width: 40vw;
            max-width: 150px;
        }
        .vn-character-sprite {
            width: 100%;
            height: auto;
            object-fit: contain;
        }
        .vn-dialogue-bar {
            height: 220px;
            padding: 12px 2%;
        }
        .vn-character-name {
            font-size: 0.85rem;
            margin-bottom: 6px;
        }
        .vn-dialogue-text {
            font-size: 0.8rem;
            line-height: 1.2;
            max-height: 90px;
            padding: 0 10px;
            margin-bottom: 8px;
        }
        .vn-choices-bar {
            gap: 10px;
        }
        .vn-choice-btn {
            padding: 6px 10px;
            font-size: 0.75rem;
            min-width: 55px;
            height: 32px;
            min-height: 32px;
            border-radius: 16px;
            flex: 1 1 calc(50% - 4px);
        }
        .vn-action-btn {
            width: 28px;
            height: 28px;
            font-size: 0.9rem;
        }
        .vn-close {
            width: 24px;
            height: 24px;
            top: 6px;
            right: 6px;
        }
    }
    @media (max-width: 360px) {
        .vn-dialogue-bar {
            height: 240px;
            padding: 10px 2%;
        }
        .vn-dialogue-text {
            font-size: 0.75rem;
            max-height: 100px;
        }
        .vn-choice-btn {
            font-size: 0.7rem;
            padding: 5px 8px;
            height: 30px;
            min-height: 30px;
            flex: 1 1 100%;
            margin-bottom: 5px;
        }
        .vn-choices {
            flex-direction: column;
            gap: 5px;
        }
        .vn-choice-btn:last-child {
            margin-bottom: 0;
        }
    }
</style>
<script>
document.addEventListener('DOMContentLoaded', function() {
    const vnAvatar = document.getElementById('vnAvatar');
    const vnOverlay = document.getElementById('vnOverlay');
    const vnDialogue = document.getElementById('vnDialogue');
    const vnClose = document.getElementById('vnClose');
    const vnDialogueText = document.getElementById('vnDialogueText');
    const vnChoices = document.getElementById('vnChoices');
    const vnCharacterSprite = document.getElementById('vnCharacterSprite');
    const typeSound = document.getElementById('typeSound');
    const clickSound = document.getElementById('clickSound');
    const vnCallBtn = document.getElementById('vnCallBtn');
    const vnWhatsappBtn = document.getElementById('vnWhatsappBtn');
    const vnAIPageBtn = document.getElementById('vnAIPageBtn');
    const vnBackBtn = document.getElementById('vnBackBtn');
    const vnFixedActions = document.querySelector('.vn-fixed-actions');
    if (!vnAvatar || !vnOverlay || !vnDialogue || !vnClose || !vnDialogueText || 
        !vnChoices || !vnCharacterSprite || !vnCallBtn || !vnWhatsappBtn || 
        !vnAIPageBtn || !vnBackBtn || !vnFixedActions) {
        console.error('One or more chatbot elements not found');
        return;
    }
    const sprites = {
        normal: 'http://www.sevendestination.com/wp-content/uploads/2025/10/normal-e1761737225955.png',
        happy: 'http://www.sevendestination.com/wp-content/uploads/2025/10/happy-e1761737141423.png',
        excited: 'http://www.sevendestination.com/wp-content/uploads/2025/10/excited-e1761737091289.png',
        helpful: 'http://www.sevendestination.com/wp-content/uploads/2025/10/helpful-e1761737173245.png'
    };
    const dialogues = {
        greeting: {
            text: "Hello! I'm Saheli, your travel assistant from Seven Destination. How can I assist you today?",
            sprite: 'normal',
            choices: [
                { text: "Our Services", next: 'services' },
                { text: "Current Offers", next: 'offers' },
                { text: "Customer Reviews", next: 'reviews' },
                { text: "Share & Refer", next: 'share' },
                { text: "Help & Support", next: 'help' },
                { text: "About Us", next: 'about' }
            ]
        },
        services: {
            text: "We offer comprehensive travel services including tour packages, transportation, accommodation, and ticket booking. What would you like to know?",
            sprite: 'happy',
            choices: [
                { text: "Tour Packages", next: 'tour-info' },
                { text: "Transportation", next: 'transport-info' },
                { text: "Accommodation", next: 'accommodation-info' },
                { text: "Ticket Booking", next: 'ticket-info' },
                { text: "Back to Main", next: 'greeting' }
            ]
        },
        'tour-info': {
            text: "Our tour packages include guided experiences, cultural tours, adventure activities, and customized itineraries. All packages include accommodation and meals.",
            sprite: 'helpful',
            choices: [
                { text: "Booking Process", next: 'booking-process' },
                { text: "Pricing Info", next: 'pricing' },
                { text: "Back to Services", next: 'services' }
            ]
        },
        'transport-info': {
            text: "We provide car rentals, bus services, and flight arrangements. All vehicles are well-maintained with professional drivers for your safety.",
            sprite: 'helpful',
            choices: [
                { text: "Vehicle Options", next: 'vehicle-options' },
                { text: "Booking Process", next: 'booking-process' },
                { text: "Back to Services", next: 'services' }
            ]
        },
        'accommodation-info': {
            text: "We partner with verified hotels, resorts, and homestays across various categories. All accommodations are quality-checked for your comfort.",
            sprite: 'helpful',
            choices: [
                { text: "Hotel Categories", next: 'hotel-categories' },
                { text: "Booking Process", next: 'booking-process' },
                { text: "Back to Services", next: 'services' }
            ]
        },
        'ticket-info': {
            text: "We book flights, trains, and buses for your travel needs. We ensure the best prices and convenient scheduling for your journey.",
            sprite: 'helpful',
            choices: [
                { text: "Booking Process", next: 'booking-process' },
                { text: "Cancellation Policy", next: 'cancellation' },
                { text: "Back to Services", next: 'services' }
            ]
        },
        'booking-process': {
            text: "Our booking process is simple: 1) Select your service 2) Choose dates 3) Make payment 4) Receive confirmation. We assist at every step!",
            sprite: 'happy',
            choices: [
                { text: "Payment Options", next: 'payment' },
                { text: "Start Booking", action: 'start-booking' },
                { text: "Back", next: 'services' }
            ]
        },
        offers: {
            text: "We have exciting offers and discounts available! Save more on your travel with our current promotions.",
            sprite: 'excited',
            choices: [
                { text: "Seasonal Discounts", next: 'seasonal-offers' },
                { text: "Group Packages", next: 'group-offers' },
                { text: "Loyalty Rewards", next: 'loyalty-program' },
                { text: "Back to Main", next: 'greeting' }
            ]
        },
        'seasonal-offers': {
            text: "Enjoy up to 25% off on summer packages and 30% off on monsoon specials. Limited time offers with flexible booking dates.",
            sprite: 'excited',
            choices: [
                { text: "View Packages", action: 'view-packages' },
                { text: "Terms Apply", next: 'terms' },
                { text: "Back to Offers", next: 'offers' }
            ]
        },
        'group-offers': {
            text: "Travel with friends and family! Get 15% discount for groups of 4-7 people and 20% for groups of 8 or more.",
            sprite: 'happy',
            choices: [
                { text: "Group Packages", action: 'view-packages' },
                { text: "Booking Details", next: 'booking-process' },
                { text: "Back to Offers", next: 'offers' }
            ]
        },
        'loyalty-program': {
            text: "Join our loyalty program! Earn points with every booking and redeem them for discounts on future travels.",
            sprite: 'helpful',
            choices: [
                { text: "How to Join", next: 'loyalty-details' },
                { text: "Benefits", next: 'loyalty-benefits' },
                { text: "Back to Offers", next: 'offers' }
            ]
        },
        reviews: {
            text: "We value our customers' feedback! Read what travelers say about their experiences with Seven Destination.",
            sprite: 'happy',
            choices: [
                { text: "Read Reviews", next: 'read-reviews' },
                { text: "Write a Review", next: 'write-review' },
                { text: "Back to Main", next: 'greeting' }
            ]
        },
        'read-reviews': {
            text: "Our customers love us! With 4.8/5 average rating, travelers praise our professional service and value for money.",
            sprite: 'excited',
            choices: [
                { text: "View All Reviews", action: 'view-reviews' },
                { text: "Write a Review", next: 'write-review' },
                { text: "Back to Reviews", next: 'reviews' }
            ]
        },
        'write-review': {
            text: "We'd love to hear about your experience! Share your feedback to help us improve.",
            sprite: 'helpful',
            choices: [
                { text: "Submit Review", action: 'submit-review' },
                { text: "Back to Reviews", next: 'reviews' }
            ]
        },
        share: {
            text: "Love our services? Share Seven Destination with friends and family! Refer others and earn rewards.",
            sprite: 'excited',
            choices: [
                { text: "Refer Friends", next: 'refer-friends' },
                { text: "Share on Social", next: 'share-social' },
                { text: "Back to Main", next: 'greeting' }
            ]
        },
        'refer-friends': {
            text: "Refer friends and earn ₹500 for each successful booking! Your friend gets 10% off their first booking.",
            sprite: 'happy',
            choices: [
                { text: "Get Referral Code", action: 'get-referral' },
                { text: "Back to Share", next: 'share' }
            ]
        },
        'share-social': {
            text: "Share your travel experiences on social media! Tag us @SevenDestination and use #TravelWithSeven.",
            sprite: 'excited',
            choices: [
                { text: "Share on Facebook", action: 'share-facebook' },
                { text: "Share on Instagram", action: 'share-instagram' },
                { text: "Back to Share", next: 'share' }
            ]
        },
        help: {
            text: "I'm here to help you navigate our services and find the information you need.",
            sprite: 'helpful',
            choices: [
                { text: "Website Guide", next: 'website-guide' },
                { text: "FAQs", next: 'faq' },
                { text: "Contact Support", next: 'contact' },
                { text: "Back to Main", next: 'greeting' }
            ]
        },
        'website-guide': {
            text: "Our website is organized into sections: Services, Offers, Reviews, and Contact.",
            sprite: 'helpful',
            choices: [
                { text: "Services Section", action: 'navigate-services' },
                { text: "Offers Section", action: 'navigate-offers' },
                { text: "Reviews Section", action: 'navigate-reviews' },
                { text: "Contact Page", action: 'navigate-contact' },
                { text: "Back to Help", next: 'help' }
            ]
        },
        faq: {
            text: "Frequently asked questions: How to book? Payment options? Cancellation policy?",
            sprite: 'normal',
            choices: [
                { text: "Booking FAQ", next: 'booking-faq' },
                { text: "Payment FAQ", next: 'payment-faq' },
                { text: "Back to Help", next: 'help' }
            ]
        },
        'booking-faq': {
            text: "Booking FAQ: How far in advance to book? What documents are needed?",
            sprite: 'helpful',
            choices: [
                { text: "Start Booking", action: 'start-booking' },
                { text: "More FAQ", next: 'faq' }
            ]
        },
        'payment-faq': {
            text: "Payment FAQ: What payment methods are accepted? Is payment secure?",
            sprite: 'helpful',
            choices: [
                { text: "Payment Options", next: 'payment' },
                { text: "Back to FAQ", next: 'faq' }
            ]
        },
        about: {
            text: "Seven Destination is your trusted travel partner with years of experience.",
            sprite: 'happy',
            choices: [
                { text: "Our Mission", next: 'mission' },
                { text: "Why Choose Us", next: 'why-choose' },
                { text: "Contact Us", next: 'contact' },
                { text: "Back to Main", next: 'greeting' }
            ]
        },
        mission: {
            text: "Our mission is to make travel accessible, enjoyable, and memorable for everyone.",
            sprite: 'helpful',
            choices: [
                { text: "Why Choose Us", next: 'why-choose' },
                { text: "Back to About", next: 'about' }
            ]
        },
        'why-choose': {
            text: "Choose us for: Expert planning, 24/7 support, competitive prices, and memorable experiences.",
            sprite: 'excited',
            choices: [
                { text: "View Services", next: 'services' },
                { text: "Current Offers", next: 'offers' },
                { text: "Read Reviews", next: 'reviews' },
                { text: "Back to About", next: 'about' }
            ]
        },
        contact: {
            text: "We're here to help! Reach out to us through multiple channels for assistance.",
            sprite: 'helpful',
            choices: [
                { text: "Call Us", action: 'call' },
                { text: "WhatsApp", action: 'whatsapp' },
                { text: "Email Support", action: 'email' },
                { text: "Office Hours", next: 'office-hours' },
                { text: "Back to Main", next: 'greeting' }
            ]
        },
        'office-hours': {
            text: "We're available Monday to Saturday, 9 AM to 8 PM. For urgent assistance, please use WhatsApp.",
            sprite: 'normal',
            choices: [
                { text: "Call Now", action: 'call' },
                { text: "WhatsApp", action: 'whatsapp' },
                { text: "Back to Contact", next: 'contact' }
            ]
        },
        terms: {
            text: "Our terms and conditions cover booking policies, payment terms, and cancellation rules.",
            sprite: 'normal',
            choices: [
                { text: "Booking Terms", next: 'booking-terms' },
                { text: "Payment Terms", next: 'payment-terms' },
                { text: "Back to Main", next: 'greeting' }
            ]
        },
        'booking-terms': {
            text: "Booking terms: Advance payment required, confirmation within 24 hours, valid ID proof needed.",
            sprite: 'helpful',
            choices: [
                { text: "Start Booking", action: 'start-booking' },
                { text: "Full Terms", action: 'full-terms' },
                { text: "Back to Terms", next: 'terms' }
            ]
        },
        'payment-terms': {
            text: "Payment terms: Multiple payment methods accepted, installment options available.",
            sprite: 'helpful',
            choices: [
                { text: "Payment Options", next: 'payment' },
                { text: "Back to Terms", next: 'terms' }
            ]
        },
        cancellation: {
            text: "Cancellation policy: Free cancellation 48+ hours before, partial refund after 48 hours.",
            sprite: 'normal',
            choices: [
                { text: "Refund Policy", next: 'refund-policy' },
                { text: "Back to Main", next: 'greeting' }
            ]
        },
        'refund-policy': {
            text: "Refund policy: Refunds processed within 7-10 working days to original payment method.",
            sprite: 'normal',
            choices: [
                { text: "Back to Cancellation", next: 'cancellation' },
                { text: "Back to Main", next: 'greeting' }
            ]
        },
        payment: {
            text: "We accept credit/debit cards, net banking, UPI, wallets, and cash. Secure payment gateway.",
            sprite: 'helpful',
            choices: [
                { text: "Installment Options", next: 'installments' },
                { text: "Back to Main", next: 'greeting' }
            ]
        },
        installments: {
            text: "Installment options available for bookings above ₹10,000. Pay 50% now and 50% before travel.",
            sprite: 'happy',
            choices: [
                { text: "Start Booking", action: 'start-booking' },
                { text: "Back to Payment", next: 'payment' }
            ]
        },
        safety: {
            text: "Your safety is our priority. All partners verified, vehicles sanitized, 24/7 emergency support.",
            sprite: 'helpful',
            choices: [
                { text: "COVID Measures", next: 'covid-measures' },
                { text: "Back to Main", next: 'greeting' }
            ]
        },
        'covid-measures': {
            text: "COVID safety: Regular sanitization, masks available, social distancing maintained.",
            sprite: 'normal',
            choices: [
                { text: "Safety Measures", next: 'safety' },
                { text: "Book Now", action: 'start-booking' }
            ]
        },
        'booking-confirm': {
            text: "You've been redirected to our booking section. Please complete your details to confirm.",
            sprite: 'happy',
            choices: [
                { text: "Explore More Options", next: 'greeting' },
                { text: "View Other Services", next: 'services' },
                { text: "Contact Support", next: 'contact' }
            ]
        }
    };
    let currentState = 'greeting';
    let isOpen = false;
    let history = [];
    function playSound(sound, vol = 0.4) {
        try { sound.volume = vol; sound.currentTime = 0; sound.play(); } catch(e) {}
    }
    function typeText(text, el, cb) {
        el.innerHTML = '';
        let i = 0, int;
        function addTextWithLinks(text) {
            let processedText = text;
            if (text.includes('<a href=')) {
                return text;
            }
            processedText = processedText.replace(/(\+?\d{10,})/g, '<a href="tel:$1">$1</a>');
            processedText = processedText.replace(/WhatsApp\s+(\+?\d{10,})/gi, '<a href="https://wa.me/$1">WhatsApp $1</a>');
            processedText = processedText.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
            return processedText;
        }
        function t() {
            if (i < text.length) {
                el.innerHTML = addTextWithLinks(text.substring(0, i+1));
                i++;
                if (i % 2 == 0) playSound(typeSound);
                int = setTimeout(t, 40);
            } else {
                el.removeAttribute('aria-busy');
                highlightButtons(text);
                cb?.();
            }
        }
        const pause = () => { 
            clearTimeout(int); 
            el.innerHTML = addTextWithLinks(text); 
            el.removeAttribute('aria-busy'); 
            highlightButtons(text);
            cb?.(); 
        };
        document.addEventListener('click', pause, {once: true});
        document.addEventListener('keydown', pause, {once: true});
        el.setAttribute('aria-busy', 'true');
        t();
    }
    function highlightButtons(text) {
        document.querySelectorAll('.vn-action-btn').forEach(btn => {
            btn.classList.remove('highlight');
        });
        const lowerText = text.toLowerCase();
        if (lowerText.includes('whatsapp')) {
            setTimeout(() => vnWhatsappBtn.classList.add('highlight'), 100);
        }
        if (lowerText.includes('call')) {
            setTimeout(() => vnCallBtn.classList.add('highlight'), 100);
        }
        if (lowerText.includes('ai page') || lowerText.includes('ai')) {
            setTimeout(() => vnAIPageBtn.classList.add('highlight'), 100);
        }
    }
    function changeSprite(key) {
        const src = sprites[key] || sprites.normal;
        vnCharacterSprite.src = src;
        vnCharacterSprite.alt = `Travel Assistant (${key})`;
        vnCharacterSprite.style.opacity = '0.7';
        setTimeout(() => vnCharacterSprite.style.opacity = '1', 300);
    }
    function toggleVN(open) {
        isOpen = open;
        vnOverlay.classList.toggle('active', open);
        vnDialogue.classList.toggle('active', open);
        vnAvatar.classList.toggle('overlay-hidden', open);
        vnFixedActions.classList.toggle('visible', open);
        if (open) {
            vnDialogue.focus();
            if (history.length > 0) {
                vnBackBtn.classList.add('visible');
            } else {
                vnBackBtn.classList.remove('visible');
            }
        } else {
            vnAvatar.focus();
        }
    }
    function showDialogue(key) {
        const dlg = dialogues[key] || dialogues.greeting;
        if (currentState && key !== 'greeting') {
            if (!history.includes(currentState)) history.push(currentState);
            if (key === 'greeting') history = [];
        }
        currentState = key;
        changeSprite(dlg.sprite);
        vnDialogueText.setAttribute('aria-busy', 'true');
        vnChoices.innerHTML = '';
        if (history.length > 0) {
            vnBackBtn.classList.add('visible');
        } else {
            vnBackBtn.classList.remove('visible');
        }
        typeText(dlg.text, vnDialogueText, () => {
            dlg.choices.forEach((ch, idx) => {
                const btn = document.createElement('button');
                btn.className = 'vn-choice-btn';
                btn.textContent = ch.text;
                btn.tabIndex = idx === 0 ? 0 : -1;
                btn.onclick = e => { 
                    e.preventDefault(); 
                    playSound(clickSound); 
                    if (ch.action) {
                        handleAction(ch.action);
                    } else if (ch.next === 'back') {
                        const previousState = history.pop() || 'greeting';
                        showDialogue(previousState);
                    } else {
                        showDialogue(ch.next);
                    }
                };
                btn.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); } };
                vnChoices.appendChild(btn);
            });
            vnChoices.querySelector('.vn-choice-btn')?.focus();
        });
    }
    function handleAction(act) {
        playSound(clickSound);
        switch(act) {
            case 'call': window.open('tel:+918585858400', '_blank'); break;
            case 'whatsapp': window.open('https://wa.me/918585858400', '_blank'); break;
            case 'email': window.open('mailto:info@sevendestination.com', '_blank'); break;
            case 'ai-page': window.location.href = '#ai-page'; break;
            case 'start-booking': 
                document.querySelector('#booking')?.scrollIntoView({behavior: 'smooth'});
                showDialogue('booking-confirm');
                break;
            case 'view-packages': 
                document.querySelector('#packages')?.scrollIntoView({behavior: 'smooth'});
                showDialogue('booking-confirm');
                break;
            case 'navigate-services': 
                document.querySelector('#services')?.scrollIntoView({behavior: 'smooth'});
                showDialogue('booking-confirm');
                break;
            case 'navigate-offers': 
                document.querySelector('#offers')?.scrollIntoView({behavior: 'smooth'});
                showDialogue('booking-confirm');
                break;
            case 'navigate-reviews': 
                document.querySelector('#reviews')?.scrollIntoView({behavior: 'smooth'});
                showDialogue('booking-confirm');
                break;
            case 'navigate-contact': 
                document.querySelector('#contact')?.scrollIntoView({behavior: 'smooth'});
                showDialogue('booking-confirm');
                break;
            case 'full-terms': 
                document.querySelector('#terms')?.scrollIntoView({behavior: 'smooth'});
                showDialogue('booking-confirm');
                break;
            case 'signup': 
                document.querySelector('#signup')?.scrollIntoView({behavior: 'smooth'});
                showDialogue('booking-confirm');
                break;
            case 'view-reviews': 
                document.querySelector('#reviews')?.scrollIntoView({behavior: 'smooth'});
                showDialogue('booking-confirm');
                break;
            case 'submit-review': 
                document.querySelector('#review-form')?.scrollIntoView({behavior: 'smooth'});
                showDialogue('booking-confirm');
                break;
            case 'get-referral': 
                document.querySelector('#referral')?.scrollIntoView({behavior: 'smooth'});
                showDialogue('booking-confirm');
                break;
            case 'share-facebook': 
                window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href), '_blank');
                break;
            case 'share-instagram': 
                window.open('https://www.instagram.com/', '_blank');
                break;
            case 'share-twitter': 
                window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent('Check out Seven Destination for amazing travel experiences!') + '&url=' + encodeURIComponent(window.location.href), '_blank');
                break;
        }
    }
    vnAvatar.onclick = e => { 
        e.stopPropagation(); 
        playSound(clickSound); 
        toggleVN(true); 
        history = []; 
        showDialogue('greeting'); 
    };
    vnClose.onclick = e => { 
        e.stopPropagation(); 
        playSound(clickSound); 
        toggleVN(false); 
    };
    vnOverlay.onclick = e => { 
        if (e.target === vnOverlay) { 
            playSound(clickSound); 
            toggleVN(false); 
        } 
    };
    vnCallBtn.onclick = () => handleAction('call');
    vnWhatsappBtn.onclick = () => handleAction('whatsapp');
    vnAIPageBtn.onclick = () => handleAction('ai-page');
    vnBackBtn.onclick = () => {
        playSound(clickSound);
        const previousState = history.pop() || 'greeting';
        showDialogue(previousState);
    };
    document.onkeydown = e => { 
        if (e.key === 'Escape' && isOpen) {
            playSound(clickSound);
            toggleVN(false);
        }
    };
    vnAvatar.tabIndex = 0;
    vnAvatar.setAttribute('aria-label', 'Open VN Chat');
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'A' && e.target.closest('#vnDialogueText')) {
            e.preventDefault();
            const href = e.target.getAttribute('href');
            if (href.startsWith('tel:')) {
                window.open(href, '_blank');
            } else if (href.startsWith('https://wa.me/')) {
                window.open(href, '_blank');
            } else if (href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({behavior: 'smooth'});
                }
            } else {
                window.open(href, '_blank');
            }
        }
    });
    vnAvatar.classList.remove('overlay-hidden');
});
</script>
