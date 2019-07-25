import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './styles.css';
import deleteimg from '../../resources/trash.png';


export default class Task extends Component {
    static propTypes = {
        removeTask: PropTypes.func.isRequired,
        id: PropTypes.number.isRequired,
        body: PropTypes.string.isRequired,
        isChecked: PropTypes.bool.isRequired,
    };

    handleDeleteClick = () => {
        const { idList, id, removeTask } = this.props;
        removeTask(idList, id);
    }

    handleCheckClick = () => {
        const {
            idList, id, checkTask, isChecked,
        } = this.props;
        checkTask(idList, id, !isChecked);
    }

    render() {
        const { id, body, isChecked } = this.props;
        return (
            <div className="row" key={id}>
                <div className="row-content">
                    <input className="checkbox" type="checkbox" id="task_1" name="task_1" checked={isChecked} onClick={this.handleCheckClick} />
                    <div>{body}</div>
                </div>
                <img onClick={this.handleDeleteClick} className="delete-task-icon" alt="Delete" src={deleteimg} />
            </div>
        );
    }
}
