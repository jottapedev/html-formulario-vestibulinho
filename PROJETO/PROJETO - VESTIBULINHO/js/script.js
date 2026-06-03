const cepInput = document.getElementById("cep");
const endereco = document.getElementById("endereco");
const bairro = document.getElementById("bairro");
const cidade = document.getElementById("cidade");
const estado = document.getElementById("estado");

// Adiciona máscara ao CEP
cepInput.addEventListener("input", function(e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 5) {
        value = value.replace(/^(\d{5})(\d)/, "$1-$2");
    }
    e.target.value = value;
});

// Busca CEP quando o usuário sai do campo
cepInput.addEventListener("blur", async function () {
    let cep = cepInput.value.replace(/\D/g, "");

    // Valida o CEP
    if (cep.length !== 8) {
        limparCampos();
        return;
    }

    try {
        // Adiciona classe de carregamento
        cepInput.classList.add("is-valid");
        
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
            cepInput.classList.remove("is-valid");
            cepInput.classList.add("is-invalid");
            limparCampos();
            alert("CEP não encontrado!");
            return;
        }

        // Remove classe de erro e adiciona sucesso
        cepInput.classList.remove("is-invalid");
        cepInput.classList.add("is-valid");

        // Preenche os campos
        endereco.value = data.logradouro || "";
        bairro.value = data.bairro || "";
        cidade.value = data.localidade || "";
        estado.value = data.uf || "";

    } catch (error) {
        console.error("Erro ao buscar CEP:", error);
        cepInput.classList.add("is-invalid");
        limparCampos();
        alert("Erro ao buscar CEP. Tente novamente.");
    }
});


// Função para limpar os campos de endereço
function limparCampos() {
    endereco.value = "";
    bairro.value = "";
    cidade.value = "";
    estado.value = "";
}

//Botão enviar emitir um alerta quando o formulário for enviado
const form = document.getElementById("cadastroForm");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Formulário enviado com sucesso!");
    form.reset();
    cepInput.classList.remove("is-valid", "is-invalid");
});