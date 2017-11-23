var map = new BMap.Map("container");          // 创建地图实例
var point = new BMap.Point(116.418261, 39.921984);
map.centerAndZoom(point, 15);             // 初始化地图，设置中心点坐标和地图级别
map.enableScrollWheelZoom(); // 允许滚轮缩放
var points0 = new Array();
showtable();
function showtable() {
    //alert("dd");
    var list = document.getElementById("list");
    var db = openDatabase('load', '1.0', 'tt', 2 * 1024 * 1024);
    db.transaction(function(tx){
        //查询所有表记录
        tx.executeSql('SELECT * FROM sqlite_master WHERE type=\'table\'',[],function(tx,rs){
            if(rs.rows.length>0){
                var result = "<table width='100%' style='margin-top:13px;' id='table1'>";
                result += "<tr><th width='25%' style='text-align: center;border: solid 2px;'>序号</th><th width='50%' style='text-align:center;border: solid 2px;'>表名</th><th width='25%' style='text-align: center;border: solid 2px;'>操作</th></tr>";
                for(var i=0;i<rs.rows.length;i++){
                    var row = rs.rows.item(i);
                    console.log(row.name.indexOf("DatabaseInfo"));
                    if(row.name.indexOf("DatabaseInfo")<0){
                    //拼装一个表格的行节点
                    result += "<tr><td style='text-align: center;border: solid 2px;'>"+(i+1)+"</td><td style='text-align: center;border: solid 2px;'>"
                             +row.name+"</td><td style='text-align:center;border:solid 2px;'><input type='button' value='导入数据'  class='imp' /><input type='hidden' value="+row.name+" /></tr>";
                    }
                }
                list.innerHTML = result;
                $(".imp").click(function () {
                    //alert("hah");
                    var tname = $(this).next("input").val();
                    console.log(tname);
                     importdata(tname);
                });

            }else{
                list.innerHTML = "目前数据为空";
            }
        });
    });
}

function importdata(val) {
    points0.splice(0,points0.length);
    console.log(points0.length);
    console.log(val+" hh");
    var db = openDatabase('load', '1.0', 'tt', 2 * 1024 * 1024);
    db.transaction(function(tx){
        tx.executeSql('SELECT * FROM '+val,[],function(tx,rs1){
            console.log("开始");
            for(var j = 1 ;j<rs1.rows.length;j++){
                var row1 = rs1.rows.item(j);
                // console.log(row1.lon);
                // console.log(row1.lat);
                // console.log(row1.fre);
                var point = {
                    lng: Number(row1.lon),
                    lat: Number(row1.lat),
                    count: Number(row1.fre)
                };
                points0.push(point);
            }
            alert("导入数据成功！")
        },function (tx,err) {
            alert("导入失败"+err.message);

        });
        console.log("结束");
    });

}
if(!isSupportCanvas()){
    alert('热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~')
}
//详细的参数,可以查看heatmap.js的文档 https://github.com/pa7/heatmap.js/blob/master/README.md
//参数说明如下:
/* visible 热力图是否显示,默认为true
 * opacity 热力的透明度,1-100
 * radius 势力图的每个点的半径大小
 * gradient  {JSON} 热力图的渐变区间 . gradient如下所示
 *	{
        .2:'rgb(0, 255, 255)',
        .5:'rgb(0, 110, 255)',
        .8:'rgb(100, 0, 255)'
    }
    其中 key 表示插值的位置, 0~1.
        value 为颜色值.
 */
heatmapOverlay = new BMapLib.HeatmapOverlay({"radius":2});
map.addOverlay(heatmapOverlay);
// heatmapOverlay.setDataSet({data:points0,max:100});

//是否显示热力图
function openHeatmap(){
    heatmapOverlay.setDataSet({data:points0,max:2500});
    heatmapOverlay.show();

}
function closeHeatmap(){
    heatmapOverlay.hide();
}
closeHeatmap();
function setGradient(){
    /*格式如下所示:
   {
         0:'rgb(102, 255, 0)',
         .5:'rgb(255, 170, 0)',
         1:'rgb(255, 0, 0)'
   }*/
    var gradient = {};
    var colors = document.querySelectorAll("input[type='color']");
    colors = [].slice.call(colors,0);
    colors.forEach(function(ele){
        gradient[ele.getAttribute("data-key")] = ele.value;
    });
    heatmapOverlay.setOptions({"gradient":gradient});
}
//判断浏览区是否支持canvas
function isSupportCanvas(){
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
}