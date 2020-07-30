/** @format */

const _path = require("path")
const webpack = require("webpack")
const config = {
	entry: "./src/index.ts",
	mode: "production",
	resolve: {
		modules: [_path.resolve(__dirname, "./src"), "node_modules"],
		extensions: [".js", ".jsx", ".ts", ".tsx"],
	},
	module: {
		rules: [
			{
				test: /\.scss$/i,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
			{
				test: /\.(js|ts)$/,
				exclude: /(node_modules|bower_components)/,
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
			},
		],
	},
}
const configWeb = {
	...config,
	target: "web",
	output: {
		path: _path.resolve(__dirname, "lib"),
		filename: "index.js",
		libraryTarget: "umd",
	},
}
const configNode = {
	...config,
	target: "node",
	output: {
		path: _path.resolve(__dirname, "lib"),
		filename: "index.node.js",
		libraryTarget: "umd",
	},
}
module.exports = [configWeb, configNode]
