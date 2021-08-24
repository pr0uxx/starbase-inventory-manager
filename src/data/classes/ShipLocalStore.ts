import PlayerInventory from '@/data/classes/PlayerInventory'

export default class ShipLocalStore {
	constructor(shipName: string, shipData: PlayerInventory) {
		this.shipName = shipName;
		this.data = JSON.stringify(shipData);
	}

	shipName: string;
	data: string;

}
