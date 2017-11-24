$(document).ready(function(){

	/* For quick copy-paste */
    $('input').focus(function(){this.select();});

	/* Change color on every key input. */
	$('#hex, #percent').bind('blur keydown', function (event) {
		var el = $('#hex');
		setTimeout(function () {
			var rgb = [],
			    $input = $(el),
			    fail = false,
			    original = $('#hex').val(),

			hex = (original+'').replace(/#/, '');
			
			if (original.length === 1 && original !== '#') {
				$('#hex').val('#' + original);
			}
			if (hex.length == 3) {
                hex = hex + hex;
            }
			for (var i = 0; i < 6; i+=2) {
			   rgb.push(parseInt(hex.substr(i,2),16));
			   fail = fail || rgb[rgb.length - 1].toString() === 'NaN';
			}


			$('#rgb').val(fail ? '' : 'rgb(' + rgb.join(',') + ')');
			$('#hsl').val(fail ? '' : 'hsl(' + rgbToHsl.apply(null, rgb).join(',') + ')');
			   
	    }, 13);
	});

    $('input').focus(function(){
        this.select();
    });

});


function getValue() {
    var hexVal = document.getElementById('hex').value,
	percentVal = document.getElementById('percent').value,
	  division = 100/percentVal;

    if(hexVal.length == 7 && percentVal.length > 0){

        $('.light-dark-header').css("display", "block");

        $('#boxLight').empty();
        $('#boxDark').empty();

        for (let i = 0; i < division; i++) {

        	let shadeLight = (percentVal * i) / 100,
		         shadeDark = shadeLight * - 1,
		        colorLight = shadeColor2(hexVal, shadeLight),
		         colorDark = shadeColor2(hexVal, shadeDark);

	        const lightColors = setColorValues( colorLight ),
		          newLightRgb = lightColors.rgb,
		          newLightHex = lightColors.hex,
		          newLightHsl = lightColors.hsl,
		           darkColors = setColorValues( colorDark ),
		           newDarkRgb = darkColors.rgb,
		           newDarkHex = darkColors.hex,
		           newDarkHsl = darkColors.hsl;

	        let lightItem = $(
                '<div class="col-xs-6 col-md-2">\
                    <div class="result-box--container">\
                        <span class="percent-circle percent-circle-'+ i +'"></span>\
                    </div>\
                    <div class="result-box" id="boxLight' + i + '">\
                        <input type="text" placeholder="hex" id="hex-'+ i +'" class="result-box--colour-result" value="#' + newLightHex.toUpperCase() + '">\
                        <input type="text" placeholder="rgb" id="rgb"'+ i +'" class="result-box--colour-result" value="' + newLightRgb + '">\
                        <input type="text" placeholder="hsl" id="hsl"'+ i +'" class="result-box--colour-result" value="' + newLightHsl + '">\
                    </div>\
                </div>'
            ),
	        darkItem = $(
		        '<div class="col-xs-6 col-md-2">\
					<div class="result-box--container">\
						<span class="percent-circle percent-circle-'+ i +'"></span>\
                    </div>\
                    <div class="result-box" id="boxDark' + i + '">\
                        <input type="text" placeholder="hex" id="hex-'+ i +'" class="result-box--colour-result" value="#' + newDarkHex.toUpperCase() + '">\
                        <input type="text" placeholder="rgb" id="rgb"'+ i +'" class="result-box--colour-result" value="' + newDarkRgb + '">\
                        <input type="text" placeholder="hsl" id="hsl"'+ i +'" class="result-box--colour-result" value="' + newDarkHsl + '">\
                    </div>\
                </div>'
	        );

	        lightItem.find(".result-box--container").css("background-color", colorLight);
	        lightItem.find(".percent-circle").html((percentVal * i) + "%");
	        $('#boxLight').append( lightItem );

	        darkItem.find(".result-box--container").css("background-color", colorDark);
	        darkItem.find(".percent-circle").html((percentVal * i) + "%");
	        $('#boxDark').append( darkItem );
        }
    }
}

function setColorValues( color ) {
	let colors = {},
		  fail = false,
		   rgb = [],
		   hex = (color+'').replace(/#/, '');

	for ( let i = 0; i < 6; i+=2 ) {
		rgb.push(parseInt(hex.substr(i,2),16));
		fail = fail || rgb[rgb.length - 1].toString() === 'NaN';
	}
	colors.hex = hex;
	colors.rgb = `rgb(${ rgb.join( ',' ) })`;
	colors.hsl = `hsl(${ rgbToHsl.apply(null, rgb).join(',') })`;

	return colors;
}

/* Function to convert rgb-to-hsl. */
function rgbToHsl(r, g, b){
	r /= 255, g /= 255, b /= 255;
	var max = Math.max(r, g, b), min = Math.min(r, g, b);
	var h, s, l = (max + min) / 2;

	if (max == min) { h = s = 0; }
	else {
		var d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

		switch (max){
			case r: h = (g - b) / d + (g < b ? 6 : 0); break;
			case g: h = (b - r) / d + 2; break;
			case b: h = (r - g) / d + 4; break;
		}

		h /= 6;
	}

	return [(h*100+0.5)|0, ((s*100+0.5)|0) + '%', ((l*100+0.5)|0) + '%'];
}

function shadeColor2(color, percent) {
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}


