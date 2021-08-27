import Market from "./Market";
import Ore from "./Ore";

export default class PlayerInventory {
	constructor() {
		this.ores = Market.ores.map(x => new PlayerOwnedOre(x.name, x.marketValue));
		this.cash = 0;
		this.updateOres();
	}

	private tick =  0;
	//private startUpdating() {
	//	requestAnimationFrame(() => this.updateOres());
	//}

	updateOres() {
		this.ores.forEach(x => {
			const m = Market.ores.find(o => o.name === x.name);
			if (m) {
				x.marketValue = m.marketValue;
			}
		});

	}

	readonly createdDate = new Date(Date.now());
	ores: PlayerOwnedOre[];
	cash: number;
	get totalOreVolume(): number {
		return this.getTotalOreVolume();
	}

	getTotalOreVolume(): number {
		const r = this.sum(this.ores.map(x => {
			if (x.totalOre && x.totalOre > 0) {
				return x.totalOre;
			} else {
				const totalOre = (x.fullStackCount * x.stackSize) + x.nonFullStackTotalVolume;
				const t = Number(totalOre) ?? 0;
				return Number(t.toFixed(0) ?? 0);
			}

		}));
		return r;
	}

	get totalOreValue(): number {
		return this.getTotalOreValue();
	}

	getTotalOreValue(): number {
		return this.sum(this.ores.map(x => {
			if (x.totalMarketValue && x.totalMarketValue > 0) {
				return x.totalMarketValue;
			} else {
				const totalOre = (x.fullStackCount * x.stackSize) + x.nonFullStackTotalVolume;
				const totalValue = (totalOre / x.stackSize) * x.marketValue;
				const t = Number(totalValue) ?? 0;
				return Number(t.toFixed(0) ?? 0);
			}
		}));
	}

	get totalOreStacks(): number {
		const n = this.totalOreVolume / this.ores[0].stackSize;
		return n ?? 0;
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
		return this.getTotalOre();
	}

	getTotalOre() {
		this._totalOre = (this.fullStackCount * this.stackSize) + this.nonFullStackTotalVolume;
		return this._totalOre;
	}

	//  set totalOre(value: number) {
	//this._totalOre = this.totalOre;
	//  }

	get totalMarketValue() {
		return this.getTotalMarketValue();
	}

	getTotalMarketValue() {
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

	get totalOreStacks(): number {
		return this.inventoryA.totalOreStacks - this.inventoryB.totalOreStacks;
	}

	get oreArray(): PlayerOwnedOre[] {
		return this.inventoryA.ores.map((a, index) => {
			const c = new PlayerOwnedOre(a.name, a.marketValue);
			const b = this.inventoryB.ores[index];

			const totalVolume = a.totalOre - b.totalOre;
			const stackString = (totalVolume / a.stackSize).toString();
			const split = stackString.split('.');

			c.fullStackCount = Number(split[0]);
			c.nonFullStackTotalVolume = split[1] ? Number(`0.${split[1]}`) * a.stackSize : 0;

			//c.nonFullStackTotalVolume = a.nonFullStackTotalVolume;
			//c.fullStackCount = a.fullStackCount;

			
			//c.fullStackCount -= b.fullStackCount;
			//c.nonFullStackTotalVolume = a.nonFullStackTotalVolume - b.nonFullStackTotalVolume;
			return c;
		});
	}

	get cash() : number {
		return this.inventoryA.cash - this.inventoryB.cash;
	}
}