document.addEventListener('DOMContentLoaded', function() {
    const produtoForm = document.getElementById('produtoForm');
    const listaProdutos = document.getElementById('listaProdutos');
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    function salvarProdutos() {
        localStorage.setItem('produtos', JSON.stringify(produtos));
    }

    function atualizarLista() {
        listaProdutos.innerHTML = '';
        produtos.forEach((produto, index) => {
            const li = document.createElement('li');
            li.textContent = `${produto.nome} - R$ ${produto.valor.toFixed(2)}`;

            const editarBtn = document.createElement('button');
            editarBtn.textContent = 'Editar';
            editarBtn.classList.add('editar-btn');
            editarBtn.onclick = () => editarProduto(index);

            const deletarBtn = document.createElement('button');
            deletarBtn.textContent = 'Deletar';
            deletarBtn.onclick = () => deletarProduto(index);

            li.appendChild(editarBtn);
            li.appendChild(deletarBtn);
            listaProdutos.appendChild(li);
        });
    }

    function adicionarProduto(event) {
        event.preventDefault();
        const nomeProduto = document.getElementById('nomeProduto').value;
        const valorProduto = parseFloat(document.getElementById('valorProduto').value);

        produtos.push({ nome: nomeProduto, valor: valorProduto });
        salvarProdutos();
        atualizarLista();

        produtoForm.reset();
    }

    function editarProduto(index) {
        const novoNome = prompt('Novo nome do produto:', produtos[index].nome);
        const novoValor = parseFloat(prompt('Novo valor do produto:', produtos[index].valor));

        if (novoNome && !isNaN(novoValor)) {
            produtos[index] = { nome: novoNome, valor: novoValor };
            salvarProdutos();
            atualizarLista();
        }
    }

    function deletarProduto(index) {
        produtos.splice(index, 1);
        salvarProdutos();
        atualizarLista();
    }

    produtoForm.addEventListener('submit', adicionarProduto);
    atualizarLista();
});
