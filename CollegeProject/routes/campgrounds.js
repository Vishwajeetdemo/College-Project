var express= require("express");
var router = express.Router();
var campground= require("../models/campground");
var middleware = require("../middleware");
var multer = require('multer');
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter})

var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'decjzpere', 
  api_key:'561679742328286',
  api_secret:'5DaQjoetbFtG4Kt4r-Sy-_r4NHM'
});

//INDEX - show all campgrounds
router.get("/",function(req,res){
    campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds, currentUser:req.user});
        }
    });
});

//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, upload.single('image'), function(req, res) {
    // get data from form and add to campgrounds array
    cloudinary.uploader.upload(req.file.path, function(result) {
        // add cloudinary url for the image to the campground object under image property
        req.body.campground.image = result.secure_url;
        // add author to campground
        req.body.campground.author = {
          id: req.user._id,
          username: req.user.username
        }
        campground.create(req.body.campground, function(err, campground) {
          if (err) {
            req.flash('error', err.message);
            return res.redirect('back');
          }
          res.redirect('/campgrounds/' + campground.id);
        });
      });
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req,res){
    res.render("campgrounds/new");
});

// SHOW - shows more info about one campground
router.get("/:id",function(req,res){
    //find the campground with provided ID
    campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
                req.flash("error", "Something went wrong.");
                res.redirect("/");
        }else{
            //render show template with that campground
            res.render("campgrounds/show",{campground: foundCampground});
        }
    });
});

//Edit campground routes
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
            campground.findById(req.params.id, function(err, foundCampground){
                res.render("campgrounds/edit", {campground: foundCampground});
            });
        });
//update campground routes
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    //find and update of current campground
    campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updated){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//Destroy campground route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    campground.findByIdAndDelete(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;