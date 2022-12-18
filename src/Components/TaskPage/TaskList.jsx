import React, { useContext } from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import GlobalContext from '../Context/GlobalContext';

function TaskList() {
  const { notesArray, setNotesArray, setToastMsg } = useContext(GlobalContext);

  function handleDelete(id, priority, type) {
    if (priority === 'High') {
      setNotesArray((notesArray) => {
        if (type === 'check') {
          setToastMsg('Task is finished!');
          return {
            ...notesArray,
            done: [
              ...notesArray.done,
              ...notesArray.high.filter((obj) => {
                if (id === obj.id) {
                  return {
                    ...obj,
                    priority: (obj.priority = 'Done'),
                  };
                }
              }),
            ],
            high: notesArray.high.filter((obj) => id !== obj.id),
          };
        } else {
          setToastMsg('Task is deleted!');
          return {
            ...notesArray,
            high: notesArray.high.filter((obj) => id !== obj.id),
          };
        }
      });
    } else if (priority === 'Middle') {
      setNotesArray((notesArray) => {
        if (type === 'check') {
          setToastMsg('Task is finished!');
          return {
            ...notesArray,
            done: [
              ...notesArray.done,
              ...notesArray.middle.filter((obj) => {
                if (id === obj.id) {
                  return {
                    ...obj,
                    priority: (obj.priority = 'Done'),
                  };
                }
              }),
            ],
            middle: notesArray.middle.filter((obj) => id !== obj.id),
          };
        } else {
          setToastMsg('Task is deleted!');
          return {
            ...notesArray,
            middle: notesArray.middle.filter((obj) => id !== obj.id),
          };
        }
      });
    } else if (priority === 'Low') {
      setNotesArray((notesArray) => {
        if (type === 'check') {
          setToastMsg('Task is finished!');
          return {
            ...notesArray,
            done: [
              ...notesArray.done,
              ...notesArray.low.filter((obj) => {
                if (id === obj.id) {
                  return {
                    ...obj,
                    priority: (obj.priority = 'Done'),
                  };
                }
              }),
            ],
            low: notesArray.low.filter((obj) => id !== obj.id),
          };
        } else {
          setToastMsg('Task is deleted!');
          return {
            ...notesArray,
            low: notesArray.low.filter((obj) => id !== obj.id),
          };
        }
      });
    } else {
      setToastMsg('Task is deleted!');
      setNotesArray((notesArray) => {
        return {
          ...notesArray,
          done: notesArray.done.filter((obj) => id !== obj.id),
        };
      });
    }

    const x = document.getElementById('toast');

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
              <div id='taskComp' className='col-1 offset-3 taskCompHigh'>
                <button
                  onClick={() => handleDelete(task.id, task.priority, 'check')}
                >
                  <i class='fa-solid fa-check'></i>
                </button>

                <button
                  onClick={() => handleDelete(task.id, task.priority, 'delete')}
                >
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
              <div id='taskComp' className='col-1 offset-3 taskCompMiddle'>
                <button
                  onClick={() => handleDelete(task.id, task.priority, 'check')}
                >
                  <i class='fa-solid fa-check'></i>
                </button>
                <button
                  onClick={() => handleDelete(task.id, task.priority, 'delete')}
                >
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
              <div id='taskComp' className='col-1 offset-3 taskCompLow'>
                <button
                  onClick={() => handleDelete(task.id, task.priority, 'check')}
                >
                  <i class='fa-solid fa-check'></i>
                </button>

                <button
                  onClick={() => handleDelete(task.id, task.priority, 'delete')}
                >
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
      <div id='doneLabel' className='col-9 offset-2 labels'>
        Finished Tasks
      </div>
      {notesArray.done.length > 0 &&
        notesArray.done.map((task) => {
          return (
            <Row key={task.id} className='taskRow'>
              <div id='taskComp' className='col-1 offset-3 taskCompDone'>
                <button
                  onClick={() => handleDelete(task.id, task.priority, 'delete')}
                >
                  <i class='fa-regular fa-trash-can'></i>
                </button>
              </div>
              <Col className='taskCol doneTask' sm={{ span: 7 }}>
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
