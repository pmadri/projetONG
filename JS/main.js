// Recupera as necessidades do localStorage como array
function getNecessidades() {
    return JSON.parse(localStorage.getItem('necessidades')) || [];
}

// Renderiza os cartões das necessidades
function renderCards() {
    const cardsList = document.getElementById('cartoesLista');
    if (!cardsList) return;

    const necessidades = getNecessidades();

    if (necessidades.length === 0) {
        cardsList.innerHTML = "<p>Nenhuma necessidade cadastrada ainda.</p>";
        return;
    }

    cardsList.innerHTML = necessidades.map(n => `
        <div class="card">
            <h3>${n.nome}</h3>
            <p><strong>Tipo de ajuda:</strong> ${n.tipo}</p>
            <p><strong>Título:</strong> ${n.titulo}</p>
            <p><strong>Descrição:</strong> ${n.descricao}</p>
            <p><strong>Endereço:</strong> ${n.rua}, ${n.numero} - ${n.bairro}, ${n.cidade} - ${n.estado}</p>
            <p><strong>CEP:</strong> ${n.cep}</p>
            <p><strong>Email:</strong> ${n.email}</p>
            <p><strong>Telefone:</strong> ${n.telefone}</p>
        </div>
    `).join('');
}

window.onload = renderCards;