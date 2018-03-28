const path = require('path')
const compose = require('next-compose')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const optimizedImages = require('next-optimized-images')
const withOffline = require('next-offline')
const withManifest = require('next-manifest')

const nextConfig = {
  webpack: (config) => {
    config.module.rules.push(
      {
        test: /\.(css)/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        }
      },
      {
        test: /\.css$/,
        use: ['babel-loader', 'raw-loader']
      }
    )

    return config
  }
}

const manifestConfig = {
  manifest: {
    display: 'fullscreen',
    lang: 'en-US',
    icons: {
      src: path.join(__dirname, 'assets', 'homescreen.png'),
      cache: true
    }
  }
}

const bundleAnalyzerConfig = {
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../../bundles/server.html'
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html'
    }
  }
}

module.exports = compose([
  nextConfig,
  withOffline, optimizedImages,
  [withManifest, manifestConfig],
  [withBundleAnalyzer, bundleAnalyzerConfig]
])
