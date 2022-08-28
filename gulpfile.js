const { src, dest, series, watch, task } = require('gulp')
var gulp = require('gulp')
const sass = require('gulp-sass')(require('sass')); //For Compiling SASS files
const postcss = require('gulp-postcss');


const tailwindcss = require('tailwindcss'); 
const concat = require('gulp-concat'); //For Concatinating js,css files
const autoprefixer = require('gulp-autoprefixer');

function css() {
    return src([
      './src/**/*.css',
      './src/**/*.scss'
    ])
    .pipe( postcss([
        require('tailwindcss/nesting'),
        tailwindcss( './tailwind.config.js'),
        require( 'autoprefixer')
      ]),
    )
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(dest('./css/'))
  }

function html() {
    return src('./src/index.html').pipe(dest('./'))
}
task('default', css)
watch("./src/**/*.{html,scss}", series(css,html));
