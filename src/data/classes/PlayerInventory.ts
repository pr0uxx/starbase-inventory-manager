import Market from "./Market";
import Ore from "./Ore";

export default class PlayerInventory {
	constructor() {
		this.ores = Market.ores.map(x => new PlayerOwnedOre(x.name, x.marketValue));
		this.cash = 0;
	}

	ores: PlayerOwnedOre[];
	cash: number;
	get totalOreVolume(): number {
		const r = this.sum(this.ores.map(x => {
			if (x.totalOre) {
				return x.totalOre;
			} else {
				const totalOre = (x.fullStackCount * x.stackSize) + x.nonFullStackTotalVolume;
				return Number(totalOre.toFixed(0));
			}
			
		}));
		return r;
	}

	get totalOreValue(): number {
		return this.sum(this.ores.map(x => {
			if (x.totalMarketValue) {
				return x.totalMarketValue;
			} else {
				const totalOre = (x.fullStackCount * x.stackSize) + x.nonFullStackTotalVolume;
				const totalValue = (totalOre / x.stackSize) * x.marketValue;
				return Number(totalValue.toFixed(0));
			}
		}));
	}

	private sum(arr: number[]) {
		return arr.reduce((accumulator, currentValue) => accumulator + currentValue);
	}
}

export class PlayerOwnedOre extends Ore {
	constructor(name: string, marketValue = 0) {
		super(name, marketValue);
	}

	fullStackCount = 0;
	nonFullStackTotalVolume = 0;

	private _totalOre = 0;

	get totalOre() {
		console.log(this.fullStackCount, this.stackSize, this.nonFullStackTotalVolume);
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
	get totalOreValue() : number {
		return this.inventoryA.totalOreValue - this.inventoryB.totalOreValue;
	}

	get totalOreVolume(): number {
		return this.inventoryA.totalOreVolume - this.inventoryB.totalOreVolume;
	}

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