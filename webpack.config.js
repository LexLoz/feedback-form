const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    entry: './src/js/index.js',
    devtool: 'eval-source-map',

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
        port: 9090,
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
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

    plugins: [new MiniCssExtractPlugin({
        filename: "styles.css",
    })],
};