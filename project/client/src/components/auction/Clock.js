import { connect } from "react-redux";
import React from "react";
class Clock extends React.Component {
    constructor(props) {
        super(props);
        let fixDate = props.theDate// עד איזה זמן
        let currDate = new Date();// מה הזמן כעת
        this.state = { fixDate, diff: fixDate - currDate };
    }

    tick() {
        //מעדכנת את הסטייט
        this.setState((prevState, props) => ({
            diff: prevState.fixDate - (new Date()).getTime(),
        }));
    }
    componentDidMount() {
        //כשהקומפוננטה נטענת נגדיר את פונ' טיק שתתבצע כל שניה
        this.interval = setInterval(() => this.tick(), 1000);
    }
    componentWillUnmount() {
        //כשהקומפוננטה נסגרת נעצור את פעילות הפונ' טיק
        clearInterval(this.interval);
    }

    render() {
        let { diff } = this.state;
        var delta = diff / 1000;

        // calculate (and subtract) whole days
        var days = Math.floor(delta / 86400);
        delta -= days * 86400;

        // calculate (and subtract) whole hours
        var hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;

        // calculate (and subtract) whole minutes
        var mins = Math.floor(delta / 60) % 60;
        delta -= mins * 60;

        // what's left is seconds
        var secs = Math.floor(delta % 60);

        if (diff <= 0) {
            clearInterval(this.interval);
            //אם יעשו ריענון כשהשעון שלילי נרצה שיציג 00:00:00
            days = 0; hours = 0; mins = 0; secs = 0;
        }
        return (
            <div>
                <h2>{String(days).padStart(2, '0')}:{String(hours).padStart(2, '0')}:{String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}</h2>
            </div>
        );
    }

}
const mapStateToProps = (state) => {
    return {
        theDate: state.currentAuction.registrationEndDate
    }
}

export default connect(mapStateToProps, {})(Clock);