// Configuration for your app

module.exports = function (ctx) {
  return {
    // app plugins (/src/plugins)
    plugins: [
      'i18n',
      'axios'
    ],
    css: [
      'app.styl',
      'login.styl',
      'marca.styl',
      'producto.styl',
      'historial.styl',
      'servicios.styl',
      'home.styl',
      'contacto.styl',
      'taller.styl',
      'calendario.styl',
      'splash.styl',
      'animate.css',
      'fonts.styl',
      'tracking.styl'
    ],
    extras: [
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons',
      'ionicons',
      'mdi',
      'fontawesome'
    ],
    supportIE: true,
    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack(cfg) {

      }
    },
    devServer: {
      proxy: {
        '/mitsuicitas': {
          target: 'https://mitsuib1747ff0c.us1.hana.ondemand.com',
          changeOrigin: true,
          pathRewrite: {
            '^/mitsuicitas': ''
          }
        }
      },
      //https: true,
      // port: 8080,
      open: true // opens browser window automatically
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      i18n: 'es',
      components: [
        'QField',
        'QInput',
        'QRadio',
        'QModal',
        'QLayout',
        'QLayoutHeader',
        'QLayoutDrawer',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QList',
        'QListHeader',
        'QItem',
        'QItemMain',
        'QItemSide',
        'QCheckbox',
        'QLayoutFooter',
        'QTabs',
        'QTab',
        'QTabPane',
        'QRouteTab',
        'QCard',
        'QCardTitle',
        'QCardMain',
        'QCardMedia',
        'QCardSeparator',
        'QCardActions',
        'QFab',
        'QFabAction',
        'QPageSticky',
        'QSelect',
        'QCollapsible',
        'QStepper',
        'QStep',
        'QStepperNavigation',
        'QChip',
        'QDatetimePicker',
        'QScrollArea',
        'QItemTile',
        'QToggle',
        'QTooltip',
        'QCarousel',
        'QCarouselSlide',
        'QCarouselControl',
        'Dialog',
        'Scroll',
        'QDatetime',
        'QSearch'
      ],
      directives: [
        'Ripple',
        'CloseOverlay'
      ],
      // Quasar plugins
      plugins: [
        'Notify',
        'Loading'
      ]
      // iconSet: ctx.theme.mat ? 'material-icons' : 'ionicons'
      //i18n: 'de' // Quasar language
    },
    // animations: 'all' --- includes all animations
    //animations: [],
    animations: 'all',
    ssr: {
      pwa: false
    },
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        /*background_color:'#dd1111',*/
        /*theme_color: '#027be3',*/
        /*icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]*/
      }
    },
    cordova: {
      content: "index.html",
      id: 'mitsui.citas.mb'
    },
    electron: {
      // bundler: 'builder', // or 'packager'
      extendWebpack(cfg) {
        // do something with Electron process Webpack cfg
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
      }
    }
  }
}
