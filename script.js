async function searchAnime() {
    const query = document.getElementById('searchInput').value;
    if (!query) return;

    const container = document.getElementById('animeContainer');
    container.innerHTML = '<div class="terminal-prompt">SCANNING DATABASE...</div>';

    try {
        const response = await fetch(`https://jikan.moe{query}&limit=1`);
        const data = await response.json();

        if (data.data && data.data.length > 0) {
            displayAnime(data.data[0]); // Access the top query match
        } else {
            container.innerHTML = '<div class="terminal-prompt">ERROR: DATA_NOT_FOUND</div>';
        }
    } catch (error) {
        console.error('Data link failed:', error);
        container.innerHTML = '<div class="terminal-prompt">SYSTEM_ERROR: LINK_SEVERED</div>';
    }
}

function displayAnime(anime) {
    const container = document.getElementById('animeContainer');
    
    // Clean up empty data variables
    const title = anime.title;
    const img = anime.images.jpg.large_image_url || anime.images.jpg.image_url;
    const score = anime.score ? `SYS_SCORE: ${anime.score}` : 'SCORE: N/A';
    const episodes = anime.episodes ? `EPISODES: ${anime.episodes}` : 'EPISODES: ACTIVE';
    const status = anime.status ? `STATUS: ${anime.status}` : 'STATUS: UNKNOWN';
    const synopsis = anime.synopsis || "No data patch available for this file entry.";

    container.innerHTML = `
        <article class="anime-card">
            <div class="img-container">
                <img src="${img}" alt="${title}">
            </div>
            <div class="anime-info">
                <h2>${title}</h2>
                <div class="stats-grid">
                    <span class="stat-tag">${score}</span>
                    <span class="stat-tag">${episodes}</span>
                    <span class="stat-tag">${status}</span>
                </div>
                <p class="synopsis">${synopsis}</p>
            </div>
        </article>
    `;
}
