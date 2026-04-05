/**
 * Módulo de contenido educativo adicional
 * Glosario, errores comunes, soluciones paso a paso
 */

const TERMINOS_GLOSARIO = [
	{
		termino: "Semejanza",
		definicion: "Dos figuras son semejantes si tienen la misma forma pero diferente tamaño. Sus ángulos son iguales y sus lados proporcionales."
	},
	{
		termino: "Factor de escala (k)",
		definicion: "El número que multiplica los lados de una figura para obtener los lados de otra semejante. Si k=2, la segunda figura es el doble de grande."
	},
	{
		termino: "Proporción",
		definicion: "Una igualdad entre dos razones. Cuando dos razones son iguales, decimos que forman una proporción: a/b = c/d"
	},
	{
		termino: "Razón",
		definicion: "El cociente entre dos cantidades. Ejemplos: 10/5 = 2, o 'la razón entre 10 y 5 es 2'."
	},
	{
		termino: "Ángulos",
		definicion: "La abertura entre dos líneas. En figuras semejantes, los ángulos correspondientes son iguales."
	},
	{
		termino: "Congruente",
		definicion: "Dos figuras son congruentes si tienen la misma forma y el mismo tamaño (es un caso especial de semejanza con k=1)."
	}
];

const ERRORES_COMUNES = [
	{
		titulo: "Error: Dividir en el orden incorrecto",
		incorrecto: "Si lado pequeño = 5 y lado grande = 15, entonces k = 5/15 = 0.33",
		correcto: "k = lado grande / lado pequeño = 15/5 = 3. Siempre divide grande entre pequeño.",
		leccion: "El factor de escala siempre es mayor que 1 si la segunda figura es más grande."
	},
	{
		titulo: "Error: No mantener la proporción",
		incorrecto: "Si los lados de un triángulo son 3 y 5, y quiero un triángulo semejante con factor k=2, pongo 6 y 11.",
		correcto: "Multiplica TODOS los lados por k: 3×2=6 y 5×2=10. Todos deben crecer proporcionalmente.",
		leccion: "En semejanza, cada lado se multiplica por el mismo factor k."
	},
	{
		titulo: "Error: Mezclar unidades",
		incorrecto: "La sombra del poste es 2 metros y la del árbol 800 centímetros. Calculo mal porque sumo unidades distintas.",
		correcto: "Convierte todo a la misma unidad: 2 m = 200 cm. Luego sí haz la razón 800/200 = 4.",
		leccion: "Siempre convierte a la misma unidad antes de calcular razones."
	},
	{
		titulo: "Error: Olvidar el teorema de Tales",
		incorrecto: "El poste mide 1.5 m y su sombra 2 m. El árbol tiene sombra 8 m, ¿cuánto mide? Respuesta: 1.5 + 8 = 9.5 m",
		correcto: "Las razones altura/sombra son iguales: 1.5/2 = h/8, entonces h = 6 m.",
		leccion: "No puedes sumar. Debes usar proporciones."
	}
];

export function iniciarGlosario(rootId = "glosario-root") {
	const root = document.getElementById(rootId);
	if (!root) return;

	root.innerHTML = "";
	TERMINOS_GLOSARIO.forEach((item) => {
		const details = document.createElement("details");
		details.className = "glosario-item";
		details.innerHTML = `
			<summary class="glosario-termino">${item.termino}</summary>
			<p class="glosario-def">${item.definicion}</p>
		`;
		root.appendChild(details);
	});
}

export function iniciarErroresComunes(rootId = "errores-root") {
	const root = document.getElementById(rootId);
	if (!root) return;

	root.innerHTML = "";
	ERRORES_COMUNES.forEach((error) => {
		const card = document.createElement("article");
		card.className = "error-card";
		card.innerHTML = `
			<h3>${error.titulo}</h3>
			<div class="error-row">
				<div class="error-lado">
					<p><strong>❌ Incorrecto:</strong></p>
					<p class="error-text">${error.incorrecto}</p>
				</div>
				<div class="error-lado correcto">
					<p><strong>✅ Correcto:</strong></p>
					<p class="error-text">${error.correcto}</p>
				</div>
			</div>
			<p class="error-leccion"><strong>Lección:</strong> ${error.leccion}</p>
		`;
		root.appendChild(card);
	});
}
