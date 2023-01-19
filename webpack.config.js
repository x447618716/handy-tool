//引入nodejs路径模块, 用于操作文件路径。
const path = require('path');

module.exports = {
    //入口文件的配置项
    entry: {
        index: './src/index',
        stores:'./src/stores/index'
    },
    //出口文件的配置项
    output: {
        filename: "[name].js",
        //所有输出文件的目标路径
        path: path.resolve(__dirname, 'dist'),
        asyncChunks: true,
        library: {
            type: "commonjs-static"
        },
        clean: true
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: "babel-loader",
                exclude: /node_modules/
            },
        ],
    },
}