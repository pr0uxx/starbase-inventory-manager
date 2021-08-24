module.exports = {
    css: {
		loaderOptions: {
			sass: {
				additionalData: '\n\t\t\t\t\t@import "@/assets/scss/style.scss";\n\t\t\t\t'
			}
		}
	},

    publicPath: '/starbase-inventory-manager/',
    productionSourceMap: false,
    outputDir: 'docs'
}