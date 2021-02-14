import miniCssExtractPlugin from 'mini-css-extract-plugin';

export default {
  mode: 'production',
  entry: './src/main/main.js',
  output: {
    filename: 'js/script.min.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          { loader: 'style-loader' },
          { loader: miniCssExtractPlugin.loader, options: { esModule: false }},
          { loader: 'css-loader', options: { sourceMap: true }},
          { loader: 'postcss-loader', options: { sourceMap: true, postcssOptions: { plugins:[ 'autoprefixer' ]}}},
          { loader: 'sass-loader', options: { sourceMap: true, sassOptions: { outputStyle: 'compressed' }}}
        ]
      },
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      }
    ],
  },
  plugins: [
    new miniCssExtractPlugin({ filename: 'css/style.min.css' })
  ]
};