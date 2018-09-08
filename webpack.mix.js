const mix = require('laravel-mix')

mix.js('./src/index.js', './dist/js/main.js')
mix.copyDirectory('./assets', './dist/assets')

mix.disableNotifications()