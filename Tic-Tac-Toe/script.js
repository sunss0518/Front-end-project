var player = "";
var xo = "";
var arr = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'], ['1', '4', '7'], ['2', '5', '8'], ['3', '6', '9'], ['1', '5', '9'], ['3
', '5', '7']];
function flush() {
    currentArr1 = [], currentArr2 = [], arrCan11 = [], arrCan12 = [], arrCan21 = [], arrCan22 = [],
    canLen1 = 0, canLen2 = 0, randomIdx1 = 0, randomIdx2 = 0, randomIdx3 = 0, randomIdx4 = 0, 
    finalId1 = "", finalId2 = "", finalId3 = "", finalId4 = "";
}
// 切换页面
function switchFunction(i) {
    $(i).on("click", function() {
        switch(i) {
            case "#onePlayer":
                modifyZ("box2-1", i);
                player = i.substr(1);                       
                break;
            case "#twoPlayer":
                modifyZ("box2-2", i);
                player = i.substr(1);
                break;
            case ".back-first-page":
                modifyZ("box1");
                break;
            case ".go-third-page":
            case "#box4":
            case "#box5":
            case "#box6":
                $("#box3 div").html("");
                flush();                      
                $("#box3").css("z-index", "1").siblings().css("z-index", "-1").siblings("#top").css("z-index", "1");
                break;
            case ".x":
                xo = i.substr(1);
                break;
            case ".o":
                xo = i.substr(1);
                break;
            case "#reset":
                $("#box3 div").html("");
                flush();
                modifyZ("box1");
        }
    });
}
function modifyZ(z) {
    $("#" + z).css("z-index", "1").siblings().css("z-index", "-1");           
}
// 
function main() {
    $("#box3 div").on("click", function() {
        if (player == "onePlayer") {
            if (xo == "x") {
                $(this).append("X");
                currentArr1.push($(this).attr("id"));               
                computer("X", "O");
                winOrLoss();
            } else {
                $(this).append("O");
                currentArr1.push($(this).attr("id"));               
                computer("O", "X");
                winOrLoss();
            }
        } else {
            if (xo == "x") {
                if (currentArr1.length <= currentArr2.length) {
                    $(this).append("X");
                    currentArr1.push($(this).attr("id"));
                    winOrLoss();
                } else {
                    $(this).append("O");
                    currentArr2.push($(this).attr("id"));
                    winOrLoss();
                }                         
            } else {
                if (currentArr1.length <= currentArr2.length) {
                    $(this).append("O");
                    currentArr1.push($(this).attr("id"));
                    winOrLoss();
                } else {
                    $(this).append("X");
                    currentArr2.push($(this).attr("id"));
                    winOrLoss();
                }
            }
        }
        
    });
}
// 人机
function computer(p1, p2) {                        
    var arr1Arr2 = currentArr1.concat(currentArr2);
    twoPointsInALine(currentArr1, arrCan11, arrCan12, canLen1);
    twoPointsInALine(currentArr2, arrCan21, arrCan22, canLen2);
    
    if (canLen1 == 0) {
        if (canLen2 == 0) {                   
            var oarr1 = ["5"].filter(function(a) {
                return arr1Arr2.indexOf(a) == -1;
            });
            var oarr2 = ["1", "3", "7", "9"].filter(function(a) {
                return arr1Arr2.indexOf(a) == -1;
            });
            var oarr3 = ["2", "4", "6", "8"].filter(function(a) {
                return arr1Arr2.indexOf(a) == -1;
            });
            var oarrLen2 = oarr2.length;
            var oarrLen3 = oarr3.length;
            if (oarr1.length != 0) {
                $("#5").append(p2);
                currentArr2.push("5");
            } else if (oarrLen2 != 0) {
                autoselector(randomIdx1, oarrLen2, finalId1, oarr2, p2);
            } else if (oarrLen3 != 0) {
                autoselector(randomIdx2, oarrLen3, finalId2, oarr3, p2);
            }
        } else {
            autoselector(randomIdx3, canLen2, finalId3, arrCan22, p2);
        }
    } else {
        autoselector(randomIdx4, canLen1, finalId4, arrCan12, p2);
    }                        
}
// 判断两点在一条线上
function twoPointsInALine(cur, arrcanx1, arrcanx2, canlen) {
    arr.forEach(function(e) {
        var total = 0;
        var arrExist = [];
        cur.forEach(function(cu) {                    
            var idxE = e.indexOf(cu);
            if (idxE != -1) {
                arrExist.push(cu);
                total++;
            }
        });
        if (total == 2) {
            var valCan = e.filter(function(b) {
                return arrExist.indexOf(b) == -1;
            });
            arrcanx1.push(valCan[0]);
        }
    });
    arrcanx2 = arrcanx1.filter(function(ac) {
        return cur.indexOf(ac) != -1;
    });
    canlen = arrcanx2.length;
}
// turn 机器
function autoselector(idx, len, id, arr, p2) {
    idx = getRandomInt(0, len);
    id = arr[idx];  
    $("#" + id).append(p2);
    currentArr2.push(id);
}
// 获取随机整数
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
// 判断胜负关系 
function winOrLoss() {
    var cur1cur2 = currentArr1.concat(currentArr2);
    arr.forEach(function(a) {
        var bool1 = a.every(function(v) {
            var idxA1 = currentArr1.indexOf(v);
            return idxA1 > -1;
        });
        var bool2 = a.every(function(v) {
            var idxA2 = currentArr2.indexOf(v);
            return idxA2 > -1;
        });
        if (bool1 === true) {
            modifyZ("box4");                   
        } else if (bool2 === true) {
            modifyZ("box5");
        } else if (cur1cur2.length > 8 && bool1 === false && bool2 === false) {
            modifyZ("box6");
        }
    });
}
$(document).ready(function() {
    flush();
    switchFunction("#onePlayer");
    switchFunction("#twoPlayer");
    switchFunction(".back-first-page");
    switchFunction(".go-third-page");
    switchFunction(".x");
    switchFunction(".o");
    switchFunction("#box4");
    switchFunction("#box5");
    switchFunction("#box6");
    switchFunction("#reset");          
    main();
});
