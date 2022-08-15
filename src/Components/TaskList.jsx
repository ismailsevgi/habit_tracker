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
      <Row>
        {notesArray[0].length > 0 &&
          notesArray[0].map((task) => {
            return (
              <Col className='taskCol highTask' sm={{ span: 8, offset: 3 }}>
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
            );
          })}
      </Row>
      <div id='middleLabel' className='col-9 offset-2 labels'>
        Middle
      </div>
      <Row>
        {notesArray[1].length > 0 &&
          notesArray[1].map((task) => {
            return (
              <Col className='taskCol middleTask' sm={{ span: 8, offset: 3 }}>
                <div className='titleSide'>
                  <div>{task.taskTitle}</div>
                  <div>Description: {task.description}</div>
                </div>
                <div className='dateSide'>
                  <div>Stating Date: {task.startDate}</div>
                  <div>Ending Date: {task.endDate}</div>
                </div>
              </Col>
            );
          })}
      </Row>
      <div id='lowLabel' className='col-9 offset-2 labels'>
        Low
      </div>
      <Row>
        {notesArray[2].length > 0 &&
          notesArray[2].map((task) => {
            return (
              <Col className='taskCol lowTask' sm={{ span: 8, offset: 3 }}>
                <div className='titleSide'>
                  <div>{task.taskTitle}</div>
                  <div>Description: {task.description}</div>
                </div>
                <div className='dateSide'>
                  <div>Stating Date: {task.startDate}</div>
                  <div>Ending Date: {task.endDate}</div>
                </div>
              </Col>
            );
          })}
      </Row>
    </Container>
  );
}

export default TaskList;
