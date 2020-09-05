import React, {Component} from 'react';
import styles from'../css/ReactClock.module.css';

class ReactClock extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            time : new Date(),
            value : new Date(),
            hoursEdit : false,
            minutesEdit : false,
            secondsEdit : false
        }
    }
    startInterval()
    {
        return setInterval(() => {
            let value = new Date(this.state.time);
            value.setSeconds(value.getSeconds()+1);
            this.setState({time: value});
        }, 1000);
    }

    componentDidMount() {
        this.interval = this.startInterval();
      }
      
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    editHours()
    {
        if(!this.state.hoursEdit && !this.state.minutesEdit && !this.state.secondsEdit)
        {
            clearInterval(this.interval);
            this.setState({
                hoursEdit : true
            });
        }
    }
    setHours(event)
    {
        let currTime = new Date(this.state.time);
        if(event.target.value>=0 && event.target.value<=23)
        {
            currTime.setHours(event.target.value);
        }
        else
        {
            currTime.setHours(23);
        }
        this.setState({
            time: currTime
        });
    }

    editMinutes()
    {
        if(!this.state.hoursEdit && !this.state.minutesEdit && !this.state.secondsEdit)
        {
            clearInterval(this.interval);
            this.setState({
                minutesEdit : true
            });
        }
    }

    setMinutes(event)
    {
        if(event.target.value>=0 && event.target.value<=59)
        {
            let currTime = new Date(this.state.time);
            currTime.setMinutes(event.target.value);
            this.setState({
                time: currTime
            });
        }
    }

    editSeconds()
    {
        if(!this.state.hoursEdit && !this.state.minutesEdit && !this.state.secondsEdit)
        {
            clearInterval(this.interval);
            this.setState({
                secondsEdit : true
            });
        }
    }

    setSeconds(event)
    {
        if(event.target.value>=0 && event.target.value<=59)
        {
            let currTime = new Date(this.state.time);
            currTime.setSeconds(event.target.value);
            this.setState({
                time: currTime
            });
        }
    }

    confirmTime(event, check=false)
    {
        if(event.key === "Enter" || check)
        {
            this.setState({
                hoursEdit : false,
                minutesEdit : false,
                secondsEdit : false
            });
            this.interval = this.startInterval();
        }
    }

    format(num, check = false)
    {
        if(check===true)
        {
            if(num>12)num-=12;
        }
        let str = num.toString();
        if(str.length===1)
        {
            str = "0" + str;
        }
        return str;
    }

    render(){
        return(
        <div className={styles.clock_container}>
          <div>Lodon Clock</div>
        {!this.state.hoursEdit ? <div className={styles.clock} onClick={() => this.editHours()}>{this.format(this.state.time.getHours(),true)}</div> : 
                     <div className={styles.clock}>
                     <input className={styles.inputNumber} value={this.state.time.getHours()} 
                     onChange={(e)=> this.setHours(e)} onKeyDown={(e) => this.confirmTime(e)} 
                     onBlur={(e) => this.confirmTime(e,true)} type="number" min="0" max="23"/></div>}:
        {!this.state.minutesEdit ? <div className={styles.clock} onClick={() => this.editMinutes()}>{this.format(this.state.time.getMinutes())}</div> :
                     <div className={styles.clock}>
                     <input className={styles.inputNumber} value={this.state.time.getMinutes()} 
                     onChange={(e)=> this.setMinutes(e)} onKeyDown={(e) => this.confirmTime(e)} 
                     onBlur={(e) => this.confirmTime(e,true)} type="number" min="0" max="59"/></div>}:
        {!this.state.secondsEdit ? <div className={styles.clock} onClick={() => this.editSeconds()}>{this.format(this.state.time.getSeconds())}</div> :
                     <div className={styles.clock}>
                     <input className={styles.inputNumber} value={this.state.time.getSeconds()} 
                     onChange={(e)=> this.setSeconds(e)} onKeyDown={(e) => this.confirmTime(e)} 
                     onBlur={(e) => this.confirmTime(e,true)} type="number" min="0" max="59"/></div>}&nbsp;
        {<div className={styles.clock}>{this.state.time.getHours()<12? "AM" : "PM"}</div>}
        </div>
        );
    }
}
export default ReactClock;