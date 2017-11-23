// 基于准备好的dom，初始化echarts实例

var myChart = echarts.init(document.getElementById('m1'));
var option = {
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data: ['第一区间', '第二区间','第三区间','第四区间']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis:  {
        type: 'value'
    },
    yAxis: {
        type: 'category',
        data: ['交易金额[0,5000]','交易金额[5000,10000]','交易金额[10000+]']
    },
    series: [
        {
            name: '第一区间',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [0.415, 0.347, 0.423]
        },
        {
            name: '第二区间',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [0.274, 0.241, 0.162]
        },
        {
            name: '第三区间',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [0.175, 0.292, 0.223]
        },
        {
            name: '第四区间',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [0.136, 0.120, 0.192]
        }
    ]
};
myChart.setOption(option);

