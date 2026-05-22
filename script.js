async function searchAnime() {
    const query = document.getElementById('searchInput').value.trim();
    if (!query) return;

    const container = document.getElementById('animeContainer');
    container.innerHTML = '<div class="terminal-prompt">SCANNING NETWORK SUB-CHANNELS...</div>';

    // Instantly modify external node buttons to target this query search index
    updatePortalNodes(query);

    try {
        // Safe, encoded structural lookup execution
        const response = await fetch(`https://jikan.moe{encodeURIComponent(query)}&limit=5`);
        
        if (!response.ok) {
            throw new Error(`Server returned network status code: ${response.status}`);
        }
        
        const result = await response.json();

        if (result.data && result.data.length > 0) {
            const topMatch = result.data[0]; 
            displayAnime(topMatch); 
        } else {
            container.innerHTML = '<div class="terminal-prompt">ERROR: DATA_NOT_FOUND // ADJUST QUERY</div>';
        }
    } catch (error) {
        console.error('Data link failed:', error);
        
        // Advanced Fallback Interface Prompt: Permits manual portal overrides if connection times out
        container.innerHTML = `
            <div class="terminal-prompt" style="color: var(--neon-pink); border-color: var(--neon-pink);">
                NETWORK OVERLOAD: API_LINK_SEVERED <br><br>
                <span style="color:#fff; font-size:0.95rem;">
                    The global info database is rate-limiting requests. Use the left EXTERNAL_NODES panel to access direct files on HiAnime or Crunchyroll for "${query}" right now.
                </span>
            </div>
        `;
    }
}

function updatePortalNodes(searchQuery) {
    const formattedQuery = encodeURIComponent(searchQuery);
    
    // Direct routing filters to instantly land on search pages of third-party platforms
    document.getElementById('hianimeLink').href = `https://hianime.to{formattedQuery}`;
    document.getElementById('crunchyLink').href = `https://crunchyroll.com{formattedQuery}`;
    document.getElementById('aniwaveLink').href = `https://aniwave.to{formattedQuery}`;
}

function displayAnime(anime) {
    const container = document.getElementById('animeContainer');
    
    const title = anime.title || "UNKNOWN_ENTRY";
    const img = anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url || "";
    const score = anime.score ? `CORE_SCORE: ${anime.score}` : 'SCORE: OFFLINE';
    const episodes = anime.episodes ? `EPISODES: ${anime.episodes}` : 'EPISODES: UNKNOWN';
    const status = anime.status ? `STATUS: ${anime.status}` : 'STATUS: SPECULATIVE';
    const type = anime.type ? `FORMAT: ${anime.type}` : 'FORMAT: N/A';
    const synopsis = anime.synopsis || "No structured database entry patch has been committed for this visual asset file.";

    container.innerHTML = `
        <article class="anime-card">
            <div class="img-container">
                <img src="${img}" alt="${title}">
            </div>
            <div class="anime-info">
                <h2>${title}</h2>
                <div class="stats-grid">
                    <span class="stat-tag" style="color: var(--neon-pink); border-color: var(--neon-pink);">${type}</span>
                    <span class="stat-tag">${score}</span>
                    <span class="stat-tag">${episodes}</span>
                    <span class="stat-tag">${status}</span>
                </div>
                <div class="synopsis-box">
                    <h4>SYSTEM_SYNOPSIS_FILE</h4>
                    <p class="synopsis">${synopsis}</p>
                </div>
            </div>
        </article>
    `;
}
