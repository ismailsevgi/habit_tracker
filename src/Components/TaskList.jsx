import React, { useContext } from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import GlobalContext from './GlobalContext';

function TaskList() {
  const { notesArray } = useContext(GlobalContext);

  return (
    <Container>
      <div id='highLabel' className='col-9 offset-2 labels'>
        High
      </div>

      {notesArray.high.length > 0 &&
        notesArray.high.map((task) => {
          return (
            <Row className='taskRow'>
              <div id='taskComp' className='col-1 offset-3'>
                <i>O</i>
                <i>X</i>
              </div>
              <Col className='taskCol highTask' sm={{ span: 8 }}>
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
        Middle
      </div>
      {notesArray.middle.length > 0 &&
        notesArray.middle.map((task) => {
          return (
            <Row className='taskRow'>
              <div id='taskComp' className='col-1 offset-3'>
                <i>O</i>
                <i>X</i>
              </div>
              <Col className='taskCol middleTask' sm={{ span: 8 }}>
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
        Low
      </div>
      {notesArray.low.length > 0 &&
        notesArray.low.map((task) => {
          return (
            <Row className='taskRow'>
              <div id='taskComp' className='col-1 offset-3'>
                <i>O</i>
                <i>X</i>
              </div>
              <Col className='taskCol lowTask' sm={{ span: 8 }}>
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
