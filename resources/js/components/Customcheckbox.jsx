import React from 'react'
import '../../css/checkbox.css'
export default function Customcheckbox(props) {
  return (
    <div className="checkbox-wrapper-56">
  <label className="container">
    <input defaultChecked={props.checked} onChange={props.onChange} type="checkbox" />
    <div className="checkmark"></div>
  </label>
</div>
  )
}
