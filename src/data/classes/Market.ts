import Ore from "./Ore";
import OreHistoryItem from "@/data/classes/OreHistoryItem";

export default class Market {
    static lastUpdate = new Date(2021,8,26);

    static ores: Ore[] = [
        new Ore('Aegisium', 6440),
        new Ore('Ajatite', 549),
        new Ore('Arkanium', 12780),
        new Ore('Bastium', 2050),
        new Ore('Charodium', 4449),
        new Ore('Corazium', 21649),
        new Ore('Exorium', 4644),
        new Ore('Ice', 817),
        new Ore('Karnite', 9900),
        new Ore('Kutonium', 18935),
        new Ore('Lukium', 20500),
        new Ore('Nhurgite', 3099),
        new Ore('Surtrite', 4090),
        new Ore('Valkite', 545),
        new Ore('Vokarium', 2040),
        new Ore('Ymrium', 28399)
    ];

    static oreHistory: OreHistoryItem[] = [
        new OreHistoryItem([
	        new Ore('Aegisium', 7750),
	        new Ore('Ajatite', 548),
	        new Ore('Arkanium', 12895),
	        new Ore('Bastium', 2495),
	        new Ore('Charodium', 4398),
	        new Ore('Corazium', 28895),
	        new Ore('Exorium', 7089),
	        new Ore('Ice', 817),
	        new Ore('Karnite', 4749),
	        new Ore('Kutonium', 22950),
	        new Ore('Lukium', 24000),
	        new Ore('Nhurgite', 3340),
	        new Ore('Surtrite', 3850),
	        new Ore('Valkite', 543),
	        new Ore('Vokarium', 2100),
	        new Ore('Ymrium', 31270)
        ], new Date(2021, 8, 23))
	    ];
}