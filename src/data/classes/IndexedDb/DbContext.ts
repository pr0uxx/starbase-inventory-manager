class DbStore {
	constructor(tableName: string, keyPath: string, indexes: DbIndex[], autoIncrement: boolean) {
		this.storeName = tableName;
		this.indexes = indexes;
		this.keyPath = keyPath;
		this.autoIncrement = autoIncrement;
	}

	keyPath: string;
	storeName: string;
	indexes: DbIndex[];
	autoIncrement: boolean;
}

class DbIndex {
	constructor(name: string, isUnique: boolean) {
		this.name = name;
		this.isUnique = isUnique;
	}

	name: string;
	isUnique: boolean;
}

export class DbContext {
	dbName = 'sb-inv-db';
	version = 2;
	db: IDBDatabase | null = null;
	/*isInitialized = false;*/

	dbStores: DbStore[] = [
		new DbStore("ShipLocalStores", "shipName", [new DbIndex("shipName", true)], false),
		new DbStore("PlayerInventory", "id", [], true)
	];

	constructor() {
		//this.initDatabase().then(() => {
		//	this.isInitialized = true;
		//});
	}

	initDatabase() {
		return new Promise((resolve, reject) => {
			const request: IDBOpenDBRequest = indexedDB.open(this.dbName, this.version);

			request.onerror = ev => {
				reject(ev);
			}

			request.onupgradeneeded = ev => {
				this.addStores(ev).then(() => {
					console.log('finished adding stores');
					resolve(null);
				}, (err) => {
					console.error('error adding stores', err);
					reject(err);
				});
			}

			request.onsuccess = (ev) => {
				this.db = request.result;
				console.log('opened db successfully', this.db);
				resolve(null);
			}
		});

	}

	private addStores(event: any): Promise<unknown> {
		return new Promise((resolve, reject) => {
			if (event) {
				this.db = event.target.result as IDBDatabase;

				const localPromises: Promise<unknown>[] = [];
				const existingStores = this.db?.objectStoreNames;

				if (this.db) {
					for (const store of this.dbStores) {
						localPromises.push(new Promise((res, rej) => {
							if (existingStores.contains(store.storeName)) {
								res(null);
							} else {
								console.log('creating store with name', store.storeName);
								if (store.autoIncrement) {
									
									const r = this.db?.createObjectStore(store.storeName, { autoIncrement: true });
								} else {
									const objStore = this.db?.createObjectStore(store.storeName, { keyPath: store.keyPath });

									for (const index of store.indexes) {
										objStore?.createIndex(index.name, index.name, { unique: index.isUnique });
									}
								}
							}
						}));
					}

					Promise.all(localPromises).then(() => {
							resolve(null);
						},
						error => {
							reject(error);
						});
				} else {
					reject('db is null or undefined');
				}
			}
		});
	}

	getStore(storeName: string, mode: 'readonly' | 'readwrite'): IDBObjectStore | undefined {
		const transaction = this.db?.transaction(storeName, mode);
		return transaction?.objectStore(storeName);
	}

	getStoredObjectByIndex<T>(store: IDBObjectStore, index: string | number): Promise<T | null> {

		return new Promise((resolve, reject) => {
			console.log(store);
			const request = store.get(index);

			request.onerror = ev => {
				console.error(ev);
				reject(ev);
			}

			request.onsuccess = ev => {
				console.log(request);
				console.log(request.result);

				if (request.result) {
					resolve(request.result as T);
				} else {
					resolve(null);
				}

			}
		});
	}

	saveObject<T>(store: IDBObjectStore, index: string, value: T) {
		return new Promise((resolve, reject) => {
			this.getStoredObjectByIndex<T>(store, index)
				.then(obj => {
					let result: IDBRequest | undefined = undefined;
					if (obj) {
						result = store.put(value);
					} else {
						console.log('adding by index: ' + index, value);
						result = store.add(value);
					}

					if (result) {
						result.onsuccess = ev => {
							resolve(null);
						}
						result.onerror = ev => {
							reject(ev);
						}
					} else {
						reject('failed getting result on save');
					}
				});
		});

	}
}

