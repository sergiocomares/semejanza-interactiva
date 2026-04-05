function punto(x, y) {
	return `${x},${y}`;
}

function triangulo(baseX, baseY, ancho, alto) {
	return [
		punto(baseX, baseY),
		punto(baseX + ancho, baseY),
		punto(baseX + ancho * 0.2, baseY - alto)
	].join(" ");
}

function renderizarSVG(root, escala) {
	const smallW = 100;
	const smallH = 70;
	const largeW = smallW * escala;
	const largeH = smallH * escala;

	const smallPoints = triangulo(60, 220, smallW, smallH);
	const largePoints = triangulo(220, 220, largeW, largeH);

	root.innerHTML = `
		<article class="interactive-card svg-panel">
			<h3>Triángulos semejantes en SVG</h3>
			<p>
				Mueve el control para cambiar el factor de escala. Los dos triángulos conservan
				la forma y solo cambia el tamaño.
			</p>

			<div class="controls-row">
				<label for="escala-svg">Factor k: <strong id="escala-valor">${escala.toFixed(1)}</strong></label>
				<input id="escala-svg" type="range" min="1" max="3" step="0.1" value="${escala}" />
			</div>

			<div class="legend">
				<span class="small">Triangulo original</span>
				<span class="large">Triangulo escalado</span>
			</div>

			<div class="svg-wrap">
				<svg viewBox="0 0 600 280" role="img" aria-label="Comparación de triángulos semejantes">
					<defs>
						<pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
							<path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e8edf3" stroke-width="1"></path>
						</pattern>
					</defs>
					<rect x="0" y="0" width="600" height="280" fill="url(#grid)"></rect>

					<polygon points="${smallPoints}" fill="rgba(245, 158, 11, 0.25)" stroke="#d97706" stroke-width="3"></polygon>
					<polygon points="${largePoints}" fill="rgba(14, 165, 162, 0.25)" stroke="#0f766e" stroke-width="3"></polygon>

					<text x="60" y="240" fill="#92400e" font-size="14">Base: ${smallW.toFixed(0)}</text>
					<text x="220" y="240" fill="#115e59" font-size="14">Base: ${largeW.toFixed(0)}</text>
				</svg>
			</div>
		</article>
	`;

	const slider = root.querySelector("#escala-svg");
	slider.addEventListener("input", (event) => {
		const nuevoValor = Number(event.target.value);
		renderizarSVG(root, nuevoValor);
	});
}

export function iniciarDibujo(rootId = "dibujo-root") {
	const root = document.getElementById(rootId);
	if (!root) {
		return;
	}

	renderizarSVG(root, 1.8);
}
