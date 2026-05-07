
const API_KEY = '03cce5cd34b218d306f0f7280189b2e9';
const API_URL = 'https://v3.football.api-sports.io/fixtures';

async function fetchJogos() {
    try {
        const response = await fetch(`${API_URL}?league=71&season=2024`, {
            method: 'GET',
            headers: {
                'x-apisports-key': API_KEY
            }
        });
        if (!response.ok) {
            throw new Error('Erro na API: ' + response.status);
        }
        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('Erro ao buscar jogos:', error);
        return [];
    }
}

function renderJogos(jogos) {
    const container = document.getElementById('jogos-container');
    container.innerHTML = '';
    if (jogos.length === 0) {
        container.innerHTML = '<p>Não há jogos disponíveis no momento.</p>';
        return;
    }
    jogos.forEach(jogo => {
        const card = document.createElement('div');
        card.className = 'card-jogo';
        
        const confronto = document.createElement('div');
        confronto.className = 'confronto';
        
        const timeCasa = document.createElement('div');
        timeCasa.className = 'time';
        timeCasa.innerHTML = `
            <img src="${jogo.teams.home.logo}" alt="${jogo.teams.home.name}" onerror="this.src='../imgs/default-team.png'">
            <span>${jogo.teams.home.name}</span>
        `;
        
        const placar = document.createElement('div');
        placar.className = 'placar';
        placar.textContent = (jogo.goals.home !== null && jogo.goals.away !== null) ? `${jogo.goals.home} - ${jogo.goals.away}` : 'vs';
        
        const timeFora = document.createElement('div');
        timeFora.className = 'time';
        timeFora.innerHTML = `
            <img src="${jogo.teams.away.logo}" alt="${jogo.teams.away.name}" onerror="this.src='../imgs/default-team.png'">
            <span>${jogo.teams.away.name}</span>
        `;
        
        confronto.appendChild(timeCasa);
        confronto.appendChild(placar);
        confronto.appendChild(timeFora);
        
        const status = document.createElement('div');
        status.className = 'status-jogo';
        status.textContent = jogo.fixture.status.long;
        
        card.appendChild(confronto);
        card.appendChild(status);
        
        container.appendChild(card);
    });
}

window.onload = async () => {
    const jogos = await fetchJogos();
    renderJogos(jogos);
};