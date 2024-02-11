import { useState } from "react"
import { connect } from "react-redux"
import {setHotelData} from "../../Redux/Actions/AccountActions"

const DEFAULT_FORM_DATA = {
  name: null,
  arrival: null,
  depature: null,
  confirmation: null,
  NameOnReservation: null,
}

function AddHotel({...props}){
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA)
  const [displayNewNameInput, setDisplayNewNameInput] = useState(false)

  const handleChange = (event) => {
    const targetKey = event.target.name;
    const newValue = event.target.value;

    setFormData({[targetKey] : newValue })
  }

  const newNameInputToggle = () => {
    setDisplayNewNameInput(!displayNewNameInput)
  }

  const handleReservationName = (event) => {
    let name;
    if (displayNewNameInput) {
      name = event.target.value;
    } else {
      name = props.userAccount.firstName + ' ' + props.userAccount.lastName
    }
    
    setFormData({NameOnReservation: name})
  }

  const handleSubmit = () => {
    // ...
    // ...
    // Code to call server API here...
    // ...
    // ...
    // If API successful save data to redux state. Redux state not yet created.
    props.addNewHotelData(formData)
  }

  
return (
    <div class="content-body">
      {console.log(props.setHotelData)}
      <div class="form-floating mb-3">
        <input type="email" class="form-control" id="inputHotel" placeholder="Hotel Name" onChange={handleChange}/>
        <label for="inputHotel">Hotel Name</label>
      </div>
      {/* Dates here */}
      <div class="form-floating">
        <input type="password" class="form-control" id="inputConfirmation" placeholder="Confirmation #" onChange={handleChange}/>
        <label for="inputConfirmation">Confirmation #</label>
      </div>
      <div class="form-check my-2">
        <input class="form-check-input" type="checkbox" value="" id="checkReservationSelf" onClick={handleReservationName}/>
        <label class="form-check-label" for="checkReservationSelf">
          The reservation is under my name
        </label>
      </div>
      <div class="form-check mb-2">
        <input class="form-check-input" type="checkbox" value="" id="checkReservationOther" onClick={newNameInputToggle}/>
        <label class="form-check-label" for="checkReservationOther">
          The reservation is under another name
        </label>
      </div>
      { displayNewNameInput ? 
        (<div class="form-floating">
        <input type="password" class="form-control" id="inputReservationName" placeholder="Name on Reservation" onChange={handleReservationName}/>
        <label for="inputReservationName">Name on Reservation</label></div>) 
        : null}
      <button class="btn-save mt-3" type="submit" onClick={handleSubmit}>Save</button>
  </div>
  )

}

function mapStateToProps(state) {
    return{
        hotel: state.account?.h
    }
}

const mapDispatchToProps = {
setHotelData
};

export default connect(mapStateToProps, mapDispatchToProps)(AddHotel)