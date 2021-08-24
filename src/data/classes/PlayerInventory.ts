import Market from "./Market";
import Ore from "./Ore";

export default class PlayerInventory {
	constructor() {
		this.ores = Market.ores.map(x => new PlayerOwnedOre(x.name, x.marketValue));
		this.cash = 0;
	}

	ores: PlayerOwnedOre[];
	cash: number;
}

export class PlayerOwnedOre extends Ore {
	constructor(name: string, marketValue = 0) {
		super(name, marketValue);
	}

	fullStackCount = 0;
	nonFullStackTotalVolume = 0;

	private _totalOre = 0;

	get totalOre() {
		this._totalOre = (this.fullStackCount * this.stackSize) + this.nonFullStackTotalVolume;
		return this._totalOre;
	}

	//  set totalOre(value: number) {
	//this._totalOre = this.totalOre;
	//  }

	get totalMarketValue() {
		return (this.totalOre / this.stackSize) * this.marketValue;
	}
}

export class InventoryCompare {
	constructor(inventoryA: PlayerInventory, inventoryB: PlayerInventory) {
		//this.oreArray = inventoryA.ores.map((a, index) => {
		//	const b = inventoryB.ores[index];
		//	a.fullStackCount -= b.fullStackCount;
		//	a.nonFullStackTotalVolume -= b.nonFullStackTotalVolume;
		//	return a;
		//});
		this.inventoryA = inventoryA;
		this.inventoryB = inventoryB;
	}

	inventoryA: PlayerInventory;
	inventoryB: PlayerInventory;

	get oreArray(): PlayerOwnedOre[] {
		return this.inventoryA.ores.map((a, index) => {
			const c = new PlayerOwnedOre(a.name, a.marketValue);
			c.nonFullStackTotalVolume = a.nonFullStackTotalVolume;
			c.fullStackCount = a.fullStackCount;

			const b = this.inventoryB.ores[index];
			c.fullStackCount -= b.fullStackCount;
			c.nonFullStackTotalVolume = a.nonFullStackTotalVolume - b.nonFullStackTotalVolume;
			return c;
		});
	}

	get cash() : number {
		return this.inventoryA.cash - this.inventoryB.cash
	}
}