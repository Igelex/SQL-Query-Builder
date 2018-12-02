const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        //index: './src/index.js',
        index: './test.js',
    },
    output: {
        filename: 'sqlqb.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'Sqlqb',
        libraryTarget: 'umd',
        globalObject: 'this',
        //publicPath: 'dist/'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        overlay: true,
        open: true
    },
    optimization: {
        noEmitOnErrors: true
    },

    performance: {
        assetFilter: (assetFilename) => assetFilename.endsWith('.js')
    },

    watch: NODE_ENV === 'development',
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 100
    },

    devtool: NODE_ENV === 'development' ? 'source-map' : null,

    plugins: [
        new CleanWebpackPlugin('dist', {}),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        new ExtractTextPlugin('[name].css'),
        new HtmlWebPackPlugin({
            template: './index.html',
            filename: './index.html'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            "window.jQuery": "jquery'",
            "window.$": "jquery"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    },
                    {
                        loader: 'eslint-loader',
                        options: {
                            configFile: __dirname + '/.eslintrc',
                            fix: true
                        },
                    },]
            },
            {
                test: /\.scss$/,
                use: [
                    // fallback to style-loader in development
                    NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                                sourceMap: NODE_ENV === 'development',
                            }
                        }
                    ]
                })
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {minimize: true}
                    }
                ]
            }
        ],

    }

};