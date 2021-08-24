<template>
	<div class="form-floating m-2">
		<input type="number" v-model="playerInventory.cash" class="form-control" id="floatingInput">
		<label for="floatingInput">Player Cash Balance</label>
	</div>
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
	import { defineComponent, inject } from 'vue';
	import PlayerInventory, { PlayerOwnedOre } from '@/data/classes/PlayerInventory';
	export default defineComponent({
		name: 'OreTable',
		data() {
			return {
				playerInventory: this.inventory ?? new PlayerInventory()
			}
		},
		props: {
			inventory: Object
		},
		methods: {
			formatNumber(n: number) {
				return n.toFixed(0);
			}
		}
	})
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
