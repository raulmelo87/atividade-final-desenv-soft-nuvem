document.addEventListener('DOMContentLoaded', function() {
    const servicoForm = document.getElementById('servicoForm');
    const listaServicos = document.getElementById('listaServicos');
    let servicos = JSON.parse(localStorage.getItem('servicos')) || [];

    function salvarServicos() {
        localStorage.setItem('servicos', JSON.stringify(servicos));
    }

    function atualizarLista() {
        listaServicos.innerHTML = '';
        servicos.forEach((servico, index) => {
            const li = document.createElement('li');
            li.textContent = `${servico.nome} - R$ ${servico.valor.toFixed(2)}`;

            const editarBtn = document.createElement('button');
            editarBtn.textContent = 'Editar';
            editarBtn.classList.add('editar-btn');
            editarBtn.onclick = () => editarServico(index);

            const deletarBtn = document.createElement('button');
            deletarBtn.textContent = 'Deletar';
            deletarBtn.onclick = () => deletarServico(index);

            li.appendChild(editarBtn);
            li.appendChild(deletarBtn);
            listaServicos.appendChild(li);
        });
    }

    function adicionarServico(event) {
        event.preventDefault();
        const nomeServico = document.getElementById('nomeServico').value;
        const valorServico = parseFloat(document.getElementById('valorServico').value);

        servicos.push({ nome: nomeServico, valor: valorServico });
        salvarServicos();
        atualizarLista();

        servicoForm.reset();
    }

    function editarServico(index) {
        const novoNome = prompt('Novo nome do serviço:', servicos[index].nome);
        const novoValor = parseFloat(prompt('Novo valor do serviço:', servicos[index].valor));

        if (novoNome && !isNaN(novoValor)) {
            servicos[index] = { nome: novoNome, valor: novoValor };
            salvarServicos();
            atualizarLista();
        }
    }
    
    function deletarServico(index) {
        servicos.splice(index, 1);
        salvarServicos();
        atualizarLista();
    }

    servicoForm.addEventListener('submit', adicionarServico);
    atualizarLista();
});
