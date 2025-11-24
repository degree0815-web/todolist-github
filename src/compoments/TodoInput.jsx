import { useState } from 'react'

function TodoInput({ onAdd }) {
  const [newText, setNewText] = useState("");
  function addNewText() {
    // trim()
    if (newText.trim() === "") {
      return setNewText("")
    }
    onAdd(newText);
    setNewText("");
  }


  // keyPress, keydown, keyUp
  // enter 키 이벤트 처리
  function keyDown(e) {
    if(e.key === 'Enter') {
      addNewText()
    }
  }
  
  return (
    <div >
      <h2 className='list-title'>할 일 추가</h2>
      <div className='input-wrap'>
        <input type="text" placeholder='할 일을 입력해주세요' value={newText} onChange={(e) => setNewText(e.target.value)} className='input-add' onKeyDown={keyDown} />
        <button onClick={addNewText} className='btn'>추가</button>
      </div>
    </div >
  )
}

export default TodoInput 