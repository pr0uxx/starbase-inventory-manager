module.exports = {
	css: {
		loaderOptions: {
			sass: {
				additionalData: `
					@import "@/assets/scss/style.scss";
				`
			}
		}
	},
	outputDir: './docs',
	publicPath: '/',
}