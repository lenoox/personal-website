const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyPlugin = require("copy-webpack-plugin");
const mode = process.env.NODE_ENV || "development";
const target = process.env.NODE_ENV === "production" ? "browserslist" : "web";

module.exports = {
    mode: mode,
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'assets/js/scripts.js',
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    mode === 'production'
                        ? MiniCssExtractPlugin.loader
                        : 'style-loader',
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: '[name].[hash:8].[ext]',
                            outputPath: 'dist/assets/fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp|tiff)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: '[name].[hash:8].[ext]',
                            outputPath: 'dist/assets/images/'
                        }
                    }
                ]
            }
        ],
    },
    target: target,
    devServer: {
        contentBase: "./dist",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new CopyPlugin({
            patterns: [
                {from: "assets/images", to: "assets/images"},
            ],
        }),
        new ImageminPlugin({
            pngquant: {quality: '90-100'},
            plugins: [imageminMozjpeg({quality: 50})]
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css',
            chunkFilename: 'style_[id].css'
        })
    ]
};