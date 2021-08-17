const {join, resolve} = require('path');

const threadLoader = require('thread-loader');

threadLoader.warmup({},
    [
        "babel-loader",
        "sass-loader",
    ]
);

// Plugins
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ENVIRONMENT_FILE = join(__dirname, "src", "environment.ts");
const DIST_FOLDER = join(__dirname, 'dist');
const MODE = "production";

module.exports = (env, environmentDest) => ({
    mode: MODE,
    output: {
        filename: "[name].bundle.js",
        library: "seed",
        path: DIST_FOLDER
    },
    entry: [resolve(__dirname, 'src', 'index.tsx')],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.scss'],
        symlinks: false,
        cacheWithContext: false,
        alias: {
            '@seed': resolve(__dirname, 'src/')
        },
        fallback: {
            fs: false,
            child_process: false,
            crypto: false,
            net: false,
            tls: false
        }
    },
    module: {
        rules: [
            {
                test: /node_modules\/https-proxy-agent\//,
                use: 'null-loader',
            },
            {
                test: /\.tsx?$/,
                use: [
                    "thread-loader",
                    "babel-loader"
                ],
                exclude: /node_modules/
            },
            {
                test: ENVIRONMENT_FILE,
                use: [
                    "thread-loader",
                    {
                        loader: "file-replace-loader",
                        options: {
                            condition: 'always',
                            replacement: resolve(environmentDest),
                            progress: false,
                            async: true
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    "thread-loader",
                    "source-map-loader"
                ]
            }
        ]
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    enforce: true
                }
            }
        },
    },
    plugins: [
        new CssMinimizerPlugin(),
		new HtmlWebpackPlugin({
            title: "React Seed 5",
            base: {
                href: env.BASE_HREF || '/'
            },
            template: 'index.html'
        })
    ],
    stats: {
        warnings: false
    }
});
