<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import { onMount } from 'svelte';

	interface Product {
		id: number;
		name: string;
		category: string;
		stock: number;
		minStock: number;
	}

	let inventory: Product[] = [
		{ id: 1, name: 'Remera Básica', category: 'Remeras', stock: 45, minStock: 10 },
		{ id: 2, name: 'Jean Clásico', category: 'Pantalones', stock: 23, minStock: 15 },
		{ id: 3, name: 'Vestido Floral', category: 'Vestidos', stock: 12, minStock: 8 }
	];

	let searchTerm = '';
	let selectedCategory = 'Todos';
	let showProductModal = false;
	let showDeleteModal = false;
	let editingProduct: Product | null = null;
	let productToDelete: Product | null = null;
	let newProduct: Product = {
		id: 0,
		name: '',
		category: '',
		stock: 0,
		minStock: 0
	};

	// Estado para categorías
	let categories = ['Remeras', 'Pantalones', 'Vestidos'];
	let showCategoryModal = false;
	let newCategoryName = '';
	let categoryToDelete = '';

	$: filteredInventory = inventory.filter((item) => {
		const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory;
		return matchesSearch && matchesCategory;
	});

	function openAddModal() {
		editingProduct = null;
		newProduct = {
			id: inventory.length + 1,
			name: '',
			category: '',
			stock: 0,
			minStock: 0
		};
		showProductModal = true;
	}

	function openEditModal(product: Product) {
		editingProduct = product;
		newProduct = { ...product };
		showProductModal = true;
	}

	function openDeleteModal(product: Product) {
		productToDelete = product;
		showDeleteModal = true;
	}

	function saveProduct() {
		if (editingProduct) {
			const index = inventory.findIndex((p) => p.id === editingProduct.id);
			if (index !== -1) {
				inventory[index] = { ...newProduct };
				inventory = [...inventory];
			}
		} else {
			inventory = [...inventory, { ...newProduct }];
		}
		showProductModal = false;
	}

	function deleteProduct() {
		if (productToDelete) {
			inventory = inventory.filter((item) => item.id !== productToDelete.id);
			showDeleteModal = false;
			productToDelete = null;
		}
	}

	// Función para agregar categoría
	function addCategory() {
		if (newCategoryName.trim()) {
			categories = [...categories, newCategoryName.trim()];
			newCategoryName = '';
			showCategoryModal = false;
		}
	}

	// Función para eliminar categoría
	function deleteCategory(category: string) {
		if (inventory.some((item) => item.category === category)) {
			alert('No se puede eliminar una categoría que tiene productos asociados');
			return;
		}
		categories = categories.filter((c) => c !== category);
		if (selectedCategory === category) {
			selectedCategory = 'Todos';
		}
	}
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<h1 class="text-2xl font-bold text-gray-900">Inventario</h1>
		<button
			class="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
			on:click={openAddModal}
		>
			Nuevo Producto
		</button>
	</div>

	<div class="mb-6 flex gap-4">
		<input
			type="text"
			placeholder="Buscar producto..."
			class="flex-1 rounded-lg border p-2"
			bind:value={searchTerm}
		/>
		<select class="rounded-lg border p-2" bind:value={selectedCategory}>
			<option>Todos</option>
			<option>Remeras</option>
			<option>Pantalones</option>
			<option>Vestidos</option>
		</select>
	</div>

	<div class="rounded-lg bg-white shadow-md">
		<table class="min-w-full">
			<thead class="bg-gray-50">
				<tr>
					<th class="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Producto</th>
					<th class="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Categoría</th>
					<th class="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Stock</th>
					<th class="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Estado</th>
					<th class="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Acciones</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-200">
				{#each filteredInventory as item}
					<tr>
						<td class="px-6 py-4">{item.name}</td>
						<td class="px-6 py-4">{item.category}</td>
						<td class="px-6 py-4">{item.stock}</td>
						<td class="px-6 py-4">
							{#if item.stock <= item.minStock}
								<span class="text-red-600">Stock Bajo</span>
							{:else}
								<span class="text-green-600">Normal</span>
							{/if}
						</td>
						<td class="px-6 py-4">
							<button
								class="mr-2 text-blue-600 hover:text-blue-800"
								on:click={() => openEditModal(item)}
							>
								Editar
							</button>
							<button
								class="text-red-600 hover:text-red-800"
								on:click={() => openDeleteModal(item)}
							>
								Eliminar
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<!-- Product Modal -->
<Modal
	title={editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
	bind:showModal={showProductModal}
>
	<div slot="body">
		<form class="space-y-4">
			<div>
				<label class="block text-sm font-medium text-gray-700">Nombre</label>
				<input
					type="text"
					bind:value={newProduct.name}
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
					required
				/>
			</div>
			<div>
				<label class="block text-sm font-medium text-gray-700">Categoría</label>
				<div class="flex gap-2">
					<select
						bind:value={newProduct.category}
						class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
						required
					>
						<option value="">Seleccionar categoría</option>
						{#each categories as category}
							<option>{category}</option>
						{/each}
					</select>
					<button
						type="button"
						class="mt-1 inline-flex items-center rounded-md border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium leading-4 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						on:click={() => (showCategoryModal = true)}
					>
						+
					</button>
				</div>
			</div>
			<div>
				<label class="block text-sm font-medium text-gray-700">Stock</label>
				<input
					type="number"
					bind:value={newProduct.stock}
					min="0"
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
					required
				/>
			</div>
			<div>
				<label class="block text-sm font-medium text-gray-700">Stock Mínimo</label>
				<input
					type="number"
					bind:value={newProduct.minStock}
					min="0"
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
					required
				/>
			</div>
		</form>
	</div>
	<div slot="footer">
		<button
			class="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
			type="button"
			on:click={() => (showProductModal = false)}
		>
			Cancelar
		</button>
		<button
			class="mb-1 mr-1 rounded bg-emerald-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
			type="button"
			on:click={saveProduct}
		>
			{editingProduct ? 'Guardar Cambios' : 'Agregar Producto'}
		</button>
	</div>
</Modal>

<!-- Delete Confirmation Modal -->
<Modal title="Confirmar Eliminación" bind:showModal={showDeleteModal}>
	<div slot="body">
		<p class="my-4 text-lg leading-relaxed text-gray-600">
			¿Está seguro que desea eliminar {productToDelete?.name}? Esta acción no se puede deshacer.
		</p>
	</div>
	<div slot="footer">
		<button
			class="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-gray-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
			type="button"
			on:click={() => (showDeleteModal = false)}
		>
			Cancelar
		</button>
		<button
			class="mb-1 mr-1 rounded bg-red-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-red-600"
			type="button"
			on:click={deleteProduct}
		>
			Eliminar
		</button>
	</div>
</Modal>

<!-- Category Modal -->
<Modal title="Gestionar Categorías" bind:showModal={showCategoryModal}>
	<div slot="body">
		<div class="space-y-4">
			<!-- Agregar nueva categoría -->
			<div>
				<label class="block text-sm font-medium text-gray-700">Nueva Categoría</label>
				<div class="mt-1 flex gap-2">
					<input
						type="text"
						bind:value={newCategoryName}
						class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
						placeholder="Nombre de la categoría"
					/>
					<button
						type="button"
						class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						on:click={addCategory}
					>
						Agregar
					</button>
				</div>
			</div>

			<!-- Lista de categorías existentes -->
			<div class="mt-4">
				<h4 class="mb-2 text-sm font-medium text-gray-700">Categorías Existentes</h4>
				<div class="space-y-2">
					{#each categories as category}
						<div class="flex items-center justify-between rounded-md bg-gray-50 p-2">
							<span>{category}</span>
							<button
								type="button"
								class="text-red-600 hover:text-red-800"
								on:click={() => deleteCategory(category)}
							>
								<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
									/>
								</svg>
							</button>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
	<div slot="footer">
		<button
			class="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-gray-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
			type="button"
			on:click={() => (showCategoryModal = false)}
		>
			Cerrar
		</button>
	</div>
</Modal>
