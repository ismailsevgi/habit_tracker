import React, { useContext, useState } from 'react';
import GlobalContext from './GlobalContext';
import '../CSS-Files/Cards.css';
import { format, endOfISOWeek, nextMonday } from 'date-fns';
import { Alert } from 'bootstrap';
import Toast from './Toast';

function Cards() {
  const { goalsArray, setGoalsArray, today, thisWeek, toastMsg, setToastMsg } =
    useContext(GlobalContext);
  const [inputAmount, setInputAmount] = useState(null);

  function handleDelete(id) {
    setGoalsArray(
      goalsArray.filter((obj) => {
        return obj.id !== id;
      })
    );
  }

  //Changes the goal's status today
  //Handling the progress button. Increases the y
  //bottom >>> weekly based objects
  function handleProgress(id) {
    function handleArray(arr, amount, time) {
      if (thisWeek === time) {
        arr.pop();
        arr.push(amount + 1);
        return arr;
      } else {
        arr.push(amount + 1);
        return arr;
      }
    }

    setGoalsArray(
      goalsArray.map((obj) => {
        if (obj.id === id) {
          console.log(obj);
          return {
            ...obj,
            lastCheck: today,
            todaysAmount: obj.todaysAmount + 1,
            goalsAmountsArray: handleArray(
              obj.goalsAmountsArray,
              obj.todaysAmount,
              obj.checkWeek
            ),
          };
        } else {
          return obj;
        }
      })
    );
  }

  //Aşağıdaki ise Amount type türündeki objelere gönderilecek değerin

  function handleInputAmount(e) {
    const { value } = e.target;
    setInputAmount(value);
  }

  //handle submit card.id yi alıp goals arraydan bir obje çekecek
  //çekilen objenin içindeki goalAmountsArray'e input girdisini push edecek!
  //bottom >>> Daily based objects
  function handleSubmit(id) {
    setGoalsArray(
      goalsArray.map((obj) => {
        // let todaysDate = new Date().toString().split(' ').slice(1, 4).join('/'); //bugünün date ini al

        //submit edildiğinde edilen kartın içindeki todaysStatus'a bakar
        //todays

        if (obj.id === id && obj.todaysStatus == false) {
          return {
            ...obj,
            lastCheck: today,
            todaysStatus: true,
            goalsAmountsArray: [
              ...obj.goalsAmountsArray,
              { x: today, y: inputAmount },
            ],
            todaysAmount: inputAmount,
            //inputa girilen veriyi ekliyor.
          };
        } else {
          const x = document.getElementById('toast');
          setToastMsg("You already set today's amount!");
          x.className = 'show';

          setTimeout(function () {
            x.className = x.className.replace('show', '');
          }, 3000);
          return obj;
        }
      })
    );
  }

  console.log('GoalsArray', goalsArray);

  return (
    <div className='row mainRow'>
      {goalsArray.length > 0 &&
        goalsArray.map((card) => {
          if (today !== card.lastCheck) {
            card.todaysAmount = 0;
            card.todaysStatus = false;
          }

          if (card.goalType === 'Weekly' && thisWeek !== card.checkWeek) {
            card.checkWeek = thisWeek;
            card.currentWeek = card.currentWeek + 1;
            card.weekLabels.push(`Week ${card.currentWeek}`);
            card.goalsAmountsArray.push(0);
          }

          return (
            <div
              key={card.id}
              className='col-3 card'
              style={{ backgroundColor: `${card.colorType}` }}
            >
              <div
                className='row titleRow'
                style={{ backgroundColor: `${card.colorType}` }}
              >
                <p
                  className='col-6'
                  style={{ backgroundColor: `${card.colorType}` }}
                >
                  {card.goalName}
                </p>
                <button
                  className='col card--delete'
                  onClick={() => handleDelete(card.id)}
                >
                  <i className='fa-solid fa-trash'></i>
                </button>
              </div>
              {card.goalType === 'Weekly' ? (
                <div
                  className='row bottomRow'
                  style={{
                    backgroundColor: `${card.colorType}`,
                  }}
                >
                  <p
                    style={{
                      backgroundColor: `${card.colorType}`,
                    }}
                    className='col-12 weeklyGoal'
                  >
                    Weekly Goal: {card.goalAmount}
                  </p>
                  <p
                    className='col-12 dailyGoal'
                    style={{
                      backgroundColor: `${card.colorType}`,
                    }}
                  >
                    Today: {card.todaysAmount}
                  </p>

                  <div className='col-8 progressDiv offset-2 mt-2 mb-2'>
                    <button
                      onClick={() => {
                        handleProgress(card.id);
                      }}
                    >
                      Progress:
                      {
                        card.goalsAmountsArray[
                          card.goalsAmountsArray.length - 1
                        ].y
                      }
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className='row bottomRow'
                  style={{
                    backgroundColor: `${card.colorType}`,
                  }}
                >
                  <p
                    style={{
                      backgroundColor: `${card.colorType}`,
                    }}
                    className='col-12 weeklyGoal'
                  >
                    Daily Goal: {card.goalAmount}
                  </p>
                  <p
                    className='col-12 dailyGoal'
                    style={{
                      backgroundColor: `${card.colorType}`,
                    }}
                  >
                    Today: {card.todaysAmount}
                  </p>

                  <div
                    className='col-12 submitDiv mt-2 mb-2'
                    style={{
                      backgroundColor: `${card.colorType}`,
                    }}
                  >
                    <input
                      id='submitDivInput'
                      placeholder="Today's amount..."
                      onChange={handleInputAmount}
                    />
                    <button
                      onClick={() => {
                        handleSubmit(card.id);
                      }}
                    >
                      SUBMIT
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      <Toast toastMsg={toastMsg} />
    </div>
  );
}

export default Cards;
