$(document).ready(function() {
	var eee;
	var aaa;
	var rrr;
    $("#shoesize").chained("#gender");

    Object.size = function(obj) {
        var size = 0,
            key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };

    Object.getRandom = function(min, max) {
        return Math.random() * (max - min) + min;
    };

    var pressYourLuck = function() {
        var boxes = 24,
            $gameboard = $('#gameboard'),
            $currentBox = null,
            $button = $('.button'),
            $prize = $('.prize'),
            $score = $('.score'),
            _currentprize = 0,
            $turns = $('.turns'),
            $whammy = $('.whammy'),
            $reset = $('.reset'),
            $verify = $('#verify'),
            $comebacktogame = $('#comebacktogame'),
            _whammy = 0,
            _imagenumber,
            _previousCurrentBox,
            _wcode,
            _code,
            _prizeToLandOn = [],
            _board_list_items = "",
            _button_pressed = false,
            _timeout = null,
            _speed = 100,
            _current_box = 0,
            _current_score = 0,
            _whammy_count = 0,
            _turns_left = 2,
            _started = false,

            prize = {
                small: ["OL05 - 20_ Off.mp4", "grid_20percent.jpg"],
                medium: ["OL07 - Reebok Zpumps.mp4", "grid_zpumps.jpg"],
                big: ["OL08 - Reebok Giftcard.mp4", "grid_reebok.jpg"],
                whammy: ["OL09 - Better Luck Next Time.mp4", "grid_whammy.jpg"],
                whammy1: ["OL01 - Reebok Sweatband.mp4", "grid_pump.jpg"],
                whammy2: ["OL06 - Trip to Jon Jones.mp4", "grid_zpumps.jpg"]
            },

            // box_numbers = [
            //   0, 1, 2, 3, 4, 5, 6, 7, 8, 15, 16, 23, 24, 31,
            //   32, 39, 40, 47, 48, 55, 56, 57, 58, 59, 60, 61,
            //   62, 63, 64
            // ],
            box_numbers = [
                0, 1, 2, 3, 4, 5, 6, 11, 12, 17, 18, 19, 20, 21, 22, 23
            ],
            pumpvideo = [
                "OL01 - Reebok Sweatband.mp4", "OL02 - Reebok Cinch bag.mp4", "OL03 - Reebok Waterbottle.mp4", "OL04 - Reebok iPhone Case.mp4"
            ],
            video_boxes = {
                0: prize.whammy2[0],
                1: prize.small[0],
                2: prize.whammy[0],
                3: prize.whammy1[0],
                4: prize.big[0],
                5: prize.medium[0],
                6: prize.small[0],
                11: prize.whammy1[0],
                12: prize.medium[0],
                17: prize.big[0],
                18: prize.big[0],
                19: prize.whammy[0],
                20: prize.small[0],
                21: prize.medium[0],
                22: prize.whammy[0],
                23: prize.whammy1[0]

            },

            active_boxes = {
                0: prize.whammy2[1],
                1: prize.small[1],
                2: prize.whammy[1],
                3: prize.whammy1[1],
                4: prize.big[1],
                5: prize.medium[1],
                6: prize.small[1],
                11: prize.whammy1[1],
                12: prize.medium[1],
                17: prize.big[1],
                18: prize.big[1],
                19: prize.whammy[1],
                20: prize.small[1],
                21: prize.medium[1],
                22: prize.whammy[1],
                23: prize.whammy1[1]
            };

        var Self = {
            init: function() {
                $("#pumpbutton").show();
                $("#pumpbutton-1").hide();
                Self.wireup();
                Self.createGameBoard();
            },


            wireup: function() {
                $("#reedemafterformsumbission").click(function(e) {
                    e.preventDefault();
                    var firstname = document.getElementById("firstname").value;
                    var lastname = document.getElementById("lastname").value;
                    var streetaddress = document.getElementById("streetaddress").value;
                    var streetaddress2 = document.getElementById("streetaddress2").value;
                    var city = document.getElementById("city").value;
                    var state = document.getElementById("state").value;
                    var zipcode = document.getElementById("zipcode").value;
                    var gender = document.getElementById("gender").value;
                    var shoesize = document.getElementById("shoesize").value;
                    var redemption = 'firstname=' + firstname + '&lastname=' + lastname + '&streetaddress=' + streetaddress + '&streetaddress2=' + streetaddress2 + '&city=' + city + '&state=' + state + '&zipcode=' + zipcode;
                    if (_currentprize == 1)
                        redemption = redemption + '&gender=' + gender + '&shoesize=' + shoesize;
                    if (firstname == "" || lastname == "" || streetaddress == "" || city == "" || state == "" || zipcode == "") {
                        if (_currentprize == 1 && (gender == "" || shoesize == ""))
                            alert("Please fill the fields");
                        else
                            alert("Please fill the fields");
                    } else {
						var timestamp = Date.now();
                        $.get(
                            'em.php', {
								email:eee,
                                firstname: firstname,
                                lastname:lastname,
                                streetaddress:streetaddress,
                                streetaddress2:streetaddress2,
                                city:city,
                                state:state,
                                zipcode:zipcode,
								time:timestamp,
								day:1,
                                gender:gender,
                                shoesize:shoesize,
                                type: 'redemption',
								round:_turnsLeft,
								a:aaa[0],
								b:aaa[1]

                            },
                            function(data) {
                                 $(".order-page").addClass("hideme");
                                
                                $("#nowhammyoccured").addClass('onlyforbuttons');
                                   if ((video_boxes[box_numbers[_prizeToLandOn[4 - (_turnsLeft + 1)]]] == "OL05 - 20_ Off.mp4"))
                                   {
                                        $("#redeempercent").removeClass("hideme").html("REDEEM YOUR 20% OFF AT REEBOK.COM");
                                         $("#redeemcode").removeClass("hideme").html("USER CODE "+_code+" AT CHECKOUT");     
 											 $(".thanx-content").removeClass("hideme");
                                   }
                                   else
                                   { $(".social-content").removeClass("hideme");}
                                
                            }, 'json'
                        );




                    }
                });
                $("#facebookbutton").click(function(e) {
                    $(".social-content").addClass("hideme");
                    $(".thanx-content").removeClass("hideme");
                     $("#redeemcode").html("USER CODE "+_wcode+" AT CHECKOUT");
                });
                $("#twitterbutton").click(function(e) {
                    $(".social-content").addClass("hideme");
                    $(".thanx-content").removeClass("hideme");
                    $("#redeemcode").html("USER CODE "+_wcode+" AT CHECKOUT");
                });
                $button.click(function(e) {

                    e.preventDefault();
                    Self.pushButtonToggle();
                });
                $comebacktogame.click(function(e) {
                    e.preventDefault();
                    $(".emaildiv").addClass('hideme');
                    $(".welcome-outer").addClass('hideme');
                    $('.email-top').addClass("hideme");
                    $button.removeClass('hideme');
                    Self.pushButtonToggle();
                });
                $('#reedemmyprize').click(function(e) {

                    e.preventDefault();
                    $('.welcome-outer').addClass("hideme");
                   
                        $('#withgender').removeClass("hideme");
                        // $('#gender').addClass("hideme");
                        // $('.shoe-size').addClass("hideme");
                   
                });
                $reset.click(function(e) {
                    e.preventDefault();
                    Self.reset();
                });
                $("#playmyvideocinch")[0].onended = function(e) {
                  $(".winning-outer")[0].style.backgroundImage="http://localhost/game/img/hightlight_20percent.jpg";
                    $('.video-content').addClass('hideme');
                   
                    if (_turnsLeft == 2)
                        $(".winning-top-right").addClass('hideforredeem');
                           $(".winning-outer").removeClass("Reebokbetterlucknext");
                           $(".winning-outer").removeClass("ReebokZPumps");
                           $(".winning-outer").removeClass("ReebokSweatBand");
                           $(".winning-outer").removeClass("ReebokCinchbag");
                           $(".winning-outer").removeClass("ReebokWaterBottle");
                           $(".winning-outer").removeClass("ReebokIphoneCase");
                           $(".winning-outer").removeClass("Reebokpercent");
                           $(".winning-outer").removeClass("ReebokGiftcard");   
                           $(".winning-outer").removeClass("ReebokTrip");
                      switch(video_boxes[box_numbers[_prizeToLandOn[4 - (_turnsLeft + 1)]]])
                      {case "OL09 - Better Luck Next Time.mp4": $(".winning-outer").addClass("Reebokbetterlucknext");
                                                                break;
                       case "OL07 - Reebok Zpumps.mp4": $(".winning-outer").addClass("ReebokZPumps");
                                                        break;  
                       case "OL01 - Reebok Sweatband.mp4" :$(".winning-outer").addClass("ReebokSweatBand");
                                                        break;  
                       case "OL02 - Reebok Cinch bag.mp4" :$(".winning-outer").addClass("ReebokCinchbag");
                                                        break;
                       case "OL03 - Reebok Waterbottle.mp4" :$(".winning-outer").addClass("ReebokWaterBottle");
                                                        break;
                       case "OL04 - Reebok iPhone Case.mp4" :$(".winning-outer").addClass("ReebokIphoneCase");
                                                        break;   
                       case "OL05 - 20_ Off.mp4" :$(".winning-outer").addClass("Reebokpercent");
                                                        break;    
                       case "OL08 - Reebok Giftcard.mp4" :$(".winning-outer").addClass("ReebokGiftcard");
                                                        break;                                           
                         case "OL06 - Trip to Jon Jones.mp4" :$(".winning-outer").addClass("ReebokTrip");
                                                        break;  

                                  };
                    if (!(video_boxes[box_numbers[_prizeToLandOn[4 - (_turnsLeft + 1)]]] == "OL09 - Better Luck Next Time.mp4")) {
                        if (!(video_boxes[box_numbers[_prizeToLandOn[4 - (_turnsLeft + 1)]]] == "OL07 - Reebok Zpumps.mp4")) {
                            $("#gender").addClass('hideme');
                            $("#shoesize").addClass('hideme');
                        } else {

                            $(".state").removeClass('hideme');
                            $(".shoe-size").removeClass('hideme');
                        }
                        $(".winning-outer").removeClass("hideme");
                    } else {
                        $('.social-content').removeClass("hideme");
                        $('#nowhammyoccured').removeClass('onlyforbuttons');
                        $('#redeempercent').removeClass('hideme');
                        $("#redeemcode").removeClass('hideme');
                    }

                }

                $verify.click(function(event) {
                    event.preventDefault();
                    var email = document.getElementById("putemail").value;
					eee=email;
                    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (!re.test(email)) {
                        alert("Please enter a valid email");
                        document.getElementById("putemail").value = "";
                    } else {
                        var timestamp = Date.now();
                        document.getElementById("putemail").value = "";
                       
                        $.get(
                            'em.php', {
                                email: email,
                                time: timestamp,
								type: 'new'
                            },
                            function(returnedData)

                            { console.log(returnedData);
								aaa=returnedData['e'];
                                for (var x = 0; x < returnedData['e'].length; x++) {
                                    if (returnedData['e'][x] == 6)
                                        _prizeToLandOn.push(0);
                                    if (returnedData['e'][x] == 5) {
                                        var found = false;
                                        for (var xx = 0; xx < _prizeToLandOn.length; xx++)
                                            if (_prizeToLandOn[xx] == 1) {
                                                _prizeToLandOn.push(6);
                                                found = true;
                                            }
                                        if (!found)
                                            _prizeToLandOn.push(1);
                                    }
                                    if (returnedData['e'][x] == 7) {
                                        var found = false;
                                        for (var xx = 0; xx < _prizeToLandOn.length; xx++)
                                            if (_prizeToLandOn[xx] == 5) {
                                                _prizeToLandOn.push(8);
                                                found = true;
                                            }
                                        if (!found)
                                            _prizeToLandOn.push(5);
                                    }
                                    if (returnedData['e'][x] == 8) {
                                        var found = false;
                                        for (var xx = 0; xx < _prizeToLandOn.length; xx++)
                                            if (_prizeToLandOn[xx] == 4) {
                                                _prizeToLandOn.push(9);
                                                found = true;
                                            }
                                        if (!found)
                                            _prizeToLandOn.push(4);
                                    }
                                    if (returnedData['e'][x] == 9) {
                                        var found = false;
                                        for (var xx = 0; xx < _prizeToLandOn.length; xx++)
                                            if (_prizeToLandOn[xx] == 2) {
                                                _prizeToLandOn.push(11);
                                                found = true;
                                            }
                                        if (!found)
                                            _prizeToLandOn.push(2);
                                    }
                                    if (returnedData['e'][x] >= 1 && returnedData['e'][x] <= 4) {

                                        var found = false;
                                        for (var xx = 0; xx < _prizeToLandOn.length; xx++)
                                            if (_prizeToLandOn[xx] == 3) {
                                                _prizeToLandOn.push(7);

                                                video_boxes[box_numbers[7]] = pumpvideo[returnedData['e'][x] - 1];
                                                found = true;
                                            }


                                        if (!found) {
                                            _prizeToLandOn.push(3);
                                            video_boxes[box_numbers[3]] = pumpvideo[returnedData['e'][x] - 1];

                                        }
                                    }


                                }

                                if (returnedData['g'] == 'r') {
                                	_wcode=returnedData['wcode'];
                                	_code=returnedData['code'];
                                   $('.email-top').addClass("hideme");
                                    $(".welcome-detail").removeClass("hideme");
                                    $button.removeClass('hideme');
                                    Self.pushButtonToggle();
                                } else {

        							var popup = new $.Popup({closeContent:'<div class="popup_close_email">CLOSE</div>'});
									popup.open('#emailalreadyexists');
                                }
                            }, 'json'
                        );
                    }
                });
            },

            pushButtonToggle: function() {
                if (_started) {
                    Self.stop();
                } else {
                    Self.start();
                }
            },

            createGameBoard: function() {
                for (var i = 0; i < boxes; i++) {
                    if (active_boxes[i] != undefined) {
                        _board_list_items += "<li class='box box" + i + "'><img src='img/" + active_boxes[i] + "' alt='' title=''></li>";

                    } else {
                        _board_list_items += "<li class='box box" + i + "'><img src='img/grid_whammy.jpg' /></li>";
                    }
                }

                $gameboard.prepend(_board_list_items);
                Self.reset();
            },

            randomGamePiece: function() {
                return Math.floor(Object.getRandom(0, Object.size(active_boxes)));
            },


            clearBoard: function() {
                $('.box', $gameboard).removeClass('current');
            },

            reset: function() {
                Self.clearBoard();

                _turnsLeft = 4;
                _currentScore = 0;
                _whammyCount = 0;

                $prize.html("0").removeClass('red');
                $whammy.html(_whammyCount);
                $score.html(_currentScore);
                $turns.html(_turnsLeft);
            },

            stop: function() {
                _started = false;
                $button.removeClass('pushed');
                if (_turnsLeft) {
                    _turnsLeft -= 1;
                }

                $turns.html(_turnsLeft);

                clearInterval(_timeout);
                Self.clearBoard();
                $currentBox = $("#gameboard .box" + box_numbers[_prizeToLandOn[4 - (_turnsLeft + 1)]]);
                _previousCurrentBox.children(":first")[0].src = "img/" + _imagenumber;
                $currentBox.children(":first")[0].src = "img/hightlight_" + active_boxes[box_numbers[_prizeToLandOn[4 - (_turnsLeft + 1)]]];
                _previousCurrentBox = $currentBox;
                _imagenumber = active_boxes[_prizeToLandOn[4 - (_turnsLeft + 1)]];
                if (_turnsLeft == 3) {
                    _currentprize = 0;
                    $("#cinch").removeClass("hideme");

                    $('#cinch').find("video")[0].src = "img/" + video_boxes[box_numbers[_prizeToLandOn[4 - (_turnsLeft + 1)]]];
                    $("#playmyvideocinch")[0].play();
                    $button.addClass("hideme");

                }
                if (_turnsLeft == 2) {
                    _currentprize = 1;

                    $("#cinch").removeClass("hideme");
                    $('#cinch').find("video")[0].src = "img/" + video_boxes[box_numbers[_prizeToLandOn[4 - (_turnsLeft + 1)]]];
                    $("#playmyvideocinch")[0].play();
                    $button.addClass("hideme");


                }
            },
            start: function() {

                if (_turnsLeft) {
                    $button.addClass('pushed');
                    _started = true;
                    _timeout = setInterval(function() {
                        Self.clearBoard();
                        var random = Self.randomGamePiece();
                        _currentBox = box_numbers[random];
                        if (_previousCurrentBox) {
                            _previousCurrentBox.children(":first")[0].src = "img/" + _imagenumber;



                        }
                        $currentBox = $("#gameboard .box" + box_numbers[random]);

                        if (active_boxes[random]) {
                            _imagenumber = active_boxes[box_numbers[random]];
                            _previousCurrentBox = $currentBox;

                            $currentBox.children(":first")[0].src = "img/hightlight_" + active_boxes[box_numbers[random]];

                        }

                    }, 100);
                } else {
                    $prize.html("Must reset the bOard <br/> befOre starting new game.").addClass('red');
                }
            }
        }

        return Self.init();
    }

    pressYourLuck();



});