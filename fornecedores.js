document.addEventListener('DOMContentLoaded', function () {
    const fornecedorForm = document.getElementById('fornecedorForm');
    const listaFornecedores = document.getElementById('listaFornecedores');
    let fornecedores = JSON.parse(localStorage.getItem('fornecedores')) || [];

    function salvarFornecedores() {
        localStorage.setItem('fornecedores', JSON.stringify(fornecedores));
    }

    function atualizarLista() {
        listaFornecedores.innerHTML = '';
        fornecedores.forEach((fornecedor, index) => {
            const li = document.createElement('li');
            li.textContent = `${fornecedor.nome}, ${fornecedor.contato}`;

            const editarBtn = document.createElement('button');
            editarBtn.textContent = 'Editar';
            editarBtn.classList.add('editar-btn');
            editarBtn.onclick = () => editarFornecedor(index);

            const deletarBtn = document.createElement('button');
            deletarBtn.textContent = 'Deletar';
            deletarBtn.onclick = () => deletarFornecedor(index);

            li.appendChild(editarBtn);
            li.appendChild(deletarBtn);
            listaFornecedores.appendChild(li);
        });
    }

    function adicionarFornecedor(event) {
        event.preventDefault();
        const nomeFornecedor = document.getElementById('nomeFornecedor').value;
        const contatoFornecedor = document.getElementById('contatoFornecedor').value;

        fornecedores.push({ nome: nomeFornecedor, contato: contatoFornecedor });
        salvarFornecedores();
        atualizarLista();

        fornecedorForm.reset();
    }

    function editarFornecedor(index) {
        const novoNome = prompt('Novo nome do fornecedor:', fornecedores[index].nome);
        const novoContato = prompt('Novo contato do fornecedor:', fornecedores[index].contato);

        if (novoNome && novoContato) {
            fornecedores[index] = { nome: novoNome, contato: novoContato };
            salvarFornecedores();
            atualizarLista();
        }
    }

    function deletarFornecedor(index) {
        fornecedores.splice(index, 1);
        salvarFornecedores();
        atualizarLista();
    }

    fornecedorForm.addEventListener('submit', adicionarFornecedor);
    atualizarLista();
});
