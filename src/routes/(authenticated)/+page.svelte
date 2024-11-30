<script lang="ts">
	const stockStats = [
		{ title: 'Total Productos', value: '156', icon: '📦' },
		{ title: 'Stock Bajo', value: '8', icon: '⚠️' },
		{ title: 'Sin Stock', value: '3', icon: '❌' },
		{ title: 'Categorías', value: '12', icon: '🏷️' }
	];
</script>

<div class="space-y-6">
	<div class="flex justify-between items-center">
		<h1 class="text-2xl font-bold text-gray-900">Panel de Control</h1>
		<button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
			Agregar Producto
		</button>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
		{#each stockStats as stat}
			<div class="bg-white p-6 rounded-lg shadow-md">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm text-gray-600">{stat.title}</p>
						<p class="text-2xl font-bold text-gray-900">{stat.value}</p>
					</div>
					<span class="text-2xl">{stat.icon}</span>
				</div>
			</div>
		{/each}
	</div>

	<div class="bg-white rounded-lg shadow-md p-6">
		<h2 class="text-xl font-semibold mb-4">Actualizaciones Recientes</h2>
		<div class="space-y-4">
			<div class="flex justify-between items-center border-b pb-2">
				<div>
					<p class="font-medium">Remera de Verano</p>
					<p class="text-sm text-gray-600">Stock actualizado</p>
				</div>
				<span class="text-green-600">+15 unidades</span>
			</div>
			<div class="flex justify-between items-center border-b pb-2">
				<div>
					<p class="font-medium">Jean</p>
					<p class="text-sm text-gray-600">Alerta de stock bajo</p>
				</div>
				<span class="text-red-600">5 restantes</span>
			</div>
		</div>
	</div>
</div>
