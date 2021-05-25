const path = require('path')
const webpack = require('webpack')

module.exports = (env) => {
    const envConfig = {FILE_SERVER_HOST: 'https://duckluckbreakout.xyz',
                       STATIC_SERVER_HOST: 'https://duckluckmarket.hb.bizmrg.com',
    };

    if (env.dev) {
        envConfig['SERVER_HOST'] = 'http://localhost:8080';
    } else {
        envConfig['SERVER_HOST'] = 'https://duckluckbreakout.xyz';
    }

    return {
        entry: ["regenerator-runtime/runtime.js", "./ozon/src/main.js"],
        mode: "development",
        output: {
            filename: "bundle.js",
            path: path.resolve(__dirname, './ozon/src/dist'),
        },
        module: {
            rules: [{
                test: /\.hbs$/,
                loader: 'handlebars-loader',
                options: {
                    helperDirs: [path.join(__dirname, '/ozon/src/utils/hbs-helpers')],
                },
                exclude: /(node_modules)/
            },
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            "plugins": [
                                [
                                    "@babel/plugin-proposal-class-properties"
                                ]
                            ],
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        [
                                            "postcss-preset-env",
                                            "postcss-size",
                                        ],
                                    ],
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.s[ac]ss$/,
                    use: [
                        "style-loader",
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                // Prefer `dart-sass`
                                implementation: require("sass"),
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new webpack.EnvironmentPlugin({
                SERVER_HOST: envConfig.SERVER_HOST,
                FILE_SERVER_HOST: envConfig.FILE_SERVER_HOST,
                STATIC_SERVER_HOST: envConfig.STATIC_SERVER_HOST,
            }),
        ]
    }
}
