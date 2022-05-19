import React from 'react'
import BarChart from '../../components/Charts/BarChart';
import LineChart from '../../components/Charts/LineChart';
import Btn_export_data from '../../components/Btn_export_data';
import GetData from '../../components/Charts/GetData';
import DoughnutChart from '../../components/Charts/DoughnutChart';

function Dmcrf() {
    return (
        <>
        {/* <div className='title_page'>
            Operational Dashboard
        </div> */}
        {/* <Topbar test={TopbarOpDash}/> */}
        {/* <Sidebar/> */}
        <div className='box_container'>
            <div className='block' style={{width: "20%"}}>
                <div className='title_block'>
                    Visits
                </div>
                <Btn_export_data/>
                <GetData url='http://localhost:5000/api/OpDashboard/visits' legend='AE/SAE' type='documents'/>
                <div className='title_block'>
                    Patient Cleaned
                </div>
                <GetData url='http://localhost:5000/api/OpDashboard/patient_cleaned' legend='AE/SAE' type='safety'/>
            </div>
            <div className='block' style={{width: "49%"}}>
                <div className='title_block'>
                    Queries
                </div>
                <Btn_export_data/>
                <DoughnutChart url='http://localhost:5000/api/OpDashboard/queries' legend='AE/SAE' type='queries'/>
            </div>
            <div className='block' style={{width: "75.3%"}}>
                <div className='title_block'>
                    Patient per mandatory consultation
                </div>
                <Btn_export_data/>
                <BarChart url='http://localhost:5000/api/OpDashboard/patient_mandatory_consultation' type='patient_mandatory_consultation' label1='Status total' label2='Last status total'/>
            </div>
            
        </div>
        </>
        
    )
}

export default Dmcrf
