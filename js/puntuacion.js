/**
 * UI de puntuación y progreso
 */

import { obtenerEstadisticas } from "./storage.js";

export function crearBarraProgreso() {
	const container = document.createElement("div");
	container.className = "barra-progreso-container";
	container.innerHTML = `
		<div class="progreso-bar">
			<div class="progreso-track">
				<div id="progreso-fill"></div>
			</div>
			<span id="progreso-pct">0%</span>
		</div>
		<div class="stat-item">
			<strong id="puntos-total">0</strong>
			<small>Puntos</small>
		</div>
		<div class="stat-item">
			<strong id="tareas-hechas">0/5</strong>
			<small>Tareas hechas</small>
		</div>
		<div class="stat-item">
			<strong id="progreso-porc-txt">0%</strong>
			<small>Progreso</small>
		</div>
	`;

	actualizarBarraProgreso(container);
	return container;
}

export function actualizarBarraProgreso(container = null) {
	const stats = obtenerEstadisticas();

	const fillEl = document.getElementById("progreso-fill");
	const pctEl = document.getElementById("progreso-pct");
	const puntosEl = document.getElementById("puntos-total");
	const tareasEl = document.getElementById("tareas-hechas");

	if (fillEl) {
		fillEl.style.width = `${stats.porcentajeCompletado}%`;
	}
	if (pctEl) {
		pctEl.textContent = `${stats.porcentajeCompletado}%`;
	}
	if (puntosEl) {
		puntosEl.textContent = stats.puntuacionTotal;
	}
	if (tareasEl) {
		const total = stats.actividadesTotales + stats.problemasTotales;
		const hechas = stats.actividadesCorrectas + stats.problemasCorrectos;
		tareasEl.textContent = `${hechas}/${total}`;
	}
}

export function mostrarResumenFinal() {
	const stats = obtenerEstadisticas();
	const div = document.createElement("div");
	div.className = "resumen-final-modal";
	div.innerHTML = `
		<div class="resumen-modal-content">
			<h2>🎉 ¡Excelente trabajo!</h2>
			<div class="resumen-stats">
				<div class="stat-block">
					<span class="stat-numero">${stats.actividadesCorrectas}/${stats.actividadesTotal}</span>
					<span class="stat-desc">Actividades completadas</span>
				</div>
				<div class="stat-block">
					<span class="stat-numero">${stats.problemasCorrectos}/${stats.problemasTotal}</span>
					<span class="stat-desc">Problemas resueltos</span>
				</div>
				<div class="stat-block">
					<span class="stat-numero">${stats.puntuacionTotal}</span>
					<span class="stat-desc">Puntos totales</span>
				</div>
			</div>
			<p class="resumen-mensaje">${generarMensajeFinal(stats)}</p>
			<div class="resumen-botones">
				<button class="btn-reiniciar">Reiniciar todo</button>
				<button class="btn-cerrar">Cerrar</button>
			</div>
		</div>
	`;

	const btnReiniciar = div.querySelector(".btn-reiniciar");
	const btnCerrar = div.querySelector(".btn-cerrar");

	btnReiniciar.addEventListener("click", () => {
		if (confirm("¿Borrar todo el progreso y empezar de nuevo?")) {
			location.reload();
		}
	});

	btnCerrar.addEventListener("click", () => {
		div.remove();
	});

	return div;
}

function generarMensajeFinal(stats) {
	if (stats.porcentajeCompletado === 100) {
		return "Has dominado completamente la semejanza. ¡Eres un matemático.";
	} else if (stats.porcentajeCompletado >= 80) {
		return "Muy bien. Ya comprendes muy bien la semejanza.";
	} else if (stats.porcentajeCompletado >= 60) {
		return "Buen progreso. Sigue practicando para mejorar.";
	}
	return "Sigue intentando. ¡Tú puedes!";
}
