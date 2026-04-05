import { registrarIntentoActividad } from "./storage.js";
import { actualizarBarraProgreso } from "./puntuacion.js";

const mensajes = {
	acierto: [
		"Excelente, razonaste muy bien.",
		"Genial, vas dominando la semejanza.",
		"Muy bien, resultado correcto."
	],
	error: [
		"Casi. Revisa la proporción entre lados.",
		"Buen intento. Comprueba el factor de escala.",
		"No pasa nada, vuelve a intentarlo con calma."
	]
};

function mensajeAleatorio(tipo) {
	const lista = mensajes[tipo];
	return lista[Math.floor(Math.random() * lista.length)];
}

function crearFeedback(texto, esCorrecto) {
	const p = document.createElement("p");
	p.className = `feedback ${esCorrecto ? "ok" : "error"}`;
	p.textContent = texto;
	return p;
}

function renderActividadOpcion(parent) {
	const card = document.createElement("article");
	card.className = "interactive-card";
	card.innerHTML = `
		<h3>Actividad A: Encuentra el factor de escala</h3>
		<p>Un lado pasa de 5 cm a 15 cm. Elige el factor de escala correcto.</p>
		<div class="contexto-dibujo">
			<svg viewBox="0 0 320 140" role="img" aria-label="Segmentos proporcionalmente semejantes">
				<line x1="26" y1="45" x2="126" y2="45" stroke="#d97706" stroke-width="8" stroke-linecap="round"></line>
				<line x1="26" y1="95" x2="286" y2="95" stroke="#0f766e" stroke-width="8" stroke-linecap="round"></line>
				<text x="62" y="30" font-size="12" fill="#92400e">5 cm</text>
				<text x="140" y="80" font-size="12" fill="#115e59">15 cm</text>
				<text x="188" y="30" font-size="12" fill="#334155">k = ?</text>
			</svg>
		</div>
		<details class="pista-opcional">
			<summary>Ver pista (opcional)</summary>
			<p>Calcula la razón:</p>
			<p>\\[k = \\frac{15}{5}\\]</p>
		</details>
		<div class="options" role="group" aria-label="Opciones de factor de escala">
			<button class="btn-option" data-value="2">k = 2</button>
			<button class="btn-option" data-value="3">k = 3</button>
			<button class="btn-option" data-value="4">k = 4</button>
		</div>
		<div data-feedback></div>
	`;

	const feedbackHost = card.querySelector("[data-feedback]");
	card.querySelectorAll(".btn-option").forEach((btn) => {
		btn.addEventListener("click", () => {
			feedbackHost.innerHTML = "";
			const correcto = Number(btn.dataset.value) === 3;
			const texto = correcto ? mensajeAleatorio("acierto") : mensajeAleatorio("error");
			feedbackHost.appendChild(crearFeedback(texto, correcto));
			
			// Registrar intento
			registrarIntentoActividad("act-0", correcto, 50);
			actualizarBarraProgreso();
		});
	});

	parent.appendChild(card);
}

function renderActividadInput(parent) {
	const card = document.createElement("article");
	card.className = "interactive-card";
	card.innerHTML = `
		<h3>Actividad B: Completa el lado que falta</h3>
		<p>
			En dos triángulos semejantes, el lado pequeño mide 7 cm y el factor de escala es 2.
			¿Cuánto mide el lado grande?
		</p>
		<div class="contexto-dibujo">
			<svg viewBox="0 0 320 160" role="img" aria-label="Dos triángulos con factor de escala dos">
				<polygon points="34,130 112,130 48,76" fill="rgba(245,158,11,0.28)" stroke="#d97706" stroke-width="2"></polygon>
				<polygon points="166,130 322,130 194,24" fill="rgba(14,165,162,0.25)" stroke="#0f766e" stroke-width="2"></polygon>
				<text x="42" y="146" font-size="11" fill="#92400e">lado = 7</text>
				<text x="206" y="146" font-size="11" fill="#115e59">lado = ?</text>
				<text x="126" y="34" font-size="12" fill="#334155">k = 2</text>
			</svg>
		</div>
		<details class="pista-opcional">
			<summary>Ver pista (opcional)</summary>
			<p>Usa la relación:</p>
			<p>\\[L = k \\cdot l\\]</p>
			<p>Aquí:</p>
			<p>\\[L = 2 \\cdot 7\\]</p>
		</details>
		<div class="controls-row">
			<label for="act-lado">Respuesta (cm)</label>
			<input id="act-lado" type="number" min="0" step="0.1" />
			<button class="btn-check" type="button">Comprobar</button>
			<button class="btn-reset" type="button">Reiniciar</button>
		</div>
		<div data-feedback></div>
	`;

	const input = card.querySelector("#act-lado");
	const btnCheck = card.querySelector(".btn-check");
	const btnReset = card.querySelector(".btn-reset");
	const feedbackHost = card.querySelector("[data-feedback]");

	btnCheck.addEventListener("click", () => {
		feedbackHost.innerHTML = "";
		const valor = Number(input.value);
		const correcto = Math.abs(valor - 14) < 0.001;
		const texto = correcto
			? `${mensajeAleatorio("acierto")} 7 x 2 = 14 cm.`
			: `${mensajeAleatorio("error")} Recuerda: lado grande = lado pequeño x k.`;
		feedbackHost.appendChild(crearFeedback(texto, correcto));
		
		// Registrar intento
		registrarIntentoActividad("act-1", correcto, 50);
		actualizarBarraProgreso();
	});

	btnReset.addEventListener("click", () => {
		input.value = "";
		feedbackHost.innerHTML = "";
		input.focus();
	});

	parent.appendChild(card);
}

export function iniciarActividades(rootId = "actividades-root") {
	const root = document.getElementById(rootId);
	if (!root) {
		return;
	}

	root.innerHTML = "";
	root.className = "stack";
	renderActividadOpcion(root);
	renderActividadInput(root);
}
