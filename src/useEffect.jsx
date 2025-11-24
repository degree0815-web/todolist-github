import { useState, useEffect } from 'react'

// import './App.css'

  // =========== useEffect =========== //

  // 1. 화면이 랜더링 될 때 마다 매번 실행됨

  // useEffect(()=> {
  //   console.log('하이')
  // })


  // 2. 첫 실행 후 리스트 추가될 때만 실행
  useEffect(()=>{
    console.log('리스트 추가됨')
  },[todos]);

  // 3. 첫 랜더링 되었을 때만 실행할 때
  useEffect(()=>{
    console.log('처음만 실행')
  },[]);


const Timer = () => {
    useEffect(()=> {
        const timer = setInterval(()=> {
            console.log('타이머 돌아가는 중 ing...')
        }, 1000);

        return()=> {
            clearInterval(timer);
        }
    });



    return(
        <>
         <p>타이머 시작!</p>
        </>
    )
}




function UseEffect() {

    const [showTimer, setShowTimer] = useState(false);


    return (

    <div>
        {/* showTimer가 true일 때만 <Timer />를 보여줌 */}
        {showTimer && <Timer /> }
        <button onClick = {() =>setShowTimer(!showTimer)}>Button</button>
    </div>
  )
}




export default UseEffect
