
var myChart = echarts.init(document.getElementById('m2'));
var option = {
    title : {
        text: '2016年12月征信分数频率分布图',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        x : 'center',
        y : 'bottom',
        data:['[0-70]','[70-90]','[90-100]']
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    series : [
        {
            name:'总体频率分布图',
            type:'pie',
            radius : [20, 110],
            center : ['25%', '50%'],
            roseType : 'radius',
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            lableLine: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            data:[
                {value:0.101, name:'[0-70]'},
                {value:0.099, name:'[70-90]'},
                {value:0.8, name:'[90-100]'}
            ]
        },
        {
            name:'[0-90]频数分布情况',
            type:'pie',
            radius : [30, 110],
            center : ['75%', '50%'],
            roseType : 'area',
            data:[
                {value:0, name:'[0-10]'},
                {value:25109, name:'[10-20]'},
                {value:71510, name:'[20-30]'},
                {value:57912, name:'[30-40]'},
                {value:52074, name:'[40-50]'},
                {value:110821, name:'[50-60]'},
                {value:58342, name:'[60-70]'},
                {value:349625, name:'[70-80]'},
                {value:43850, name:'[80-90]'}
            ]
        }
    ]
};

myChart.setOption(option);