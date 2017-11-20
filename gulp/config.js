'user strict';

var path = require("path");

var src = 'src';
var dist = 'dist';

//default paths in src folder
var scss = 'global/scss';
var jade = 'jade';

//default paths in dist folder
var css = 'global/css';
var template = 'template';

var script = 'global/js';
var image = 'global/images';

var languages = {
	list:['en'],
	primary:'en'
};

module.exports.browserSync = {
	dev:{
		server:{
			baseDir: [src,dist],
			index:"template/index.html"
		},
    debugInfo: false,
		host: 'localhost',
		port:'8898',
		notify:false
	}
};

module.exports.image = {
	src:path.join(src,image,'/**/*.{png,jpg,gif}'),
	dist:path.join(dist,image),
	imageCfg:{
		progressive: true,
    	interlaced: true,
    	svgoPlugins: [{cleanupIDs: false}]
	}
};



module.exports.style = {
	src: path.join(src,scss,'/**/*.scss'),
	dist: path.join(dist,css),
	scssCfg:{

	}
};

module.exports.template = {
	languages:languages,
	src:path.join(src,jade,'/**/*.jade'),
	dist:path.join(dist,template),
	cfg:{
		pretty:true,
		compileDebug:true
	}
};

module.exports.script = {
	src:path.join(src,script,'/**/*.js'),
	dist:path.join(dist,script)
}

module.exports.watch ={
	scss:path.join(src,scss,'/**/*.scss'),
	jade:path.join(src,jade,'/**/*.jade'),
	script:path.join(src,script,'/**/*.js')
}






