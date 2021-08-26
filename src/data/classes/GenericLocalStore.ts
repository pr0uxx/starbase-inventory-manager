import PlayerInventory from '@/data/classes/PlayerInventory'

export default class GenericLocalStore {
	constructor(data: unknown) {
		this.data = JSON.stringify(data);
	}

	data: string;
}