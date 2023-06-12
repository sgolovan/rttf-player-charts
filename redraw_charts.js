
function retrieveWindowVariables(variables) {
    var ret = {};

    var scriptContent = "";
    for (var i = 0; i < variables.length; i++) {
        var currVariable = variables[i];
        scriptContent += "if (typeof " + currVariable + " !== 'undefined') document.body.setAttribute('" + currVariable + "', JSON.stringify(" + currVariable + "));\n";
    }

    var script = document.createElement('script');
    script.id = 'tmpScript';
    script.appendChild(document.createTextNode(scriptContent));
    document.body.appendChild(script);

    for (var i = 0; i < variables.length; i++) {
        var currVariable = variables[i];
        ret[currVariable] = JSON.parse(document.body.getAttribute(currVariable));
    }

    document.getElementById("tmpScript").remove();

    return ret;
}

//alert(document.body['chartAllData_h']);

//alert('Loading redraw');

function initChart(id, data, labels, hidden) {
    if (document.getElementById(id) && data && labels) {
        var c = document.getElementById(id);
        var newc = document.createElement('canvas');
        c.parentNode.replaceChild(newc, c);
        newc.id = id;
        if (hidden) {
            newc.style.display = 'none';
        }

        var d = [];
        var l = labels;
        if (l[0]=="") {
            l[0] = l[1];
        }
        for (var i=0; i<l.length; i++) {
            d.push({'x': l[i].replace(/(\d+)\.(\d+)\.(\d+)/, '$3-$2-$1'), 'y':data[i]});
        }

        c = document.getElementById(id).getContext("2d");
        new Chart(c, {
            type: "line",
            data: {
                datasets: [{
                    label: "R ",
                    borderColor: "#369",
                    borderWidth: 1,
                    pointRadius: 1,
                    lineTension: 0,
                    data: d
                }]
            },
            options: {
                legend: {
                    display: false
                },
                tooltips: {
                    mode: "index",
                    intersect: false
                },
                scales: {
                    xAxes: [{
                        id: 'x',
                        display: true,
                        type: 'time',
                        time: {
                            parser: true,
                            tooltipFormat: 'DD.MM.YYYY',
                            format: false
                        }
                    }],
                }
            }
        });
    }
}

var v = retrieveWindowVariables([
    'chartLastData_s', 'chartLastLabels_s',
    'chartYearData_s', 'chartYearLabels_s',
    'chartAllData_s', 'chartAllLabels_s',
    'chartLastData_h', 'chartLastLabels_h',
    'chartYearData_h', 'chartYearLabels_h',
    'chartAllData_h', 'chartAllLabels_h',
    'chartLastData_p', 'chartLastLabels_p',
    'chartYearData_p', 'chartYearLabels_p',
    'chartAllData_p', 'chartAllLabels_p',
    'chartLastData_w', 'chartLastLabels_w',
    'chartYearData_w', 'chartYearLabels_w',
    'chartAllData_w', 'chartAllLabels_w',
    'chartLastData_f', 'chartLastLabels_f',
    'chartYearData_f', 'chartYearLabels_f',
    'chartAllData_f', 'chartAllLabels_f'
]);

initChart("chartLast_s", v['chartLastData_s'], v['chartLastLabels_s'], true);
initChart("chartYear_s", v['chartYearData_s'], v['chartYearLabels_s'], true);
initChart("chartAll_s", v['chartAllData_s'], v['chartAllLabels_s'], false);

initChart("chartLast_h", v['chartLastData_h'], v['chartLastLabels_h'], true);
initChart("chartYear_h", v['chartYearData_h'], v['chartYearLabels_h'], true);
initChart("chartAll_h", v['chartAllData_h'], v['chartAllLabels_h'], false);

initChart("chartLast_p", v['chartLastData_p'], v['chartLastLabels_p'], true);
initChart("chartYear_p", v['chartYearData_p'], v['chartYearLabels_p'], true);
initChart("chartAll_p", v['chartAllData_p'], v['chartAllLabels_p'], false);

initChart("chartLast_w", v['chartLastData_w'], v['chartLastLabels_w'], true);
initChart("chartYear_w", v['chartYearData_w'], v['chartYearLabels_w'], true);
initChart("chartAll_w", v['chartAllData_w'], v['chartAllLabels_w'], false);

initChart("chartLast_f", v['chartLastData_f'], v['chartLastLabels_f'], true);
initChart("chartYear_f", v['chartYearData_f'], v['chartYearLabels_f'], true);
initChart("chartAll_f", v['chartAllData_f'], v['chartAllLabels_f'], false);
