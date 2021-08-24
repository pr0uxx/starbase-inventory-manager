export default class Ore {
    
    public constructor(name: string, marketValue = 0){
        this.name = name;
        this.marketValue = marketValue;
    }

    name : string;
    stackSize = 1728000;
    marketValue: number;
}