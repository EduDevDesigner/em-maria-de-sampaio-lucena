// Número oficial do WhatsApp da EMTI Maria de Sampaio Lucena.
// Formato internacional, sem +, espaços ou símbolos.
const NUMERO_ESCOLA = "5581995935997";

const form = document.getElementById("cadastroForm");
const sucesso = document.getElementById("sucesso");
const abrirWhatsApp = document.getElementById("abrirWhatsApp");
const voltar = document.getElementById("voltar");

const responsavel = document.getElementById("responsavel");
const aluno = document.getElementById("aluno");
const turma = document.getElementById("turma");
const telefone = document.getElementById("telefone");
const consentimento = document.getElementById("consentimento");

// Formata o telefone enquanto o usuário digita.
telefone.addEventListener("input", () => {
    let numeros = telefone.value.replace(/\D/g, "").slice(0, 11);

    if (numeros.length <= 2) {
        telefone.value = numeros.length ? `(${numeros}` : "";
    } else if (numeros.length <= 7) {
        telefone.value = `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    } else {
        telefone.value =
            `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
    }
});

function limparErros() {
    document.querySelectorAll(".error").forEach(el => el.textContent = "");
    document.querySelectorAll("input").forEach(el => el.classList.remove("invalid"));
}

function erro(campo, mensagem, idErro) {
    campo.classList.add("invalid");
    document.getElementById(idErro).textContent = mensagem;
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    limparErros();

    const nomeResponsavel = responsavel.value.trim();
    const nomeAluno = aluno.value.trim();
    const nomeTurma = turma.value.trim();
    const telefoneNumeros = telefone.value.replace(/\D/g, "");

    let valido = true;

    if (nomeResponsavel.length < 3) {
        erro(responsavel, "Informe o nome do responsável.", "erroResponsavel");
        valido = false;
    }

    if (nomeAluno.length < 3) {
        erro(aluno, "Informe o nome do aluno.", "erroAluno");
        valido = false;
    }

    if (nomeTurma.length < 2) {
        erro(turma, "Informe a turma.", "erroTurma");
        valido = false;
    }

    if (telefoneNumeros.length < 10 || telefoneNumeros.length > 11) {
        erro(telefone, "Informe um WhatsApp válido.", "erroTelefone");
        valido = false;
    }

    if (!consentimento.checked) {
        document.getElementById("erroConsentimento").textContent =
            "É necessário autorizar o recebimento das comunicações.";
        valido = false;
    }

    if (!valido) return;

    const mensagem =
        `Olá! Sou ${nomeResponsavel}, responsável pelo aluno ${nomeAluno}, ` +
        `da turma ${nomeTurma}. Meu WhatsApp é ${telefoneNumeros}. ` +
        `Gostaria de participar do canal de comunicação da EMTI Maria de Sampaio Lucena ` +
        `e receber os comunicados da escola pelo WhatsApp.`;

    const url = `https://wa.me/${NUMERO_ESCOLA}?text=${encodeURIComponent(mensagem)}`;

    abrirWhatsApp.href = url;

    form.hidden = true;
    sucesso.hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

voltar.addEventListener("click", () => {
    sucesso.hidden = true;
    form.hidden = false;
});
