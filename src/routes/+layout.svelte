<script lang="ts">
	import '../app.css';
</script>

<div class="flex min-h-screen flex-col bg-gray-50">
	<nav class="border-b border-gray-200 bg-white shadow-md">
		<div class="mx-auto max-w-6xl px-4">
			<div class="flex h-16 items-center justify-between">
				<div class="flex items-center">
					<a href="/" class="text-2xl font-bold text-blue-800">Resilientes</a>
				</div>
				<div class="flex space-x-6">
					<a href="/" class="text-gray-700 transition-colors duration-200 hover:text-blue-600"
						>Inicio</a
					>
					<a
						href="/inventory"
						class="text-gray-700 transition-colors duration-200 hover:text-blue-600">Inventario</a
					>
					<a href="/sales" class="text-gray-700 transition-colors duration-200 hover:text-blue-600"
						>Ventas</a
					>
					<a
						href="/reports"
						class="text-gray-700 transition-colors duration-200 hover:text-blue-600">Informes</a
					>
				</div>
			</div>
		</div>
	</nav>

	<main class="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
		<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-xl">
			<slot />
		</div>
	</main>

	<footer class="mt-auto border-t border-gray-200 bg-white shadow-lg">
		<div class="mx-auto max-w-6xl px-4 py-4">
			<p class="text-center text-gray-600">© 2024 Resilientes Tienda de Ropa</p>
		</div>
	</footer>
</div>
