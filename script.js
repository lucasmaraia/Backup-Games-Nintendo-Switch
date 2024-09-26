async function fetchApiKey() {
    try {
      const response = await fetch('apiKeyConfig.json');
      const data = await response.json();
      return data.apiKey;
    } catch (error) {
      console.error('Erro ao carregar a chave da API:', error);
      return null;
    }
  }
  const baseUrl = 'https://api.rawg.io/api/games';

  async function fetchGameDetails(gameTitle, descriptionElement, imageElement) {
    try {
      const apiKey = await fetchApiKey();  
      if (!apiKey) {
        descriptionElement.innerText = 'API key not found';
        return;
      }

      const response = await fetch(`${baseUrl}?key=${apiKey}&search=${encodeURIComponent(gameTitle)}`);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const game = data.results[0];
        descriptionElement.innerText =
          `Metacritic: ${game.metacritic}
             Data de lançamento: ${game.released}
             Gênero: ${game.genres[0].name}
            `
          || 'No description available';
        imageElement.src = game.background_image || './images/placeholder.png';
      } else {
        descriptionElement.innerText = 'Game not found';
      }
    } catch (error) {
      console.error('Error fetching game details:', error);
      descriptionElement.innerText = 'Error loading description';
    }
  }

  document.querySelectorAll('.card').forEach((card, index) => {
    const titleElement = card.querySelector('.card-title');
    const descriptionElement = card.querySelector('.card-text');
    const imageElement = card.querySelector('.card-img-top');

    const gameTitle = titleElement.innerText.trim();

    fetchGameDetails(gameTitle, descriptionElement, imageElement);
  });