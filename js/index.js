const form = document.getElementById('formUsuario'),
listaUsuarios = document.getElementById('listaUsuarios')


//função para carregar a lista de usuários
function carregarUsuarios(){
    fetch('http://localhost:3000/api/usuarios')
        .then(response => response.json())
        .then(data => {
            listaUsuarios.innerHTML = ''; //limpa a lista
            data.forEach(usuario => {
                const li = document.createElement('li');
                li.textContent = `Nome: ${usuario.nome}, Senha: ${usuario.senha}`;
                listaUsuarios.appendChild(li);
            })
            .catch(error => {
                console.error('Erro ao carregar usuários: ',error);
            });
        });
}

//função para adicionar um novo usuário
form.addEventListener('submit',function(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const senha = document.getElementById('senha').value;

    fetch('http://localhost:3000/api/usuarios',{
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify({ nome, senha})
    })
    .then(response => response.json())
    .then(data=>{
        alert(data.message);
        carregarUsuarios();
    })
    .catch(error => {
        console.error('Erro ao cadastrar usuário: ',error);
    });
});

window.onload = carregarUsuarios;