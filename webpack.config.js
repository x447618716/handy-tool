//引入nodejs路径模块, 用于操作文件路径。
const path = require('path');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const {merge} = require('webpack-merge');
const devConfig = require('./webpack.dev.config');
const proConfig = require('./webpack.pro.config');


module.exports = (env, argv) => {
    const config = argv.mode === 'development' ? devConfig : proConfig

    return merge({
        //入口文件的配置项
        entry: {
            storage: {
                import: "./src/storage",
                filename: "[name]/index.js",
                library: {
                    name: "Storage",
                    type: 'umd',
                    umdNamedDefine: true
                }
            },
            base64: {
                import: "./src/base64",
                filename: "[name]/index.js",
                library: {
                    name: "Base64",
                    type: 'umd',
                    umdNamedDefine: true
                }
            },
            index: "./src/index"
        },
        //出口文件的配置项
        output: {
            filename: "[name].js",
            //所有输出文件的目标路径
            path: path.resolve(__dirname, 'lib'),
            library: {
                name: "[name]",
                type: 'commonjs-static',
                // type: 'umd',
                // umdNamedDefine: true
            },
            clean: true
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: [
                        {
                            loader: 'babel-loader'
                        },
                        {
                            loader: 'ts-loader'
                        }
                    ],
                    exclude: /node_modules/
                },
                {
                    test: /\.ts(x)?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/
                }
            ],
        },
        plugins: [
            // new BundleAnalyzerPlugin({
            //     analyzerMode: 'static',
            //     openAnalyzer: false,
            // })
        ]
    }, config)
}
