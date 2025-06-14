'use strict'; // Modo restrito

// Consumo de API ViaCEP


// Verifica se o CEP é válido
const eNumero = (numero) => /^[0-9]+$/.test(numero); //Expressão Regular
const cepValido = (cep) => cep.length == 8 && eNumero(cep);

// Consumo de API viaCEP
//Consumindo API
const pesquisarCep = async() => {
    limparFormulario();
    const url = `https://viacep.com.br/ws/${document.getElementById('cep').value}/json/`;
    if(cepValido(cep.value)){
        const dados = await fetch(url); //await = esperar fetch = promessa
        const addres = await dados.json(); 
        
        // hasOwnProperty  retorna um booleano indicando se o objeto possui a propriedade especificada como uma propriedade definida no próprio objeto em questão
        if(addres.hasOwnProperty('erro')){ 
            alert('CEP não encontrado!');
        }else {
            preencherFormulario(addres);
        }
    }else{
        alert('CEP incorreto!');
    } 
}

// Função para limpar formulário
const limparFormulario = () => {
    document.getElementById('rua').value = '';
    document.getElementById('numero').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}

// Função para preencher o formulário
const preencherFormulario = (endereco) => {
    document.getElementById('rua').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.estado;
}

document.getElementById('cep').addEventListener('focusout', pesquisarCep);

// Função para cadastrar necessidade
document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const necessidade = {
        nome: document.getElementById('nome').value,
        tipo: document.getElementById('tipo').value,
        titulo: document.getElementById('titulo').value,
        descricao: document.getElementById('descricao').value,
        cep: document.getElementById('cep').value,
        rua: document.getElementById('rua').value,
        numero: document.getElementById('numero').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value
    };

    const necessidades = JSON.parse(localStorage.getItem('necessidades')) || [];
    necessidades.push(necessidade);
    localStorage.setItem('necessidades', JSON.stringify(necessidades));

    alert('Necessidade cadastrada com sucesso!');
    this.reset();
});