import React, { useContext, useState } from 'react';
import GlobalContext from './GlobalContext';
import '../CSS-Files/Cards.css';
import { format, endOfISOWeek } from 'date-fns';

function Cards() {
  const { goalsArray, setGoalsArray, today } = useContext(GlobalContext);
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
    setGoalsArray(
      goalsArray.map((obj) => {
        if (obj.id === id) {
          return {
            ...obj,

            goalsAmountsArray: obj.goalsAmountsArray.map((weekly) => {
              //checks if the endDate is already gone
              if (
                format(new Date(), 'yyyy-LLL-dd') < weekly.goalEndDate &&
                weekly.y < obj.goalAmount
              ) {
                return {
                  ...weekly,
                  x: weekly.x,
                  y: (weekly.y += 1),
                };
              } else {
                return weekly;
              }
            }),

            todaysAmount: (obj.todaysAmount += 1),
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

  /*goalName: '',
    goalType: '',
    goalAmount: 0,
    goalCheck: false,
    */

  //handle submit card.id yi alıp goals arraydan bir obje çekecek
  //çekilen objenin içindeki goalAmountsArray'e input girdisini push edecek!
  //bottom >>> Daily based objects
  function handleSubmit(id) {
    setGoalsArray(
      goalsArray.map((obj) => {
        // let todaysDate = new Date().toString().split(' ').slice(1, 4).join('/'); //bugünün date ini al

        //submit edildiğinde edilen kartın içindeki todaysStatus'a bakar
        //todays

        if (obj.id === id && obj.todaysStatus === false) {
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
          console.log('Zaten yeni veri girildi!');
          return obj;
        }
      })
    );
  }

  return (
    <div className='row mainRow'>
      {goalsArray.length > 0 &&
        goalsArray.map((card) => {
          //updates everyDay?

          //Bug testi yaparken startDate ve endDate new Date olarak atanamamalı
          let First = '2022-Aug-12';
          let Second = '2022-Aug-13';
          let Third = '2022-Aug-14';
          let Fourth = '2022-Aug-15';
          let Fifth = '2022-Aug-16';
          let Sixth = '2022-Aug-17';
          let Seventh = '2022-Aug-18';
          let Eight = '2022-Aug-19';

          if (
            card.goalType === 'Weekly' &&
            today >
              card.goalsAmountsArray[card.goalsAmountsArray.length - 1]
                .goalEndDate
          ) {
            card.goalsAmountsArray.push({
              goalStartDate: format(new Date(), 'yyyy-LLL-dd'),
              goalEndDate: format(endOfISOWeek(new Date()), 'yyyy-LLL-dd'),
              x: today,
              y: 0,
            });
          }

          if (today !== card.lastCheck) {
            card.todaysAmount = 0;
            card.lastCheck = format(new Date(), 'yyyy-LLL-dd');
          }

          if (card.lastCheck < today) {
            card.todaysStatus = false;
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
                    Todays Amount: {card.todaysAmount}
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
                    Todays Amount: {card.todaysAmount}
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
    </div>
  );
}

export default Cards;
