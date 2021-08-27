<template>
	<div class="home container-fluid">
		<p>Prices last updated: {{market.lastUpdate}}</p>	
		<div class="d-flex flex-wrap">
			<div class="col-12 col-md-6 col-lg-4">
				<div class="card  me-2" id="pi-card">
					<div class="card-header">
						Player Inventory
					</div>
					<OreTable :inventory="playerInventory" />
				</div>
			</div>
			<div class="col-12 col-md-6 col-lg-4">
				<div class="card me-2" id="s-card">
					<div class="card-header">
						Ship
					</div>
					<ShipPurchase :inventory="shipInventory" />
				</div>
			</div>
			<div class="col-12 col-md-12 col-lg-4">
				<div class="card me-2" id="c-card">
					<div class="card-header">
						Remaining
					</div>
					<InventoryCompare :inventoryA="playerInventory" :inventoryB="shipInventory" />
				</div>
			</div>


		</div>
		<ul class="nav nav-tabs mt-4" id="myTab" role="tablist">
			<li class="nav-item" role="presentation">
				<button class="nav-link active" id="market-tab" data-bs-toggle="tab" data-bs-target="#market" type="button" role="tab" aria-controls="market" aria-selected="true">Edit Market Values</button>
			</li>
		</ul>

		<div class="tab-content" id="myTabContent">
			<div class="tab-pane fade show active" id="market" role="tabpanel" aria-labelledby="market-tab">
				<div class="container-fluid">
					<div class="col-12">
						<MarketComponent class="p-2" @updateOres="updateOreValues()"></MarketComponent>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import OreTable from '@/components/OreTable.vue';
	import { defineComponent } from 'vue';
	import PlayerInventory from '@/data/classes/PlayerInventory';
	import ShipPurchase from '@/components/ShipPurchase.vue';
	import InventoryCompare from '@/components/InventoryCompare.vue';
	import Market from '../data/classes/Market';
	import MarketComponent from '@/components/Market.vue';


	export default defineComponent({
		name: "Home",
		components: {
			OreTable,
			ShipPurchase,
			InventoryCompare,
			MarketComponent
		},
		data() {
			return {
				playerInventory: new PlayerInventory(),
				shipInventory: new PlayerInventory(),
				differenceInventory: new PlayerInventory(),
				market: Market
			}
		},
		methods: {
			updateOreValues() {
				this.playerInventory.updateOres();
				this.shipInventory.updateOres();
			},
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
