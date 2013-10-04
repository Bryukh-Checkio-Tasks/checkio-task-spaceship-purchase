//Dont change it
requirejs(['ext_editor_1', 'jquery_190', 'raphael_210'],
    function (ext, $, TableComponent) {

        var cur_slide = {};

        ext.set_start_game(function (this_e) {
        });

        ext.set_process_in(function (this_e, data) {
            cur_slide["in"] = data[0];
        });

        ext.set_process_out(function (this_e, data) {
            cur_slide["out"] = data[0];
        });

        ext.set_process_ext(function (this_e, data) {
            cur_slide.ext = data;
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_process_err(function (this_e, data) {
            cur_slide['error'] = data[0];
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_animate_success_slide(function (this_e, options) {
            var $h = $(this_e.setHtmlSlide('<div class="animation-success"><div></div></div>'));
            this_e.setAnimationHeight(115);
        });

        ext.set_animate_slide(function (this_e, data, options) {
            var $content = $(this_e.setHtmlSlide(ext.get_template('animation'))).find('.animation-content');
            if (!data) {
                console.log("data is undefined");
                return false;
            }

            var checkioInput = data.in;

            if (data.error) {
                $content.find('.call').html('Fail: checkio(' + JSON.stringify(checkioInput) + ')');
                $content.find('.output').html(data.error.replace(/\n/g, ","));

                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
                $content.find('.answer').remove();
                $content.find('.explanation').remove();
                this_e.setAnimationHeight($content.height() + 60);
                return false;
            }

            var rightResult = data.ext["answer"];
            var userResult = data.out;
            var result = data.ext["result"];
            var result_addon = data.ext["result_addon"];


            //if you need additional info from tests (if exists)
            var explanation = data.ext["explanation"];

            $content.find('.output').html('&nbsp;Your result:&nbsp;' + JSON.stringify(userResult));

            if (!result) {
                $content.find('.call').html('Fail: checkio(' + JSON.stringify(checkioInput) + ')');
                $content.find('.answer').html('Right result:&nbsp;' + JSON.stringify(rightResult));
                $content.find('.answer').addClass('error');
                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
            }
            else {
                $content.find('.call').html('Pass: checkio(' + JSON.stringify(checkioInput) + ')');
                $content.find('.answer').remove();
            }
            var $explanation = $content.find(".explanation");
            
            var newtd = function() {
                return $("<td>")
            };
            
            var $table = $explanation.find("table.price-process");
            var $toptr = (function() {
                var $tr = $("<tr>");
                $tr.append(newtd().html(checkioInput[1]));
                $tr.append(newtd().html(checkioInput[0]));
                $tr.append(newtd().html(checkioInput[2]));
                $tr.append(newtd().html(checkioInput[3]));
                return $tr;
            })();
            $table.append($toptr);
            
            //solve the task :)
            (function() {
                var addFinaltr = function(price) {
                    var $finaltr = $("<tr>");
                    $finaltr.append($("<td>").attr("colspan", 4));
                    $finaltr.find("td").html(price);
                    $finaltr.addClass("tr-final");
                    return $finaltr;
                };
                var $lasttd;
            
                var sofi = checkioInput[0];
                var oldman = checkioInput[2];
                var increase = checkioInput[1];
                var decrease = checkioInput[3];
                var finalPrice = 0;
                while (true){
                    sofi += increase;
                    var $pricetr = $("<tr>");
                    $table.append($pricetr);
                    $pricetr.append(newtd());
                    $lasttd = newtd().html(sofi);
                    $pricetr.append($lasttd);
                    if (sofi >= oldman) {
                        if (sofi > oldman){
                            $lasttd.addClass("useless-price");
                        }
                        $pricetr.append(newtd());
                        $pricetr.append(newtd());
                        finalPrice = oldman;
                        $table.append(addFinaltr(finalPrice));
                        break;
                    }
                    oldman -= decrease;
                    $lasttd = newtd().html(oldman);
                    $pricetr.append($lasttd);
                    if (sofi >= oldman) {
                        if (sofi > oldman){
                            $lasttd.addClass("useless-price");
                        }
                        $pricetr.append(newtd());
                        finalPrice = sofi;
                        $table.append(addFinaltr(finalPrice));
                        break;
                    }
                    $pricetr.append(newtd());
                }
            
            })();
            
            this_e.setAnimationHeight($content.height() + 60);

        });

        function isNumber(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }
        //TRYIT

        var $tryit;

        ext.set_console_process_ret(function(this_e, ret){
            $tryit.find(".checkio-result").html('Final price: '+ ret);
        });

        ext.set_generate_animation_panel(function(this_e){

            $tryit = $(this_e.setHtmlTryIt(ext.get_template('tryit'))).find(".tryit-content");
            var increase = 50;
            var decrease = 100;
            var sofi = 100;
            var oldman = 1000;

            var checkSetInput = function(invar, inputClass) {
                var $input = $tryit.find(inputClass);
                if (isNumber($input.val())) {
                    invar = parseInt($input.val());
                }
                $input.val(invar);
                return invar;
            }

            $tryit.find("form").submit(function(e){
                sofi = checkSetInput(sofi, ".input-sofi");
                oldman = checkSetInput(oldman, ".input-oldman");
                increase = checkSetInput(increase, ".input-increase");
                decrease = checkSetInput(decrease, ".input-decrease");
                this_e.sendToConsoleCheckiO([sofi, increase, oldman, decrease]);
                e.stopPropagation();
                return false;
            })
        });


    }
);
