import React from 'react';
import { Row, Container, Col } from 'react-bootstrap';

function TaskList() {
  let fakeNotesArray = [
    [
      {
        taskTitle: 'A',
        description: 'A',
        priority: 'High',
      },
      {
        taskTitle: 'B',
        description: 'B',
        priority: 'High',
      },
    ],
    [
      {
        taskTitle: 'C',
        description: 'C',
        priority: 'Middle',
      },
      {
        taskTitle: 'D',
        description: 'D',
        priority: 'Middle',
      },
    ],
    [
      {
        taskTitle: 'E',
        description: 'E',
        priority: 'Low',
      },
      {
        taskTitle: 'F',
        description: 'F',
        priority: 'Low',
      },
      {
        taskTitle: 'G',
        description: 'G',
        priority: 'Low',
      },
    ],
  ];

  return (
    <Container>
      <div className='col-9 offset-2 labels'>High</div>
      <Row>
        {fakeNotesArray[0].map((task) => {
          return (
            <Col sm={{ span: 9, offset: 3 }}>
              <div>{task.taskTitle}</div>
              <div>{task.description}</div>
            </Col>
          );
        })}
      </Row>
      <div className='col-9 offset-2 labels'>Middle</div>
      <Row>
        <Col sm={{ span: 9, offset: 3 }}>3</Col>
        <Col sm={{ span: 9, offset: 3 }}>4</Col>
      </Row>
      <div className='col-9 offset-2 labels'>Low</div>
      <Row>
        <Col sm={{ span: 9, offset: 3 }}>5</Col>
        <Col sm={{ span: 9, offset: 3 }}>6</Col>
      </Row>
    </Container>
  );
}

export default TaskList;
