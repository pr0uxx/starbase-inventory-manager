<template>
	<div class="market">
		<div class="d-flex flex-wrap">
			<div class="m-1" v-for="ore in oreTable" :key="ore">
				<label>{{ore.name}}</label>
				<input class="form-control form-control-sm" v-model.number="ore.marketValue" v-on:change="update(ore)" />
			</div>
		</div>
		<!--<div class="table-responsive">
			<table class="table table-sm">
				<thead>
				<tr>
					<th>Ore</th>
					<th><img src="../assets/credit.png" /></th>
				</tr>
				</thead>
				<tbody>
					<tr v-for="ore in oreTable" :key="ore">
						<td>{{ore.name}}</td>
						<td><input class="form-control form-control-sm" v-model.number="ore.marketValue"  v-on:change="update(ore)" /></td>
					</tr>
				</tbody>
			</table>
		</div>-->
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';
	import Market from '../data/classes/Market';
	import Ore from '../data/classes/Ore';
	export default defineComponent({
		name: 'Market',
		data() {
			return {
				oreTable: Market.ores
			}
		},
		methods: {
			update(ore: Ore) {
				const match = Market.ores.find(x => x.name === ore.name);

				if (match) {
					match.marketValue = ore.marketValue;
					console.log(Market);
				}
				this.$emit("updateOres", true);
			}
		},
		emits: {
			updateOres : Object
		}
	});

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
