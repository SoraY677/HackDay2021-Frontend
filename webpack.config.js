const path = require('path');

module.exports = {
	// エントリーポイントの設定
	entry: './main.js',
	// 出力の設定
	output: {
		// 出力するファイル名
		filename: 'bundle.js',
		// 出力先のパス（絶対パスを指定する必要がある）
		path: path.join(__dirname, 'dist')
	},
	module: {
		rules: [{
			test: /\.css/,
			use: [
				"style-loader",
				{
					loader: "css-loader",
					options: {
						url: false
					}
				}
			]
		}]
	}
}