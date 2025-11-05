Explicação Simplificada: O que Fizemos Nestes Demos

Em resumo, nós criámos propositadamente três pequenos "sites" vulneráveis para demonstrar como um hacker pode injetar código malicioso (um ataque XSS) e, mais importante, como é incrivelmente fácil prevenir esse ataque.

1. O Que é o Ataque XSS?

XSS (Cross-Site Scripting) é uma técnica onde um atacante "injeta" um script (normalmente JavaScript) numa página web que não lhe pertence.

O objetivo é enganar o navegador de um visitante inocente para que ele execute esse script malicioso, pensando que faz parte do site original.

2. O Nosso "Script Malicioso" (O Payload)

Para a nossa demonstração, o nosso "ataque" foi inofensivo. Usámos este código:

<img src=x onerror=alert('XSS ATIVADO!')>

Tradução disto:

<img src=x ...>: Tenta carregar uma imagem que não existe (chamada "x").

onerror=...: Como a imagem vai falhar ao carregar, o navegador é instruído a "fazer isto em caso de erro".

alert('...'): A ação que ele executa é mostrar um popup de alerta.

Num ataque real, em vez de um alert, o código malicioso poderia ser invisível e fazer coisas como:

Roubar a sua password ou cookies de sessão.

Redirecionar o utilizador para um site falso.

Modificar o conteúdo da página (ex: mudar o botão "Transferir" do seu banco).

3. A Batalha: A Falha vs. A Correção

Em todos os nossos exemplos, a demonstração foi a mesma: mostrámos duas caixas, uma vulnerável e uma segura.

💣 A FALHA (O Lado Vulnerável)

Comandos Usados: elemento.innerHTML (JavaScript Puro) ou $(elemento).html() (jQuery).

O que faz: Diz ao navegador: "Pega neste texto e interpreta-o como se fosse código HTML."

Resultado: Quando demos ao navegador o nosso payload (<img...), ele obedeceu, tentou carregar a imagem, falhou, e executou o nosso alerta. O ataque funcionou.

✅ A CORREÇÃO (O Lado Seguro)

Comandos Usados: elemento.textContent (JavaScript Puro) ou $(elemento).text() (jQuery).

O que faz: Diz ao navegador: "Pega neste texto e trata-o apenas como texto. Não o interpretes como código."

Resultado: Quando demos ao navegador o nosso payload (<img...), ele não o executou. Em vez disso, mostrou o "código-fonte" do ataque na tela de forma inofensiva. O ataque falhou.

4. Os Nossos Diferentes Demos (Sem Servidor)

Fizemos isto de duas maneiras diferentes para mostrar como o ataque pode acontecer, ambas sem precisar de XAMPP ou Node.js:

Demo 1 (HTML/JS - xss-demo-facil.js)

Tipo de Ataque: XSS Refletido (DOM-based).

Como Funciona: O payload malicioso vinha da URL (?nome=<img...). O JavaScript lia o ataque da URL e inseria-o na página. Este ataque só funciona se a vítima clicar num link malicioso.

Demo 3 e 4 (localStorage / jQuery)

Tipo de Ataque: XSS Armazenado (Stored XSS), simulado.

Como Funciona: O payload era guardado no localStorage (a "base de dados" do navegador).

Isto é muito mais perigoso, porque o ataque fica "guardado" na página. Qualquer pessoa que visitasse a página (mesmo sem um link especial) veria o popup de alerta, porque o script carregava o payload malicioso da "base de dados" sempre que a página era aberta.

A lição principal de todo o projeto é: NUNCA confie na entrada do utilizador. Sempre use .textContent (ou .text()) para inserir dados, a menos que saiba exatamente o que está a fazer.