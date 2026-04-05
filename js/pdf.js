/**
 * Módulo para exportación de PDF y reinicio del sistema
 */

import { obtenerEstadisticas, crearProgresoVacio, guardarProgreso } from "./storage.js";

export function iniciarBotonesPDF() {
	const btnPdf = document.getElementById("btn-descargar-pdf");
	const btnReiniciar = document.getElementById("btn-reiniciar");

	if (btnPdf) {
		btnPdf.addEventListener("click", descargarPDF);
	}

	if (btnReiniciar) {
		btnReiniciar.addEventListener("click", reiniciarProgreso);
	}
}

function descargarPDF() {
	const stats = obtenerEstadisticas();
	const fecha = new Date().toLocaleDateString("es-ES", {
		year: "numeric",
		month: "long",
		day: "numeric"
	});

	let html = `
		<html>
		<head>
			<meta charset="UTF-8">
			<title>Reporte - Semejanza Interactiva</title>
			<style>
				body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
				h1 { color: #0f766e; border-bottom: 2px solid #0f766e; padding-bottom: 10px; }
				h2 { color: #d97706; margin-top: 30px; }
				.stat-box { background: #f5f3ec; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #0f766e; }
				.stat-label { font-weight: bold; color: #0f766e; }
				table { width: 100%; border-collapse: collapse; margin: 20px 0; }
				th { background: #0f766e; color: white; padding: 12px; text-align: left; }
				td { padding: 10px; border-bottom: 1px solid #ddd; }
				tr:nth-child(even) { background: #f9f9f9; }
				.bar { height: 20px; background: #e0e0e0; border-radius: 4px; overflow: hidden; }
				.bar-fill { height: 100%; background: #15803d; color: white; text-align: center; font-size: 12px; line-height: 20px; }
				.fecha { color: #999; font-size: 0.9em; }
			</style>
		</head>
		<body>
			<h1>Reporte de Progreso: Semejanza Interactiva</h1>
			<p class="fecha">Generado: ${fecha}</p>

			<h2>Resumen General</h2>
			<div class="stat-box">
				<span class="stat-label">Progreso completado:</span> ${stats.porcentajeCompletado}%
			</div>
			<div class="bar">
				<div class="bar-fill" style="width: ${stats.porcentajeCompletado}%">${stats.porcentajeCompletado}%</div>
			</div>

			<div class="stat-box">
				<span class="stat-label">Puntuación total:</span> ${stats.puntuacionTotal} puntos
			</div>

			<h2>Actividades (2 totales)</h2>
			<div class="stat-box">
				<span class="stat-label">Completadas correctamente:</span> ${stats.actividadesCorrectas} / ${stats.actividadesTotales}
			</div>
			<table>
				<tr>
					<th>Actividad</th>
					<th>Estado</th>
				</tr>
				<tr>
					<td>A: Factor de escala</td>
					<td>${stats.detalle?.actividadA?.correcta ? "✓ Correcta" : "○ Pendiente"}</td>
				</tr>
				<tr>
					<td>B: Lado que falta</td>
					<td>${stats.detalle?.actividadB?.correcta ? "✓ Correcta" : "○ Pendiente"}</td>
				</tr>
			</table>

			<h2>Problemas (3 totales)</h2>
			<div class="stat-box">
				<span class="stat-label">Resueltos correctamente:</span> ${stats.problemasCorrectos} / ${stats.problemasTotales}
			</div>
			<table>
				<tr>
					<th>Problema</th>
					<th>Título</th>
					<th>Estado</th>
				</tr>
				<tr>
					<td>1</td>
					<td>Altura de un campanario con espejo</td>
					<td>${stats.detalle?.problema1?.correcta ? "✓ Correcta" : "○ Pendiente"}</td>
				</tr>
				<tr>
					<td>2</td>
					<td>Sombras en el patio</td>
					<td>${stats.detalle?.problema2?.correcta ? "✓ Correcta" : "○ Pendiente"}</td>
				</tr>
				<tr>
					<td>3</td>
					<td>Ancho de un río no accesible</td>
					<td>${stats.detalle?.problema3?.correcta ? "✓ Correcta" : "○ Pendiente"}</td>
				</tr>
			</table>

			<h2>Siguientes pasos</h2>
			<p>Continúa practicando los ejercicios que aún no has completado. Revisa las pistas y fórmulas si lo necesitas.</p>
			<p><strong>Comparte este reporte con tu profesor para seguimiento.</strong></p>
		</body>
		</html>
	`;

	// Crear Blob y descargar
	const blob = new Blob([html], { type: "text/html" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = `Reporte_Semejanza_${new Date().toISOString().split("T")[0]}.html`;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}

function reiniciarProgreso() {
	const confirmacion = window.confirm(
		"¿Estás seguro de que deseas reiniciar todo el progreso? Esta acción no se puede deshacer."
	);

	if (confirmacion) {
		guardarProgreso(crearProgresoVacio());
		window.location.reload();
	}
}
