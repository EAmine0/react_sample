import React from 'react'
import "../Pages.css"
import { useState, useEffect } from 'react'
import BarChart from '../../components/Charts/BarChart';
import DoughnutChart from '../../components/Charts/DoughnutChart';
import LineChart from '../../components/Charts/LineChart';
import PieChart from '../../components/Charts/PieChart';
import Btn_export_data from '../../components/Btn_export_data';
import SemiDoughnutChart from '../../components/Charts/SemiDoughnutChart';

function Status() {
    
    return (
        <>
        <div className='box_container'>

            <div className='block' style={{width: "35%"}}>
                <div className='title_block'>
                    Site status
                </div>
                <Btn_export_data/>
                <BarChart url='http://localhost:5000/api/OpDashboard/site_status' label1='Status total' label2='Last status total'/>
            </div>

            <div className='block' style={{width: "35%"}}>
                <div className='title_block'>
                    Patient status
                </div>
                <Btn_export_data/>
                <BarChart url='http://localhost:5000/api/OpDashboard/patient_status' label1='Status total' label2='Last status total'/>
            </div>


        </div>
        
        </>
        
    )
}

export default Status

// const [name, setName] = useState("world")
    // const [phone, setPhone] = useState()
    // const [hidden, setHidden] = useState(true);
    // const text = "bien vue l'ami"
    // const maxLength = 5

    // useEffect(()=> {
    //     document.title = `hello ${name}!`
    // })

{/* <div className='boxx'>
            <p>Enter your name: <input value={name} onChange={event => setName(event.target.value)}/></p>
            <p>Enter your phone number: <input value={phone} onChange={event => setPhone(event.target.value)}/></p> 
            <p>Hello {name}, and we call you back at this phone number : {phone} </p>
            <span>
                {hidden ? `${text.substr(0, maxLength).trim()} ...  ` : text}
                {hidden ? (
                    <a onClick={() => setHidden(false)}>read more</a>
                ) : (
                    <a onClick={() => setHidden(true)}>  read less</a>
                )}
            </span>
        </div> */}