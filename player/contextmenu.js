function ContextMenu(menu, options){
	var self = this;
	var num = ContextMenu.count++;

	this.menu = menu;
	this.contextTarget = null;

	if(!(menu instanceof Array)){
		throw new Error("Parameter 1 must be of type Array");
	}

	if(typeof options !== "undefined"){
		if(typeof options !== "object"){
			throw new Error("Parameter 2 must be of type object");
		}
	}else{
		options = {};
	}

	window.addEventListener("resize", function(){
		if(ContextUtil.getProperty(options, "close_on_resize", true)){
			self.hide();
		}
	});

	this.setOptions = function(_options){
		if(typeof _options === "object"){
			options = _options;
		}else{
			throw new Error("Parameter 1 must be of type object")
		}
	}

	this.changeOption = function(option, value){
		if(typeof option === "string"){
			if(typeof value !== "undefined"){
				options[option] = value;
			}else{
				throw new Error("Parameter 2 must be set");
			}
		}else{
			throw new Error("Parameter 1 must be of type string");
		}
	}

	this.getOptions = function(){
		return options;
	}

	this.reload = function(){
		if(document.getElementById('cm_' + num) == null){
			var cnt = document.createElement("div");
			cnt.className = "cm_container";
			cnt.id = "cm_" + num;

			document.querySelector('div.viewer div.context-menus').appendChild(cnt);
		}

		var container = document.getElementById('cm_' + num);
		container.innerHTML = "";

		container.appendChild(renderLevel(menu));
	}

	function renderLevel(level){
		var ul_outer = document.createElement("ul");

		level.forEach(function(item){
			var li = document.createElement("li");
			li.menu = self;

			if(typeof item.type === "undefined"){
				var icon_span = document.createElement("span");
				icon_span.className = 'cm_icon_span';

				if(ContextUtil.getProperty(item, "icon", "") != ""){
					icon_span.innerHTML = ContextUtil.getProperty(item, "icon", "");
				}else{
					icon_span.innerHTML = ContextUtil.getProperty(options, "default_icon", "");
				}

				var text_span = document.createElement("span");
				text_span.className = 'cm_text';
				if(ContextUtil.getProperty(item, "text", "") != ""){
					text_span.innerHTML = ContextUtil.getProperty(item, "text", "");
				}else{
					text_span.innerHTML = ContextUtil.getProperty(options, "default_text", "item");
				}

				var sub_span = document.createElement("span");
				sub_span.className = 'cm_sub_span';

				if(typeof item.sub !== "undefined"){
					if(ContextUtil.getProperty(options, "sub_icon", "") != ""){
						sub_span.innerHTML = ContextUtil.getProperty(options, "sub_icon", "");
					}else{
						sub_span.innerHTML = '&#155;';
					}
				}

				var element;
				
				if (ContextUtil.getProperty(item, "url", "") != ''){
					var link = document.createElement('a');
					link.href = ContextUtil.getProperty(item, "url", "");
					element = link;
				} else {
					element = li;
				}
				
				element.appendChild(icon_span);
				element.appendChild(text_span);
				element.appendChild(sub_span);

				if (ContextUtil.getProperty(item, "url", "") != ''){
					li.appendChild(element);
				}

				if(!ContextUtil.getProperty(item, "enabled", true)){
					li.setAttribute("disabled", "");
				}else{
					if(typeof item.events === "object"){
						var keys = Object.keys(item.events);

						for(var i = 0; i < keys.length; i++){
							li.addEventListener(keys[i], item.events[keys[i]]);
						}
					}

					if(typeof item.sub !== "undefined"){
						li.appendChild(renderLevel(item.sub));
					}
				}
			}else{
				if(item.type == ContextMenu.DIVIDER){
					li.className = "cm_divider";
				}
			}

			ul_outer.appendChild(li);
		});

		return ul_outer;
	}

	this.display = function(e, target){
		if(typeof target !== "undefined"){
			self.contextTarget = target;
		}else{
			self.contextTarget = e.target;
		}

		var menu = document.getElementById('cm_' + num);

		var clickCoords = {x: e.clientX, y: e.clientY};
		var clickCoordsX = clickCoords.x;
		var clickCoordsY = clickCoords.y;

		var menuWidth = menu.offsetWidth + 4;
		var menuHeight = menu.offsetHeight + 4;

		var windowWidth = window.innerWidth;
		var windowHeight = window.innerHeight;

		var mouseOffset = parseInt(ContextUtil.getProperty(options, "mouse_offset", 2));

		if((windowWidth - clickCoordsX) < menuWidth){
			menu.style.left = windowWidth - menuWidth + "px";
		}else{
			menu.style.left = (clickCoordsX + mouseOffset) + "px";
		}

		if((windowHeight - clickCoordsY) < menuHeight){
			menu.style.top = windowHeight - menuHeight + "px";
		}else{
			menu.style.top = (clickCoordsY + mouseOffset) + "px";
		}

		var sizes = ContextUtil.getSizes(menu);

		if((windowWidth - clickCoordsX) < sizes.width){
			menu.classList.add("cm_border_right");
		}else{
			menu.classList.remove("cm_border_right");
		}

		if((windowHeight - clickCoordsY) < sizes.height){
			menu.classList.add("cm_border_bottom");
		}else{
			menu.classList.remove("cm_border_bottom");
		}

		menu.classList.add("display");

		if(ContextUtil.getProperty(options, "close_on_click", true)){
			window.addEventListener("click", documentClick);
		}

		e.preventDefault();
	}

	this.hide = function(){
		document.getElementById('cm_' + num).classList.remove("display");
		window.removeEventListener("click", documentClick);
	}

	function documentClick(){
		self.hide();
	}

	this.reload();
}

ContextMenu.count = 0;
ContextMenu.DIVIDER = "cm_divider";

const ContextUtil = {
	getProperty: function(options, opt, def){
		if(typeof options[opt] !== "undefined"){
			return options[opt];
		}else{
			return def;
		}
	},

	getSizes: function(obj){
		var lis = obj.getElementsByTagName('li');

		var width_def = 0;
		var height_def = 0;

		for(var i = 0; i < lis.length; i++){
			var li = lis[i];

			if(li.offsetWidth > width_def){
				width_def = li.offsetWidth;
			}

			if(li.offsetHeight > height_def){
				height_def = li.offsetHeight;
			}
		}

		var width = width_def;
		var height = height_def;

		for(var i = 0; i < lis.length; i++){
			var li = lis[i];

			var ul = li.getElementsByTagName('ul');
			if(typeof ul[0] !== "undefined"){
				var ul_size = ContextUtil.getSizes(ul[0]);

				if(width_def + ul_size.width > width){
					width = width_def + ul_size.width;
				}

				if(height_def + ul_size.height > height){
					height = height_def + ul_size.height;
				}
			}
		}

		return {
			"width": width,
			"height": height
		};
	}
};

function defineMenus(){
  window.videoMenu = [ // translate
  {
    "text": '<ui t_id="play_pause"></ui>',
    "events": {
      "click": function(e){
        viewer.toggleLecture();
      }
    }
  },
  {
    "text": '<ui t_id="set_mode_to"></ui>',
    "sub": [
      {
        "text": '<ui t_id="image"></ui>',
        "events": {
          "click": function(e){
            viewer.setMode('image');
          }
        }
      },
      {
        "text": '<ui t_id="video"></ui>',
        "events": {
          "click": function(e){
            viewer.setMode('video');
          }
        }
      },
      {
        "text": '<ui t_id="audio"></ui>',
        "events": {
          "click": function(e){
            viewer.setMode('audio');
          }
        }
      }
    ]
  },
  {
    "text": '<ui t_id="fullscreen_on_off"></ui>',
    "events": {
      "click": function(e){
        viewer.toggleFullscreen();
      }
    }
  },
  {
    "text": '<ui t_id="picture_in_picture_on_off"></ui>',
    "events": {
      "click": function(e){
        viewer.togglePictureInPicture();
      }
    }
  },
  {
    "text": '<ui t_id="loop_on_off"></ui>',
    "events": {
      "click": function(e){
        viewer.toggleLoop();
      }
    }
  },
  {
    "text": '<ui t_id="volume"></ui>',
    "sub": [
      {
        "text": '<ui t_id="mute_on_off"></ui>',
        "events": {
          "click": function(e){
            viewer.toggleMute();
          }
        }
      },
      {
        "text": '<ui t_id="set_volume_to"></ui>',
        "events": {
          "click": function(e){
            viewer.setVolume('custom');
          }
        }
      }
    ]
  },
  {
    "text": '<ui t_id="change_speed"></ui>',
    "sub": [
      {
        "text": "0.25x",
        "events": {
          "click": function(e){
            setSpeed(0.25);
          }
        }
      },
      {
        "text": "0.5x",
        "events": {
          "click": function(e){
            setSpeed(0.5);
          }
        }
      },
      {
        "text": "0.75x",
        "events": {
          "click": function(e){
            setSpeed(0.75);
          }
        }
      },
      {
        "text": "1x",
        "events": {
          "click": function(e){
            setSpeed(1.0);
          }
        }
      },
      {
        "text": "1.25x",
        "events": {
          "click": function(e){
            setSpeed(1.25);
          }
        }
      },
      {
        "text": "1.5x",
        "events": {
          "click": function(e){
            setSpeed(1.5);
          }
        }
      },
      {
        "text": "1.75x",
        "events": {
          "click": function(e){
            setSpeed(1.75);
          }
        }
      },
      {
        "text": "2x",
        "events": {
          "click": function(e){
            setSpeed(2.0);
          }
        }
      },
      {
        "type": ContextMenu.DIVIDER
      },
      {
        "text": '<ui t_id="custom_speed"></ui>',
        "events": {
          "click": function(e){
            setSpeed('custom');
          }
        }
      },
      /*{
        "text": "Item 13",
        "enabled": false,
        "sub": [
          {
            "text": "Item 131"
          }
        ]
      }*/
    ]
  },
  {
    "text": '<ui t_id="import_file"></ui>',
    "events": {
      "click": function(e){
        viewer.importFile();
      }
    }
  },
  {
    "text": '<ui t_id="import_subtitles"></ui>',
    "events": {
      "click": function(e){
        viewer.importLyricsFile();
      }
    }
  },
  {
    "text": '<ui t_id="vfc"></ui>',
    "sub": [
      {
        "text": '<ui t_id="vfc_capture_current"></ui>',
        "events": {
          "click": function(e){
            viewer.takeCaptureOfVideoElementAtTime();
          }
        }
      },
      {
        "text": '<ui t_id="vfc_capture_custom"></ui>',
        "events": {
          "click": function(e){
            viewer.takeCaptureOfVideoElementAtTime(Number(viewer.hms2s(prompt(ui_translator.getDialogInLanguage('vfc_custom')))));
          }
        }
      }
    ]
  },
  viewer.getAudioTracksMenu(),
  viewer.getVideoTracksMenu(),
  {
    "text": '<ui t_id="settings"></ui>',
    "events": {
      "click": function(e){
        windows.openApp("#settings-app");
      }
    }
  }
];

window.audioMenu = [ // translate
  {
    "text": '<ui t_id="play_pause"></ui>',
    "events": {
      "click": function(e){
        viewer.toggleLecture();
      }
    }
  },
  {
    "text": '<ui t_id="set_mode_to"></ui>',
    "sub": [
      {
        "text": '<ui t_id="image"></ui>',
        "events": {
          "click": function(e){
            viewer.setMode('image');
          }
        }
      },
      {
        "text": '<ui t_id="video"></ui>',
        "events": {
          "click": function(e){
            viewer.setMode('video');
          }
        }
      },
      {
        "text": '<ui t_id="audio"></ui>',
        "events": {
          "click": function(e){
            viewer.setMode('audio');
          }
        }
      }
    ]
  },
  {
    "text": '<ui t_id="fullscreen_on_off"></ui>',
    "events": {
      "click": function(e){
        viewer.toggleFullscreen();
      }
    }
  },
  {
    "text": '<ui t_id="loop_on_off"></ui>',
    "events": {
      "click": function(e){
        viewer.toggleLoop();
      }
    }
  },
  {
    "text": '<ui t_id="volume"></ui>',
    "sub": [
      {
        "text": '<ui t_id="mute_on_off"></ui>',
        "events": {
          "click": function(e){
            viewer.toggleMute();
          }
        }
      },
      {
        "text": '<ui t_id="set_volume_to"></ui>',
        "events": {
          "click": function(e){
            viewer.setVolume('custom');
          }
        }
      }
    ]
  },
  {
    "text": '<ui t_id="change_speed"></ui>',
    "sub": [
      {
        "text": "0.25x",
        "events": {
          "click": function(e){
            setSpeed(0.25);
          }
        }
      },
      {
        "text": "0.5x",
        "events": {
          "click": function(e){
            setSpeed(0.5);
          }
        }
      },
      {
        "text": "0.75x",
        "events": {
          "click": function(e){
            setSpeed(0.75);
          }
        }
      },
      {
        "text": "1x",
        "events": {
          "click": function(e){
            setSpeed(1.0);
          }
        }
      },
      {
        "text": "1.25x",
        "events": {
          "click": function(e){
            setSpeed(1.25);
          }
        }
      },
      {
        "text": "1.5x",
        "events": {
          "click": function(e){
            setSpeed(1.5);
          }
        }
      },
      {
        "text": "1.75x",
        "events": {
          "click": function(e){
            setSpeed(1.75);
          }
        }
      },
      {
        "text": "2x",
        "events": {
          "click": function(e){
            setSpeed(2.0);
          }
        }
      },
      {
        "type": ContextMenu.DIVIDER
      },
      {
        "text": '<ui t_id="custom_speed"></ui>',
        "events": {
          "click": function(e){
            setSpeed('custom');
          }
        }
      }
    ]
  },
  {
    "text": '<ui t_id="import_file"></ui>',
    "events": {
      "click": function(e){
        viewer.importFile();
      }
    }
  }
];

window.imageMenu = [ // translate
  {
    "text": '<ui t_id="play_pause"></ui>',
    "events": {
      "click": function(e){
        viewer.toggleLecture();
      }
    }
  },
  {
    "text": '<ui t_id="set_mode_to"></ui>',
    "sub": [
      {
        "text": '<ui t_id="image"></ui>',
        "events": {
          "click": function(e){
            viewer.setMode('image');
          }
        }
      },
      {
        "text": '<ui t_id="video"></ui>',
        "events": {
          "click": function(e){
            viewer.setMode('video');
          }
        }
      },
      {
        "text": '<ui t_id="audio"></ui>',
        "events": {
          "click": function(e){
            viewer.setMode('audio');
          }
        }
      }
    ]
  },
  {
    "text": '<ui t_id="fullscreen_on_off"></ui>',
    "events": {
      "click": function(e){
        viewer.toggleFullscreen();
      }
    }
  }
];
}
defineMenus();