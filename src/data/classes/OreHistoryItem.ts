import Ore from "@/data/classes/Ore"

export default class OreHistoryItem {
	constructor(oreArray: Ore[], date: Date) {
		this.oreArray = oreArray;
		this.date = date;
	}

	oreArray: Ore[];
	date: Date;
}