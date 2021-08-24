<template>
	<div class="form-floating m-2">
		<input type="number" v-model="compare.cash" class="form-control" id="floatingInput" disabled
			v-bind:class="{ 'is-invalid': compare.cash < 0, 'is-valid' : compare.cash > 0 }">
		<label for="floatingInput">Balance After Purchase</label>
	</div>
	<ul>
		<li>
			Total ore volume remaining: {{formatNumber(compare.totalOreVolume)}}
		</li>
		<li>
			Total ore value remaining: {{formatNumber(compare.totalOreValue)}}
		</li>
	</ul>
	<table class="table table-striped">
		<thead>
			<tr>
				<th>Name</th>
				<!--<th>Stack Value</th>-->
				<th>Full Stack Count</th>
				<th>Extra Volume</th>
				<th>Total Ore</th>
				<th>Total Value</th>
			</tr>

		</thead>
		<tbody>
			<tr v-for="ore in compare.oreArray" :key="ore" v-bind:class="{ 'text-danger': ore.totalOre < 0, 'text-success' : ore.totalOre > 0 }">
				<td>{{ore.name}}</td>
				<!--<td>{{ore.marketValue}}</td>-->
				<td>
					<!--<input class="form-control form-control-sm" type="number" v-model="ore.fullStackCount" />-->
					{{ore.fullStackCount}}
				</td>
				<td>
					<!--<input class="form-control form-control-sm" type="number" v-model="ore.nonFullStackTotalVolume"/>-->
					{{ore.nonFullStackTotalVolume}}
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
	import PlayerInventory, { InventoryCompare } from '@/data/classes/PlayerInventory';
	export default defineComponent({
		name: 'InventoryCompare',
		data() {
			return {
				compare: new InventoryCompare(this.inventoryA as PlayerInventory, this.inventoryB as PlayerInventory)
			}
		},
		props: {
			inventoryA: Object,
			inventoryB: Object
		},
		methods: {
			formatNumber(n: number) {
				return n ? n.toFixed(0) : 0;
			}
		}
	})
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
