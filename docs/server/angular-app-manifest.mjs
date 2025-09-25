
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/E-commerce/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/E-commerce/login",
    "route": "/E-commerce"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-3VM7HN7M.js",
      "chunk-VD3SOV7I.js",
      "chunk-6DFLPQ44.js"
    ],
    "route": "/E-commerce/login"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-6NSIBEKW.js",
      "chunk-VD3SOV7I.js",
      "chunk-6DFLPQ44.js"
    ],
    "route": "/E-commerce/register"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-ECFQIPMR.js",
      "chunk-VD3SOV7I.js",
      "chunk-6DFLPQ44.js"
    ],
    "route": "/E-commerce/forgetpassword"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-K5TXVH5H.js",
      "chunk-FZCK3T74.js",
      "chunk-JP3W6ZOS.js",
      "chunk-FWOFWFQE.js"
    ],
    "route": "/E-commerce/home"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-WEAKZUQW.js"
    ],
    "route": "/E-commerce/cart"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-WGHDDVHD.js",
      "chunk-6DFLPQ44.js",
      "chunk-JP3W6ZOS.js",
      "chunk-FWOFWFQE.js"
    ],
    "route": "/E-commerce/products"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-PGU5S72H.js"
    ],
    "route": "/E-commerce/brands"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-N3TEENR3.js",
      "chunk-FZCK3T74.js"
    ],
    "route": "/E-commerce/categoties"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-YFMUK7CQ.js",
      "chunk-FWOFWFQE.js"
    ],
    "route": "/E-commerce/details/*"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-YFMUK7CQ.js",
      "chunk-FWOFWFQE.js"
    ],
    "route": "/E-commerce/details/*/*"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-CZ2DSD5K.js",
      "chunk-FWOFWFQE.js"
    ],
    "route": "/E-commerce/wishlist"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-7Y5OJMUE.js"
    ],
    "route": "/E-commerce/allorders"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-4WNNO64B.js",
      "chunk-VD3SOV7I.js",
      "chunk-6DFLPQ44.js"
    ],
    "route": "/E-commerce/checkout/*"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-OJVUGKSB.js"
    ],
    "route": "/E-commerce/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 12955, hash: '605b2a56e623645bf314a4a2db41450a09b114fbafabf9468d94a2ed3fc28c8f', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 2499, hash: 'b85c60e61bdbbd35afc9aaf0134f4ed656cca2bdaef0e79a99e4d442ca88238e', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 32142, hash: '11f52dbd2d0d4113e394cb51ae47b8ca18d3825f4cf97ced8b9387473341202b', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 33107, hash: '5113350d5ee828c7eba67e2d871c164a9af1747c664544db276aa0b074eb309a', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'products/index.html': {size: 32194, hash: '584d3cc47c1b33c01433643961206473218046fc3f41e99f5054aef9c8164f3d', text: () => import('./assets-chunks/products_index_html.mjs').then(m => m.default)},
    'forgetpassword/index.html': {size: 31842, hash: '9a16794f91d17d7fd4fee16be8d564d2dacad31c305ac6129b6d9fb32969a524', text: () => import('./assets-chunks/forgetpassword_index_html.mjs').then(m => m.default)},
    'brands/index.html': {size: 32038, hash: '3b690c4408716e5026d8908803c9775f0f4422888bbbf2b9d3262d47da9e70f5', text: () => import('./assets-chunks/brands_index_html.mjs').then(m => m.default)},
    'home/index.html': {size: 32194, hash: '4809876045657b564da86a023e3199087e91ed74ba65cc9f6cfa6b8d7bf4cbb1', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'wishlist/index.html': {size: 32090, hash: '22c23d1e8b6b50aba90c61d6835751bc440d9869621b16a41f2bc6c149f30c12', text: () => import('./assets-chunks/wishlist_index_html.mjs').then(m => m.default)},
    'categoties/index.html': {size: 32090, hash: 'dcc021a1c189e77bef069547e3feb543fe542a83e5b3f584d020e13a24896b09', text: () => import('./assets-chunks/categoties_index_html.mjs').then(m => m.default)},
    'cart/index.html': {size: 32039, hash: 'efa2d5b0ca12347739e5c1773f97ae5cf84140f31ebad57447937884f63330d2', text: () => import('./assets-chunks/cart_index_html.mjs').then(m => m.default)},
    'allorders/index.html': {size: 32038, hash: '5002202eb3dfbe09346076fe6d9f3a4a257d1a55de2091ae6207eba455ea744d', text: () => import('./assets-chunks/allorders_index_html.mjs').then(m => m.default)},
    'styles-GLT6WRDJ.css': {size: 193146, hash: 'X4zsq2aGqkk', text: () => import('./assets-chunks/styles-GLT6WRDJ_css.mjs').then(m => m.default)}
  },
};
