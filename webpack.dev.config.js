const { join } = require('path');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');

const TMP_FOLDER = join(__dirname, "assets");

module.exports = () => ({
    mode: "development",
    output: {
        pathinfo: false
    },
    optimization: {
        usedExports: true,
        sideEffects: true,
        runtimeChunk: true,
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    "thread-loader",
                    'style-loader',
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
    },
    devServer: {
        contentBase: TMP_FOLDER,
        host: '0.0.0.0',
        port: 4200,
        historyApiFallback: true,
        stats: 'normal',
        proxy: {
            '/api/**': {
                target: 'http://[::1]:8080',
                logLevel: 'debug',
                changeOrigin: true,
                headers: {
                    "Connection": "keep-alive"
                }
            }
        }
    }
});
