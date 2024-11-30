import { writable } from 'svelte/store';

export interface Product {
	id: number;
	name: string;
	category: string;
	stock: number;
	minStock: number;
	price: number;
}

export const inventory = writable<Product[]>([
	{
		id: 1,
		name: 'Remera Básica',
		category: 'Remeras',
		stock: 45,
		minStock: 10,
		price: 15000
	},
	{
		id: 2,
		name: 'Jean Clásico',
		category: 'Pantalones',
		stock: 23,
		minStock: 15,
		price: 25000
	},
	{
		id: 3,
		name: 'Vestido Floral',
		category: 'Vestidos',
		stock: 12,
		minStock: 8,
		price: 35000
	}
]);
