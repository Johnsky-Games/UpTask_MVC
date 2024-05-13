import { src, dest, watch, series } from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import terser from 'gulp-terser';

const sass = gulpSass(dartSass);

const paths = {
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js'
};

// Función para manejar errores
function handleError(err) {
    console.error(err.toString());
    this.emit('end'); // Continuar con la ejecución
}

// Tarea CSS
export function css() {
    return src(paths.scss, { sourcemaps: true })
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', handleError))
        .pipe(dest('./public/build/css', { sourcemaps: '.' }));
}

// Tarea JS
export function js() {
    return src(paths.js)
        .pipe(terser().on('error', handleError))
        .pipe(dest('./public/build/js'));
}

// Tarea de desarrollo
export function dev() {
    watch(paths.scss, css);
    watch(paths.js, js);
}

// Tarea por defecto
export default series(js, css, dev);
