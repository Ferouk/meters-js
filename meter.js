var Meter = function(options){
    this.element = document.getElementById(options.id);
    this.type = options.type;
    this.unit = options.unit;
    this.title = options.title;
    this.lang = options.lang;
    this.terms = {
        fr : {
            "SPEED" : "Vitesse",
            "FUEL" : "Carburant",
            "ODO": "Kilomètrage",
            "ANGLE": "Angle",
            "ALTITUDE": "Altitude",
            "TEMPERATURE": "Température",
            "ON" : "ON",
            "OFF" : "OFF"
        },
        en: {
            "SPEED" : "Speed",
            "FUEL" : "Fuel",
            "ODO": "Distance",
            "ANGLE": "Angle",
            "ALTITUDE": "Altitude",
            "TEMPERATURE": "Temperature",
            "ON" : "ON",
            "OFF" : "OFF"
        }
    };

    this.lang = !this.lang ? 'en' : this.lang;

    options.value = typeof(options.value) === 'number' ?  options.value.toString() : options.value;
    options.max = typeof(options.max) === 'number' ?  options.max.toString() : options.max;

    this.value = this.element.dataset.value || options.value;
    this.max = this.element.dataset.max || options.max;

    this.show();

};
Meter.prototype.setValue = function (value) {
    this.value = value;
    this.show();
};
Meter.prototype.show = function(){
    var i = 0;
    var content = '';
    var percent = 0;
    var angle = 0;
    this.element.className = this.type;

    switch(this.type){
        case "odometer":
            if(!this.title){
                this.title = this.terms[this.lang]["ODO"];
            }
            for (i = 0; i < this.value.length; i++) {
                content += '<span class="num">' + this.value[i] + '</span>';
            }
            content += '<span class="unit">KM</span>';
            break;

        case "altimeter":
            percent = (this.value * 100) / this.max;
            if(!this.title){
                this.title = this.terms[this.lang]["ALTITUDE"];
            }
            content += '<div class="meter">';
            for(i=0; i< 10; i++){
                if(i < percent/10){
                    content += '<span class="altitude active"></span>'
                }else{
                    content += '<span class="altitude"></span>'
                }
            }
            content += '</div>';
            content += '<div class="info">';
            content += '<h2>'+this.title+'</h2>';
            content += '<h1>'+this.value+'<small>'+this.unit+'</small></h1>';
            content += '</div>';
            break;

        case "fuelmeter":
            percent = (this.value * 100) / this.max;
            if(!this.title){
                this.title = this.terms[this.lang]["FUEL"];
            }
            content += '<div class="meter">';
            content += '<div class="barrel"><div class="droplet"></div><div class="wave -one"></div><div class="wave -two"></div><div class="wave -three"></div></div>';
            content += '</div>';
            content += '<div class="info">';
            content += '<h2>'+this.title+'</h2>';
            content += '<h1>'+this.value+'<small>'+this.unit+'</small></h1>';
            content += '</div>';
            break;

        case "thermometer":
            percent = (this.value * 100) / this.max;
            if(!this.title){
                this.title = this.terms[this.lang]["TEMPERATURE"];
            }

             percent = percent > 100  ? 100 : percent;
             percent = percent < 0  ? 0 : percent;


            content += '<div class="meter">';
            content += '<div class="bg"><div class="circle"></div><div class="bar"><div class="indicator" style="height:'+percent+'%"></div></div></div>';
            content +='</div>';
            content += '<div class="info">';
            content += '<h2>'+this.title+'</h2>';
            content += '<h1>'+this.value+'<small>'+this.unit+'</small></h1>';
            content +='</div>';
            break;

        case "anglemeter":
            if(!this.title){
                this.title = this.terms[this.lang]["ANGLE"];
            }
            content += '<div class="meter">';
            content += '<div class="circle"><div class="indicator" style="transform:rotate('+(180-this.value)+'deg)"></div></div>';
            content += '</div>';
            content += '<div class="info">';
            content += '<h2>'+this.title+'</h2>';
            content += '<h1>'+this.value+'<small>'+this.unit+'</small></h1>';
            content += '</div>';
            break;

        case "speedometer":
            if(!this.title){
                this.title = this.terms[this.lang]["SPEED"];
            }
        	if(this.value <=180){
                angle = (this.value * 1.5) - 122;
            }else{
                angle = (180 * 1.5) - 122;
            }

            content += '<div class="meter">';
            content += '<div class="slider"><span class="indicator" style="transform: rotate('+angle+'deg)"></span> <div class="info"> <h1 >'+this.value+'<small>'+this.unit+'</small></span></div></div>';
            content += '</div>';
            break;

        case "led":
            content = this.value === "true" ? '<div class="meter on"><span class="circle"></span><h2>'+this.terms[this.lang]['ON']+'</h2></div>' : '<div class="meter off"><span class="circle"></span> <h2>'+this.terms[this.lang]['OFF']+'</h2></div>';
            break;
    }

    this.element.innerHTML = content;

};