import React from 'react';
import { Component } from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {Chart as ChartJS,ArcElement,LineElement,BarElement,PointElement,BarController,BubbleController,DoughnutController,LineController,PieController,PolarAreaController,RadarController,ScatterController,CategoryScale,LinearScale,LogarithmicScale,RadialLinearScale,TimeScale,TimeSeriesScale,Decimation,Filler,Legend,Title,Tooltip,SubTitle} from 'chart.js';
// import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend} from 'chart.js';
import { Bar, Doughnut, Line, Pie, PolarArea, Radar, Bubble, Scatter } from 'react-chartjs-2';
// ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);
ChartJS.register(ArcElement,LineElement,BarElement,PointElement,BarController,BubbleController,DoughnutController,LineController,PieController,PolarAreaController,RadarController,ScatterController,CategoryScale,LinearScale,LogarithmicScale,RadialLinearScale,TimeScale,TimeSeriesScale,Decimation,Filler,Legend,Title,Tooltip,SubTitle);


//--------------------------------------------------------------------------------------------




const BarChart =(prop) => {
    const [data, setData] = useState({
      labels:[],
      datasets: [],
    });

    var indexaxis = " ";
    var top = " "
    var offset = 0
    if(prop.type == 'site_status'){
      indexaxis = "x"
      top = 'top'
      offset = -3
    }
    else if(prop.type == 'patient_mandatory_consultation'){
      indexaxis = "y"
      top = 'right'
      offset = 3
  }

    const options = {
    
      indexAxis: indexaxis,
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      responsive: true,
      hoverBorderWidth: 5,
      scales: {
        x: {
          // suggestedMin: 50,
          // suggestedMax: 100
        },
        y: {
          suggestedMax: 50,
          //reverse: true,
          
        }
      },
      plugins: {
        
        datalabels:{
          display: true,
          color: 'black',
          anchor: 'end',
          align: top,
          offset: offset
        },
        legend: {
          position: 'top',
        },
        // title: {
        //   display: true,
        //   text: 'Température',
        //   position: 'left'
        // },
      },
    };
    
    useEffect(()=> {
       const fetchData= async()=> {
         if(prop.type == 'site_status'){
            const url = prop.url
            const labelSet = []
            const dataSet1 = [];
            const dataSet2 = [];
            await fetch(url).then((data) => data.json()).then((res) => {
              for (const val of res) {
                  dataSet1.push(val.firstvalue); 
                  dataSet2.push(val.secondvalue) 
                  labelSet.push(val.label)  
              }
          })
          setData({
            labels: labelSet,
            datasets: [
              {
                label: prop.label1,
                data:dataSet1,
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                // borderRadius: 10,
                // borderWidth: 10,
                hoverBorderWidth: 5,
              },
              {
                label: prop.label2,
                data:dataSet2,
                borderColor: '#742774',
                backgroundColor: 'rgba(75,192,192,0.2)',
                // borderRadius: 10,
                // borderWidth: 10,
                hoverBorderWidth: 5,
              }
            ],
          })
         }

         //-----------------------------------------------------------

         else if(prop.type == 'patient_mandatory_consultation'){
          const url = prop.url
          const labelSet = []
          const dataSet1 = [];
          const dataSet2 = [];
          const dataSet3 = [];
          const dataSet4 = [];
          const dataSet5 = [];
          const dataSet6 = [];
          await fetch(url).then((data) => data.json()).then((res) => {
            for (const val of res) {
              labelSet.push(val.label) 
                dataSet1.push(val.firstvalue);
                dataSet2.push(val.secondvalue)  
                dataSet3.push(val.thirdvalue)  
                dataSet4.push(val.fourthvalue)  
                dataSet5.push(val.fifthvalue)  
                dataSet6.push(val.sixthvalue)  
            }
         })
         setData({
          labels: labelSet,
          datasets: [
            {
              label: "Consultation NA",
              data:dataSet1,
              borderColor: ['rgba(1, 184, 170, 1)'],
            backgroundColor: ['rgba(1, 184, 170, 1)'],
            },
            {
              label: "Consultation incomplete",
              data:dataSet2,
              borderColor: ['rgba(201, 27, 61, 1)'],
            backgroundColor: ['rgba(201, 27, 61, 1)'],
            },
            {
              label: "consultation complete",
              data:dataSet3,
              borderColor: ['rgba(253, 98, 94, 1)'],
            backgroundColor: ['rgba(253, 98, 94, 1)'],
            },
            {
              label: "consultation DEA",
              data:dataSet4,
              borderColor: ['rgba(55, 70, 73, 1)'],
            backgroundColor: ['rgba(55, 70, 73, 1)'],
            },
            {
              label: "consultation DEB",
              data:dataSet5,
              borderColor: ['rgba(242, 200, 15, 1)'],
            backgroundColor: ['rgba(242, 200, 15, 1)'],
              
            },
            {
              label: "consultation clean",
              data:dataSet6,
              borderColor: ['rgba(131, 196, 57, 1)'],
            backgroundColor: ['rgba(131, 196, 57, 1)'],
            },
          ],
        })
        }
        } //fetchdata

        fetchData(); //on appelle fetchdata


    },[])
    //Bar, Doughnut, Line, Pie, PolarArea, Radar, Bubble, Scatter
   
    return(
        <div style={{width:'100%', height:'100%'}}>
            <Bar data={data} plugins={[ChartDataLabels]} options={options}/> 
         </div>)
}


export default BarChart







//--------------------------------------------------------------------------------------------

// const data = {
//     labels: ["Arizona","Californie","Texas","Ohio","Kentucky","Alabama"],
//     datasets: [
//         {
//             label: "Républicains",
//             data: ["43","21","58","12","15","17"],
//             backgroundColor: ["Red"],
//             borderWidth: 10,
//             hoverBorderWidth: 8,
//         },
//         {
//             label: "Démocrates",
//             data: ["33","51","42","22","25","19"],
//             backgroundColor: ["blue"],
//             borderWidth: 10,
//             hoverBorderWidth: 8,
//         },
//     ],
// }

// const options = {
//     responsive: true,
//   };


// function BarChart() {
//     return (
//         <>
//         <Bar data={data} options={options}/>
//         </>
        
//     )
// }

