const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        'babel-polyfill',
        './src/js/index.js'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),// needs to be in the same folder as index for injection
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist'// when running a devServer, the code will be automatically injected into html
    },
    plugins: [
        new HtmlWebPackPlugin({
            filename: 'index.html', // automatically inject <script>bundle.js</script> into html
            template: './src/index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/, // $means apply name ending in /.js
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};