const API_KEY = "0fb375265f9f6cdb24fe6d1a5dd0fdda";
const LEAGUE_ID = 71; // Brasileirão Série A
const SEASON = 2025; // Temporada com dados disponíveis

async function carregarResultados() {
    const container = document.getElementById('jogos-container');
    const url = `https://v3.football.api-sports.io/fixtures?league=${LEAGUE_ID}&season=${SEASON}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "x-apisports-key": API_KEY
            }
        });

        console.log("Status da resposta:", response.status);
        console.log("URL chamada:", url);
        
        if (!response.ok) {
            container.innerHTML = `<p>Erro HTTP ${response.status} na requisição.</p>`;
            console.error("Erro HTTP:", response.status, response.statusText);
            return;
        }

        const data = await response.json();
        console.log("Resposta completa da API:", data);
        
        if (!data.response) {
            container.innerHTML = "<p>Erro: API retornou resposta inválida.</p>";
            console.error("Estrutura da resposta incorreta:", data);
            return;
        }
        
        const listaDeJogos = data.response;

        // Limpa o container antes de inserir os dados
        container.innerHTML = "";

        if (listaDeJogos.length === 0) {
            container.innerHTML = "<p>Nenhum jogo encontrado para esta temporada.</p>";
            console.warn("Nenhum jogo retornado pela API para season:", SEASON, "league:", LEAGUE_ID);
            return;
        }

        // Criando os cards para cada jogo
        listaDeJogos.forEach(partida => {
            const card = document.createElement('div');
            card.className = 'card-jogo';

            card.innerHTML = `
                <div class="confronto">
                    <div class="time">
                        <img src="${partida.teams.home.logo}" alt="${partida.teams.home.name}">
                        <span>${partida.teams.home.name}</span>
                    </div>
                    
                    <div class="placar">
                        ${partida.goals.home ?? 0} - ${partida.goals.away ?? 0}
                    </div>

                    <div class="time">
                        <img src="${partida.teams.away.logo}" alt="${partida.teams.away.name}">
                        <span>${partida.teams.away.name}</span>
                    </div>
                </div>
                <div class="status-jogo">
                    ${partida.fixture.status.long}
                </div>
            `;
            container.appendChild(card);
        });

    } catch (error) {
        container.innerHTML = "<p>Erro ao carregar dados. Verifique sua conexão ou limite da API.</p>";
        console.error("Erro na requisição:", error);
    }
}

// Inicia a busca assim que o script for lido
carregarResultados();