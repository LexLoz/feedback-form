const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    // entry: './src/js/index.js',
    devtool: 'eval-source-map',
    entry: {
        main: [
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
            './src/js/index.js'
        ]
    },

    devServer: {
        client: {
            overlay: {
                errors: true,
                warnings: false,
            },

            progress: true
        },

        static: {
            directory: path.join(__dirname, 'dist'),
        },

        compress: true,
        port: 9000,
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'http://localhost:9090/scripts',
        filename: 'bundle.js',
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.sass$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", 'sass-loader'],
            },
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            },
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: "styles.css",

        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
};