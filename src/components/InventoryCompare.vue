<template>
	
	<div class="container-fluid">
		<div class="form-floating m-2">
			<input type="number" v-model="compare.cash" class="form-control" id="floatingInput" disabled
					v-bind:class="{ 'is-invalid': compare.cash < 0, 'is-valid' : compare.cash > 0 }">
			<label for="floatingInput">Balance After Purchase</label>
		</div>
		<div class="card m-2  mt-3 px-2">
			<p class="d-flex justify-content-between w-100">
				<span>Total ore volume remaining:  </span>
				<span>{{numberToKvString(compare.totalOreVolume)}}</span>
			</p>
			<p class="d-flex justify-content-between w-100">
				<span>Total ore stacks remaining: </span>
				<span>{{formatNumber(compare.totalOreStacks)}}</span>
			</p>
			<p class="d-flex justify-content-between w-100">
				<span>Total ore value remaining: </span>
				<span>{{formatNumber(compare.totalOreValue)}}<img src="../assets/credit.png" /></span>
			</p>
		</div>
	</div>
	<div class="table-responsive">
		<table class="table table-sm  table-striped">
			<thead>
				<tr>
					<th>Name</th>
					<!--<th>Stack Value</th>-->
					<th>Stack Count</th>
					<th>Extra Volume</th>
					<th>Total Ore</th>
					<th>Total <img src="../assets/credit.png" /></th>
				</tr>

			</thead>
			<tbody>
				<tr v-for="ore in compare.oreArray" :key="ore" v-bind:class="{ 'text-danger': ore.totalOre < 0, 'text-success' : ore.totalOre > 0 }">
					<td>{{ore.name}}</td>
					<td>
						{{ore.fullStackCount}}
					</td>
					<td>
						{{formatNumber(ore.nonFullStackTotalVolume)}}
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
				return this.$stringHelper.formatNumber(n);
			},
			numberToKvString(n: number) {
				return this.$stringHelper.numberToKvString(n)
			}
		}
	})
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
