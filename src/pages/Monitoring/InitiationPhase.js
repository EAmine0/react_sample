import React from 'react'
import Topbar from '../../components/Topbar/Topbar'
import { TopbarMonitoring } from '../../components/Topbar/TopbarData'

function InitiationPhase() {
    return (
        <>
        <div className='title_page'>
            Monitoring
        </div>
        <Topbar test={TopbarMonitoring}/>
        <div className='box_container'>
            <div className='block'>
                <div className='title_block'>
                    Site status
                </div>
            </div>
            <div className='block'>
                <div className='title_block'>
                    Patient status
                </div>
            </div>
        </div>
        </>
    )
}

export default InitiationPhase
