// Espera que a página HTML esteja completamente carregada
window.onload = function() {
    try {
        // Pega os parâmetros da URL (ex: ?nome=...)
        const params = new URLSearchParams(window.location.search);
        
        // Pega o valor do parâmetro 'nome'
        // Se não houver, usa "[O seu nome aqui]" como padrão
        const userInput = params.get('nome') || "[O seu nome aqui]";

        // --- O ATAQUE ---
        // Pega o elemento vulnerável
        const vulnerableEl = document.getElementById('vulnerable-output');
        
        // VULNERABILIDADE: .innerHTML
        // O navegador vai ler a string 'userInput' como HTML.
        // Se for '<img src=x ...>', ele vai tentar renderizar uma imagem.
        // O evento 'onerror' será executado como JavaScript.
        vulnerableEl.innerHTML = `Olá, ${userInput}`;

        // --- A DEFESA ---
        // Pega o elemento seguro
        const safeEl = document.getElementById('safe-output');
        
        // CORREÇÃO: .textContent
        // O navegador vai tratar a string 'userInput' como TEXTO puro.
        // Os caracteres '<' e '>' serão mostrados na tela,
        // mas não serão interpretados como tags HTML.
        safeEl.textContent = `Olá, ${userInput}`;

    } catch (e) {
        console.error("Erro ao executar a demo:", e);
        // Lida com erros (ex: se o URLSearchParams não for suportado)
    }
};