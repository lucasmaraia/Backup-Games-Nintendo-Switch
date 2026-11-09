# Backup-Games-Nintendo-Switch

Catálogo web dos meus backups de save de Nintendo Switch. A página monta um card por jogo e busca automaticamente a capa, a nota do Metacritic, a data de lançamento e o gênero na API do RAWG.

> Projeto pessoal (setembro/2024). A ideia era não ter que manter o catálogo à mão: o HTML só declara o título de cada jogo e o resto das informações vem da API.

## Stack

- HTML, CSS e JavaScript puro
- [RAWG Video Games Database API](https://rawg.io/apidocs)

## Como funciona

Na carga da página, o script percorre todos os elementos `.card`, lê o título do jogo em `.card-title` e consulta a API do RAWG:

```
https://api.rawg.io/api/games?key={apiKey}&search={título}
```

O primeiro resultado da busca preenche a imagem (`.card-img-top`) e o texto do card (`.card-text`) com Metacritic, data de lançamento e gênero. Jogos não encontrados exibem `Game not found`; falhas de rede exibem `Error loading description`.

Os arquivos de save ficam em `saves/`, um `.rar` por jogo.

## Configuração

A chave da API é lida de `apiKeyConfig.json`, que vem no repositório com o campo vazio:

```json
{
   "apiKey": "SUA_CHAVE_AQUI"
}
```

Pegue uma chave gratuita em <https://rawg.io/apidocs> e preencha o arquivo.

## Como rodar

O script busca o `apiKeyConfig.json` com `fetch`, então abrir o `index.html` direto do disco (`file://`) não funciona — é preciso servir a pasta por HTTP:

```bash
python -m http.server 8000
```

Acesse <http://localhost:8000>.

## Observações

- A chave da API fica exposta no cliente: qualquer visitante da página pode lê-la no `apiKeyConfig.json`. Para um site publicado, a consulta deveria passar por um back-end que guarda a chave. Como uso local, serve.
- A busca pega sempre o primeiro resultado, o que erra em jogos com títulos ambíguos ou com várias edições.
- Os saves são arquivos `.rar` e exigem um extrator compatível. Cada um precisa ser restaurado na Switch com a ferramenta apropriada (JKSV, Checkpoint ou similar) — este repositório é apenas o armazenamento e o catálogo.
