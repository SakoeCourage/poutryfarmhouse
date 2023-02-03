import React from 'react'
import '../../../css/dashboardpreloader.css'
export default function Preloader() {
  return (
    <main className='dashboardpreloader'>
	<div className="preloader">
		<div className="preloader__square"></div>
		<div className="preloader__square"></div>
		<div className="preloader__square"></div>
		<div className="preloader__square"></div>
	</div>
	<div className="status text-muted font-semibold">
        Dasboard is setting up
        <span className="status__dot">.</span><span className="status__dot">.</span>
        <span className="status__dot">.</span>
        </div>
</main>
  )
}
