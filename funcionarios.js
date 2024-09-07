document.addEventListener('DOMContentLoaded', function() {
    const funcionarioForm = document.getElementById('funcionarioForm');
    const listaFuncionarios = document.getElementById('listaFuncionarios');
    let funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];

    function salvarFuncionarios() {
        localStorage.setItem('funcionarios', JSON.stringify(funcionarios));
    }

    function atualizarLista() {
        listaFuncionarios.innerHTML = '';
        funcionarios.forEach((funcionario, index) => {
            const li = document.createElement('li');
            li.textContent = `${funcionario.nome}, ${funcionario.email}`;

            const editarBtn = document.createElement('button');
            editarBtn.textContent = 'Editar';
            editarBtn.classList.add('editar-btn');
            editarBtn.onclick = () => editarFuncionario(index);

            const deletarBtn = document.createElement('button');
            deletarBtn.textContent = 'Deletar';
            deletarBtn.onclick = () => deletarFuncionario(index);

            li.appendChild(editarBtn);
            li.appendChild(deletarBtn);
            listaFuncionarios.appendChild(li);
        });
    }

    function adicionarFuncionario(event) {
        event.preventDefault();
        const nomeFuncionario = document.getElementById('nomeFuncionario').value;
        const emailFuncionario = document.getElementById('emailFuncionario').value;

        funcionarios.push({ nome: nomeFuncionario, email: emailFuncionario });
        salvarFuncionarios();
        atualizarLista();

        funcionarioForm.reset();
    }

    function editarFuncionario(index) {
        const novoNome = prompt('Novo nome:', funcionarios[index].nome);
        const novoEmail = prompt('Novo e-mail:', funcionarios[index].email);

        if (novoNome && novoEmail) {
            funcionarios[index] = { nome: novoNome, email: novoEmail };
            salvarFuncionarios();
            atualizarLista();
        }
    }

    function deletarFuncionario(index) {
        funcionarios.splice(index, 1);
        salvarFuncionarios();
        atualizarLista();
    }

    funcionarioForm.addEventListener('submit', adicionarFuncionario);
    atualizarLista();
});
