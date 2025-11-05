// Espera que o DOM esteja pronto (a forma jQuery de fazer)
$(document).ready(function() {

    const DB_KEY = 'xss_demo_jquery'; // Chave do localStorage

    // --- 1. Função para carregar e mostrar as mensagens ---
    function loadComments() {
        // Limpa as listas
        $('#vulnerable-list').empty();
        $('#safe-list').empty();

        // Pega as mensagens do localStorage
        const comments = JSON.parse(localStorage.getItem(DB_KEY)) || [];

        // Itera por cada mensagem
        comments.forEach(comment => {
            
            // --- A) DEMONSTRAÇÃO VULNERÁVEL (O Ataque) ---
            const v_item = $('<div class="comment-item"></div>');
            
            // VULNERABILIDADE!
            // .html() do jQuery é o equivalente a .innerHTML
            // Interpreta a string como HTML e executa qualquer script.
            v_item.html(comment);
            $('#vulnerable-list').append(v_item);


            // --- B) DEMONSTRAÇÃO SEGURA (A Defesa) ---
            const s_item = $('<div class="comment-item"></div>');

            // CORREÇÃO!
            // .text() do jQuery é o equivalente a .textContent
            // Insere o conteúdo como texto puro, neutralizando o HTML.
            s_item.text(comment);
            $('#safe-list').append(s_item);
        });
    }

    // --- 2. Função para submeter uma nova mensagem ---
    function handleSubmit(e) {
        e.preventDefault(); 
        
        const newComment = $('#comment-input').val();
        if (newComment.trim() === '') return; 

        // Pega as mensagens antigas
        const comments = JSON.parse(localStorage.getItem(DB_KEY)) || [];
        
        // Adiciona a nova
        comments.push(newComment);
        
        // Guarda no localStorage
        localStorage.setItem(DB_KEY, JSON.stringify(comments));

        // Limpa o campo
        $('#comment-input').val('');

        // Recarrega as listas
        loadComments();
    }

    // --- 3. Função para limpar o mural ---
    function clearStorage() {
        localStorage.removeItem(DB_KEY);
        loadComments();
    }

    // --- 4. Ligar os eventos ---
    $('#comment-form').on('submit', handleSubmit);
    $('#clear-button').on('click', clearStorage);

    // Carrega as mensagens guardadas assim que a página abre
    loadComments();
});