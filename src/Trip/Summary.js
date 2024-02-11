import { useState, useEffect } from "react";
import { connect } from "react-redux";

function Summary({...props}) {

    // const [firstName, setFirstName] = useState("Rachel")
    // const [trip, setTrip] = useState(null)


    // useEffect(() => {
    //     const tripData = {
    //         destination: "Hawaii",
    //         date: "August 30th",
    //         daysUntil: 30,
    //     }

    //     setTrip(tripData)
    // }, [])

    return(
<div class="d-flex justify-content-center align-items-center vh-100">
    {console.log(props.travelData)}
    <div class="text-center">
        <h1>Welcome back <span class="fw-bold font-highlights">{props.account?.firstName}</span></h1>
        <h2>Your next trip is to <span class="fw-bold font-highlights">{props.travelData?.country}</span> </h2>
        <h3>Get ready to leave on <span class="fw-bold font-highlights">{props.travelData?.departure}</span></h3>
    </div>
</div>
    )
}

function mapStateToProps(state) {
    return{
        account: state.account?.account,
        travelData: state.account?.activeTrip?.tripSummary,
    }
}

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Summary)