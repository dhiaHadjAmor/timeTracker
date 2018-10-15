import React from 'react';
import { PropTypes } from 'prop-types';
import moment from 'moment'

const NewTask = ({newTask , onChange , onStart , onPause , onResume , onStop , manually , add}) => {
    return (
        <div  style={{marginTop:30,marginBottom:50, backgroundColor:'#f2f3f4', padding:20, paddingLeft:40 , borderRadius:25}}>
        <div className="row" >
        <div className="col-md-8 input-group" style={{display:'inline-block',float:'left'}}>
        <label>  New Task </label>
        <input type="text" value={newTask.description} className="form-control" name="description" onChange={onChange} />
        </div>
          <div className="col-md-4" style={{display:'inline-block',float:'right'}}>
          {
              !newTask.started?
              <button onClick={onStart} disabled={!newTask.description} style={{marginTop:25}} className="btn btn-primary btn-block">START</button>:
              <div>
                  { 
                    !newTask.stopped?
                    <button onClick={onPause} style={{marginLeft:10}} className="btn btn-primary" >PAUSE</button>:
                    <button onClick={onResume} style={{marginLeft:10}} className="btn btn-primary" >RESUME</button>
                  }
              <button onClick={onStop} style={{marginLeft:10}} className="btn btn-danger">STOP</button>
              <div style={{display: 'inline-block', marginLeft:40 }}>
              <h1>{moment().startOf('day').seconds(newTask.duration).format('H:mm:ss')}</h1>
              </div>
              </div>
              
          }
          </div>
          </div>
          
          <a href="#" onClick={() =>manually('open')} >Or add a task manually</a>
          {newTask.manually?
          <div className="form-row" style={{marginTop:10}}>
          <div className="row">
          <form>
            <div className="col-md-5">
                  <label>Description</label>
                  <input type="text" required value={newTask.description} className="form-control" name="description" onChange={onChange} />
            </div>
            <div className="col-md-2">
            <label>Date</label>
                  <input type="date" required value={newTask.date} className="form-control" name="date" onChange={onChange} />
            </div>
            
            <div className="col-md-1">
            <label>Hours</label>
                  <input type="number" required value={newTask.hours} className="form-control" name="hours" onChange={onChange} />
            </div>

            <div className="col-md-1">
            <label>Minutes</label>
                  <input type="number" required value={newTask.minutes} className="form-control" name="minutes" onChange={onChange} />
            </div>
            <div className="col-md-1">
            <label>Seconds</label>
                  <input type="number" required value={newTask.seconds} className="form-control" name="seconds" onChange={onChange} />
            </div>
            <div className="col-md-1">
          <button type="submit" style={{marginTop:20}} onClick={add} className="form-control btn btn-success">ADD</button>
          
          </div>
          <div className="col-md-1">
          <button style={{marginTop:20}} onClick={() =>manually('close')} className="form-control btn btn-danger">CANCEL</button>
          
          </div>
          </form>
          </div>
         
          </div>
          :null}
          </div>
    )
}

NewTask.propTypes = {
    newTask: PropTypes.object.isRequired,
    onStart : PropTypes.func.isRequired,
    onPause : PropTypes.func.isRequired,
    onResume : PropTypes.func.isRequired,
    onStop : PropTypes.func.isRequired,
}
export default NewTask ;
 


