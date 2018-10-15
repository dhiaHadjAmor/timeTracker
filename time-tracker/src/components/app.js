import React from 'react';
// import HomePage from './home/homePage';
import axios from 'axios';
import { PropTypes } from 'prop-types';
import AllTasks from './allTasks'
import NewTask from './newTask'
import toastr from 'toastr'

    
class App extends React.Component {

    constructor (props) {
        super (props)
        this.state = {
            tasks : [],
            newTask : {
                description:'',
                duration:0,
                started : false ,
                paused : false ,
            }
        }

        this.onChange = this.onChange.bind(this)
        this.onPause = this.onPause.bind(this)
        this.onResume = this.onResume.bind(this)
        this.onStart = this.onStart.bind(this)
        this.onStop = this.onStop.bind(this)
        this.add = this.add.bind(this)
        this.manually = this.manually.bind(this)
        this.interval
    }
    
    componentDidMount () {
        this.loadTasks()
    }

    initState () {
        this.setState({ newTask : {
            description:'',
            duration:0,
            started : false ,
            paused : false ,
            }
            });
    }

    loadTasks () {
        axios.get(`http://localhost:3000/tasks`)
        .then(res => {
          const tasks = res.data.tasks;
          console.log(res.data)
          this.setState({ tasks });
        })
    }

    onChange (e) {
        e.persist();
        const field = e.target.name 
        let newTask = Object.assign({},this.state.newTask)
        newTask[field]= e.target.value
        this.setState({newTask})
        console.log(this.state.newTask)
    }
    
    onStart () {
        this.setState(prevState => ({
            newTask: {...prevState.newTask,
                started: true
            }
        }))
        console.log(this.state.newTask)
        if (!this.state.newTask.stopped) {
                this.interval  = setInterval( () => {
                    this.setState(prevState => ({
                        newTask: {...prevState.newTask,
                            duration: prevState.newTask.duration + 1
                        }
                    }))
                    console.log(this.state.newTask)
              }, 1000);
        }
    }

    manually (option) {
        if(option == 'open')
        {
            this.setState(prevState => ({
                newTask: {...prevState.newTask,
                    manually: true
                }
            }))
        }
        else if  (option == 'close'){
            this.setState(prevState => ({
                newTask: {...prevState.newTask,
                    manually: false
                }
            }))
        }
           
            console.log(this.state.newTask)
    }

    add () {
        console.log(this.state.newTask)
        let duration =0 
        duration = parseInt(this.state.newTask.hours*3600) + parseInt(this.state.newTask.minutes*60) + parseInt(this.state.newTask.seconds)
       let task = { duration , description:this.state.newTask.description , date: this.state.newTask.date }

        axios.post(`http://localhost:3000/task`, task)
          .then(res => {
            console.log(res);
            console.log(res.data);
            toastr.success('New task saved')
            this.loadTasks()
          })
          .catch(err => {
            toastr.error('You should verify all the fields !')
          })

          this.initState()
    }

    onPause () {
        this.setState(prevState => ({
            newTask: {...prevState.newTask,
                stopped : true
            }
        }))
        clearInterval(this.interval);
    }

    onResume () {
        this.setState(prevState => ({
            newTask: {...prevState.newTask,
                stopped : false
            }
        }))
            this.interval  = setInterval(() => {
             this.setState(prevState => ({
                newTask: {...prevState.newTask,
                    duration : prevState.newTask.duration + 1
                }
            }))
            console.log(this.state.newTask)
          }, 1000);
    }

    onStop () {
        
        this.setState(prevState => ({
            newTask: {...prevState.newTask,
                started : false,
                paused : false
            }
        }))
        clearInterval(this.interval);
        console.log(this.state.newTask)

        let task = { duration:this.state.newTask.duration , description:this.state.newTask.description , date: new Date() }

        axios.post(`http://localhost:3000/task`, task)
          .then(res => {
            console.log(res);
            console.log(res.data);
            this.loadTasks()
          })

          this.initState()
        }
        


    //   handleSubmit = event => {
    //     event.preventDefault();
    
    //     const user = {
    //       name: this.state.name
    //     };
    
    //     axios.post(`https://jsonplaceholder.typicode.com/users`, { user })
    //       .then(res => {
    //         console.log(res);
    //         console.log(res.data);
    //       })
    //     }

    render (){
        return (
            
            <div className="container">
            <h1 style={{textAlign:"center"}}>Time Tracker</h1>
            <NewTask newTask={this.state.newTask} onChange={this.onChange} onPause={this.onPause} onResume={this.onResume} onStart={this.onStart} onStop={this.onStop} manually={this.manually} add={this.add}/>
            <AllTasks tasks={this.state.tasks}/>
            </div>
        );
    }
}


export default App;
