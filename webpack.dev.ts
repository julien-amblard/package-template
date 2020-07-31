/** @format */

const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const htmlWebpackPlugin = new HtmlWebpackPlugin({
	template: path.join(__dirname, "demo/index.html"),
	filename: "./index.html",
})
module.exports = {
	entry: path.join(__dirname, "demo/src/index"),
	output: {
		path: path.resolve(__dirname, "demo/dist"),
	},
	target: "web",
	module: {
		rules: [
			{
				test: /\.s?css$/i,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
			{
				test: /\.(t|j)sx?$/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-typescript"],
						plugins: [
							"@babel/plugin-proposal-object-rest-spread",
							"@babel/plugin-proposal-class-properties",
							"@babel/plugin-proposal-optional-chaining",
						],
					},
				},
				exclude: /node_modules/,
			},
		],
	},
	plugins: [htmlWebpackPlugin],
	resolve: {
		modules: [path.resolve(__dirname, "./src"), "node_modules"],
		extensions: [".js", ".jsx", ".ts", ".tsx"],
	},
	devServer: {
		port: 8646,
		open: true,
		hot: true,
	},
}
