const path = require('path')
const withPlugins = require('next-compose-plugins')
const withCss = require('@zeit/next-css')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const optimizedImages = require('next-optimized-images')
const withOffline = require('next-offline')
const withManifest = require('next-manifest')

const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(eot|otf|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          publicPath: './',
          outputPath: 'static/',
          name: '[name].[ext]'
        }
      }
    })

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

module.exports = withPlugins([
  withCss,
  optimizedImages, withOffline,
  [withManifest, manifestConfig],
  [withBundleAnalyzer, bundleAnalyzerConfig]
], nextConfig)
