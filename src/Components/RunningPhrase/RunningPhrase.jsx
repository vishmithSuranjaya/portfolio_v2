import React, { useState, useEffect } from 'react';

/**
 * A component that fetches a random programming quote and displays it in a continuous marquee effect.
 * It uses the Programming Quotes API and is accessible (pauses on hover/focus and respects reduced motion).
 */
const DynamicRunningPhrase = ({ 
    speed = 20, 
    className = '', 
    direction = 'left' 
}) => {
    // State to hold the fetched quote (text and author)
    const [phrase, setPhrase] = useState('Loading daily inspirational quote...');
    const [loading, setLoading] = useState(true);

    // API endpoint for a random programming quote
    const apiURL = 'https://programming-quotesapi.vercel.app/api/random';

    useEffect(() => {
        const MAX_RETRIES = 3;

        const fetchQuote = async (attempt = 0) => {
            try {
                const response = await fetch(apiURL);
                
                if (!response.ok) {
                    // Treat non-200 responses as transient errors that can be retried
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                
                // --- Data Validation ---
                if (!data || typeof data.quote !== 'string' || typeof data.author !== 'string') {
                    // If data is missing fields or types are wrong, throw to trigger retry/error state
                    throw new Error('Received invalid or incomplete quote data from API.');
                }
                // -----------------------------
                
                // Construct the full phrase: "Quote text" — Author Name
                const fullQuote = `"${data.quote}" — ${data.author}`;
                setPhrase(fullQuote);
                setLoading(false);
                
            } catch (error) {
                // Check if we should retry
                if (attempt < MAX_RETRIES) {
                    const delay = Math.pow(2, attempt) * 1000; // Exponential backoff (1s, 2s, 4s)
                    
                    // Use setTimeout for retry with exponential backoff
                    setTimeout(() => fetchQuote(attempt + 1), delay);
                } else {
                    // All retries failed
                    console.error('Error fetching dynamic quote after all retries:', error);
                    setPhrase('Error loading quote: Failed to connect to API after multiple attempts.');
                    setLoading(false);
                }
            }
        };

        fetchQuote();
    }, [apiURL]);

    // Set a minimum speed for the animation to prevent motion sickness
    const animationDuration = `${Math.max(15, speed)}s`; 

    // Determine the text to use in the marquee
    const textToDisplay = phrase;

    return (
        <div className={`w-full overflow-hidden bg-[#0f172a] py-3 ${className}`}>
            {/* Offscreen element for screen readers: displays the non-moving, final quote */}
            <span 
                style={{position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden'}} 
                aria-hidden="false"
            >
                {loading ? 'Loading...' : textToDisplay}
            </span>

            {/* Marquee effect container */}
            <div className="marquee" aria-hidden="true">
                <div
                    className={`marquee__track ${direction === 'right' ? 'marquee__track--right' : 'marquee__track--left'}`}
                    style={{ animationDuration: animationDuration }}
                >
                    {/* The content is duplicated for a seamless loop */}
                    <div className="marquee__item">{textToDisplay}</div>
                    <div className="marquee__item">{textToDisplay}</div>
                </div>
            </div>

            {/* Injected CSS for Marquee styling and animation */}
            <style>{`
                .marquee { 
                    position: relative; 
                    width: 100%; 
                    overflow: hidden; 
                    /* --- FIX: Fading Mask for Smooth Start and End --- */
                    /* The mask fades the text opacity from 0% (transparent) to 5% (fully opaque/black) and back at the end. */
                    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
                    mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
                    /* ------------------------------------------------ */
                }
                .marquee__track { 
                    display: inline-flex; 
                    white-space: nowrap; 
                    will-change: transform; 
                }
                .marquee__item { 
                    /* Standard spacing between duplicated items */
                    display: inline-block; 
                    padding-right: 6rem; 
                    color: #cbd5e1; 
                    font-weight: 500; 
                }

                /* FIX 1: Apply padding-left to the first item to push it 100vw off-screen.
                   This ensures the first letter starts from the corner. */
                .marquee__track > .marquee__item:first-child {
                    padding-left: 100vw;
                }
                
                /* FIX 2: Revert keyframes to the reliable 0% to -50% loop.
                   The padding-left now handles the smooth start by creating the initial offset. */
                @keyframes marquee-left {
                    /* Standard loop translation: Start at 0%, End at -50% */
                    0% { transform: translateX(0%); } 
                    100% { transform: translateX(-50%); } 
                }

                @keyframes marquee-right {
                    /* Standard rightward loop */
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0%); }
                }

                .marquee__track {
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                    animation-play-state: running;
                    display: inline-flex;
                    white-space: nowrap;
                    will-change: transform;
                }

                .marquee__track--left { animation-name: marquee-left; }
                .marquee__track--right { animation-name: marquee-right; }

                /* Pause on hover/focus for accessibility */
                .marquee:hover .marquee__track,
                .marquee:focus-within .marquee__track {
                    animation-play-state: paused;
                }

                /* Respect user preference for reduced motion */
                @media (prefers-reduced-motion: reduce) {
                    .marquee__track { animation: none !important; }
                }

                /* Responsive font sizing */
                .marquee__item { font-size: 0.95rem; }
                @media (min-width: 640px) { .marquee__item { font-size: 1.02rem; } }
                @media (min-width: 1024px) { .marquee__item { font-size: 1.08rem; } }
            `}</style>
        </div>
    );
};

export default DynamicRunningPhrase;