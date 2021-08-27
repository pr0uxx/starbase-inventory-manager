<template>


	<div class="container-fluid inventory-card">
		<div class="form-floating m-2">
			<input type="number" v-model="playerInventory.cash" class="form-control" id="floatingInput">
			<label for="floatingInput">Player Cash Balance</label>
		</div>

		<div class="row m-2 mt-3">
			<div class="card ">
				<p class="d-flex justify-content-between w-100">
					<span>Inventory total ore: </span>
					<span>{{formatNumber(playerInventory.totalOreVolume)}}</span>
				</p>
				<p class="d-flex justify-content-between w-100">
					<span>Inventory total ore stacks: </span>
					<span>{{formatNumber(playerInventory.totalOreStacks)}}</span>
				</p>
				<p class="d-flex justify-content-between w-100">
					<span>Inventory total value:</span>
					<span>{{formatNumber(playerInventory.totalOreValue)}} <img src="../assets/credit.png" /></span>
				</p>
			</div>
		</div>

		<div class="row m-1">
			<div class="col-12 d-flex align-items-center justify-content-end">
				<div class="btn-group mt-2">
					<button class="btn btn-primary" @click="savePlayerInventory()">Save</button>
					<button class="btn btn-secondary" @click="getPlayerInventory()">Load Inventory Data</button>
				</div>
			</div>
		</div>

	</div>

	<div class="table-responsive">
		<table class="table table-sm table-striped w-100">
			<thead>
				<tr>
					<th>Name</th>
					<th>Value</th>
					<th>Stacks</th>
					<th>Extra Volume</th>
					<th>Total Ore</th>
					<th>Total <img src="../assets/credit.png" /></th>
				</tr>

			</thead>
			<tbody>
				<tr class="align-middle" v-for="ore in playerInventory.ores" :key="ore">
					<td>{{ore.name}}</td>
					<td>{{ore.marketValue}}</td>
					<td width="15%">
						<input class="form-control form-control-sm" type="number" v-model="ore.fullStackCount" />
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
	import { defineComponent } from 'vue';
	import PlayerInventory from '@/data/classes/PlayerInventory';
	import GenericLocalStore from '../data/classes/GenericLocalStore';
import Market from '../data/classes/Market';
	export default defineComponent({
		name: 'OreTable',
		data() {
			return {
				playerInventory: (this.inventory ?? new PlayerInventory()) as PlayerInventory
			}
		},
		props: {
			inventory: Object
		},
		methods: {
			formatNumber(n: number) {
				return this.$stringHelper.formatNumber(n);
			},
			getPlayerInventory() {
				const db = this.$dbContext;

				const store = db.getStore("PlayerInventory", "readonly");
				if (store) {
					const count = store.count(undefined);

					count.onsuccess = (ev) => {
						const index = 1;

						db.getStoredObjectByIndex<GenericLocalStore>(store, index)
							.then(result => {
								if (result) {

									const inv = JSON.parse(result.data) as PlayerInventory;
									for (const ore of this.playerInventory.ores) {
										const match = inv.ores.find(x => x.name === ore.name);

										ore.fullStackCount = match?.fullStackCount ?? ore.fullStackCount;
										ore.nonFullStackTotalVolume = match?.nonFullStackTotalVolume ?? ore.nonFullStackTotalVolume;
									}
									this.playerInventory.cash = inv?.cash ?? this.playerInventory.cash;
								}
							});
					}

					count.onerror = (ev) => {
						console.error('count error', ev);
					}

				} else {
					(console.error('unable to get store'))
				}
			},
			savePlayerInventory() {
				const db = this.$dbContext;
				const store = db.getStore("PlayerInventory", "readwrite");
				if (store) {
					const count = store.count();

					count.onsuccess = ev => {
						const data = new GenericLocalStore(this.playerInventory);

						if (count.result === 0) {
							const request = store.add(data);

							request.onsuccess = ev => {
								console.log('saved player inventory!')
							}

							request.onerror = ev => {
								console.error('error saving player inventory', ev);
							}
						}
						else {
							store.put(data, 1);
						}
					}


				} else {
					(console.error('unable to get store'))
				}
			}
			
		}

	})
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
