// minifica y unifica
var gulp=require("gulp");
var gulpSequence=require("gulp-sequence");
gulp.task('compileToDist', gulpSequence(['prepareProductionConfig'], ['copy'], ['htmlify'], ['minify'], ['moveVendorToDist'], ['deleteTemp']));
//gsutil -m acl ch -R -g All:R gs://loteria.callejass.com