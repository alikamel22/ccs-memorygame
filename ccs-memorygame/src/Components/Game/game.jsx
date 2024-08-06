import {useState, useEffect} from 'react';
import _ from 'lodash';
import './game.css'
function Game() {

    const [selectedNofcards, setSelectedNofcards] = useState(10);
    const [isStartButtonClicked, setIsStartButtonClicked] = useState(false);
    const [isDifficultySelected, setIsDifficultySelected] = useState(false);
    const [listofCards, setListofCards] = useState([]);
    const [countOpencards, setCountOpencards] = useState(0);
    const [countScore, setCountScore] = useState(0);
    const [clickCarta, setClickCarta] = useState({});
    const [previousItem, setPreviousItem] = useState(null);
    const [currentItem, setCurrentItem] = useState(null);
    const [previousIndex, setPreviousIndex] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [usedCards, setUsedCards] = useState([]);
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [totalPoints, setTotalPoints] = useState(10);

    useEffect(() => {
        if (isRunning) {
            const id = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
            return () => clearInterval(id);
                                }
                                }, [isRunning]);



    function handleSelectNofcards (event)  {

        setSelectedNofcards(Number(event.target.value));
        setTotalPoints(Number(event.target.value));
      
    }


    function handleCreateCards () {
        setIsRunning(true);
        setIsStartButtonClicked(true);
        setIsDifficultySelected(true);
        const newCardsArray = [];
        for (let i = 1; i <= selectedNofcards; i++) {
            newCardsArray.push(i);
        }
        const newCardsArrayDouble = newCardsArray.flatMap(item => [item,item]);
        const newCardsArrayShuffled = _.shuffle(newCardsArrayDouble)
        setListofCards(newCardsArrayShuffled);
    }


    function handleResetGame () {
        setListofCards([]);
        setSelectedNofcards(10);
        setCountOpencards(0);
        setCountScore(0);
        setClickCarta({});
        setPreviousItem(null);
        setCurrentItem(null);
        setPreviousIndex(null);
        setCurrentIndex(null);
        setUsedCards([]);
        setTime(0);
        setIsRunning(false);
        setTotalPoints(10);
        setIsStartButtonClicked(false);
        setIsDifficultySelected(false);
    }



    useEffect(() => {
        if (countScore === totalPoints) {
            setIsRunning(false);
        }
    }, [countScore]);

    function handleClickCarta (index, item) {
        if (!usedCards.includes(item) && index != previousIndex) {

            if (countOpencards == 0) {
                setCountOpencards(c => c+1);
                setClickCarta(c => ({...c, [index]: true}));
                setPreviousItem(item);
                setPreviousIndex(index);
            }

            else if (countOpencards == 1) {
                setCountOpencards(c => c+1);
                setClickCarta(c => ({...c, [index]: true}));
                setCurrentItem(item);
                setCurrentIndex(index);
                

                if (previousItem == item) {
                    setCountOpencards(0);
                    setUsedCards(u => [...u, item]);
                    setPreviousIndex(null);
                    setCurrentIndex(null);
                    setCountScore(c => c+1)
                }
                else {
                    setTimeout(() => {
                    setClickCarta(c => ({...c, [index]: false}));
                    setClickCarta(c => ({...c, [previousIndex]: false}));
                    setPreviousIndex(null);
                    setCurrentIndex(null);
                    setCountOpencards(0);
                    }, 1000);
    
                }

            }
        }
    }



    return(

        <div className= "gamecontainer">
            <div className= "cabecalho">
                <div className= "dificuldadebloco">
                <p>Select Difficulty:</p>
                <select value={selectedNofcards} onChange={handleSelectNofcards} disabled={isDifficultySelected} className="dificuldadedrop">
                    <option value={10}>Easy</option>
                    <option value={15}>Medium</option>
                    <option value={20}>Hard</option>
                </select>
                </div>

                <button className="startgame" onClick={handleCreateCards} disabled={isStartButtonClicked}>Start</button>
                <button className= "reset" onClick= {handleResetGame}>Reset game</button>

                <p>Time: {time}</p>
                <p>Score: {countScore}</p>

            </div>

            <div className= "cardscontainer">

                <div className= "cardscontainer2">
                    {listofCards.map((item) => (

                        <button
                        key={`f${item}`}
                        className= "cartafrente"
                        style= {{
                            backgroundImage: `url('/assets/card_${item}.jpg')`, // Adjusted path to assume the public folder
                            width: '150px',
                            height: '250px',
                            backgroundSize: '100% 100%', // Use 'cover' to ensure the image covers the button
                            backgroundRepeat: 'no-repeat', // Prevent the image from repeating
                            backgroundPosition: 'center' // Center the image
                        }}>

                        </button>
        
                    ))}
                </div>


                 <div className= "cardscontainer2" >
                    {listofCards.map((item, index) => (
                        <button
                        key={item}
                        className= "cartatraseira"
                        onClick= {() => handleClickCarta(index, item)}
                        style= {{
                            backgroundImage: `url('/assets/carta_traseira.jpg')`, // Adjusted path to assume the public folder
                            opacity: clickCarta[index] ? 0 : 1,
                            width: '150px',
                            height: '250px',
                            backgroundSize: '100% 100%', // Use 'cover' to ensure the image covers the button
                            backgroundRepeat: 'no-repeat', // Prevent the image from repeating
                            backgroundPosition: 'center', // Center the image
                            transition: 'opacity 0.2s ease'
                        }}>

                        </button>
        
                    ))}
                </div>

            </div>

        </div>
    
                );

}

export default Game;