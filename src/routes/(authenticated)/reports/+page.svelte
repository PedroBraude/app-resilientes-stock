<script lang="ts">
	const reportTypes = [
		{ id: 'inventory', name: 'Reporte de Inventario', icon: '📦' },
		{ id: 'sales', name: 'Reporte de Ventas', icon: '💰' },
		{ id: 'lowStock', name: 'Productos con Stock Bajo', icon: '⚠️' },
		{ id: 'categories', name: 'Análisis por Categorías', icon: '📊' }
	];
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<h1 class="text-2xl font-bold text-gray-900">Informes</h1>
	</div>

	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		{#each reportTypes as report}
			<div
				class="cursor-pointer rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
			>
				<div class="flex items-center space-x-4">
					<span class="text-3xl">{report.icon}</span>
					<div>
						<h3 class="text-lg font-semibold">{report.name}</h3>
						<button class="mt-2 text-blue-600 hover:text-blue-800">Generar Reporte</button>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<div class="rounded-lg bg-white p-6 shadow-md">
		<h2 class="mb-4 text-lg font-semibold">Reportes Recientes</h2>
		<div class="space-y-4">
			<div class="flex items-center justify-between rounded-lg bg-gray-50 p-4">
				<div>
					<p class="font-medium">Reporte de Inventario</p>
					<p class="text-sm text-gray-600">Generado el 15 de Enero, 2024</p>
				</div>
				<button class="text-blue-600 hover:text-blue-800">Descargar</button>
			</div>
			<div class="flex items-center justify-between rounded-lg bg-gray-50 p-4">
				<div>
					<p class="font-medium">Reporte de Ventas Mensual</p>
					<p class="text-sm text-gray-600">Generado el 1 de Enero, 2024</p>
				</div>
				<button class="text-blue-600 hover:text-blue-800">Descargar</button>
			</div>
		</div>
	</div>
</div>
