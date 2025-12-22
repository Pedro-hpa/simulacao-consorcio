// ================= ELEMENTOS =================
const inputValor = document.getElementById("valor");
const resultado = document.getElementById("resultado");
const btnSimular = document.getElementById("btnSimular");

// ================= CONFIG =================
const fatorEstimado = 1.18;
const prazoFixo = 96;
const valorMinimo = 280000;

// ================= EVENTOS =================
inputValor.addEventListener("input", atualizarSimulacao);
btnSimular.addEventListener("click", enviarParaWhatsApp);

// ================= FUNÇÕES =================
function atualizarSimulacao() {
  const valor = Number(inputValor.value);

  if (!valor || valor < valorMinimo) {
    resultado.innerHTML = "O valor mínimo do bem é R$ 280.000";
    return;
  }

  const parcela = (valor * fatorEstimado) / prazoFixo;

  resultado.innerHTML = `
    Parcela aproximada (96 meses):
    <strong>${formatarMoeda(parcela)}</strong>
  `;
}

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

// ================= WHATSAPP =================
function enviarParaWhatsApp() {
  const valor = Number(inputValor.value);

  if (!valor || valor < valorMinimo) {
    alert("O valor mínimo para simulação é R$ 280.000");
    inputValor.focus();
    return;
  }

  const mensagem = encodeURIComponent(
    `Oi! Tudo bem?\n\n` +
    `Acabei de fazer uma simulação de consórcio no site e gostaria de mais informações.\n\n` +
    `📌 Valor do bem: ${formatarMoeda(valor)}\n` +
    `⏳ Prazo: 96 meses\n\n` +
    `Pode me enviar uma proposta oficial, por favor?`
  );

  const telefone = "5521974528623";
  window.open(`https://wa.me/${telefone}?text=${mensagem}`, "_blank");
}

// ================= ANIMAÇÕES SCROLL =================
const elements = document.querySelectorAll("[data-animate]");

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
