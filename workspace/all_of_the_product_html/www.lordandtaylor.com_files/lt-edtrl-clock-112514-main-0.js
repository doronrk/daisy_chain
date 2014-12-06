(function(ns){

    ns.countDown = function(args){

        var self = this;

        self._calculate = function(tarDate){
            // date representing the future event
            var endDate = new Date(tarDate[0], (tarDate[1] -1), tarDate[2], tarDate[3], tarDate[4]);

            // obj representing the current time until the event
            var currentTime = {};

            // interval variable
            var countDownInt;


            var setIntCb = function(){
                // current date         
                var thisDate = new Date().getTime();

                // raw difference between future and present date
                var timeDiff = parseInt(endDate-thisDate);

                // convert to days
                currentTime.days = parseInt((endDate-thisDate)/86400000);

                // convert to hours         
                currentTime.hours = parseInt(((timeDiff/3600000) - (currentTime.days*24)) < 0 ? 0 : ((timeDiff/3600000) - (currentTime.days*24)));

                // convert to minutes
                currentTime.minutes = parseInt(timeDiff/60000) - parseInt(timeDiff/3600000) * 60;

                // convert to seconds
                currentTime.seconds = parseInt(timeDiff/1000) - parseInt(timeDiff/60000) * 60;

                // append leading zero
                for (key in currentTime) {
                    if (currentTime[key] < 10){
                        currentTime[key] = 0 + '' +  currentTime[key];
                    }

                }

                // stop time if event has expired
                if(Number(thisDate) >= Number(endDate)){
                    currentTime = {days: '00', hours: '00', minutes: '00', seconds: '00'};

                    // remove the interval
                    clearInterval(countDownInt);
                }

                // render calculations 
                self._render(args.$el, currentTime);
            };
            setIntCb();

            // call every second
            counDownInt = setInterval(setIntCb, 1000);
        };
        self._render = function($ele, time){
            //$ele.html(time.days + " DAYS " + time.hours + " HOURS "+ time.minutes +" MINUTES " + time.seconds + " SECONDS");
            $ele.innerHTML = '<div class="numeric days">' +time.days + '</div>' + "<div class='copy'> DAYS </div>" + '<div class="numeric hours">' + time.hours + '</div>'  + "<div class='copy'> HOURS </div>" + '<div class="numeric minutes">' + time.minutes + '</div>' +"<div class='copy'> MINUTES </div>" + '<div class="numeric seconds">' + time.seconds + '</div>' + "<div class='copy'> SECONDS</div>";

        }

        function init(){

            if( args.hasOwnProperty('countDownTo') ){

                //remove any whitespace
                args.countDownTo = args.countDownTo.split("");
                var total = args.countDownTo.length;
                var trimmed_arr=[];
                for( var i=0; i<total; ++i )
                {
                    if( args.countDownTo[i] != ' ' && args.countDownTo[i] != '\n' && args.countDownTo[i] != '\t' )
                        trimmed_arr.push( args.countDownTo[i] );
                }


                var countDownTo = trimmed_arr.join('');//args.countDownTo.replace(/ /g,'');//year:2014,month:10,day:15,hour:13,minute:12
                countDownTo = countDownTo.split(",");//[ "year:2014","month:10","day:15","hour:13","minute:12"]

                var total = countDownTo.length;
                var tokens;
                var countDownObj = {};
                for ( var i = 0; i<total; ++i ){
                    tokens = countDownTo[i].split(":");//"year:2014"
                    countDownObj[tokens[0]] = tokens[1];//countDownObj["year"] = "2014";
                }

                args.year = countDownObj.year;
                args.month = countDownObj.month;
                args.day = countDownObj.day;
                args.hour = countDownObj.hour;
                args.minute = countDownObj.minute;
            }

            self._calculate([
                args.year,
                args.month,
                args.day,
                args.hour,
                args.minute
            ]);
        }

        init();
    }


    //=======================================//
    var countDownTo = document.querySelector("#countDownTo");
    if( countDownTo  ){
        if( 'innerText' in countDownTo  )
            countDownTo = countDownTo.innerText;
        else if( 'textContent' in countDownTo )//IE8 doesn't support innerText
            countDownTo = countDownTo.textContent;
    }

    var myClock = new dsg.countDown({
        //            year: 2014,
        //            month: 10,
        //            day: 15,
        //            hour: 13,
        //            minute: 12,
        countDownTo: countDownTo,
        $el: document.querySelector('#dsg-clock .clock')
    });
    //=======================================//

})(this.dsg = this.dsg || {});


