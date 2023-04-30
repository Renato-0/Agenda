const formulario = document.querySelector("form");
const ulpessoas = document.querySelector("ul");
const storage = window.localStorage
const arr = new Array()

if (storage.getItem("array") == null){
    let Temp = null;
    if (Temp !== null) {
        Temp = JSON.parse(storage.getItem("array"))
        Temp.forEach((e)=>arr.push(e))
    }
        
}

 listar();

formulario.addEventListener('submit', function (e){
    e.preventDefault();
    let novaPessoa = new Object();
    novaPessoa.nome = this.nome.value;
    novaPessoa.telefone = this.telefone.value;
    novaPessoa.email = this.email.value;

    if(this.id.value !== "" && this.id.value >=0){
        arr[this.id.value] = novaPessoa;
    }else{
        arr.push(novaPessoa);
    }

    this.reset();
    
    this.id.value = null;

    salvarLS();

    listar();
})

function listar(filtro=''){
    ulpessoas.innerHTML = "";
    arr.forEach((item,key) => {

        if(item.nome.toUpperCase().indexOf(filtro.toUpperCase()) >= 0 || filtro==""){
        linha = document.createElement("li")

        let But = `<button onClick="excluir(${key})">[Excluir]</button>
                   <button onClick="editar(${key})">[Editar]</button>` 

        linha.innerHTML = "Nome: " + item.nome + " Telefone: " + item.telefone + " Email: " + item.email + But;
        ulpessoas.appendChild(linha);
        }
    });
}

function excluir(id) {
    formulario.reset();
    arr.splice(id,1);
    salvarLS();
    listar();
}

function editar(id){
    formulario.id.value = id;
    formulario.nome.value = arr[id].nome;
    formulario.telefone.value = arr[id].telefone;
    formulario.email.value = arr[id].email;
}

function salvarLS() {
    storage.setItem('array', JSON.stringify(arr))
}
