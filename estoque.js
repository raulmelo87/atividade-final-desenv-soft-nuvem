document.addEventListener('DOMContentLoaded', function () {
    const estoqueForm = document.getElementById('estoqueForm');
    const listaEstoque = document.getElementById('listaEstoque');
    let estoque = JSON.parse(localStorage.getItem('estoque')) || [];

    function salvarEstoque() {
        localStorage.setItem('estoque', JSON.stringify(estoque));
    }

    function atualizarLista() {
        listaEstoque.innerHTML = '';
        estoque.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.nome} - Quantidade: ${item.quantidade}`;

            const editarBtn = document.createElement('button');
            editarBtn.textContent = 'Editar';
            editarBtn.classList.add('editar-btn');
            editarBtn.onclick = () => editarItem(index);

            const deletarBtn = document.createElement('button');
            deletarBtn.textContent = 'Deletar';
            deletarBtn.onclick = () => deletarItem(index);

            li.appendChild(editarBtn);
            li.appendChild(deletarBtn);
            listaEstoque.appendChild(li);
        });
    }

    function adicionarItem(event) {
        event.preventDefault();
        const nomeItem = document.getElementById('nomeItem').value;
        const quantidadeItem = parseInt(document.getElementById('quantidadeItem').value);

        estoque.push({ nome: nomeItem, quantidade: quantidadeItem });
        salvarEstoque();
        atualizarLista();

        estoqueForm.reset();
    }

    function editarItem(index) {
        const novoNome = prompt('Novo nome do item:', estoque[index].nome);
        const novaQuantidade = parseInt(prompt('Nova quantidade do item:', estoque[index].quantidade));

        if (novoNome && !isNaN(novaQuantidade)) {
            estoque[index] = { nome: novoNome, quantidade: novaQuantidade };
            salvarEstoque();
            atualizarLista();
        }
    }

    function deletarItem(index) {
        estoque.splice(index, 1);
        salvarEstoque();
        atualizarLista();
    }

    estoqueForm.addEventListener('submit', adicionarItem);
    atualizarLista();
});