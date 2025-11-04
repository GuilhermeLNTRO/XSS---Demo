**O que é XSS**
O XSS (Cross-Site Scripting) ocorre quando um invasor consegue injetar scripts maliciosos (geralmente JavaScript) em páginas web visualizadas por outros usuários. Existem três tipos principais:

Refletido: O payload (código malicioso) é enviado na requisição (ex: URL) e "refletido" na resposta do servidor para o navegador.

Armazenado: O payload é armazenado permanentemente (ex: banco de dados, comentário) e servido a todos que visualizarem a página.

Baseado em DOM: A vulnerabilidade reside no código JavaScript do lado do cliente que processa dados não validados (ex: de uma URL) e os insere no DOM (Document Object Model).
