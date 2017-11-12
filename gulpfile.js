var gulp = require("gulp");
gulp.task("dupa",function(){
    
    console.log("dupa");
});
gulp.task("build", function(){
    
   return gulp.src("./src/**")
       .pipe(gulp.dest("./build")); 
});