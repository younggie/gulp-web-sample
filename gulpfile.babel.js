import gulp from "gulp";
import ws from "gulp-webserver";
import autoprefixer from "gulp-autoprefixer";
import ghPages from "gulp-gh-pages";
import postcss from "gulp-postcss";
import purgecss from "@fullhuman/postcss-purgecss";
import rename from "gulp-rename";
import miniCSS from "gulp-csso";

var postcssPlugins = [
  purgecss({
    content: ["src/**/*.html"]
  })
];

const webserver = () => gulp.src("src").pipe(ws({ livereload: true }));

//tailwindcss 에서 사용한 것만 추출해서 압축함
const tailwind_postcss = () =>
  gulp
    .src("src/css/style.css")
    .pipe(postcss(postcssPlugins))
    .pipe(miniCSS())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("src/css"));

const gh = () => gulp.src("src/**/*").pipe(ghPages());
const live = gulp.parallel([webserver]);

export const deploy = gulp.series([gh]);
export const tailwind_use_only = gulp.series([tailwind_postcss]);
export const run_server = gulp.series([live]);
