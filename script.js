// Orbey — interações do site
// IMPORTANTE: substitua o número abaixo pelo WhatsApp comercial da Orbey.
// Use apenas dígitos, incluindo código do país e DDD. Ex.: 5585999999999
const ORBEY_WHATSAPP = "5500000000000";

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
  nav.classList.toggle("open", !isOpen);
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
}));

// Animação discreta de entrada, respeitando a preferência por movimento reduzido.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("is-visible"));
}

document.getElementById("year").textContent = new Date().getFullYear();
const whatsappLink = document.getElementById("whatsapp-link");
whatsappLink.href = `https://wa.me/${ORBEY_WHATSAPP}`;
whatsappLink.addEventListener("click", event => {
  if (ORBEY_WHATSAPP === "5500000000000") {
    event.preventDefault();
    document.getElementById("form-status").textContent = "Antes de publicar, configure o número comercial da Orbey no arquivo script.js.";
    document.getElementById("contato").scrollIntoView({ behavior: "smooth" });
  }
});

document.getElementById("quote-form").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  if (ORBEY_WHATSAPP === "5500000000000") {
    document.getElementById("form-status").textContent = "O formulário está pronto. Para ativar o envio, configure o número comercial da Orbey no arquivo script.js.";
    return;
  }
  const data = new FormData(form);
  const message = [
    "Olá, Orbey! Gostaria de conversar sobre uma demanda.",
    "",
    `Nome: ${data.get("nome")}`,
    `Empresa: ${data.get("empresa") || "Não informado"}`,
    `E-mail: ${data.get("email")}`,
    `Telefone: ${data.get("telefone")}`,
    `Serviço: ${data.get("servico")}`,
    "",
    "Sobre a demanda:",
    data.get("mensagem")
  ].join("\n");
  const url = `https://wa.me/${ORBEY_WHATSAPP}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
  document.getElementById("form-status").textContent = "O WhatsApp foi aberto com a solicitação preenchida. Revise a mensagem e envie para concluir.";
});