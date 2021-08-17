const { join } = require('path');

//Plugins
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const TMP_FOLDER = join(__dirname, "assets");

module.exports = (env) => ({
    optimization: {
        splitChunks: {
            maxSize: 240000
        },
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                extractComments: true,
                terserOptions: {
                    ecma: 5,
                    compress: {},
                },
                exclude: /[\\/]node_modules[\\/]/
            })
        ],
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: TMP_FOLDER, to: "" }
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(ttf|woff|eot|otf)$/,
                type: 'asset/inline'
            },
            {
                test: /\.(jpe?g|png|svg)$/i,
                type: 'asset/resource'
            }
        ]
    }
});
