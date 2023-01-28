//引入nodejs路径模块, 用于操作文件路径。
const path = require('path');
const {merge} = require('webpack-merge');
const devConfig = require('./webpack.dev.config');
const proConfig = require('./webpack.pro.config');


module.exports = (env, argv) => {
    const config = argv.mode === 'development' ? devConfig : proConfig

    return merge({
        //入口文件的配置项
        entry: {
            secure: {
                import: "./src/store/index",
                filename: "[name].js",
                library: {
                    name: "SecureLS",
                    type: 'umd',
                    umdNamedDefine: true
                }
            },
            test: "./src/test/index",
            index: "./src/index"
        },
        //出口文件的配置项
        output: {
            filename: "[name].js",
            //所有输出文件的目标路径
            path: path.resolve(__dirname, 'dist'),
            library: {
                name: "[name]",
                // type: 'commonjs-static',
                type: 'umd',
                umdNamedDefine: true
            },
            clean: true
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: "babel-loader",
                    exclude: /node_modules/
                },
                // {
                //     test: /(\.jsx|\.js)$/,
                //     loader: "eslint-loader",
                //     exclude: /node_modules/
                // }
            ],
        }
    }, config)
}