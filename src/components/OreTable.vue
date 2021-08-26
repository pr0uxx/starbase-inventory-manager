<template>
	<div class="form-floating m-2">
		<input type="number" v-model="playerInventory.cash" class="form-control" id="floatingInput">
		<label for="floatingInput">Player Cash Balance</label>
	</div>

	<div class="container-fluid">
		<div class="row">
			<div class="col-5 d-flex align-items-center justify-content-end">
				<div class="btn-group mt-2">
					<button class="btn btn-primary" @click="savePlayerInventory()">Save</button>
					<button class="btn btn-secondary" @click="getPlayerInventory()">Load Inventory Data</button>
				</div>
			</div>


		</div>

	</div>

	<ul>
		<li>
			Inventory total ore: {{formatNumber(playerInventory.totalOreVolume)}}
		</li>
		<li>
			Inventory total ore stacks: {{formatNumber(playerInventory.totalOreStacks)}}
		</li>
		<li>
			Inventory total value: {{formatNumber(playerInventory.totalOreValue)}}
		</li>
	</ul>
	<table class="table table-striped">
		<thead>
			<tr>
				<th>Name</th>
				<th>Stack Value</th>
				<th>Full Stack Count</th>
				<th>Extra Volume</th>
				<th>Total Ore</th>
				<th>Total Value</th>
			</tr>

		</thead>
		<tbody>
			<tr v-for="ore in playerInventory.ores" :key="ore">
				<td>{{ore.name}}</td>
				<td>{{ore.marketValue}}</td>
				<td>
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
</template>
<script lang="ts">
	import { defineComponent } from 'vue';
	import PlayerInventory from '@/data/classes/PlayerInventory';
import GenericLocalStore from '../data/classes/GenericLocalStore';
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
				n = Number(n) ?? 0;
				return n ? n.toFixed(0) : 0;
			},
			getPlayerInventory() {
				const db = this.$dbContext;

				const store = db.getStore("PlayerInventory", "readonly");
				if (store) {
					const count = store.count(undefined);

					count.onsuccess = (ev) => {
						/*const lastIndex = 1;*/
						const index = 1;					

						db.getStoredObjectByIndex<string>(store, index)
							.then(result => {
								if (result) {
									//const gns = result as GenericLocalStore;
									//console.log(gns.data) ;
									const inv = JSON.parse(result) as PlayerInventory;

									this.playerInventory.cash = inv?.cash ?? this.playerInventory.cash;
									this.playerInventory.ores = inv?.ores ?? this.playerInventory.ores;
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
						const data = this.playerInventory;

						if (count.result === 0) {
							const request = store.add(JSON.stringify(data));

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
