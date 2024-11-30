<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import { inventory } from '$lib/stores/inventory';

	interface SaleItem {
		productId: number;
		name: string;
		quantity: number;
		price: number;
	}

	interface Sale {
		id: number;
		date: string;
		items: number;
		total: number;
		status: 'Completada' | 'Pendiente';
		products?: SaleItem[];
	}

	let sales: Sale[] = [
		{ id: 1, date: '2024-01-15', items: 3, total: 15000, status: 'Completada' },
		{ id: 2, date: '2024-01-14', items: 2, total: 8500, status: 'Completada' },
		{ id: 3, date: '2024-01-14', items: 1, total: 4500, status: 'Pendiente' }
	];

	let showNewSaleModal = false;
	let showSaleDetailsModal = false;
	let selectedSale: Sale | null = null;
	let newSale: SaleItem[] = [];
	let selectedProduct: any = null;
	let quantity: number = 1;
	let currentPrice: number = 0;

	let inventoryData: Product[] = [];

	inventory.subscribe((value) => {
		inventoryData = value;
	});

	function openNewSale() {
		newSale = [];
		showNewSaleModal = true;
	}

	function openSaleDetails(sale: Sale) {
		selectedSale = sale;
		showSaleDetailsModal = true;
	}

	function addProductToSale() {
		if (selectedProduct && quantity > 0) {
			const product = inventoryData.find((p) => p.id === selectedProduct.id);
			if (product && product.stock >= quantity) {
				const newItem: SaleItem = {
					productId: selectedProduct.id,
					name: selectedProduct.name,
					quantity: quantity,
					price: product.price
				};
				newSale = [...newSale, newItem];
				selectedProduct = null;
				quantity = 1;
				currentPrice = 0;
			} else {
				alert('No hay suficiente stock disponible');
			}
		}
	}

	function removeProductFromSale(index: number) {
		newSale = newSale.filter((_, i) => i !== index);
	}

	function addSale() {
		const sale: Sale = {
			id: sales.length + 1,
			date: new Date().toISOString().split('T')[0],
			items: newSale.reduce((acc, item) => acc + item.quantity, 0),
			total: newSale.reduce((acc, item) => acc + item.quantity * item.price, 0),
			status: 'Completada',
			products: newSale
		};

		// Update inventory stock
		inventory.update((items) => {
			return items.map((item) => {
				const saleItem = newSale.find((s) => s.productId === item.id);
				if (saleItem) {
					return { ...item, stock: item.stock - saleItem.quantity };
				}
				return item;
			});
		});

		sales = [sale, ...sales];
		showNewSaleModal = false;
	}

	$: todayStats = {
		totalSales: sales.reduce((acc, sale) => acc + sale.total, 0),
		transactions: sales.length,
		averageTicket: Math.round(sales.reduce((acc, sale) => acc + sale.total, 0) / sales.length)
	};

	$: saleTotal = newSale.reduce((acc, item) => acc + item.quantity * item.price, 0);
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<h1 class="text-2xl font-bold text-gray-900">Ventas</h1>
		<button
			class="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
			on:click={openNewSale}
		>
			Nueva Venta
		</button>
	</div>

	<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
		<div class="rounded-lg bg-white p-6 shadow-md">
			<h3 class="text-sm text-gray-500">Ventas del Día</h3>
			<p class="text-2xl font-bold">$ {todayStats.totalSales}</p>
		</div>
		<div class="rounded-lg bg-white p-6 shadow-md">
			<h3 class="text-sm text-gray-500">Transacciones</h3>
			<p class="text-2xl font-bold">{todayStats.transactions}</p>
		</div>
		<div class="rounded-lg bg-white p-6 shadow-md">
			<h3 class="text-sm text-gray-500">Ticket Promedio</h3>
			<p class="text-2xl font-bold">$ {todayStats.averageTicket}</p>
		</div>
	</div>

	<div class="rounded-lg bg-white shadow-md">
		<div class="border-b p-4">
			<h2 class="text-lg font-semibold">Últimas Ventas</h2>
		</div>
		<table class="min-w-full">
			<thead class="bg-gray-50">
				<tr>
					<th class="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">ID</th>
					<th class="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Fecha</th>
					<th class="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Items</th>
					<th class="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Total</th>
					<th class="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Estado</th>
					<th class="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Acciones</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-200">
				{#each sales as sale}
					<tr>
						<td class="px-6 py-4">#{sale.id}</td>
						<td class="px-6 py-4">{sale.date}</td>
						<td class="px-6 py-4">{sale.items}</td>
						<td class="px-6 py-4">$ {sale.total}</td>
						<td class="px-6 py-4">
							<span class={sale.status === 'Completada' ? 'text-green-600' : 'text-yellow-600'}>
								{sale.status}
							</span>
						</td>
						<td class="px-6 py-4">
							<button
								class="text-blue-600 hover:text-blue-800"
								on:click={() => openSaleDetails(sale)}>Ver Detalles</button
							>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<!-- New Sale Modal -->
<Modal title="Nueva Venta" bind:showModal={showNewSaleModal} maxWidth="max-w-2xl">
	<div slot="body">
		<div class="space-y-4">
			<!-- Product Selection -->
			<div class="grid grid-cols-2 gap-4">
				<div>
					<label class="block text-sm font-medium text-gray-700">Producto</label>
					<select
						class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
						bind:value={selectedProduct}
					>
						<option value={null}>Seleccionar producto</option>
						{#each inventoryData as product}
							<option value={product} disabled={product.stock <= 0}>
								{product.name} (Stock: {product.stock}) - ${product.price}
							</option>
						{/each}
					</select>
				</div>
				<div>
					<label class="block text-sm font-medium text-gray-700">Cantidad</label>
					<input
						type="number"
						min="1"
						bind:value={quantity}
						class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
					/>
				</div>
				<div>
					<label class="block text-sm font-medium text-gray-700">Precio</label>
					<input
						type="number"
						bind:value={currentPrice}
						class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
					/>
				</div>
				<div class="flex items-end">
					<button class="rounded-md bg-blue-600 px-4 py-2 text-white" on:click={addProductToSale}>
						Agregar
					</button>
				</div>
			</div>

			<!-- Products List -->
			{#if newSale.length > 0}
				<div class="mt-4">
					<h4 class="mb-2 font-medium">Productos en la venta</h4>
					<div class="divide-y rounded-md border">
						{#each newSale as item, index}
							<div class="flex items-center justify-between p-2">
								<div>
									<p class="font-medium">{item.name}</p>
									<p class="text-sm text-gray-600">
										{item.quantity} x ${item.price} = ${item.quantity * item.price}
									</p>
								</div>
								<button
									class="text-red-600 hover:text-red-800"
									on:click={() => removeProductFromSale(index)}
								>
									Eliminar
								</button>
							</div>
						{/each}
					</div>
					<div class="mt-2 text-right">
						<p class="font-medium">Total: ${saleTotal}</p>
					</div>
				</div>
			{/if}
		</div>
	</div>
	<div slot="footer">
		<button
			class="background-transparent px-6 py-2 text-sm font-bold uppercase text-gray-500"
			on:click={() => (showNewSaleModal = false)}
		>
			Cancelar
		</button>
		<button
			class="rounded bg-blue-600 px-6 py-3 text-sm font-bold uppercase text-white shadow hover:shadow-lg"
			on:click={addSale}
			disabled={newSale.length === 0}
		>
			Completar Venta
		</button>
	</div>
</Modal>

<!-- Sale Details Modal -->
<Modal title="Detalles de la Venta" bind:showModal={showSaleDetailsModal}>
	<div slot="body">
		{#if selectedSale}
			<div class="space-y-4">
				<div class="grid grid-cols-2 gap-4">
					<div>
						<p class="text-sm text-gray-600">ID de Venta</p>
						<p class="font-medium">#{selectedSale.id}</p>
					</div>
					<div>
						<p class="text-sm text-gray-600">Fecha</p>
						<p class="font-medium">{selectedSale.date}</p>
					</div>
					<div>
						<p class="text-sm text-gray-600">Estado</p>
						<p class="font-medium">{selectedSale.status}</p>
					</div>
					<div>
						<p class="text-sm text-gray-600">Total</p>
						<p class="font-medium">${selectedSale.total}</p>
					</div>
				</div>

				{#if selectedSale.products}
					<div>
						<h4 class="mb-2 font-medium">Productos</h4>
						<div class="divide-y rounded-md border">
							{#each selectedSale.products as product}
								<div class="p-2">
									<p class="font-medium">{product.name}</p>
									<p class="text-sm text-gray-600">
										{product.quantity} x ${product.price} = ${product.quantity * product.price}
									</p>
								</div>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		{/if}
	</div>
	<div slot="footer">
		<button
			class="background-transparent px-6 py-2 text-sm font-bold uppercase text-gray-500"
			on:click={() => (showSaleDetailsModal = false)}
		>
			Cerrar
		</button>
	</div>
</Modal>
