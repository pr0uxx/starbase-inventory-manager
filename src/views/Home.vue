<template>
	<div class="home container-fluid">
		<p>Prices last updated: {{market.lastUpdate}}</p>
		<!--<div class="d-flex justify-content-center">
		<img alt="Vue logo" src="../assets/logo.png">
	</div>-->
		<div class="d-flex">
			<!--<button class="btn btn-primary stupid-btn" type="button" data-bs-toggle="collapse" data-bs-target="#pi-card" aria-expanded="false" aria-controls="collapseExample">
				<span class="text-vertical">Player Inventory</span>
			</button>-->
			<div class="card me-2" id="pi-card">
				<div class="card-header">
					Player Inventory
				</div>
				<OreTable :inventory="playerInventory" />
			</div>
			<!--<button class="btn btn-primary stupid-btn" type="button" data-bs-toggle="collapse" data-bs-target="#s-card" aria-expanded="false" aria-controls="collapseExample">
				<span class="text-vertical">Ship</span>
			</button>-->
			<div class="card me-2" id="s-card">
				<div class="card-header">
					Ship
				</div>
				<ShipPurchase :inventory="shipInventory" />
			</div>
			<!--<button class="btn btn-primary stupid-btn" type="button" data-bs-toggle="collapse" data-bs-target="#c-card" aria-expanded="false" aria-controls="collapseExample">
				<span class="text-vertical">Remaining</span>
			</button>-->
			<div class="card me-2" id="c-card">
				<div class="card-header">
					Remaining
				</div>
				<InventoryCompare :inventoryA="playerInventory" :inventoryB="shipInventory" />
			</div>

		</div>
		<!--<HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>-->

	</div>
</template>

<script lang="ts">
	import OreTable from '@/components/OreTable.vue';
	import { defineComponent } from 'vue';
	import PlayerInventory from '@/data/classes/PlayerInventory';
	import ShipPurchase from '@/components/ShipPurchase.vue';
	import InventoryCompare from '@/components/InventoryCompare.vue';
	import Market from '../data/classes/Market';


	export default defineComponent({
		name: "Home",
		components: {
			OreTable,
			ShipPurchase,
			InventoryCompare
		},
		data() {
			return {
				playerInventory: new PlayerInventory(),
				shipInventory: new PlayerInventory(),
				differenceInventory: new PlayerInventory(),
				market: Market
			}
		}
	})
</script>

<style scoped lang="scss">
	.text-vertical {
		display: inline-block;
		/*transform-origin: 0 0;*/
		width: 200px;
		transform: rotate(270deg);
		left: -70px;
		position: relative;
	}

	.stupid-btn {
		padding: 0;
		line-height: 20px;
		width: 60px;
	}
</style>
