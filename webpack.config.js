const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg)$/,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/manifest.json', to: 'manifest.json' },
            ]
        }),
        new WorkboxPlugin.GenerateSW({
            swDest: 'sw.js',
            clientsClaim: true,
            skipWaiting: true,
            runtimeCaching: [
                {
                    urlPattern: ({ url }) => {
                        return url.pathname.includes('/api/news') || 
                               url.pathname.endsWith('.html') ||
                               url.pathname.endsWith('.js') ||
                               url.pathname.endsWith('.css');
                    },
                    handler: 'NetworkFirst',
                    options: {
                        cacheName: 'static-cache',
                        expiration: {
                            maxEntries: 50,
                            maxAgeSeconds: 86400
                        }
                    }
                }
            ]
        })
    ]
};