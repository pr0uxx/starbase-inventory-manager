

export default class StringHelper {
	formatNumber = (n: number): number => {
		const n1 = Number(n) ?? 0;
		return n1 ? Number(n.toFixed(0)) : 0;
	}

	numberToKvString = (n: number): string => {
		let n1 = Number(n) ?? 0;
		n1 = n1 / 1000;
		return `${n1} kv`;
	}
}