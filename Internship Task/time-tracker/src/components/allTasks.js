
    //     <ul>
    //     <li></li>
    //     { tasks.map(task =>
    //          <li>{task.description} {moment(task.date).format("DD/MM/YYYY")} {moment().startOf('day').seconds(task.duration).format('H:mm:ss')}</li>
    //          )}
    //   </ul>
    import React from 'react';
    import { PropTypes } from 'prop-types';
    import moment from 'moment'
    import {BootstrapTable , TableHeaderColumn} from 'react-bootstrap-table'
    
    function formatDate(cell, row){
        return  (moment(cell).format("DD/MM/YYYY"))
    }

    function formatTime(cell, row){
        return  (moment().startOf('day').seconds(cell).format('H:mm:ss'))
    }

    const AllTasks = ({tasks}) => {
        return (
            <BootstrapTable
            data={tasks}
            // selectRow={selectRowProp}
            striped
            hover
            condensed
            pagination
            search
          >
            <TableHeaderColumn headerAlign="center" dataAlign="left" width="50%" dataField="description" isKey dataAlign="right" dataSort>Description</TableHeaderColumn>
            <TableHeaderColumn headerAlign="center" dataAlign="left" width="25%" dataField="date" dataAlign="center" dataFormat={formatDate}>Date</TableHeaderColumn>
            <TableHeaderColumn headerAlign="center" dataAlign="left" width="25%" dataField="duration" dataSort dataFormat={formatTime}>Duration</TableHeaderColumn>
          </BootstrapTable>
        )
    }
    
    AllTasks.propTypes = {
        tasks: PropTypes.array.isRequired
    }
    export default AllTasks ;
     