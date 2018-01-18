const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: {
        render: ["babel-polyfill", path.resolve(__dirname, 'src', 'render.jsx')],
        main: ["babel-polyfill", path.resolve(__dirname, 'src', 'main.js')]
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].js',
        publicPath: '/'
    },
    target: 'electron',
    node: {
        __dirname: false,
        __filename: false
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                query: {
                    presets: [
                        ['env'],
                        ['react']
                    ],
                    plugins: ["syntax-async-functions", "transform-regenerator"]
                }
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 100000
                    }
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!sass-loader'
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.json', '.jsx'],
        modules: [
            path.resolve(__dirname, 'src'),
            'node_modules'
        ]
    }
};
