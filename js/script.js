// ================= ELEMENTOS =================
const inputValor = document.getElementById("valor");
const resultado = document.getElementById("resultado");
const btnSimular = document.getElementById("btnSimular");

const inputNome = document.getElementById("nome");
const inputWhatsapp = document.getElementById("whatsapp");
const inputTipo = document.getElementById("tipo");

// ================= CONFIG =================
const prazoFixo = 96;
const valorMinimo = 40000;

// URL DO GOOGLE APPS SCRIPT
const scriptURL = "https://script.google.com/macros/s/AKfycbwJYh6fKTWxEM-gqJkdbegwoaYgWQZMN07bvRBNRQ7xoo3ftevTQkwMUs-YgOohzA5S/exec";

// ================= EVENTO BOTÃO =================
if (btnSimular) {
  btnSimular.addEventListener("click", enviarFormulario);
}

// ================= FORMATAÇÃO =================
function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

// ================= ENVIO PARA GOOGLE SHEETS + WHATSAPP =================
async function enviarFormulario() {

  const nome = inputNome.value.trim();
  const whatsapp = inputWhatsapp.value.trim();
  const tipo = inputTipo.value;
  const valor = Number(inputValor.value);

  if (!nome || !whatsapp || !tipo) {
    alert("Preencha nome, WhatsApp e tipo de bem.");
    return;
  }

  if (!valor || valor < valorMinimo) {
    alert("O valor mínimo para simulação é R$ 40.000");
    inputValor.focus();
    return;
  }

  // Mostrar mensagem de curiosidade
  resultado.innerHTML = "Abrindo consultor no WhatsApp...";

  // Enviar para Google Sheets
  try {
    await fetch(scriptURL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({
        nome,
        whatsapp,
        tipo,
        valor
      })
    });
  } catch (error) {
    console.error("Erro ao enviar para planilha:", error);
  }

  // Montar mensagem WhatsApp
  const mensagem = encodeURIComponent(
    `Olá, meu nome é ${nome}.\n\n` +
    `Fiz uma simulação de consórcio de ${tipo}.\n\n` +
    `📌 Valor do bem: ${formatarMoeda(valor)}\n` +
    `⏳ Prazo: ${prazoFixo} meses\n\n` +
    `Gostaria de receber uma proposta oficial.`
  );

  const telefone = "5521974528623";

  window.open(`https://wa.me/${telefone}?text=${mensagem}`, "_blank");
}

// ================= ANIMAÇÕES SCROLL =================
const elements = document.querySelectorAll("[data-animate]");

if (elements.length > 0) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach(el => observer.observe(el));
}