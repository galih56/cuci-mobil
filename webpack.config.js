const webpack = require('webpack');
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const dotenv = require('dotenv');
var WebpackPwaManifest = require('webpack-pwa-manifest');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
global.Buffer = global.Buffer || require('buffer').Buffer;
// const MiniCssExtractPlugin = require("mini-css-extract-plugin"); conflicting with other css loader

// call dotenv and it will return an Object with a parsed key 
const env = dotenv.config().parsed;
// reduce it to a nice object, the same as before
let envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
}, {});

module.exports = {
    watch: true,
    entry: { index: path.resolve(__dirname, "src", "index.js") },
    output: {
        path: path.resolve(__dirname, "build")
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        hot: true,
        inline: true,
        historyApiFallback: true,
    },
    watchOptions: {
        poll: true,
        ignored: '/node_modules/**',
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'html-loader'
            },
            {
                test: /\.css$/,
                use: [
                    // MiniCssExtractPlugin.loader, conflicting with style-loader
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 2,
                        },
                    },
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.(png|jpe?g|gif|ico|ttf)$/i,
                use: [
                    { loader: 'file-loader' }
                ],
            },
            {
                //prevent "Unexpected token e in JSON at position 0 while parsing ..." errors
                test: /\.json$/,
                loader: 'file-loader',
                type: 'javascript/auto',
                options: {
                    name() {
                        return '[path][name].[ext]';
                    },
                },
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-url-loader',
                    },
                ],
            },
        ]
    },
    optimization: {
        splitChunks: { chunks: "all" }
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    resolve: {
        fallback: {
            "fs": false,
            "tls": false,
            "net": false,
            "path": false,
            "zlib": false,
            "http": false,
            "https": false,
            "stream": require.resolve("stream-browserify"),
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            "React": "react",
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public", "index.html")
        }),
        new webpack.DefinePlugin(envKeys),
        /*
        new MiniCssExtractPlugin({ filename: "styles.css", chunkFilename: "styles.css" }), conflicting with style - loader
        new WebpackPwaManifest({
            name: 'Transaksi Cuci Mobil',
            short_name: 'cuci-mobil',
            description: 'Dashboard transaksi cuci mobil',
            background_color: '#ffffff',
            crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
            icons: [
                {
                    src: path.resolve('src/assets/icon.png'),
                    sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
                },
                {
                    src: path.resolve('src/assets/large-icon.png'),
                    size: '1024x1024' // you can also use the specifications pattern
                },
                {
                    src: path.resolve('src/assets/maskable-icon.png'),
                    size: '1024x1024',
                    purpose: 'maskable'
                }
            ]
        }),
        // new FaviconsWebpackPlugin(path.resolve(__dirname, "public", "favicon.ico"))
        */
    ],
};