module.exports = {
  entry: {
    mfind: './app/view/m/find.jsx',
    mworks: './app/view/m/works.jsx',
    mauthor: './app/view/m/author.jsx',
    msearch: './app/view/m/search.jsx',
    mmy: './app/view/m/my.jsx',
    mlogin: './app/view/m/login.jsx',
    mpost: './app/view/m/post.jsx',
    dindex: './app/view/d/index.jsx',
    dfind: './app/view/d/find.jsx',
    dworks: './app/view/d/works.jsx',
    dauthor: './app/view/d/author.jsx',
    dsearch: './app/view/d/search.jsx',
    dmy: './app/view/d/my.jsx',
    dlogin: './app/view/d/login.jsx',
    dupload: './app/view/d/upload.jsx',
    dguide: './app/view/d/guide.jsx',
    dpost: './app/view/d/post.jsx',
    rhyme: './app/view/rhyme.jsx',
    jrjbz: './app/view/jrjbz.jsx',
  },
  output: {
    path: __dirname + '/app/view',
    filename: '[name].js',
    libraryTarget: 'commonjs',
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['es2015'] }
          },
          {
            loader: 'migi-loader'
          }
        ]
      }
    ]
  },
};
