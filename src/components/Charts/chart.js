import React from 'react'

import { useState, useEffect } from 'react';
import axios from 'axios';
import {Chart as ChartJS,ArcElement,LineElement,BarElement,PointElement,BarController,BubbleController,DoughnutController,LineController,PieController,PolarAreaController,RadarController,ScatterController,CategoryScale,LinearScale,LogarithmicScale,RadialLinearScale,TimeScale,TimeSeriesScale,Decimation,Filler,Legend,Title,Tooltip,SubTitle} from 'chart.js';
// import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend} from 'chart.js';
import { Bar, Doughnut, Line, Pie, PolarArea, Radar, Bubble, Scatter } from 'react-chartjs-2';
// ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);
ChartJS.register(ArcElement,LineElement,BarElement,PointElement,BarController,BubbleController,DoughnutController,LineController,PieController,PolarAreaController,RadarController,ScatterController,CategoryScale,LinearScale,LogarithmicScale,RadialLinearScale,TimeScale,TimeSeriesScale,Decimation,Filler,Legend,Title,Tooltip,SubTitle);



const Chart = () => {
    const [data, setData] = useState({
        labels:[],
        datasets: [],
    });

    useEffect(()=> {

        const fetchData= async()=> {
            const url = 'http://localhost:5000/api/OpDashboard/documents_conformity'
            const url2 = 'http://localhost:29384/api/table1/zephyr' //https://api.github.com/users/zellwk/repos?sort=pushed https://jsonplaceholder.typicode.com/users  https://localhost:44316/api/values
            const labelSet = []
            const dataSet1 = [];
            const dataSet2 = [];
            
            
            await fetch(url).then((data) => data.json()).then((res) => {
            for (const val of res) {
                dataSet1.push(val.firstvalue);  //val.id for Int or parseInt(val.address.geo.lat) for String  val.name  val.score
                //dataSet2.push(val.secondvalue)  //val.postId  parseInt(val.address.geo.lng)
                labelSet.push(val.label)  //val.name ou val.address.zipcode ou val.address.geo.lat
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
            labels: labelSet,
            datasets: [
            {
                label: "prop.label1",
                data:[30,30,30],
                borderColor: ['rgba(254, 0, 0, 1)','rgba(253, 192, 0, 1)','rgba(0, 176, 79, 1)'],
                backgroundColor: ['rgba(254, 0, 0, 1)','rgba(253, 192, 0, 1)','rgba(0, 176, 79, 1)'],
                fill: true, //Pour Line
                cutout: '55%',        //
                circumference: 180,  //  Pour Doughnut ou Pie
                rotation: 270,      //
                borderRadius: 1,
                needleValue: 45,
                //hoverOffset: 5
                // borderWidth: 10,
                //hoverBorderWidth: 5,
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

    // const labels = ['janvier', 'fevrier', 'mars']
    // const data = {
    // labels: labels,
    // datasets: [{
    //     label: 'My First Dataset',
    //     data:[30,30,30],
    //     borderColor: ['rgba(254, 0, 0, 1)','rgba(253, 192, 0, 1)','rgba(0, 176, 79, 1)'],
    //     backgroundColor: ['rgba(254, 0, 0, 1)','rgba(253, 192, 0, 1)','rgba(0, 176, 79, 1)'],
    //     borderWidth: 1,
    //     cutout: '95%',        //
    //     circumference: 180,  //  Pour Doughnut ou Pie
    //     rotation: 270,      //
    //     borderRadius: 1,
    //     needleValue: 45
    //     //hoverOffset: 5
    //     // borderWidth: 10,
    //     //hoverBorderWidth: 5,
    // }]
    // };

    const gaugeNeedle = {
        id: 'gaugeNeedle',
        afterDatasetDraw(chart, args, options) {
            const {ctx, config, data, chartArea: {top, bottom, left, right, width, height}} = chart;

            ctx.save();
            console.log('tryyyyyy',ctx);

            const needleValue = data.datasets[0].needleValue;
            const dataTotal = data.datasets[0].data.reduce((a, b) => a + b, 0);
            const angle = Math.PI + (1/dataTotal * needleValue * Math.PI);

            const cx = width / 2;
            const cy = chart._metasets[0].data[0].y;

            ctx.translate(cx, cy);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.moveTo(0, -2);
            ctx.lineTo(height-(ctx.canvas.offsetTop-10), 0);
            ctx.lineTo(0, 2);
            ctx.fillStyle = "#444";
            ctx.fill();

            //ctx.translate(-cx, -cy);
            ctx.beginPath();
            ctx.arc(cx,cy,5,0,10);
            ctx.fill();
            ctx.restore();

            ctx.font = '50px Helvetica';
            ctx.fillStyle = '#444';
            ctx.fillText(needleValue,cx,cy+50);
            ctx.textAlign = 'center';
            ctx.restore();
            console.log('wazaa', dataTotal);
        }
    }

    
    const options = {
        indexAxis: 'x',
        elements: {
            bar: {
            borderWidth: 2,
            },
        },
        responsive: true,
        maintainAspectRatio: false
    };  

    return(
        <div style={{width:'100%', height:'30vh'}}>
            <Pie data={data} plugins={[gaugeNeedle]} options={options}/> 
         </div>)
}


export default Chart
