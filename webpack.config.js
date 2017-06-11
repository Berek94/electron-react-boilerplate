const {HotModuleReplacementPlugin} = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

const cssDev = ['style-loader', 'css-loader', 'sass-loader'];

const cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'sass-loader'],
    publicPath: '/dist',
});

const cssConfig = isProduction ? cssProd : cssDev;

const sourceMap = isProduction ? false :'cheap-module-eval-source-map';


module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },

    devtool: sourceMap,

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: cssConfig
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'stage-0']
                    }
                }]
            }
        ]
    },

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        stats: 'minimal',
        hot: true,
    },

    plugins: [
        new HtmlWebpackPlugin({
            minify: {
                collapseWhitespace: true
            },
            template: './src/index.html'
        }),

        new ExtractTextPlugin({
            filename: 'bundle.css',
            disable: !isProduction,
            allChunks:  true
        }),

        new HotModuleReplacementPlugin(),
    ],
     
}