var mongoose = require("mongoose"),
campground   = require("./models/campground");
var comment = require("./models/comment");
var data = [{
    name :"Cloud's Rest", 
    image:"https://pixabay.com/get/ea31b10929f7063ed1584d05fb1d4e97e07ee3d21cac104490f0c47ca7eeb3be_340.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
    name :"The forest in Lost Creek Campground", 
    image:"https://farm8.staticflickr.com/7285/8737935921_47343b7a5d.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
    name :"Camp Taylor Campground", 
    image:"https://farm4.staticflickr.com/3021/2386124661_843479d1c8.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
];

function seedDB(){
   //Remove all campgrounds
   campground.deleteMany({}, function(err){
        // if(err){
        //     console.log(err);
        // }
        // console.log("Campground Removed");
        //     data.forEach(function(seed){
        //         campground.create(seed, function(err, campground){
        //             if(err){
        //                 console.log(err);
        //             }else{
        //                 console.log("added a campground");
        //                     comment.create({
        //                         text:"This place is great, but I wish there was internet",
        //                         author:"Homer"
        //                     },function(err, comment){
                                
        //                         if(err){
        //                             console.log(err);
        //                         }else{
        //                             campground.comments.push(comment);
        //                             campground.save();
        //                             console.log("Created new comment");
        //                         }
        //                     });
        //             }
        //         });
        //     });
        });
}

module.exports = seedDB;