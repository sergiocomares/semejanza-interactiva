import { iniciarActividades } from "./actividades.js";
import { iniciarProblemas } from "./problemas.js";
import { iniciarDibujo } from "./dibujo.js";
import { crearBarraProgreso, actualizarBarraProgreso } from "./puntuacion.js";
import { iniciarGlosario, iniciarErroresComunes } from "./contenido.js";
import { iniciarBotonesPDF } from "./pdf.js";

function renderizarLatex(scope = document.body) {
	if (typeof window.renderMathInElement !== "function") {
		return false;
	}

	window.renderMathInElement(scope, {
		delimiters: [
			{ left: "$$", right: "$$", display: true },
			{ left: "\\[", right: "\\]", display: true },
			{ left: "\\(", right: "\\)", display: false },
			{ left: "$", right: "$", display: false }
		],
		throwOnError: false
	});

	return true;
}

function prepararNavegacion() {
	const enlaces = document.querySelectorAll(".top-nav a[href^='#']");
	enlaces.forEach((enlace) => {
		enlace.addEventListener("click", () => {
			const destino = enlace.getAttribute("href");
			if (!destino) {
				return;
			}

			const seccion = document.querySelector(destino);
			if (!seccion) {
				return;
			}

			// Mejora de accesibilidad al navegar por anclas.
			seccion.setAttribute("tabindex", "-1");
			seccion.focus({ preventScroll: true });
		});
	});
}

function iniciarRenderLatexRobusto() {
	let intentos = 0;
	const maxIntentos = 25;
	const intervalo = window.setInterval(() => {
		const renderizado = renderizarLatex();
		intentos += 1;
		if (renderizado || intentos >= maxIntentos) {
			window.clearInterval(intervalo);
		}
	}, 160);
}

function prepararRenderLatexEnPistas() {
	document.addEventListener("toggle", (event) => {
		const elemento = event.target;
		if (!(elemento instanceof HTMLElement)) {
			return;
		}
		if (!elemento.matches("details.pista-opcional")) {
			return;
		}
		renderizarLatex(elemento);
	});
}

function iniciarModoOscuro() {
	const boton = document.getElementById("toggle-dark-mode");
	if (!boton) return;

	// Cargar preferencia guardada
	const modoOscuroGuardado = localStorage.getItem("dark-mode-enabled") === "true";
	if (modoOscuroGuardado) {
		document.documentElement.classList.add("dark-mode");
	}

	boton.addEventListener("click", () => {
		document.documentElement.classList.toggle("dark-mode");
		const ahora = document.documentElement.classList.contains("dark-mode");
		localStorage.setItem("dark-mode-enabled", ahora ? "true" : "false");
	});
}

function iniciarApp() {
	// Iniciar componentes de contenido
	iniciarActividades("actividades-root");
	iniciarProblemas("problemas-root");
	iniciarDibujo("dibujo-root");
	iniciarGlosario("glosario-root");
	iniciarErroresComunes("errores-root");
	iniciarBotonesPDF();

	// Mostrar barra de progreso
	const barraProg = crearBarraProgreso();
	const rootProg = document.getElementById("barra-progreso-root");
	if (rootProg) {
		rootProg.appendChild(barraProg);
		actualizarBarraProgreso(barraProg);
	}

	// Iniciar funcionalidades de navegación y LaTeX
	prepararNavegacion();
	prepararRenderLatexEnPistas();
	iniciarRenderLatexRobusto();
	iniciarModoOscuro();
}

document.addEventListener("DOMContentLoaded", iniciarApp);
