<template>
	<div class="container-fluid">
		<div class="form-floating m-2">
			<input type="number" v-model="shipInventory.cash" class="form-control" id="floatingInput">
			<label for="floatingInput">Ship Price</label>
		</div>
	</div>


	<div class="container-fluid" v-if="!showLoadDialog">
		<div class="row">
			<div class="col-6">
				<div class="form-floating m-2">
					<input type="text" v-model="shipName" class="form-control" id="floatingInput">
					<label for="floatingInput">Ship Name</label>
				</div>
			</div>
			<div class="col-6 d-flex align-items-center justify-content-center">
				<div class="btn-group">
					<button class="btn btn-primary" @click="saveShip()">Save Ship</button>
					<button class="btn btn-secondary" @click="showLoadShipDialog()">Load Ship</button>
				</div>
			</div>
		</div>
	</div>

	<div class="container-fluid">
		<div class="d-flex w-100" v-if="showLoadDialog">
			<select v-model="shipToLoad" class="form-select m-2" @change="loadShip(shipToLoad)">
				<option disabled value="">Please select one</option>
				<option v-for="name in shipNameArray" :key="name">{{name}}</option>
			</select>
		</div>
	</div>

	<div class="container-fluid">
		<div class="card m-2 px-2">
			<p class="d-flex justify-content-between w-100">
				<span>Ship total ore cost: </span>
				<span>{{formatNumber(shipInventory.totalOreVolume)}}</span>
			</p>
			<p class="d-flex justify-content-between w-100">
				<span>Ship total ore stacks:</span>
				<span>{{formatNumber(shipInventory.totalOreStacks)}}</span>
			</p>
			<p class="d-flex justify-content-between w-100">
				<span>Ship total ore value: </span>
				<span>{{formatNumber(shipInventory.totalOreValue)}}<img src="../assets/credit.png" /></span>
			</p>
		</div>
	</div>
	<div class="table-responsive">
		<table class="table table-sm table-striped w-100">
			<thead>
				<tr>
					<th>Name</th>
					<!--<th>Stack Value</th>-->
					<th>Stacks</th>
					<th>Extra Volume</th>
					<th>Total Ore</th>
					<th>Total <img src="../assets/credit.png" /></th>
				</tr>

			</thead>
			<tbody>
				<tr v-for="ore in shipInventory.ores" :key="ore">
					<td>{{ore.name}}</td>
					<!--<td>{{ore.marketValue}}</td>-->
					<td width="15%">
						<input class="form-control form-control-sm" type="number" v-model="ore.fullStackCount" />

						<!--{{ore.fullStackCount}}-->
					</td>
					<td>
						<input class="form-control form-control-sm" type="number" v-model="ore.nonFullStackTotalVolume" />
						<!--{{ore.nonFullStackTotalVolume}}-->
					</td>
					<td>
						{{formatNumber(ore.totalOre)}}
					</td>
					<td>
						{{formatNumber(ore.totalMarketValue)}}

					</td>
				</tr>
			</tbody>
		</table>
	</div>
	
</template>
<script lang="ts">
	import { defineComponent, inject } from 'vue';
	import PlayerInventory, { PlayerOwnedOre } from '@/data/classes/PlayerInventory';
	import ShipLocalStore from '../data/classes/ShipLocalStore';
	export default defineComponent({
		name: 'ShipPurchase',
		data() {
			return {
				shipInventory: (this.inventory ?? new PlayerInventory()) as PlayerInventory,
				shipName: '',
				showLoadDialog: false,
				shipNameArray: [] as string[],
				shipToLoad: ''
			}
		},
		props: {
			inventory: Object
		},
		methods: {
			formatNumber(n: number) {
				return this.$stringHelper.formatNumber(n);
			},
			showLoadShipDialog() {
				this.getShipNames().then(() => {
					if (this.shipNameArray.length > 0) {
						this.showLoadDialog = true;
					} else {
						alert('No saved ships!');
					}

				})
			},
			saveShip() {
				const context = this.$dbContext;
				const inv = this.shipInventory as PlayerInventory;
				const shipLocalStore = new ShipLocalStore(this.shipName, inv);
				context.initDatabase().then(() => {
					const store = context.getStore("ShipLocalStores", "readwrite");
					if (store) {
						context.saveObject(store, this.shipName, shipLocalStore);
					}
				}, error => {
					console.error('failed to save ship - error in init database', error)
				});
			},
			getShipNames() {
				const context = this.$dbContext;
				return new Promise((resolve, reject) => {
					context.initDatabase().then(() => {
						const store = context.getStore("ShipLocalStores", "readonly");
						if (store) {
							const query = store.getAllKeys();
							query.onsuccess = ev => {
								this.shipNameArray = query.result.map(x => x.toString());
								resolve(null);
							}

							query.onerror = ev => {
								console.error('error getting ship names', ev);
								reject();
							}
						}
					}, error => {
						console.error('failed to load ship - error in init database', error);
						reject();
					})
				})

			},
			loadShip(shipName: string) {
				const context = this.$dbContext;
				context.initDatabase().then(() => {
					const store = context.getStore("ShipLocalStores", "readonly");
					if (store) {
						context.getStoredObjectByIndex<ShipLocalStore>(store, shipName).then(result => {
							if (result) {
								const data = JSON.parse(result.data) as PlayerInventory;
								this.shipInventory.cash = data.cash;
								this.shipInventory.ores = data.ores;
								this.shipName = result.shipName;
								this.showLoadDialog = false;
							}
						},
							error => {
								console.error('unable to load ship', error);
							})
					}
				}, error => {
					console.error('failed to load ship - error in init database', error)
				})
			}
		}
	})
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
