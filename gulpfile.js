var gulp = require('gulp'),
    del = require('del'),
    browserSync = require('browser-sync').create(),
    uglify = require('gulp-uglify'),
    htmlmin = require('gulp-htmlmin'),
    cssmin = require('gulp-cssmin'),
    htmlreplace = require('gulp-html-replace'),
    concat = require('gulp-concat-multi');

// SRC: Localhost & BrowserSync
gulp.task('server', function() {
    
    browserSync.init({
        server: {
            baseDir: "src/"
        }
    });
    
    gulp.watch("src/**/*").on('change', browserSync.reload);
    
});

// DIST: Localhost & BrowserSync
gulp.task('server-dist', function() {
    
    browserSync.init({
        server: {
            baseDir: "dist/"
        }
    });
    
    gulp.watch("dist/**/*").on('change', browserSync.reload);
    
});

// Limpa a pasta DIST
gulp.task('reset', function () {
  return del(['dist/**/*']);
});

// Copia os arquivos
gulp.task('copy', function() {
	return gulp.src('src/**/*')
		.pipe(gulp.dest('dist'));
});

// Inclui os builds e minifica o HTML
gulp.task('html',function(){
    return gulp.src('src/*.html')
        .pipe(htmlreplace({
            'css': 'css/frameworks.css',
            'css2': 'css/style.css',
            'js': 'js/frameworks.js',
            'js2': 'js/libs.js',
            'js3': 'js/main.js'
        }))
        .pipe(htmlmin({collapseWhitespace: true,removeComments:true}))
        .pipe(gulp.dest('dist'))
})

// Concatena e Minifica o CSS
gulp.task('css', function(){
    return concat({
        'frameworks.css': ['src/css/bootstrap/css/bootstrap.min.css','src/js/magnific-popup/magnific-popup.css'],
        'style.css': ['src/css/icons.css','src/css/style.css']
        })
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'));
});

// Concatena e Minifica o JS
gulp.task('js', function(){
    return concat({
        'frameworks.js': ['src/js/jquery.min.js','src/js/popper.min.js','src/css/bootstrap/js/bootstrap.min.js'],
        'libs.js': ['src/js/magnific-popup/jquery.magnific-popup.js','src/js/scrollPosStyler.js'],
        'main.js': ['src/js/main.js','src/js/jquery.validate.js','src/js/jquery.mask.min.js','src/js/js.cookie.min.js',
                    'src/js/envia.js']
        })
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Deleta os arquivos desnecessários
gulp.task('clean', function () {
  return del(['dist/css/**/*','!dist/css/frameworks.css','!dist/css/style.css','!dist/css/icons.woff',
              'dist/js/**/*','!dist/js/frameworks.js','!dist/js/libs.js','!dist/js/main.js']);
});

// Executa todos os comandos de build
gulp.task('build',
    gulp.series('reset', 'copy', 'html', 'css', 'js', 'clean'));