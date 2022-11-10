// node.js Packages / Dependencies
const gulp          = require('gulp');
const sass          = require('gulp-sass');
const uglify        = require('gulp-uglify');
const rename        = require('gulp-rename');
const concat        = require('gulp-concat');
const cleanCSS      = require('gulp-clean-css');
const imageMin      = require('gulp-imagemin');
const pngQuint      = require('imagemin-pngquant'); 
const browserSync   = require('browser-sync').create();
const autoprefixer  = require('gulp-autoprefixer');
const jpgRecompress = require('imagemin-jpeg-recompress'); 
const clean         = require('gulp-clean');


// Paths
var paths = {
    root: { 
        www:        './public_html'
    },
    src: {
        root:       'public_html/assets',
        html:       'public_html/**/*.html',
        css:        'public_html/assets/css/*.css',
        js:         'public_html/assets/js/*.js',
        vendors:    'public_html/assets/vendors/**/*.*',
        fonts:      'public_html/assets/fonts/**/*.*',
        images:     'public_html/assets/images/**/*.+(png|jpg|gif|svg)',
        scss:       'public_html/assets/scss/**/*.scss'
    },
    dist: {
        root:       'public_html/dist',
        css:        'public_html/dist/css',
        js:         'public_html/dist/js',
        images:     'public_html/dist/images',
        vendors:    'public_html/dist/vendors',
        fonts:      'public_html/dist/fonts'
    }
}

// Compile SCSS
gulp.task('sass', function() {
    return gulp.src(paths.src.scss)
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)) 
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.src.root + '/css'))
    .pipe(browserSync.stream());
});

// Minify + Combine CSS
gulp.task('css', function() {
    return gulp.src(paths.src.css)
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(concat('style.css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.dist.css))
});

// Minify + Combine JS
gulp.task('js', function() {
    return gulp.src(paths.src.js)
    .pipe(uglify())
    .pipe(concat('template.js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.dist.js))
    .pipe(browserSync.stream());
});

// Compress (JPEG, PNG, GIF, SVG, JPG)
gulp.task('img', function(){
    return gulp.src(paths.src.images)
    .pipe(imageMin([
        imageMin.gifsicle(),
        imageMin.jpegtran(),
        imageMin.optipng(),
        imageMin.svgo(),
        pngQuint(),
        jpgRecompress()
    ]))
    .pipe(gulp.dest(paths.dist.images));
});

// copy vendors to dist
gulp.task('vendors', function(){
    return gulp.src(paths.src.vendors)
    .pipe(gulp.dest(paths.dist.vendors))
});

// copy fonts to dist
gulp.task('fonts', function(){
    return gulp.src(paths.src.fonts)
    .pipe(gulp.dest(paths.dist.fonts))
});

// clean dist
gulp.task('clean', function () {
    return gulp.src(paths.dist.root)
        .pipe(clean());
});

// Prepare all assets for production
gulp.task('build', gulp.series('sass', 'css', 'js', 'vendors', 'fonts', 'img'));


// Watch (SASS, CSS, JS, and HTML) reload browser on change
gulp.task('watch', function() {
    browserSync.init({
        server: {
            baseDir: paths.root.www
        } 
    })
    gulp.watch(paths.src.scss, gulp.series('sass'));
    gulp.watch(paths.src.js).on('change', browserSync.reload);
    gulp.watch(paths.src.html).on('change', browserSync.reload);
    gulp.watch(paths.src.images).on('change', browserSync.reload);
});