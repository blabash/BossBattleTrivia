const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname)
    },
    module:{
        rules: [
            {
                test:/\.css$/,
                use:['style-loader', 'css-loader']
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000'
            },
            {
                test: /\.woff(2)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: './font/[hash].[ext]',
                            mimetype: 'application/font-woff'
                        }
                    }
                ]
            },
            {
                test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
                loader: 'url?prefix=font/&limit=10000'
            }
        ]
    }
};
