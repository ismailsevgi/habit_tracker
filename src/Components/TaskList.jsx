import React, { useContext } from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import GlobalContext from './GlobalContext';

function TaskList() {
  const { notesArray, setNotesArray, setToastMsg } = useContext(GlobalContext);

  function handleDelete(id, priority) {
    if (priority === 'High') {
      setNotesArray((notesArray) => {
        return {
          ...notesArray,
          high: notesArray.high.filter((obj) => id !== obj.id),
        };
      });
    } else if (priority === 'Middle') {
      setNotesArray((notesArray) => {
        return {
          ...notesArray,
          middle: notesArray.middle.filter((obj) => id !== obj.id),
        };
      });
    } else {
      setNotesArray((notesArray) => {
        return {
          ...notesArray,
          low: notesArray.low.filter((obj) => id !== obj.id),
        };
      });
    }

    const x = document.getElementById('toast');
    setToastMsg('Task is deleted!');
    x.className = 'show';

    setTimeout(function () {
      x.className = x.className.replace('show', '');
    }, 3000);
  }

  return (
    <Container>
      <div id='highLabel' className='col-9 offset-2 labels'>
        High Priority Tasks
      </div>

      {notesArray.high.length > 0 &&
        notesArray.high.map((task) => {
          return (
            <Row key={task.id} className='taskRow'>
              <div id='taskComp' className='col-1 offset-3'>
                <i class='fa-solid fa-check'></i>
                <button onClick={() => handleDelete(task.id, task.priority)}>
                  <i class='fa-regular fa-trash-can'></i>
                </button>
              </div>
              <Col className='taskCol highTask' sm={{ span: 7 }}>
                <div className='titleSide'>
                  <div>{task.taskTitle}</div>
                  <div>Description: {task.description}</div>
                </div>

                <div className='dateSide'>
                  <div>
                    Date: {task.startDate}--{task.endDate}
                  </div>
                </div>
              </Col>
            </Row>
          );
        })}

      <div id='middleLabel' className='col-9 offset-2 labels'>
        Middle Priority Tasks
      </div>
      {notesArray.middle.length > 0 &&
        notesArray.middle.map((task) => {
          return (
            <Row key={task.id} className='taskRow'>
              <div id='taskComp' className='col-1 offset-3'>
                <i class='fa-solid fa-check'></i>
                <button onClick={() => handleDelete(task.id, task.priority)}>
                  <i class='fa-regular fa-trash-can'></i>
                </button>
              </div>
              <Col className='taskCol middleTask' sm={{ span: 7 }}>
                <div className='titleSide'>
                  <div>{task.taskTitle}</div>
                  <div>Description: {task.description}</div>
                </div>

                <div className='dateSide'>
                  <div>
                    Date: {task.startDate}--{task.endDate}
                  </div>
                </div>
              </Col>
            </Row>
          );
        })}
      <div id='lowLabel' className='col-9 offset-2 labels'>
        Low Priority Tasks
      </div>
      {notesArray.low.length > 0 &&
        notesArray.low.map((task) => {
          return (
            <Row key={task.id} className='taskRow'>
              <div id='taskComp' className='col-1 offset-3'>
                <i class='fa-solid fa-check'></i>
                <button onClick={() => handleDelete(task.id, task.priority)}>
                  <i class='fa-regular fa-trash-can'></i>
                </button>
              </div>
              <Col className='taskCol lowTask' sm={{ span: 7 }}>
                <div className='titleSide'>
                  <div>{task.taskTitle}</div>
                  <div>Description: {task.description}</div>
                </div>

                <div className='dateSide'>
                  <div>
                    Date: {task.startDate}--{task.endDate}
                  </div>
                </div>
              </Col>
            </Row>
          );
        })}
    </Container>
  );
}

export default TaskList;
