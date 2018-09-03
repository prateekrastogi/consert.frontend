const nextRoutes = require('next-routes')
const routes = module.exports = nextRoutes()

const categories = 'live|hip-hop-n-rnb|rock|pop|country|electronic|jazz-blues-classical|other'
const radioCategories = 'popular|shuffle|trending'

// Only the complex routes that can't be handled properly with default file-system routing are defined below
routes
/* In future, when categories will have sub-category tags, add them to the root /:tag for search engine url depth optimization
i.e. browser url information architecture can slightly deviate from ux information architecture to reduce url depth for seo. */
  .add('tag-views', `/:tag(${categories})`, 'index')
  // reached maximum permissible seo optimized url depth in below radio urls
  .add('radio-views', `/:tag(${categories})/radio/:radioTag(${radioCategories})`, 'radio')
  .add('video-watch-view', `/video/:videoTitle/:videoId`, 'video')
