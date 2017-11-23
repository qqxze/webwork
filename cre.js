/**
 * Created by ENUO-vivi1 on 2017/6/9.
 */
window.onload = function() {
    var oUl1 = document.getElementById("ul1");
    var aLi = oUl1.getElementsByTagName("li");
    var oDiv = document.getElementById("tab-list");
    var aDiv = oDiv.getElementsByTagName("div");
    for(var i = 0; i < aLi.length; i++) {
        aLi[i].index = i;
        aLi[i].onmouseover = function() {
            for(var i = 0; i < aLi.length; i++) {
                aLi[i].className = "";
            }
            this.className = "active";
            for(var j = 0; j <aDiv.length; j++) {
                //aDiv[j].className = "hide";
                $("#tab-list").children('div').eq(j).hide();
            }
            //aDiv[this.index].className = "show";
            $("#tab-list").children('div').eq(this.index).show();
        }
    }
}