// chat.js

const messagesEl = document.getElementById("messages");
const inputEl = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Agrega burbuja al chat
function addMessage(who, text) {
  const div = document.createElement("div");
  div.classList.add("message", who);
  div.innerText = text;
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

// Lógica de envío
async function sendMessage() {
  const msg = inputEl.value.trim();
  if (!msg) return;
  addMessage("user", msg);
  inputEl.value = "";
  try {
    const res = await fetch("/rag", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg })
    });
    const { reply } = await res.json();
    addMessage("bot", reply);
  } catch (e) {
    console.error(e);
    addMessage("bot", "❌ Error contactando al servidor.");
  }
}

// Enviar al hacer click o Enter
sendBtn.addEventListener("click", sendMessage);
inputEl.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});
