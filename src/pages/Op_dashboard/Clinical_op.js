import React from 'react'

import BarChart from '../../components/Charts/BarChart';
import DoughnutChart from '../../components/Charts/DoughnutChart';
import LineChart from '../../components/Charts/LineChart';
import PieChart from '../../components/Charts/PieChart';
import Btn_export_data from '../../components/Btn_export_data';
import SemiDoughnutChart from '../../components/Charts/SemiDoughnutChart';
import Chart from '../../components/Charts/chart';
import Chsart from '../../components/Charts/chart';



function Clinical_op() {
    return (
        <>
        {/* <div className='title_page'>
            Operational Dashboard
        </div> */}
        {/* <Topbar test={TopbarOpDash}/> */}

        <div className='box_container'>

            <div className='block' style={{width: "21.2%"}}>
                <div className='title_block'>
                    Site identified per country 
                </div>
                <Btn_export_data/>
                <PieChart url='http://localhost:5000/api/OpDashboard/site_identified_per_country' legend='AE/SAE' type='semi'/>
            </div>

            <div className='block' style={{width: "21.2%"}}>
                <div className='title_block'>
                    Sites 
                </div>
                <Btn_export_data/>
                <SemiDoughnutChart url='http://localhost:5000/api/OpDashboard/sites' url2='http://localhost:5000/api/OpDashboard/sites' legend='Active : xxx' filter='Initiated' type='sites'/>
                <div>

                </div>
            </div>

            <div className='block' style={{width: "21.2%"}}>
                <div className='title_block'>
                    Patients 
                </div>
                <Btn_export_data/>
                <SemiDoughnutChart url='http://localhost:5000/api/OpDashboard/patients' url2='http://localhost:5000/api/OpDashboard/sites' legend='To target : xxx' filter='Included' type='patients'/>
            </div>

            <div className='block' style={{width: "35%"}}>
                <div className='title_block'>
                    Site status
                </div>
                <Btn_export_data/>
                <BarChart url='http://localhost:5000/api/OpDashboard/site_status' type='site_status' label1='Status total' label2='Last status total'/>
            </div>

            <div className='block' style={{width: "35%"}}>
                <div className='title_block'>
                    Patient status
                </div>
                <Btn_export_data/>
                <BarChart url='http://localhost:5000/api/OpDashboard/patient_status' type='site_status' label1='Status total' label2='Last status total'/>
            </div>

            <div className='block' style={{width: "76.2%"}}>
                <div className='title_block'>
                    Curve of inclusion
                </div>
                <Btn_export_data/>
                <LineChart url='http://localhost:5000/api/OpDashboard/curve' label1='Included' label2='Randomised' label3='Theoretical'/>
            </div>

            <div className='block' style={{width: "34%"}}>
                <div className='title_block'>
                    Monitoring
                </div>
                <Btn_export_data/>
                <BarChart url='http://localhost:5000/api/OpDashboard/site_status' label1='Status total' label2='Last status total'/>
            </div>

            <div className='block' style={{width: "15%"}}>
                <div className='title_block'>
                    Documents
                </div>
                <Btn_export_data/>
                <DoughnutChart url='http://localhost:5000/api/OpDashboard/documents_conformity' legend='Conformity' type='documents' />
            </div>

            <div className='block' style={{width: "15%"}}>
               <div className='title_block'>
                    Safety
                </div>
                <Btn_export_data/>
                <DoughnutChart url='http://localhost:5000/api/OpDashboard/safety_ae' legend='AE/SAE' type='safety'/>
            </div> 

        </div>
        
        </>
        
    )
}

export default Clinical_op
