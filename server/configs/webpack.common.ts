// import FriendlyErrorsPlugin from '@nuxt/friendly-errors-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { resolve } from 'path';
import { Configuration } from 'webpack';
import WebpackBar from 'webpackbar';

import { __DEV__, PROJECT_ROOT } from '../utils/constants';
import entry from '../utils/entry';

export type EntryType = {
    chunks: string;
    filename: string;
    title: string;
    template: string;
};

const templates: EntryType[] = [
    {
        chunks: 'options',
        filename: 'options.html',
        title: 'options page',
        template: resolve(PROJECT_ROOT, 'public/options.html'),
    },
    {
        chunks: 'popup',
        filename: 'popup.html',
        title: 'popup page',
        template: resolve(PROJECT_ROOT, 'public/popup.html'),
    },
    {
        chunks: 'devtool',
        filename: 'devtool.html',
        title: 'devtool page',
        template: resolve(PROJECT_ROOT, 'public/devtool.html'),
    },
    {
        chunks: 'tab',
        filename: 'tab.html',
        title: 'tab page',
        template: resolve(PROJECT_ROOT, 'public/tab.html'),
    },
    {
        chunks: 'devpanel',
        filename: 'devpanel.html',
        title: 'devpanel page',
        template: resolve(PROJECT_ROOT, 'public/devpanel.html'),
    },
    {
        chunks: 'setting',
        filename: 'setting.html',
        title: 'setting page',
        template: resolve(PROJECT_ROOT, 'public/setting.html'),
    },
    {
        chunks: 'sidepanel',
        filename: 'sidepanel.html',
        title: 'sidepanel page',
        template: resolve(PROJECT_ROOT, 'public/sidepanel.html'),
    },
];

function getCssLoaders(importLoaders: number) {
    return [
        {
            loader: MiniCssExtractPlugin.loader,
        },
        {
            loader: 'css-loader',
            options: {
                modules: false,
                sourceMap: true,
                importLoaders,
            },
        },
    ];
}

function getHtmlWebpackPlugins(entries: EntryType[]) {
    return entries.map(
        (ent) =>
            new HtmlWebpackPlugin({
                chunks: [ent.chunks],
                filename: ent.filename,
                title: ent.title,
                template: ent.template,
            }),
    );
}

const commonConfig: Configuration = {
    context: PROJECT_ROOT,
    entry,
    watchOptions: {
        ignored: ['node_modules/**', 'extension/**'],
    },
    output: {
        publicPath: '/',
        path: resolve(PROJECT_ROOT, 'extension'),
        filename: 'js/[name].js',
        // 将热更新临时生成的补丁放到 hot 文件夹中
        hotUpdateChunkFilename: 'hot/[id].[fullhash].hot-update.js',
        hotUpdateMainFilename: 'hot/[runtime].[fullhash].hot-update.json',
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.json'],
        alias: {
            '@': resolve(PROJECT_ROOT, 'src'),
            utils: resolve(PROJECT_ROOT, 'src/utils'),
            styles: resolve(PROJECT_ROOT, 'src/styles'),
        },
    },
    plugins: [
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new CopyPlugin({
            patterns: [
                {
                    from: resolve(PROJECT_ROOT, 'public'),
                    globOptions: {
                        ignore: ['**/public/*.html'],
                    },
                },
                {
                    from: resolve(PROJECT_ROOT, `src/manifest.${__DEV__ ? 'dev' : 'prod'}.json`),
                    to: 'manifest.json',
                },
            ],
        }),
        new WebpackBar({
            name: 'Building chrome extension',
            color: '#0f9d58',
        }),
        // new FriendlyErrorsPlugin(),
        ...getHtmlWebpackPlugins(templates),
        new MiniCssExtractPlugin({
            filename: `css/[name].css`,
            ignoreOrder: false,
        }),
    ],
    module: {
        noParse: /jquery/,
        rules: [
            {
                test: /\.(js|ts|tsx)$/,
                loader: 'babel-loader',
                options: { cacheDirectory: true },
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: getCssLoaders(0),
            },
            {
                test: /\.less$/,
                use: [
                    ...getCssLoaders(1),
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true,
                            lessOptions: {
                                javascriptEnabled: true,
                                modifyVars: {
                                    // 修改 antd 主题
                                    // '@primary-color': '#1DA57A',
                                },
                            },
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    ...getCssLoaders(1),
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true },
                    },
                ],
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    },
                },
                generator: {
                    filename: 'images/[hash][ext][query]',
                },
            },
            {
                test: /\.(ttf|woff|woff2|eot|otf)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    },
                },
                generator: {
                    filename: 'fonts/[hash][ext][query]',
                },
            },
        ],
    },
};

export default commonConfig;
