//  my script
//test test test  test  test  test  test
angular.module('confusionApp',[]).controller('dishDetailController', function() {
            var dish = {
                          name:'Uthapizza',
                          image: 'images/uthapizza.jpg',
                          category: 'mains',
                          label:'Hot',
                          price:'4.99',
                          description:'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
                          comments: [
                               {
                                   rating:5,
                                   comment:"Imagine all the eatables, living in conFusion!",
                                   author:"John Lemon",
                                   date:"2012-10-16T17:57:28.556094Z"
                               },
                               {
                                   rating:4,
                                   comment:"Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
                                   author:"Paul McVites",
                                   date:"2014-09-05T17:57:28.556094Z"
                               },
                               {
                                   rating:3,
                                   comment:"Eat it, just eat it!",
                                   author:"Michael Jaikishan",
                                   date:"2015-02-13T17:57:28.556094Z"
                               },
                               {
                                   rating:4,
                                   comment:"Ultimate, Reaching for the stars!",
                                   author:"Ringo Starry",
                                   date:"2013-12-02T17:57:28.556094Z"
                               },
                               {
                                   rating:2,
                                   comment:"It's your birthday, we're gonna party!",
                                   author:"25 Cent",
                                   date:"2011-12-02T17:57:28.556094Z"
                               }

                           ]
                    };
            this.dish = dish;
        });
function YouTubePlayList(id, entries) {
	
	this.id = id;
	this.entries = entries;
	this.currently_playing = 0;
	this.randomizer = false;
	
}

YouTubePlayList.prototype = {
	
	next: function() {
		
		var retVal = false;
		if(this.randomizer) {
			
			retVal = true;
			this.currently_playing = Math.floor((Math.random() * this.entries.length));
			
		}
		else if(this.currently_playing <= this.entries.length) {
			
			retVal = true;
			this.currently_playing++;
			
		} 
		return retVal;
		
	},
	previous: function() {
		
		var retVal = false;
		if(this.currently_playing > 0) {
			
			retVal = true;
			this.currently_playing--;
			
		} 
		return retVal;
		
	},
	getCurrentlyPlaying: function() {
		
		return this.entries[this.currently_playing].video_id;
		
	},
	setCurrentlyPlaying: function(video_id) {
		
		for(var index = 0; index < this.entries.length; index++) {
			
			if (this.entries[index].video_id === video_id) {
				this.currently_playing = index;
				break;
			}
		}
		
	},
	randomize: function() {
		
		this.randomizer = !(this.randomizer);
		return this.randomizer;
		
	},
	isRandomized: function() {
		
		return this.randomizer;
	}				
	
};
