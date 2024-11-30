<script lang="ts">
	export let showModal: boolean = false;
	export let title: string = '';
	export let maxWidth: string = 'max-w-sm';

	function closeModal() {
		showModal = false;
	}
</script>

{#if showModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none"
	>
		<div class="relative mx-auto my-6 w-auto {maxWidth}">
			<div
				class="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none"
			>
				<!-- Header -->
				<div
					class="border-blueGray-200 flex items-start justify-between rounded-t border-b border-solid p-5"
				>
					<h3 class="text-3xl font-semibold">
						{title}
					</h3>
					<button
						class="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black outline-none focus:outline-none"
						on:click={closeModal}
					>
						<span
							class="block h-6 w-6 bg-transparent text-2xl text-black outline-none focus:outline-none"
						>
							×
						</span>
					</button>
				</div>

				<!-- Body -->
				<div class="relative flex-auto p-6">
					<slot name="body">
						<!-- Default body content -->
					</slot>
				</div>

				<!-- Footer -->
				<div
					class="border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid p-6"
				>
					<slot name="footer">
						<button
							class="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
							type="button"
							on:click={closeModal}
						>
							Cerrar
						</button>
					</slot>
				</div>
			</div>
		</div>
	</div>
	<div class="fixed inset-0 z-40 bg-black opacity-25" on:click={closeModal}></div>
{/if}
