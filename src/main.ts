import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap"
import { DbContext }  from "@/data/classes/IndexedDb/DbContext"


const app = createApp(App);
const c = new DbContext();
c.initDatabase();
app.config.globalProperties.$dbContext = c;

declare module '@vue/runtime-core' {
	export interface ComponentCustomProperties {
		$dbContext: DbContext
	}
}

app.use(router).mount('#app');
