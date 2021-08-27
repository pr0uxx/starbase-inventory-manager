import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap"
import { DbContext } from "@/data/classes/IndexedDb/DbContext"
import StringHelper from "@/data/classes/StringHelper"


const app = createApp(App);
const c = new DbContext();
c.initDatabase();
app.config.globalProperties.$dbContext = c;
app.config.globalProperties.$stringHelper = new StringHelper();

declare module '@vue/runtime-core' {
	export interface ComponentCustomProperties {
		$dbContext: DbContext;
		$stringHelper: StringHelper;
	}
}

app.use(router).mount('#app');
