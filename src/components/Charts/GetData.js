import React from 'react'
import { useState, useEffect } from 'react';
import {Chart as ChartJS,ArcElement,LineElement,BarElement,PointElement,BarController,BubbleController,DoughnutController,LineController,PieController,PolarAreaController,RadarController,ScatterController,CategoryScale,LinearScale,LogarithmicScale,RadialLinearScale,TimeScale,TimeSeriesScale,Decimation,Filler,Legend,Title,Tooltip,SubTitle} from 'chart.js';
import { Bar, Doughnut, Line, Pie, PolarArea, Radar, Bubble, Scatter } from 'react-chartjs-2';
import { type } from '@testing-library/user-event/dist/type';
ChartJS.register(ArcElement,LineElement,BarElement,PointElement,BarController,BubbleController,DoughnutController,LineController,PieController,PolarAreaController,RadarController,ScatterController,CategoryScale,LinearScale,LogarithmicScale,RadialLinearScale,TimeScale,TimeSeriesScale,Decimation,Filler,Legend,Title,Tooltip,SubTitle);


const GetData =(prop) => {

    const [data, setData] = useState({
      labels:[],
      datasets: [],
    });

    
    const options =  {
      indexAxis: 'x',
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          align: 'start'
        },
        title: {
          display: true,
          text: prop.legend,
          align: 'start'
        },
      },
    };
    

    useEffect(()=> {

       const fetchData= async()=> {
           const url = prop.url
           const url2 = 'http://localhost:29384/api/table1/zephyr' //https://api.github.com/users/zellwk/repos?sort=pushed https://jsonplaceholder.typicode.com/users  https://localhost:44316/api/values
           const labelSet = []
           const dataSet1 = [];
           const dataSet2 = [];
           const dataSet3 = [];
           
         await fetch(url).then((data) => data.json()).then((res) => {
            for (const val of res) {
                dataSet1.push(val.value5);  
                dataSet2.push(val.value6)
                dataSet3.push(val.firstvalue)
            }
         })

        //----------------------------------------------Ajouter une deuxième API
        //  await fetch(url).then((data) => data.json()).then((res) => {
        //     for (const val of res) {
        //         //dataSet2.push(val.ORDINAL_POSITION)  //val.postId  parseInt(val.address.geo.lng)
        //         // labelSet.push(val.name)  //val.name ou val.address.zipcode ou val.address.geo.lat
        //     }
        //     console.log("arr Data : ", dataSet1, dataSet2)
        // })

        //-----------------------------------------------Dataset
         setData({
          labels: 'labelSet',
          datasets: [
            {
              label: "prop.label1",
              data:dataSet1,
              borderColor: ['rgba(54, 125, 173, 1)','rgba(255, 192, 0, 1)'],
              backgroundColor: ['rgba(54, 125, 173, 0.5)','rgba(255, 192, 0, 0.5)'],
              cutout: '50%',        //
              // circumference: 180,  //  Pour Doughnut ou Pie
              // rotation: 270,      //
              borderRadius: 1,
              // borderWidth: 10,
              hoverBorderWidth: 5,
              entered: dataSet1[0],
              cleaned: dataSet2[0],
              patient_cleaned: dataSet3[0],
            //   resolved: dataSet2[0],
            //   default_unresolved: dataSet3[0],
            //   serious: dataSet2[0],
            //   ack_not_received: dataSet3[0]
              //hoverOffset: 5
            },
            // {
            //   label: "prop.label2",
            //   data:dataSet2,
            //   borderColor: '#742774',
            //   backgroundColor: 'rgba(75,192,192,0.2)',
            //   // borderRadius: 10,
            //   // borderWidth: 10,
            //   hoverBorderWidth: 5,
            // },
          ],
        })

        } //fetchdata
        fetchData(); //on appelle fetchdata
    

    },[])
    //Bar, Doughnut, Line, Pie, PolarArea, Radar, Bubble, Scatter

    if (prop.type == 'documents') {
      //const patientvalue = data.datasets[0]?.totalValue
      //const sitevalue = data.datasets[0]?.siteValue
      return(
          <>
          <div>
          <br/>
              Entered : {(data.datasets[0]?.entered*100)?.toFixed(2)}% &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Cleaned : {(data.datasets[0]?.cleaned*100)?.toFixed(2)}%
              <br/>
              <br/>
              {/* Received : {data.datasets[0]?.resolved}
              <br/>
              Default unresolved : {data.datasets[0]?.default_unresolved} */}
          </div>
          </>
          )
    } 
    else if (prop.type == 'safety') {
        return(
          <>
          <div>
            <br/>
              {data.datasets[0]?.patient_cleaned}
            <br/>
          </div>
          </>
            )
    }
    // return(
    //     <div style={{width:'100%', height:'20vh'}}>
    //         <Doughnut data={data} plugins={[ChartDataLabels]} options={options}/> 
    //     </div>)
}

export default GetData
