const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const WebpackAutoInject = require('webpack-auto-inject-version');

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, '.'),
    entry: ['webpack-hot-middleware/client', 'src/index.tsx'],
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist.dev'),
        filename: '[name].js',
        chunkFilename: '[name].js',
        publicPath: '/',
    },
    node: {
        fs: 'empty',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        modules: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'src', 'views'), 'node_modules'],
        plugins: [new TsconfigPathsPlugin()],
        symlinks: false,
        cacheWithContext: false,
    },
    module: {
        rules: [
            {
                test: /\.(tsx|ts)$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    getCustomTransformers: () => ({
                        before: [
                            tsImportPluginFactory({
                                libraryName: 'antd',
                                libraryDirectory: 'lib',
                                style: true,
                            }),
                        ],
                    }),
                    compilerOptions: {
                        module: 'es2015',
                    },
                },
                exclude: /(node_modules|bower_components|\.spec\.ts)/,
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin({
            verbose: true,
            dry: false,
        }),
        new BundleAnalyzerPlugin({ openAnalyzer: false }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
        new WebpackAutoInject({
            // options
            // example:
            components: {
                AutoIncreaseVersion: false,
                InjectAsComment: false,
                InjectByTag: true,
            },
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].[contenthash].css',
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            },
        }),
        new webpack.ContextReplacementPlugin(
            // The path to directory which should be handled by this plugin
            /moment[/\\]locale/,
            // A regular expression matching files that should be included
            /en-gb/
        ),
    ],
};
