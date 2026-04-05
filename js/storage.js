/**
 * Sistema de almacenamiento en localStorage
 * Guarda progreso, puntuación y respuestas del alumno
 */

const STORAGE_KEY = "semejanza_interactiva_progreso";

export function obtenerProgreso() {
	try {
		const data = localStorage.getItem(STORAGE_KEY);
		if (!data) {
			return crearProgresoVacio();
		}
		return JSON.parse(data);
	} catch (error) {
		console.warn("Error al cargar progreso:", error);
		return crearProgresoVacio();
	}
}

export function crearProgresoVacio() {
	return {
		timestamp: new Date().toISOString(),
		puntuacionTotal: 0,
		actividades: {
			"act-0": { intentos: 0, correcta: false },
			"act-1": { intentos: 0, correcta: false }
		},
		problemas: {
			"prob-0": { intentos: 0, correcta: false, valor: null },
			"prob-1": { intentos: 0, correcta: false, valor: null },
			"prob-2": { intentos: 0, correcta: false, valor: null }
		}
	};
}

export function guardarProgreso(progreso) {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(progreso));
	} catch (error) {
		console.warn("Error al guardar progreso:", error);
	}
}

export function registrarIntentoActividad(id, esCorrecta, puntos = 0) {
	const progreso = obtenerProgreso();
	if (!progreso.actividades[id]) {
		progreso.actividades[id] = { intentos: 0, correcta: false };
	}
	progreso.actividades[id].intentos += 1;
	if (esCorrecta && !progreso.actividades[id].correcta) {
		progreso.actividades[id].correcta = true;
		progreso.puntuacionTotal += puntos;
	}
	guardarProgreso(progreso);
	return progreso;
}

export function registrarIntentoProblema(id, esCorrecta, valor, puntos = 0) {
	const progreso = obtenerProgreso();
	if (!progreso.problemas[id]) {
		progreso.problemas[id] = { intentos: 0, correcta: false, valor: null };
	}
	progreso.problemas[id].intentos += 1;
	if (esCorrecta && !progreso.problemas[id].correcta) {
		progreso.problemas[id].correcta = true;
		progreso.problemas[id].valor = valor;
		progreso.puntuacionTotal += puntos;
	}
	guardarProgreso(progreso);
	return progreso;
}

export function obtenerEstadisticas() {
	const progreso = obtenerProgreso();
	const actividadesCorrectas = Object.values(progreso.actividades).filter((a) => a.correcta).length;
	const actividadesTotal = Object.keys(progreso.actividades).length;
	const problemasCorrectos = Object.values(progreso.problemas).filter((p) => p.correcta).length;
	const problemasTotal = Object.keys(progreso.problemas).length;
	const porcentajeCompletado = Math.round(
		((actividadesCorrectas + problemasCorrectos) / (actividadesTotal + problemasTotal)) * 100
	);

	return {
		actividadesCorrectas,
		actividadesTotales: actividadesTotal,
		problemasCorrectos,
		problemasTotales: problemasTotal,
		porcentajeCompletado,
		puntuacionTotal: progreso.puntuacionTotal,
		detalle: {
			actividadA: progreso.actividades["act-0"] || { correcta: false },
			actividadB: progreso.actividades["act-1"] || { correcta: false },
			problema1: progreso.problemas["prob-0"] || { correcta: false },
			problema2: progreso.problemas["prob-1"] || { correcta: false },
			problema3: progreso.problemas["prob-2"] || { correcta: false }
		}
	};
}

export function limpiarProgreso() {
	localStorage.removeItem(STORAGE_KEY);
}
