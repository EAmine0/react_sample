import React from 'react'
import { useState, useEffect } from 'react';
import {Chart as ChartJS,ArcElement,LineElement,BarElement,PointElement,BarController,BubbleController,DoughnutController,LineController,PieController,PolarAreaController,RadarController,ScatterController,CategoryScale,LinearScale,LogarithmicScale,RadialLinearScale,TimeScale,TimeSeriesScale,Decimation,Filler,Legend,Title,Tooltip,SubTitle} from 'chart.js';
import { Bar, Doughnut, Line, Pie, PolarArea, Radar, Bubble, Scatter } from 'react-chartjs-2';
ChartJS.register(ArcElement,LineElement,BarElement,PointElement,BarController,BubbleController,DoughnutController,LineController,PieController,PolarAreaController,RadarController,ScatterController,CategoryScale,LinearScale,LogarithmicScale,RadialLinearScale,TimeScale,TimeSeriesScale,Decimation,Filler,Legend,Title,Tooltip,SubTitle);


const SemiDoughnutChart =(prop) => {

    

    const [data, setData] = useState({
        labels:[],
        datasets: [],
    });

    const gaugeNeedle = {
        id: 'gaugeNeedle',
        afterDatasetDraw(chart, args, options) {
            const {ctx, config, data, chartArea: {top, bottom, left, right, width, height}} = chart;
            //ctx.save();

            const totalValue = data.datasets[0].totalValue;
            const potentialValue = data.datasets[0].potentialValue;
            const dataTotal = data.datasets[0].data.reduce((a, b) => a + b, 0);
            const angle = Math.PI + (1/dataTotal * potentialValue * Math.PI);
            const angle2 = Math.PI + (1/dataTotal * totalValue * Math.PI);

            const cx = width / 2;
            const cy = chart._metasets[0].data[0].y;

            //needle 1 potentialValue
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.moveTo(1, -1);
            ctx.lineTo(height, 0);
            ctx.lineTo(0, 1);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.restore();

            //textvalue needle 1
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(angle+1.6);
            ctx.beginPath();
            ctx.moveTo(1, -1);
            ctx.lineTo(height, 0); //-(ctx.canvas.offsetTop-40)
            ctx.lineTo(0, 1);
            ctx.font = '15px Helvetica';
            ctx.fillStyle = "red";
            ctx.fillText(potentialValue,0,-height-5);
            ctx.restore();

            //needle 2 totalValue
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(angle2);
            ctx.beginPath();
            ctx.moveTo(1, -1);
            ctx.lineTo(height, 0); //-(ctx.canvas.offsetTop-40)
            ctx.lineTo(0, 1);
            ctx.fillStyle = "rgba(75,192,192,1)";
            //ctx.font = '15px Helvetica';
            //ctx.fillText("688",height+10,0);
            ctx.fill();
            ctx.restore();
        
            //textvalue needle 2
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(angle2+1.6);
            ctx.beginPath();
            ctx.moveTo(1, -1);
            ctx.lineTo(height, 0); //-(ctx.canvas.offsetTop-40)
            ctx.lineTo(0, 1);
            ctx.font = '15px Helvetica';
            ctx.fillStyle = "rgba(75,192,192,1)";
            ctx.fillText(totalValue,0,-height-5);
            ctx.restore();

            ctx.save();
            ctx.font = '15px Helvetica';
            ctx.fillStyle = "black";
            ctx.fillText(prop.filter,0,50);
            ctx.textAlign = "center";
            ctx.restore();

            //needle dot
            //ctx.translate(c, -cy);
            ctx.beginPath();
            ctx.arc(cx,cy,5,0,10);
            ctx.fillStyle = "rgba(75,192,192,1)";
            ctx.fill();
            ctx.restore();

        }
    };


    const options =  {
        
        indexAxis: 'x',
        responsive: true,
        maintainAspectRatio: false,
        hover:{mode: null,},
        elements: {
            // bar: {
            //     borderWidth: 2,
            // },
        },
        plugins: {
            tooltip: {
                enabled: null,
            },
            legend: {
                display: false,
                position: 'top',
            },
            title: {
                display: true,
                text: prop.legend+"%",
                align: 'end',
                color: 'black',
                font:{
                    size: 14
                }
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
            
            
            await fetch(url).then((data) => data.json()).then((res) => {
            for (const val of res) {
                dataSet1.push(val.firstvalue);  //val.id for Int or parseInt(val.address.geo.lat) for String  val.name  val.score
                dataSet2.push(val.secondvalue)  //val.postId  parseInt(val.address.geo.lng)
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
                data: [dataSet1[0]/2,dataSet1[0]/3.3,dataSet1[0]/5,dataSet1[0]],//[30,30,30,90], //[300,300,dataSet1[0]],
                borderColor: ['white'],
                backgroundColor: ['rgba(254, 0, 0, .5)','rgba(253, 192, 0, .5)','rgba(0, 176, 79, .5)','rgba(75,192,192, .5)'],
                fill: true, //Pour Line
                cutout: '75%',        //
                circumference: 180,  //  Pour Doughnut ou Pie
                rotation: 270,      //
                borderRadius: 1,
                totalValue: dataSet2[0], //dataSet2[0],
                potentialValue: dataSet1[0],//dataSet2[0], //dataSet1[0],
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
    //Bar, Doughnut, Line, Pie, PolarArea, Radar, Bubble, Scatter

    // function tring() {
    //     console.log("wassss")
    //     if (prop.tryy == 'blue') {
    //         console.log("wasssfdsfdsss");
    //         <span>fdsjflk</span>
    //     } 
    //     else {
    //         <span>fdsjflk</span>
    //     }
    // };

    return(
        <div style={{width:'100%', height:'20vh'}}>
            <Doughnut data={data} plugins={[gaugeNeedle]} options={options}/> 
            
        </div>)
}
export default SemiDoughnutChart
