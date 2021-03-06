import React from 'react'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {Chart as ChartJS,ArcElement,LineElement,BarElement,PointElement,BarController,BubbleController,DoughnutController,LineController,PieController,PolarAreaController,RadarController,ScatterController,CategoryScale,LinearScale,LogarithmicScale,RadialLinearScale,TimeScale,TimeSeriesScale,Decimation,Filler,Legend,Title,Tooltip,SubTitle} from 'chart.js';
// import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend} from 'chart.js';
import { Bar, Doughnut, Line, Pie, PolarArea, Radar, Bubble, Scatter } from 'react-chartjs-2';
// ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);
ChartJS.register(ArcElement,LineElement,BarElement,PointElement,BarController,BubbleController,DoughnutController,LineController,PieController,PolarAreaController,RadarController,ScatterController,CategoryScale,LinearScale,LogarithmicScale,RadialLinearScale,TimeScale,TimeSeriesScale,Decimation,Filler,Legend,Title,Tooltip,SubTitle);

  const DoughnutChart =(prop) => {

    const [data, setData] = useState({
      labels:[],
      datasets: [],
    });

    var maxim = true;
    if(prop.type == 'documents'){
      maxim = true
    }
    else if(prop.type == 'safety'){
        maxim = true
    }
    else if(prop.type == 'queries'){
      maxim = false
  }

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
        datalabels:{
          display: true,
          color: 'black',
          anchor: 'center'
        },
        legend: {
          display: maxim,
          position: 'top',
          align: 'start'
        },
        title: {
          display: maxim,
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
                dataSet1.push(val.firstvalue);  //val.id for Int or parseInt(val.address.geo.lat) for String  val.name  val.score
                dataSet2.push(val.secondvalue)  //val.postId  parseInt(val.address.geo.lng)
                dataSet3.push(val.thirdvalue)  //val.postId  parseInt(val.address.geo.lng)
                labelSet.push(val.label)  //val.name ou val.address.zipcode ou val.address.geo.lat
            }
         })

        //----------------------------------------------Ajouter une deuxi??me API
        //  await fetch(url).then((data) => data.json()).then((res) => {
        //     for (const val of res) {
        //         //dataSet2.push(val.ORDINAL_POSITION)  //val.postId  parseInt(val.address.geo.lng)
        //         // labelSet.push(val.name)  //val.name ou val.address.zipcode ou val.address.geo.lat
        //     }
        //     console.log("arr Data : ", dataSet1, dataSet2)
        // })

        //-----------------------------------------------Dataset
         setData({
          labels: labelSet,
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
              resolved: dataSet2[0],
              default_unresolved: dataSet3[0],
              serious: dataSet2[0],
              ack_not_received: dataSet3[0]
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
              Received : {data.datasets[0]?.resolved}
              <br/>
              Default unresolved : {data.datasets[0]?.default_unresolved}
          </div>
          <div style={{width:'100%', height:'20vh'}}>
              
              <Doughnut data={data} plugins={[ChartDataLabels]} options={options}/> 
          </div>
          </>
          )
    } 
    else if (prop.type == 'safety') {
        return(
          <>
          <div style={{width:'100%', height:'20vh'}}>
                <Doughnut data={data} plugins={[ChartDataLabels]} options={options}/> 
                
          </div>
          <div>
                Serious : {((data.datasets[0]?.serious/data.datasets[0]?.ack_not_received)*100).toFixed(1)} %
                <br/>
                Ack not received : {data.datasets[0]?.ack_not_received}
          </div>
          <div style={{fontSize: '.8rem', border: '1px solid black'}}>
            <table>
              <tr>
                  <th>           </th>
                  <th>Initial</th>
                  <th>Follow-up</th>
              </tr>
              <tr>
                  <td>AVG SAE per site</td>
                  <td>xxx</td>
                  <td>xxx</td>
              </tr>
              <tr>
                  <td>AVG SAE per patient</td>
                  <td>xxx</td>
                  <td>xxx</td>
              </tr>
            </table>
          </div>
          </>
            )
    }
    else if (prop.type == 'queries') {
      return(
        <>
        <div>
          Issued : xxx &nbsp; Closed : xxx 
        </div>
        <div style={{width:'100%', height:'20vh', border: '2px solid blue', display: 'flex'}}>
          <div style={{width:'20%', height:'20vh', border: '2px solid red'}}>
                <Doughnut data={data} plugins={[ChartDataLabels]} options={options}/> 
          </div>
          <div style={{width:'20%', height:'20vh', border: '2px solid red'}}>
                <Doughnut data={data} plugins={[ChartDataLabels]} options={options}/> 
          </div>
          <div style={{width:'20%', height:'20vh', border: '2px solid red'}}>
                <Doughnut data={data} plugins={[ChartDataLabels]} options={options}/> 
          </div>
          <div style={{width:'20%', height:'20vh', border: '2px solid red'}}>
                <Doughnut data={data} plugins={[ChartDataLabels]} options={options}/> 
          </div>
        </div>
        
        <div>
              Test
        </div>
        </>
          )
  }
    // return(
    //     <div style={{width:'100%', height:'20vh'}}>
    //         <Doughnut data={data} plugins={[ChartDataLabels]} options={options}/> 
    //     </div>)
}


export default DoughnutChart
