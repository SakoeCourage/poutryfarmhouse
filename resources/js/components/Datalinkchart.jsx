import React, { useEffect, useMemo } from 'react'
import * as echarts from 'echarts';

export default function Datalinkchart(props) {

  var option = {
    legend: {},
    tooltip: {
      trigger: 'axis',
      showContent: false
    },
    dataset: {
      source: [
        ['flocks', '2012', '2013', '2014', '2015', '2016', '2017',],
       
      ]
    },
    xAxis: { type: 'category' },
    yAxis: { gridIndex: 0 },
    grid: { top: '55%' },
    series: [
      {
        type: 'pie',
        id: 'pie',
        radius: '30%',
        center: ['50%', '25%'],
        emphasis: {
          focus: 'self'
        },
        label: {
          formatter: '{b}: {@2012} ({d}%)'
        },
        encode: {
          itemName: 'flocks',
          value: '2012',
          tooltip: '2012'
        }
      },

    ]
  };


  let setChartData = () => {
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    setTimeout(function () {
      myChart.on('updateAxisPointer', function (event) {
        const xAxisInfo = event.axesInfo[0];
        if (xAxisInfo) {
          const dimension = xAxisInfo.value + 1;
          myChart.setOption({
            series: {
              id: 'pie',
              label: {
                formatter: '{b}: {@[' + dimension + ']} ({d}%)'
              },
              encode: {
                value: dimension,
                tooltip: dimension
              }
            }
          });
        }
      });
      myChart.setOption(option);
    });
  }
  useEffect(() => {
    setChartData()
    console.log()
  }, [])
  
  let refinedChartData = () => {
    if(props.chartData.length){
      console.log(props.chartData)
      Object.values(props.chartData).forEach(item => {
        const { name, data } = item
        option.dataset.source.push([name, ...data])
        option.series.push({
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      })
        setChartData()
      })
    }
  }

  useMemo(() => { refinedChartData() }, [props.chartData])
  return (
    <div className='w-full pt-5 '>
      <div id='main' className=' h-[38rem] w-[50rem] mx-auto    ' >
      </div>

    </div>
  )
}
