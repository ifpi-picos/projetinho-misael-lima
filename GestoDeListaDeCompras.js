let gestoDeListaDeCompras = [];

function addItem() {
    const nome = prompt("\nDigite o nome do item: ");
    const quantidade = parseInt(prompt("Digite a quantidade: "));
    const categoria = prompt("Digite a categoria: ");
  
    const novoItem = {
        nome: nome,
        quantidade: quantidade,
        categoria: categoria,
        status: "não comprado",
    };
    gestoDeListaDeCompras.push(novoItem);
    console.log(`Item adicionado\n${gestoDeListaDeCompras}`);
}

function removeItem() {
    let removerItem = prompt("Digite o item que deseja remover");
    
    let indiceItem = gestoDeListaDeCompras.findIndex(item => item.nome === removerItem);

    if (indiceItem !== -1) {
        let confirmacao = confirm(`Tem certeza que deseja remover o item ${removerItem}?`);
        
        if (confirmacao) {
            gestoDeListaDeCompras.splice(indiceItem, 1);
            alert("Item removido!");
        } else {
            alert("Não foi possível remover");
        }
    } else {
        alert("Item não encontrado.");
    }
}

function editList() {
    let Editaritem = prompt("Digite o nome do item que deseja editar:");

    let indiceItem = gestoDeListaDeCompras.findIndex(item => item.nome === Editaritem);

    if (indiceItem !== -1) {
        let item = gestoDeListaDeCompras[indiceItem];

        let novoNome = prompt(`Novo nome para ${item.nome}: `);
        let novaQuantidade = prompt(`Nova quantidade para ${item.nome}: `);
        let novaCategoria = prompt(`Nova categoria para ${item.nome}: `);

        if (novoNome) item.nome = novoNome;
        if (novaQuantidade) item.quantidade = parseInt(novaQuantidade);
        if (novaCategoria) item.categoria = novaCategoria;

        console.log("Item editado!");
    } else {
        alert("Item não encontrado na lista.");
    }
}

function displayList(ordenarPor, filtrarPorCategoria, filtrarPorStatus) {
    let itensFiltrados = [...gestoDeListaDeCompras];
    
    if (filtrarPorCategoria) {
        itensFiltrados = itensFiltrados.filter(item => item.categoria === filtrarPorCategoria);
    }
    
    if (filtrarPorStatus) {
        itensFiltrados = itensFiltrados.filter(item => item.status === filtrarPorStatus);
    }
    
    itensFiltrados.sort((a, b) => {
        if (ordenarPor === 'nome') {
            return a.nome.localeCompare(b.nome);
        } else if (ordenarPor === 'categoria') {
            return a.categoria.localeCompare(b.categoria);
        } else if (ordenarPor === 'quantidade') {
            return a.quantidade - b.quantidade;
        }
    });
    
    console.log('Lista de compras:');
    itensFiltrados.forEach(item => {
        console.log(`${item.nome} (${item.quantidade}) - ${item.categoria} - ${item.status}`);
    });
}

function markItem() {
    let itemMarcar = prompt("Digite o nome do item que deseja marcar como comprado:");

    let indiceItem = gestoDeListaDeCompras.findIndex(item => item.nome === itemMarcar);
  
    if (indiceItem !== -1) {
        let item = gestoDeListaDeCompras[indiceItem];
        item.status = item.status === "comprado" ? "não comprado" : "comprado"; 
        console.log(`O item ${item.nome} foi marcado como ${item.status}.`);
    } else {
        alert("Item não encontrado na lista.");
    }
}

function resumeItem() {  
    let totalItens = gestoDeListaDeCompras.length;
    let categorias = {};
    let comprados = 0;
    let naoComprados = 0;

    gestoDeListaDeCompras.forEach(item => {
        categorias[item.categoria] = (categorias[item.categoria] || 0) + 1;
        item.status === "comprado" ? comprados++ : naoComprados++;
    });

    console.log(`Resumo da Lista de Compras:
    - Total de itens: ${totalItens}
    - Itens comprados: ${comprados}
    - Itens não comprados: ${naoComprados}`);

    console.log('Itens por categoria:');
    for (let [categoria, quantidade] of Object.entries(categorias)) {
        console.log(`- ${categoria}: ${quantidade}`);
    }
}

function menu() {
    while (true) {
        const option = parseInt(prompt(`
        OPÇÕES:
        1. ADICIONAR ITEM
        2. LISTAR ITENS
        3. EDITAR ITEM
        4. REMOVER ITEM
        5. MARCAR ITEM COMO COMPRADO
        6. RESUMO DA LISTA
        7. SAIR
        Digite um número como opção: `));

        switch (option) {
            case 1:
                addItem();
                break;
            case 2:
                displayList();
                break;
            case 3:
                editList();
                break;
            case 4:
                removeItem();
                break;
            case 5:
                markItem();
                break;
            case 6:
                resumeItem();
                break;
            case 7:
                console.log('Encerrando o programa...');
                return; // Para sair do loop
            default:
                console.log('Opção inválida, tente novamente.');
        }
    } 
}

menu();