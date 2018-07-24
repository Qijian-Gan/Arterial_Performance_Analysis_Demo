

const ID_TOKEN = window.sessionStorage["id_token"] || window.location.hash.substr(1).split('&')[0].split('=')[1];
window.sessionStorage["id_token"] = ID_TOKEN;
window.location.href = "#map";

document.getElementById('tab').style.zIndex = 5;
document.getElementById('mapid').style.zIndex = 6;
document.getElementById('tester').style.zIndex = 0;
document.getElementById('small_mapid').style.display = "none";
document.getElementById('small_mapid').style.zIndex = 0;

if (window.location.href == "https://test1-xiaxiling.c9users.io/tabs.html#map") {
    document.getElementById('tab').style.zIndex = 5;
    document.getElementById('mapid').style.zIndex = 6;
    document.getElementById('tester').style.zIndex = 0;
    document.getElementById('small_mapid').style.display = "none";
    document.getElementById('small_mapid').style.zIndex = 0;
}
if (window.location.href == "https://test1-xiaxiling.c9users.io/tabs.html#health") {
    document.getElementById('tab').style.zIndex = 6;
    document.getElementById('mapid').style.zIndex = 0;
    document.getElementById('small_mapid').style.zIndex = 7;
    document.getElementById('small_mapid').style.display = "block";
    document.getElementById('tester').style.zIndex = 7;
}


$(window).resize(function(){

    var map = document.getElementById('small_mapid');


    var map_div = document.getElementById('small_map');
    var map_div_position = map_div.getBoundingClientRect();
    var map_div_x = map_div_position.left + 5;
    var map_div_y = map_div_position.top + 5;
    var map_div_width = map_div_position.width - 10;
    var map_div_height = map_div_position.height - 10;

    map.style.position = "absolute";
    map.style.left = map_div_x + "px";
    map.style.top = map_div_y + "px";
    map.style.width = map_div_width + "px";
    map.style.height = map_div_height + "px";


    var surround_div = document.getElementById('surround');
    var surround_div_position = surround_div.getBoundingClientRect();
    var surround_div_left = surround_div_position.left - 30;
    var surround_div_right = surround_div_position.right - 30

    var perform_div = document.getElementById('performance-metric');
    var perform_div_position = perform_div.getBoundingClientRect();

});

function resize_div(div) {
    var map = document.getElementById('small_mapid');
    var map_position = map.getBoundingClientRect();
    var map_x = map_position.left;
    var map_y = map_position.top;

    var map_div = document.getElementById('small_map');
    var map_div_position = map_div.getBoundingClientRect();
    var map_div_x = map_div_position.left + 5;
    var map_div_y = map_div_position.top + 5;
    var map_div_width = map_div_position.width - 10;
    var map_div_height = map_div_position.height - 10;


    map.style.position = "absolute"
    map.style.left = map_div_x + "px"
    map.style.top = map_div_y + "px"
    map.style.width = map_div_width + "px"
    map.style.height = map_div_height + "px"


    var surround_div = document.getElementById('surround');
    var surround_div_position = surround_div.getBoundingClientRect();
    var surround_div_right = surround_div_position.right - 30
    var surround_div_top = surround_div_position.top
    var surround_div_left = surround_div_position.left

    var perform_div = document.getElementById('performance-metric');
    var perform_div_position = perform_div.getBoundingClientRect();
    var perform_div_right = perform_div_position.right - 30
    var perform_div_top = perform_div_position.top
    var perform_div_left = perform_div_position.left


}



var mapshow = document.getElementById("mapid");
var healthshow = document.getElementById("tab");

var generate = document.getElementById("generate");


var boxed = document.getElementById("box");

var maptab = document.getElementById("maptab");
var healthtab = document.getElementById("healthtab");

var dropper = document.getElementById("dropdown");
var dropping = document.getElementById("drop");


var ploty = document.getElementById("tester");
var smallerone = document.getElementById("small_mapid");

var TabEnum = {
    MAP: 0,
    HEALTH: 1
}

current_tab = TabEnum.MAP

maptab.addEventListener("click", function(e) {
    current_tab = TabEnum.MAP

    mapshow.style.zIndex = 6;
    healthshow.style.zIndex = 5;
    boxed.style.zIndex = 5;
    ploty.style.zIndex = 5;
    mapshow.style.display = "block";
    smallerone.style.display = "none";
    ploty.style.display = "none"
}, false);

healthtab.addEventListener("click", function(e) {
    current_tab = TabEnum.HEALTH

    healthshow.style.zIndex = 6;
    mapshow.style.zIndex = 1;
    boxed.style.zIndex = 7;
    smallerone.style.zIndex = 8;
    mapshow.style.display = "none";
    smallerone.style.display = "block";
    ploty.style.display = "block";
    if (selected.length > 0) {
      // callAWSLambda();
    }

    resize_div(document.getElementById('small_mapid'))
}, false);

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
console.log(dd)

window.s = [2017, 1, 1];
window.ending = [yyyy, mm, dd];

var metric = document.getElementById("performance-metric");


metric.addEventListener("click", function(e) {
    if (selected.length > 0) {
        star = cur_dates[0].split(' ')
        en = cur_dates[1].split(' ')

        for (var i = 0; i < star.length; i++) {
            star[i] = parseInt(star[i])
            en[i] = parseInt(en[i])
        }


        s = star
        ending = en
        //callAWSLambda()

    }
}, false)

var loadit = document.getElementById("load")


loadit.addEventListener("click", function(e) {
    $('#load').css('border-color', '#333 !important')
    callAWSLambda()
}, false)


var surround = document.getElementById("surround");
var filt = document.getElementById("filter");
var smally = document.getElementById("small_map");

var text = document.getElementById("drop");

var slider_start = document.getElementById("slider-start-date");
var slider_end = document.getElementById("slider-end-date");
var range_text = document.getElementById("range-text");
var slider = document.getElementById("slider-range");

var start = document.getElementById("start-date");

var perf = document.getElementById("perform");
var metric = document.getElementById("performance-metric");

var plot = document.getElementById("plot");
var bar = document.getElementById("bar");
var table = document.getElementById("table");
var download = document.getElementById("download_csv")

var plottext = document.getElementById("plot2");
var bartext = document.getElementById("bar2");
var tabletext = document.getElementById("table2");

var loadit = document.getElementById("load")
start.style.display = "none";

function myfunc(div) {
    if (surround.className == "surrounding") {
        text.innerHTML = "SHOW";
        surround.className = "hideit";
        filt.className = "hideit";
        smally.className = "hideit";
        smallerone.style.height = 0;
        ploty.style.zIndex = 8;
        slider.style.display = "none";
        slider_start.style.display = "none";
        slider_end.style.display = "none";
        range_text.style.display = "none";

        start.style.display = "none";
        perf.className = "hideit";
        plot.className = "hideit";
        bar.className = "hideit";
        table.className = "hideit";
        generate.className = "hideit";
        download.className = "hideit";
        metric.style.display = "none";
        loadit.className = "hideit";

        plottext.style.visibility = "hidden";
        bartext.style.display = "none";
        tabletext.style.display = "none";

    }
    else {
        text.innerHTML = "HIDE";
        surround.className = "surrounding";
        filt.className = "filter";
        smally.className = "small_map";
        ploty.style.zIndex = 7;
        smallerone.style.zIndex = 8;
        smallerone.style.height = "32vh";
        slider.style.display = "block";
        slider_start.style.display = "inline";
        slider_end.style.display = "inline";
        range_text.style.display = "inline";

        //start.style.display = "inline";
        perf.className = "dropdown";
        plot.className = "checkbox";
        bar.className = "checkbox";
        table.className = "checkbox";
        generate.className = "gradient";
        download.className = "gradient";
        metric.style.display = "inline";
        loadit.className = "gradient";

        plottext.style.visibility = "visible";
        bartext.style.display = "block";
        tabletext.style.display = "inline";

    }

}


// time slider
var dt_from = "2017/01/01";
//var dt_to = "2017/09/09";

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd = '0'+dd
}

if(mm<10) {
    mm = '0'+mm
}

var dt_to = mm + '/' + dd + '/' + yyyy;

$('.slider-time').html(dt_from);
$('.slider-time2').html(dt_to);
var min_val = Date.parse(dt_from) / 1000;
var max_val = Date.parse(dt_to) / 1000;


function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
}

function formatDT(__dt) {
    date_array = [];
    var year = __dt.getFullYear();
    var month = zeroPad(__dt.getMonth() + 1, 2);
    var date = zeroPad(__dt.getDate(), 2);
    date_array[0] = year;
    date_array[1] = month;
    date_array[2] = date;
    return date_array;
};

$("#slider-range").slider({
    range: true,
    min: min_val,
    max: max_val,
    step: 10,
    values: [min_val, max_val],
    slide: function(e, ui) {
        dt_cur_from = new Date(ui.values[0] * 1000); //.format("yyyy-mm-dd hh:ii:ss");
        start_array = formatDT(dt_cur_from);
        $('.slider-time').html(start_array[0] + " " + start_array[1] + " " + start_array[2]);

        dt_cur_to = new Date(ui.values[1] * 1000); //.format("yyyy-mm-dd hh:ii:ss");
        end_array = formatDT(dt_cur_to);
        $('.slider-time2').html(end_array[0] + " " + end_array[1] + " " + end_array[2]);

    }
});
// date picker

var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    today = new Date(),
    // default targetDate is christmas
    targetDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

setDate(targetDate);
setYears(3) // set past 3 years in dropdown

$("#select-month").change(function() {
    var monthIndex = $("#select-month").val();
    setDays(monthIndex);
});

function setDate(date) {
    setDays(date.getMonth());
    $("#select-day").val(date.getDate());
    $("#select-month").val(date.getMonth());
    $("#select-year").val(date.getFullYear());
}

// make sure the number of days correspond with the selected month
function setDays(monthIndex) {
    var optionCount = $('#select-day option').length,
        daysCount = daysInMonth[monthIndex];

    if (optionCount < daysCount) {
        for (var i = optionCount; i < daysCount; i++) {
            $('#select-day')
                .append($("<option></option>")
                    .attr("value", i + 1)
                    .text(i + 1));
        }
    }
    else {
        for (var i = daysCount; i < optionCount; i++) {
            var optionItem = '#select-day option[value=' + (i + 1) + ']';
            $(optionItem).remove();
        }
    }
}

function setYears(val) {
    var year = today.getFullYear();
    for (var i = 0; i < val; i++) {
        $('#select-year')
            .append($("<option></option>")
                .attr("value", year - i)
                .text(year - i));
    }
}


//---------------------------------------------

var download = document.getElementById("download_csv");
var test2 = document.getElementById('tester');

function callAWSLambda() {
    $.ajax({
        type: "POST",
        url: "https://ub65x2ch8a.execute-api.us-west-2.amazonaws.com/dev/arterial-health-website-request",
        dataType: "json",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', ID_TOKEN)
		},
        crossDomain: true,
        data: JSON.stringify({"intersections": selected, "start": s, "end": ending}),
        success: function(data) {
            loadMetrics(data)
        },
        error: function(e) {
            test2.innerText = "no data"
            test2.color = 'white'
            console.log('here is an error')
            console.log("the value of start is")
            console.log(s)
            console.log("the value of end is ")
            console.log(ending)
            console.log(typeof(ending[1]))
        }
     });
}



var mean_missing_rate = [];
var min_missing_rate = [];
var max_missing_rate = [];
var num_good_missing_rate = [];

var mean_max_zero = [];
var min_max_zero = [];
var max_max_zero = [];
var num_good_max_zero;

var mean_inconsistent_rate = [];
var min_inconsistent_rate = [];
var max_inconsistent_rate = [];
var num_good_inconsistent_rate = [];

var mean_high_value = [];
var min_high_value = [];
var max_high_value = [];
var num_good_high_value = [];

var num_good_health = [];

var num_good_constant = [];

var total_detectors = 0;


var date_range = [];

var start_date = "";

var days_prod = [];
var days_stab = [];
var days_selected = [];

var detector_count = [];

var yr = [];
var mon = [];
var tot_days = [];
var theday =[];

//Adds all intersections to map and to intersection array
function loadMetrics(data) {
    console.log(data)
    total_detectors = data["count"]

    mean_missing_rate = data['mean_MissingRate(%)']
    min_missing_rate = data['min_MissingRate(%)']
    max_missing_rate = data['max_MissingRate(%)']
    num_good_missing_rate = data['#good_MissingRate']

    mean_max_zero = data['mean_MaxZeroValues(hr)']
    min_max_zero = data['min_MaxZeroValues(hr)']
    max_max_zero = data['max_MaxZeroValues(hr)']
    num_good_max_zero = data['#good_MaxZero']

    mean_inconsistent_rate = data['mean_InconsisRateWithoutSpeed(%)']
    min_inconsistent_rate = data['min_InconsisRateWithoutSpeed(%)']
    max_inconsistent_rate = data['max_InconsisRateWithoutSpeed(%)']
    num_good_inconsistent_rate = data['#good_InconsistentRate']

    mean_high_value = data['mean_HighValueRate(%)']
    min_high_value = data['min_HighValueRate(%)']
    max_high_value = data['max_HighValueRate(%)']
    num_good_high_value = data['#good_HighValue']

    num_good_health = data['#Health(1/0)']

    num_good_constant = []
    num_good_constant = data['#ConstantOrNot(1/0)']

    days_prod = data['productivity']
    days_stab = data['stability']
    days_selected = data['system_x']

    detector_count = data['count']

    yr = data['Year']
    mon = data['Month']
    tot_days = data['days']
    theday = data['Day']

    for (var i = 0; i < data['Year'].length; i++) {
        date_range[i] = parseInt(data['Year'][i], 10) + " " + parseInt(data['Month'][i], 10) + " " + parseInt(data['Day'][i], 10);
    }
}



//-------------------------------------------------------------

window.cur_dates = [];

function get_date() {
    window.cur_dates[0] = $(".slider-time").text();
    window.cur_dates[1] = $(".slider-time2").text();
    return cur_dates;
}





var plot = document.getElementById("plot");
var bar = document.getElementById("bar");
var test1 = document.getElementById('tester');

var table_clicked = false;

var mean_line = {};
var min_line = {};
var max_line = {};
var num_good_line = {};

var miss_rate_ngl = {};
var max_zero_ngl = {};
var const_ngl = {};
var inconst_ngl = {};
var high_val_ngl = {};
var health_ngl = {};

function make_mean(xcoord, ycoord, lab, graph_type) {
    mean_line = {
        x: xcoord,
        y: ycoord,
        type: graph_type,
        name: lab,
        mode: 'lines+markers'
    };
}

function make_min(xcoord, ycoord, lab, graph_type) {
    min_line = {
        x: xcoord,
        y: ycoord,
        type: graph_type,
        name: lab,
        mode: 'lines+markers'
    };
}

function make_max(xcoord, ycoord, lab, graph_type) {
    max_line = {
        x: xcoord,
        y: ycoord,
        type: graph_type,
        name: lab,
        mode: 'lines+markers'
    };
}

function make_num_good(xcoord, ycoord, lab, graph_type) {
    num_good_line = {
        x: xcoord,
        y: ycoord,
        type: graph_type,
        name: lab,
        mode: 'lines+markers'
    };
}

function make_num_good_each(xcoord, ycoord, lab, graph_type, each_line) {

    if (each_line == "miss_rate") {
        miss_rate_ngl = {
            x: xcoord,
            y: ycoord,
            type: graph_type,
            name: lab,
            mode: 'lines+markers'
        };
    } else if (each_line == "max_zero") {
        max_zero_ngl = {
            x: xcoord,
            y: ycoord,
            type: graph_type,
            name: lab,
            mode: 'lines+markers'
        };
    } else if (each_line == "const") {
        const_ngl = {
            x: xcoord,
            y: ycoord,
            type: graph_type,
            name: lab,
            mode: 'lines+markers'
        };
    } else if (each_line == "inconst") {
        inconst_ngl = {
            x: xcoord,
            y: ycoord,
            type: graph_type,
            name: lab,
            mode: 'lines+markers'
        };
    } else if (each_line == "high_val") {
        high_val_ngl = {
            x: xcoord,
            y: ycoord,
            type: graph_type,
            name: lab,
            mode: 'lines+markers'
        };
    } else if (each_line == "health") {
        health_ngl = {
            x: xcoord,
            y: ycoord,
            type: graph_type,
            name: lab,
            mode: 'lines+markers'
        };
    }

}

function get_xy_coord(range, metric_mean, metric_min, metric_max, metric_num_good) {

    // user selected start date
    var user_start_date = range[0].split(" ");
    var user_start_y = user_start_date[0];
    var user_start_m = user_start_date[1];
    var user_start_d = user_start_date[2];

    // user selected end date
    var user_end_date = range[1].split(" ");
    var user_end_y = user_end_date[0];
    var user_end_m = user_end_date[1];
    var user_end_d = user_end_date[2];

    var index_coord = 0;

    for (i = 0; i < date_range.length; i++) {
        // dates within csv file
        var range = date_range[i];
        range = range.split(" ");
        var range_y = range[0];
        var range_m = range[1];
        var range_d = range[2];


        var from = new Date(user_start_y, parseInt(user_start_m) - 1, user_start_d); // -1 because months are from 0 to 11
        var to = new Date(user_end_y, parseInt(user_end_m) - 1, user_end_d);
        var check = new Date(range_y, parseInt(range_m) - 1, range_d);

        if (check >= from && check <= to) {
            x_coord[index_coord] = range_y + "-" + range_m + "-" + range_d;
            y_coord_mean[index_coord] = metric_mean[i];
            y_coord_min[index_coord] = metric_min[i];
            y_coord_max[index_coord] = metric_max[i];
            y_coord_num_good[index_coord] = metric_num_good[i];
            index_coord++;
        }

    }
}

function get_xy_coord_numgood(range, metric_num_good, fill_vector) {

    // user selected start date
    var user_start_date = range[0].split(" ");
    var user_start_y = user_start_date[0];
    var user_start_m = user_start_date[1];
    var user_start_d = user_start_date[2];

    // user selected end date
    var user_end_date = range[1].split(" ");
    var user_end_y = user_end_date[0];
    var user_end_m = user_end_date[1];
    var user_end_d = user_end_date[2];

    var index_coord = 0;

    for (i = 0; i < date_range.length; i++) {
        // dates within csv file
        var range = date_range[i];
        range = range.split(" ");
        var range_y = range[0];
        var range_m = range[1];
        var range_d = range[2];


        var from = new Date(user_start_y, parseInt(user_start_m) - 1, user_start_d); // -1 because months are from 0 to 11
        var to = new Date(user_end_y, parseInt(user_end_m) - 1, user_end_d);
        var check = new Date(range_y, parseInt(range_m) - 1, range_d);

        if (check >= from && check <= to) {
            x_coord[index_coord] = range_y + "-" + range_m + "-" + range_d;


            if (fill_vector == "miss_rate") {
                miss_rate_num_good[index_coord] = metric_num_good[i] * 100;
            } else if (fill_vector == "max_zero") {
                max_zero_num_good[index_coord] = metric_num_good[i] * 100;
            } else if (fill_vector == "const") {
                const_num_good[index_coord] = (1-metric_num_good[i]) * 100;
            } else if (fill_vector == "inconst") {
                inconst_num_good[index_coord] = metric_num_good[i] * 100;
            } else if (fill_vector == "high_val") {
                high_val_num_good[index_coord] = metric_num_good[i] * 100;
            } else if (fill_vector == "health") {
                health_num_good[index_coord] = metric_num_good[i] * 100;
            } else if (fill_vector == "constant_metric") {
                y_coord_num_good[index_coord] = metric_num_good[i] * 100;
            } else if (fill_vector == "health_metric") {
                y_coord_num_good[index_coord] = metric_num_good[i] * 100;
            }

            index_coord++;
        }

    }
}

var layout = {};
window.tableclick = 0
function makegraph() {
    // get user selected radio button ie. plot, bar, table
    var clicked_graph = document.querySelector('input[name = "f"]:checked').value;
    var graph_type;
    if (clicked_graph == "p") {
        graph_type = "scatter";
    }
    else if (clicked_graph == "b") {
        graph_type = "bar";
    }
    else if (clicked_graph == "t") {
        if (tableclick != 0) {
            $("#tester").tabulator("redraw", true);

        }
        graph_type = "table"
        Plotly.purge(test1)
        maketable();
        tableclick = tableclick + 1

        return;
    }
    else {

    }

    // get user selected performance metric function
    var e = document.getElementById("performance-metric");
    var cur_metric = e.options[e.selectedIndex].value;

    x_coord = [];
    y_coord_mean = [];
    y_coord_min = [];
    y_coord_max = [];
    y_coord_num_good = [];

    miss_rate_num_good = [];
    max_zero_num_good = [];
    const_num_good = [];
    inconst_num_good = [];
    high_val_num_good = [];
    health_num_good = [];

    if (cur_metric == "missing-rate") {

        get_xy_coord(cur_dates, mean_missing_rate, min_missing_rate, max_missing_rate, num_good_missing_rate);

        makeLayout("Plot of Missing Rate over Time", "Missing Rate (%)", "Time", [0,100]);

        make_mean(x_coord, y_coord_mean, "Mean Missing Rate", graph_type);
        make_min(x_coord, y_coord_min, "Min Missing Rate", graph_type);
        make_max(x_coord, y_coord_max, "Max Missing Rate", graph_type);
        make_num_good(x_coord, y_coord_num_good, "Number of Good Detectors", graph_type);

    }
    else if (cur_metric == "zero") {
        get_xy_coord(cur_dates, mean_max_zero, min_max_zero, max_max_zero, num_good_max_zero);

        makeLayout("Plot of Maximum Zero Values over Time", "Max Zero Value (Hrs)", "Time", [0,24]);

        make_mean(x_coord, y_coord_mean, "Mean Max Zero Value", graph_type);
        make_min(x_coord, y_coord_min, "Min Max Zero Value", graph_type);
        make_max(x_coord, y_coord_max, "Max Max Zero Value", graph_type);
        make_num_good(x_coord, y_coord_num_good, "Number of Good Detectors", graph_type);

    }
    else if (cur_metric == "const") {
        get_xy_coord_numgood(cur_dates, num_good_constant, "constant_metric");

        makeLayout("Plot of Constant over Time", "Constant or Not (%)", "Time", [0,100]);


        make_num_good(x_coord, y_coord_num_good, "Number of Good Detectors", graph_type);
    }
    else if (cur_metric == "inconst") {

        get_xy_coord(cur_dates, mean_inconsistent_rate, min_inconsistent_rate, max_inconsistent_rate, num_good_inconsistent_rate);

        makeLayout("Inconsistent Rate by Day", "Inconsistent Rate (%)", "Time", [0,100]);

        make_mean(x_coord, y_coord_mean, "Mean Inconsistent Rate", graph_type);
        make_min(x_coord, y_coord_min, "Min Inconsistent Rate", graph_type);
        make_max(x_coord, y_coord_max, "Max Inconsistent Rate", graph_type);
        make_num_good(x_coord, y_coord_num_good, "Number of Good Detectors", graph_type);


    }
    else if (cur_metric == "high") {

        get_xy_coord(cur_dates, mean_high_value, min_high_value, max_high_value, num_good_high_value);

        makeLayout("High Value Rate by Day", "High Value Rate (%)", "Time", [0,100]);


        make_mean(x_coord, y_coord_mean, "Mean High Value Rate", graph_type);
        make_min(x_coord, y_coord_min, "Min High Value Rate", graph_type);
        make_max(x_coord, y_coord_max, "Max High Value Rate", graph_type);
        make_num_good(x_coord, y_coord_num_good, "Number of Good Detectors", graph_type);
    }
    else if (cur_metric == "health") {

        get_xy_coord_numgood(cur_dates, num_good_health, "health_metric");

        makeLayout("Percentage of Detectors with Good Health", "Health (%)", "Time", [0,100]);

        make_num_good(x_coord, y_coord_num_good, "Number of Good Detectors", graph_type);
    } else if (cur_metric == "num_good") {

        get_xy_coord_numgood(cur_dates, num_good_missing_rate, "miss_rate");
        get_xy_coord_numgood(cur_dates, num_good_max_zero, "max_zero");
        get_xy_coord_numgood(cur_dates, num_good_constant, "const");
        get_xy_coord_numgood(cur_dates, num_good_inconsistent_rate, "inconst");
        get_xy_coord_numgood(cur_dates, num_good_high_value, "high_val");
        get_xy_coord_numgood(cur_dates, num_good_health, "health");

        console.log(miss_rate_num_good);
        makeLayout("Percentage of Detectors in Accceptable Thresholds for Metric", "Good Detectors (%)", "Time", [0,100]);

        make_num_good_each(x_coord, miss_rate_num_good, "Missing Rate", graph_type, "miss_rate");
        make_num_good_each(x_coord, max_zero_num_good, "Max Zero Value", graph_type, "max_zero");
        make_num_good_each(x_coord, const_num_good, "Constant or Not", graph_type, "const");
        make_num_good_each(x_coord, inconst_num_good, "Inconsistent Rate", graph_type, "inconst");
        make_num_good_each(x_coord, high_val_num_good, "High Value Rate", graph_type, "high_val");
        make_num_good_each(x_coord, health_num_good, "Overall Health", graph_type, "health");

        console.log(miss_rate_ngl)

    } else if (cur_metric == "prod") {


        y_coord = []
        x_coord = []

        for ( var i = 0 ; i < days_selected.length ; i ++ ) {
            y_coord[i] = days_prod[i] * 100

        }

        for ( var i = 0 ; i < days_selected.length ; i ++ ) {
            x_coord[i] = days_selected[i] * 100

        }

        xData=x_coord
        yData=y_coord

        line1 = {
            x: xData,
            y: yData,
            type: graph_type,
            name: 'Total Productivity [Aug 11, 2017 - Sep 2, 2017]',
            mode: 'lines+markers'
        }


        layout = {
        title: 'Productivity of Detectors',
        yaxis: { title: 'Percentage of Working Detectors',
                range: [0, 100]},
        xaxis: {
            title: 'Percentage of Working Days',
            //autorange: true,
            //range: ["2017-08-10", "2017-09-03"],
            range: [0, 100]
        },
        /* margin: {                           // update the left, bottom, right, top margin
           l: 40, b: 10, r: 10, t: 20
         }dfasdf*/
    }





        //detectorLayout(xData, yData, 'Productivity of Detectors', 'Percentage of Working Days', 'Fraction (%) of Detectors')
        var data = [line1]
        console.log(data)

    } else if (cur_metric == "stab") {


        y_coord = []
        x_coord = []

        for ( var i = 0 ; i < days_selected.length ; i ++ ) {
            y_coord[i] = days_stab[i] * 100

        }

        for ( var i = 0 ; i < days_selected.length ; i ++ ) {
            x_coord[i] = days_selected[i] * 100

        }

        xData = x_coord
        yData=y_coord

        line1 = {
            x: xData,
            y: yData,
            type: graph_type,
            name: 'Total Stability [Aug 11, 2017 - Sep 2, 2017]',
            mode: 'lines+markers'
        }


        layout = {
        title: 'Stability of Detectors',
        yaxis: { title: 'Percentage of Unstable Detectors',
                range: [0, 100]},
        xaxis: {
            title: 'Percentage of Selected Days',
            //autorange: true,
           // range: ["2017-08-10", "2017-09-03"],
            range: [0, 100]
        },
        /* margin: {                           // update the left, bottom, right, top margin
           l: 40, b: 10, r: 10, t: 20
         }*/
    }


        //detectorLayout(xData, yData, 'Productivity of Detectors', 'Percentage of Working Days', 'Fraction (%) of Detectors')
        var data = [line1]

    } /*else if (cur_metric == "stat") {
        x_coord = [];
        y_coord = [];
        for ( var i = 0 ; i < days_selected.length ; i ++ ) {
            x_coord[i] = parseInt(yr[i], 10) + "-" + parseInt(mon[i], 10) + "-" + parseInt(days_selected[i], 10)
        }


        xData=x_coord

        for ( var i = 0 ; i < days_selected.length ; i ++ ) {
            if (i >= days_stab.length) {
                y_coord[i] = 0
            } else {
                y_coord[i] = parseInt(days_stab[i], 10)
            }
        }

        yData= y_coord

        line1 = {
            x: xData,
            y: yData,
            type: graph_type,
            name: 'Status [Aug 11, 2017 - Sep 2, 2017]',
            mode: 'lines+markers'
        }


        layout = {
        title: 'Status of Detectors',
        yaxis: { title: 'Days Working',
                range: [0, days_selected.length]},
        xaxis: {
            title: 'Selected Days',
            //autorange: true,
            range: ["2017-08-10", "2017-09-03"],
            rangeselector: {
                buttons: [{
                        count: 1,
                        label: 'last month',
                        step: 'month',
                        stepmode: 'forward'
                    },
                    {
                        count: 6,
                        label: 'last 6 months',
                        step: 'month',
                        stepmode: 'forward'
                    },
                    { step: 'all' }
                ]
            },
            type: 'date'
        },
         margin: {                           // update the left, bottom, right, top margin
           l: 40, b: 10, r: 10, t: 20
         }
    }


        //detectorLayout(xData, yData, 'Productivity of Detectors', 'Percentage of Working Days', 'Fraction (%) of Detectors')
        var data = [line1]
        console.log(line1)

    } */

    if (cur_metric == "health" | cur_metric == "const") {
        var data = [num_good_line];
    } else if (cur_metric == "num_good") {
        var data = [miss_rate_ngl, max_zero_ngl, const_ngl, inconst_ngl, high_val_ngl, health_ngl];
    } else if (cur_metric == "prod" | cur_metric == 'stab') {
        console.log(data)
    } else {
        var data = [mean_line, min_line, max_line];
    }

    //Plotly.newPlot(test1, data, layout);
    isPlotlyDone = false;

    if (test2.innerText == "no data") {

    } else {
        Plotly.newPlot(test1, data, layout).then(function() {
            isPlotlyDone = true;
        });
    }

    if (isPlotlyDone == true) {
        $(".loader").fadeOut("slow");

    }

    /*
    function plotPlotHandler() {
    }

    // option 1
    Plotly.plot(graphDiv, data, layout, config).then(postPlotHandler);
    console.log(isPlotlyDone);
    if (isPlotlyDone == true) {
      console.log("done");
    }*/
}

function makeLayout(metric_title, metric_yaxis, metric_xaxis, rang) {
    layout = {
        title: metric_title,
        yaxis: { title: metric_yaxis,
                range: rang},
        xaxis: {
            title: metric_xaxis,
            //autorange: true,
            //range: ["2015-01-04", "2017-09-09"],
            rangeselector: {
                buttons: [{
                        count: 1,
                        label: 'last month',
                        step: 'month',
                        stepmode: 'forward'
                    },
                    {
                        count: 6,
                        label: 'last 6 months',
                        step: 'month',
                        stepmode: 'forward'
                    },
                    { step: 'all' }
                ]
            },
            type: 'date'
        },
        /* margin: {                           // update the left, bottom, right, top margin
           l: 40, b: 10, r: 10, t: 20
         }*/
    };

}



function detectorLayout(xData, yData, the_label, xax, yax) {
    var colors = ['rgba(67,67,67,1)', 'rgba(115,115,115,1)', 'rgba(49,130,189, 1)', 'rgba(189,189,189,1)'];

    var lineSize = [2, 2, 4, 2];

    var labels = ['Total Productivity [Jan 1, 2018 - Feb 2, 2018]',
                'Total Productivity [Oct 1, 2017 - Dec 2, 2017]',
                'Total Productivity [Mar 1, 2016 - May 2, 2016]',
                'Total Productivity [Aug 1, 2017 - Sep 2, 2017]'];

    layout = {
        xaxis: {
            title: xax,
            range: [0, 100]
        },
        yaxis: {
            title: yax,
            range: [0, 100]
        },
        legend: {
            x: .05,
            y: .95,
            traceorder: 'normal',
            font: {
              family: 'sans-serif',
              size: 12,
              color: '#000'
            },
            bgcolor: '#E2E2E2',
            bordercolor: '#FFFFFF',
            borderwidth: 2
        },
        annotations: [
            {
              xref: 'paper',
              yref: 'paper',
              x: 0.0,
              y: 1.05,
              xanchor: 'left',
              yanchor: 'bottom',
              text: the_label,
              font:{
                family: 'Arial',
                size: 30,
                color: 'rgb(37,37,37)'
              },
              showarrow: false
            },
            {
                xref: 'paper',
                yref: 'paper',
                x: 0.5,
                y: -0.1,
                xanchor: 'center',
                yanchor: 'top',
                showarrow: false,
                font: {
                    family: 'Arial',
                    size: 12,
                    color: 'rgb(150,150,150)'
                }
            }
        ]
    };

    for ( var i = 0 ; i < xData.length ; i ++ ) {
      var result = {
        xref: 'paper',
        x: 0.05,
        y: yData[i][0],
        xanchor: 'right',
        yanchor: 'middle',
        text: yData[i][0] +'%',
        showarrow: false,
        font: {
          family: 'Arial',
          size: 16,
          color: 'black'
        }
      };
      var result2 = {
        xref: 'paper',
        x: 0.95,
        y: yData[i][9],
        xanchor: 'left',
        yanchor: 'middle',
        text: yData[i][9] +'%',
        font: {
          family: 'Arial',
          size: 16,
          color: 'black'
        },
        showarrow: false
      };

      layout.annotations.push(result, result2);
    }
}




function maketable() {
    if (tableclick != 0) {
        $("#tester").tabulator("redraw", true);
    }
    
    if (tableclick == 0) {
        $("#tester").tabulator({
            height:205, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
            layout:"fitColumns", //fit columns to width of table (optional)
            columns:[ //Define Table Columns
                {title:"Date", field:"date", width:80, frozen:true},
                {//create column group
                    title:"Missing Rate",
                    columns:[
                        {title:"Mean Missing Rate", field:"mean missing", align:"left", sorter:"number", width:80},
                        {title:"Min Missing Rate", field:"min missing", align:"left", width:80},
                        {title:"Max Missing Rate", field:"max missing", align:"left", width:80},
                    ],
                },
                {//create column group
                    title:"Max Zero Value",
                    columns:[
                        {title:"Mean Max Zero Value", field:"mean zero", align:"left", sorter:"number", width:80},
                        {title:"Min Max Zero Value", field:"min zero", align:"left", width:80},
                        {title:"Max Max Zero Value", field:"max zero", align:"left", width:80},
                    ],
                },
                {title: "Constant or Not", field:"const", width:80},
                {//create column group
                    title:"Inconsistent Rate",
                    columns:[
                        {title:"Mean Inconsistent Rate", field:"mean incon", align:"left", sorter:"number", width:80},
                        {title:"Min Inconsistent Rate", field:"min incon", align:"left", width:80},
                        {title:"Max Inconsistent Rate", field:"max incon", align:"left", width:80},
                    ],
                },
                {title: "Constant or Not", field:"const", width:80},
                {//create column group
                    title:"High Value Rate",
                    columns:[
                        {title:"Mean High Value Rate", field:"mean high", align:"left", sorter:"number", width:80},
                        {title:"Min High Value Rate", field:"min high", align:"left", width:80},
                        {title:"Max High Value Rate", field:"max high", align:"left", width:80},
                    ],
                },
                {title: "Health", field:"health", width:80},
                {//create column group
                    title:"Detector Level Metrics",
                    columns:[
                        {title:"Detector Count", field:"det count", align:"left", sorter:"number", width:40},
                        {title:"Productivity", field:"prod", align:"left", width:80},
                        {title:"Stability", field:"stab", align:"left", width:80},
                    ],
                }
                
                ],
            
        });
    }
    
    dat_data = []
    for (i = 0; i < mean_missing_rate.length; i++) {
        the_dict = {}
        the_dict['id'] = i+1
        the_dict['date'] = parseInt(mon[i]) + "/" + parseInt(theday[i]) + "/" + parseInt(yr[i])
        
        if (i == 0) {
            the_dict['det count'] = detector_count
        } else {
            the_dict['det count'] = ""
        }
        
        if (i + 1 == days_prod.length) {
            the_dict['prod'] = ""
            the_dict['stab'] = ""
        } else {
            the_dict['prod'] = days_prod[i]
            the_dict['stab'] = days_stab[i]
            
        }
        
        the_dict['mean missing'] = mean_missing_rate[i]
        the_dict['min missing'] = min_missing_rate[i]
        the_dict['max missing'] = max_missing_rate[i]
        
        the_dict['mean zero'] = mean_max_zero[i]
        the_dict['min zero'] = min_max_zero[i]
        the_dict['max zero'] = max_max_zero[i]
        
        the_dict['const'] = num_good_constant[i]
        
        the_dict['mean incon'] = mean_inconsistent_rate[i]
        the_dict['min incon'] = min_inconsistent_rate[i]
        the_dict['max incon'] = max_inconsistent_rate[i]
        
        the_dict['mean high'] = mean_high_value[i]
        the_dict['min high'] = min_high_value[i]
        the_dict['max high'] = max_high_value[i]
        
        the_dict['health'] = num_good_health[i]
        
        dat_data[i] = the_dict
        
    }
    
    
    
    var tabledata = dat_data
    
    /*[
    {id:1, inters:"Oli Bob", age:"12", col:"red", dob:""},
    {id:2, inters:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
    {id:3, inters:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
    {id:4, inters:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
    {id:5, inters:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
];*/



//load sample data into the table
$("#tester").tabulator("setData", tabledata);

$("#tester").tabulator("redraw", true);


//trigger download of data.csv file
$("#download_csv").click(function(){
    $("#tester").tabulator("download", "csv", "IntersectionMetrics.csv");
});

//trigger download of data.json file
$("#download-json").click(function(){
    $("#tester").tabulator("download", "json", "data.json");
});

//trigger download of data.xlsx file
$("#download-xlsx").click(function(){
    $("#tester").tabulator("download", "xlsx", "data.xlsx", {sheetName:"My Data"});
});

//trigger download of data.pdf file
$("#download-pdf").click(function(){
    $("#tester").tabulator("download", "pdf", "data.pdf", {
        orientation:"portrait", //set page orientation to portrait
        title:"Example Report", //add title to report
    });
});
    
    
    /*
    Plotly.d3.csv("/arterial-health/frontend/IntersectionDirectory.csv", function(err, rows){

  function unpack(rows, key) {
    return rows.map(function(row) { return row[key]; });
  }

  var headerNames = Plotly.d3.keys(rows[0]);

  var headerValues = [];
  var cellValues = [];
  for (i = 0; i < headerNames.length; i++) {
    headerValue = [headerNames[i]];
    headerValues[i] = headerValue;
    cellValue = unpack(rows, headerNames[i]);
    cellValues[i] = cellValue;
  }



    var data = [{
      type: 'table',
      columnwidth: [600,200,400,400,400,600,600],
      columnorder: [1,0,2,3,4,5,6],
      header: {
        values: headerValues,
        align: "center",
        line: {width: 1, color: 'rgb(50, 50, 50)'},
        fill: {color: ['rgb(235, 100, 230)']},
        font: {family: "Arial", size: 11, color: "white"}
      },
      cells: {
        values: cellValues,
        align: ["center", "center"],
        line: {color: "black", width: 1},
        fill: {color: ['rgba(228, 222, 249, 0.65)','rgb(235, 193, 238)', 'rgba(228, 222, 249, 0.65)']},
        font: {family: "Arial", size: 10, color: ["black"]}
      }
    }]
<<<<<<< HEAD
    
    
    
    var values = [
          selected,
          mean_missing_rate,
          min_missing_rate,
          max_missing_rate,
          mean_max_zero,
          min_max_zero,
          max_max_zero,
          num_good_constant,
          mean_inconsistent_rate,
          min_inconsistent_rate,
          max_inconsistent_rate]
    
=======

    */

    var data = [{
      type: 'table',
      header: {
        values: [["Aggregated Intersections"], ["Mean Missing Rate"],
    				 ["Min Missing Rate"], ["Max Missing Rate"], ['Mean Max Zero Value'],
    				 ['Min Max Zero Value'], ['Max Max Zero Value'], ['Constant or Not'], 
    				 ['Mean Inconsistent Rate'], ['Min Inconsistent Rate'], ['Max Inconsistent Rate']],
        align: "center",
        line: {width: 1, color: 'black'},
        fill: {color: "grey"},
        font: {family: "Arial", size: 12, color: "white"}
      },
      cells: {
        values: values,
        align: "center",
        line: {color: "black", width: 1},
        font: {family: "Arial", size: 11, color: ["black"],
        scroll: true
        }
      }
    }]



    var layout = {
      title: "Arterial Health Intersection Data"
    }

    Plotly.plot(test1, data, layout);

}

function downloaddata() {
        var csv = 'IntersectionDirectory';

        console.log(csv);
        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        hiddenElement.target = '_blank';
        hiddenElement.download = './frontend/IntersectionDirectory.csv';
        hiddenElement.click();
    }
