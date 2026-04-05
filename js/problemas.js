import { registrarIntentoProblema } from "./storage.js";
import { actualizarBarraProgreso } from "./puntuacion.js";

const problemas = [
	{
		titulo: "Altura de un campanario con espejo",
		enunciado:
			"Una alumna de 1.6 m ve la cima del campanario reflejada en un espejo en el suelo. La distancia espejo-alumna es 2 m y espejo-campanario es 15 m. ¿Cuánto mide el campanario?",
		unidad: "m",
		solucion: 12,
		ayuda: "Usa triángulos semejantes:<br>\\[\\frac{H}{15} = \\frac{1.6}{2}\\]",
		dibujo: `
			<svg viewBox="0 0 320 160" role="img" aria-label="Campanario y espejo con triángulos semejantes">
				<line x1="10" y1="132" x2="310" y2="132" stroke="#475569" stroke-width="2"/>
				<rect x="30" y="38" width="22" height="94" fill="#1d4ed8"/>
				<text x="12" y="30" font-size="11" fill="#1e3a8a">Campanario ? m</text>

				<polygon points="144,130 158,130 151,122" fill="#eab308" stroke="#a16207"/>
				<text x="134" y="118" font-size="10" fill="#92400e">Espejo</text>

				<circle cx="214" cy="106" r="8" fill="#f97316"/>
				<line x1="214" y1="114" x2="214" y2="132" stroke="#f97316" stroke-width="4"/>
				<text x="226" y="108" font-size="10" fill="#9a3412">1.6 m</text>

				<line x1="151" y1="130" x2="214" y2="130" stroke="#334155" stroke-dasharray="4 3"/>
				<text x="166" y="144" font-size="10" fill="#334155">2 m</text>
				<line x1="40" y1="130" x2="151" y2="130" stroke="#334155" stroke-dasharray="4 3"/>
				<text x="84" y="144" font-size="10" fill="#334155">15 m</text>
			</svg>
		`
	},
	{
		titulo: "Sombras en el patio",
		enunciado:
			"Un poste de 1.5 m proyecta una sombra de 2 m. Un árbol proyecta una sombra de 8 m. ¿Cuánto mide el árbol?",
		unidad: "m",
		solucion: 6,
		ayuda: "La razón altura/sombra se mantiene constante:<br>\\[\\frac{1.5}{2} = \\frac{h}{8}\\]",
		dibujo: `
			<svg viewBox="0 0 320 160" role="img" aria-label="Comparación de sombras semejantes">
				<line x1="10" y1="132" x2="310" y2="132" stroke="#475569" stroke-width="2"/>

				<rect x="36" y="84" width="8" height="48" fill="#7c3aed"/>
				<polygon points="44,132 110,132 44,108" fill="rgba(245,158,11,0.35)" stroke="#d97706"/>
				<text x="22" y="78" font-size="11" fill="#4c1d95">1.5 m</text>
				<text x="65" y="148" font-size="11" fill="#92400e">2 m</text>

				<rect x="180" y="36" width="12" height="96" fill="#065f46"/>
				<circle cx="186" cy="28" r="20" fill="#34d399" stroke="#047857"/>
				<polygon points="192,132 292,132 192,84" fill="rgba(245,158,11,0.35)" stroke="#d97706"/>
				<text x="168" y="26" font-size="11" fill="#065f46">? m</text>
				<text x="230" y="148" font-size="11" fill="#92400e">8 m</text>
			</svg>
		`
	},
	{
		titulo: "Ancho de un río no accesible",
		enunciado:
			"Para medir la anchura de un río se forman dos triángulos semejantes. En el triángulo pequeño, base 5 m y altura 3 m. En el grande, la base correspondiente es 20 m. ¿Cuál es la anchura del río?",
		unidad: "m",
		solucion: 12,
		ayuda: "Calcula primero el factor:<br>\\[k = \\frac{20}{5}\\]<br>Luego:<br>\\[H = 3k\\]",
		dibujo: `
			<svg viewBox="0 0 320 160" role="img" aria-label="Triángulos semejantes para medir un río">
				<rect x="0" y="18" width="320" height="46" fill="#bfdbfe"/>
				<text x="18" y="46" font-size="11" fill="#1e3a8a">Río (distancia no accesible)</text>

				<!-- Triángulo pequeño conocido -->
				<polygon points="28,136 92,136 44,98" fill="rgba(245,158,11,0.3)" stroke="#d97706" stroke-width="2"/>
				<!-- Altura línea punteada triángulo pequeño -->
				<line x1="44" y1="98" x2="44" y2="136" stroke="#d97706" stroke-width="1.5" stroke-dasharray="3 2"/>
				<!-- Etiquetas triángulo pequeño -->
				<text x="44" y="150" font-size="10" fill="#92400e">base 5 m</text>
				<text x="10" y="117" font-size="10" fill="#92400e">h=3 m</text>

				<!-- Triángulo grande con incógnita -->
				<polygon points="150,136 310,136 190,40" fill="rgba(14,165,162,0.25)" stroke="#0f766e" stroke-width="2"/>
				<!-- Altura línea punteada triángulo grande (MARCAR INCÓGNITA) -->
				<line x1="190" y1="40" x2="190" y2="136" stroke="#0f766e" stroke-width="2.5" stroke-dasharray="5 3"/>
				<!-- Etiquetas triángulo grande -->
				<text x="212" y="150" font-size="10" fill="#115e59">base 20 m</text>
				<text x="148" y="76" font-size="11" fill="#dc2626" font-weight="bold">H = ?</text>

				<!-- Líneas de conexión visual -->
				<circle cx="190" cy="40" r="2" fill="#dc2626"/>
				<circle cx="190" cy="136" r="2" fill="#dc2626"/>
			</svg>
		`
	}
];

function feedbackProblema(correcto) {
	if (correcto) {
		return "Correcto. Estás aplicando la semejanza en situaciones reales.";
	}
	return "Respuesta no válida aún. Revisa el planteamiento y vuelve a probar.";
}

function crearTarjetaProblema(problema, index) {
	const article = document.createElement("article");
	article.className = "interactive-card";
	article.innerHTML = `
		<h3>Problema ${index + 1}: ${problema.titulo}</h3>
		<p>${problema.enunciado}</p>
		<div class="contexto-dibujo">${problema.dibujo}</div>
		<details class="pista-opcional">
			<summary>Ver pista (opcional)</summary>
			<p>${problema.ayuda}</p>
		</details>
		<div class="controls-row">
			<label for="problema-${index}">Tu respuesta (${problema.unidad})</label>
			<input id="problema-${index}" type="number" min="0" step="0.1" />
			<button class="btn-check" type="button">Comprobar</button>
			<button class="btn-reset" type="button">Limpiar</button>
		</div>
		<div data-feedback></div>
	`;

	const input = article.querySelector("input");
	const [btnCheck, btnReset] = article.querySelectorAll("button");
	const feedbackHost = article.querySelector("[data-feedback]");

	btnCheck.addEventListener("click", () => {
		const valor = Number(input.value);
		const correcto = Math.abs(valor - problema.solucion) < 0.01;
		const clase = correcto ? "ok" : "error";
		const detalle = correcto
			? `Resultado esperado: ${problema.solucion} ${problema.unidad}.`
			: "Mira la pista y comprueba unidades.";

		feedbackHost.innerHTML = `<p class="feedback ${clase}">${feedbackProblema(correcto)} ${detalle}</p>`;
		
		// Registrar intento
		registrarIntentoProblema(`prob-${index}`, correcto, 0, 100);
		actualizarBarraProgreso();
	});

	btnReset.addEventListener("click", () => {
		input.value = "";
		feedbackHost.innerHTML = "";
		input.focus();
	});

	return article;
}

export function iniciarProblemas(rootId = "problemas-root") {
	const root = document.getElementById(rootId);
	if (!root) {
		return;
	}

	root.innerHTML = "";
	root.className = "stack";
	problemas.forEach((p, i) => {
		root.appendChild(crearTarjetaProblema(p, i));
	});
}
