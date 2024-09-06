document.addEventListener('DOMContentLoaded', function() {
    const clienteForm = document.getElementById('clienteForm');
    const listaClientes = document.getElementById('listaClientes');
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];

    function salvarClientes() {
        localStorage.setItem('clientes', JSON.stringify(clientes));
    }

    function atualizarLista() {
        listaClientes.innerHTML = '';
        clientes.forEach((cliente, index) => {
            const li = document.createElement('li');
            li.textContent = `${cliente.nome}, ${cliente.telefone}`;

            const editarBtn = document.createElement('button');
            editarBtn.textContent = 'Editar';
            editarBtn.classList.add('editar-btn');
            editarBtn.onclick = () => editarCliente(index);

            const deletarBtn = document.createElement('button');
            deletarBtn.textContent = 'Deletar';
            deletarBtn.onclick = () => deletarCliente(index);

            li.appendChild(editarBtn);
            li.appendChild(deletarBtn);
            listaClientes.appendChild(li);
        });
    }

    function adicionarCliente(event) {
        event.preventDefault();
        const nomeCliente = document.getElementById('nomeCliente').value;
        const telefoneCliente = document.getElementById('telefoneCliente').value;

        clientes.push({ nome: nomeCliente, telefone: telefoneCliente });
        salvarClientes();
        atualizarLista();

        clienteForm.reset();
    }

    function editarCliente(index) {
        const novoNome = prompt('Novo nome:', clientes[index].nome);
        const novoTelefone = prompt('Novo telefone:', clientes[index].telefone);

        if (novoNome && novoTelefone) {
            clientes[index] = { nome: novoNome, telefone: novoTelefone };
            salvarClientes();
            atualizarLista();
        }
    }

    function deletarCliente(index) {
        clientes.splice(index, 1);
        salvarClientes();
        atualizarLista();
    }

    clienteForm.addEventListener('submit', adicionarCliente);
    atualizarLista();


});

