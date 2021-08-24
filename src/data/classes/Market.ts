import Ore from "./Ore";

export default class Market {
    static lastUpdate = new Date(2021,8,23);

    static ores: Ore[] = [
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
    ]
}