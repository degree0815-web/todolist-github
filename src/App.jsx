import { useEffect, useState } from 'react'
import TodoList from './compoments/TodoList';
import TodoInput from './compoments/TodoInput';
import './App.css'

function App() {
  // const [todos, setTodos] = useState([]);
  const [todos, setTodos] = useState(()=> {
    // 로컬 스토리지에 todos 라는 이름으로 저장된게 있는지 확인
    const saved = localStorage.getItem("todos");

    if(saved) {
      // JSON 문자열을 다시 객체 또는 배열로 변환해서 반환
      return JSON.parse(saved)
    }
    // 없으면 빈 배열 반환
    return []
  });


  // todos 상태가 바뀔 때마다 로컬스토리지에 저장
  useEffect(()=> {
    // 원래 배열 & 객체를 문자열로 바꿔서 저장
    localStorage.setItem("todos", JSON.stringify(todos));
  });


  function addTodo(newTodo) {
    setTodos([
      ...todos, 
      {
        // UUID : 겹치지 않는 고유한 ID를 만들 때 사용
        id: crypto.randomUUID(),
        text: newTodo,
        done: false,
        isEditing: false
      }
    ]);
    // 새 항목 추가 시 완료 상태는 false(미완료)
  }


  // 수정모드 전환 함수 (수정 버튼 클릭 시)
  function toggleEdit(id){
    const edittodos = todos.map((item)=> {
      if(item.id === id) {
        return {...item, isEditing : !item.isEditing}
      }
      return item;
    });
    setTodos(edittodos)
  }

  // 수정 완료 함수 (저장 버튼 클릭 시)
  function updateTodo(id, newText){
    const updateTodos = todos.map((item)=> {
      if(item.id === id) {
        return{
          ...item,
          text: newText,
          isEditing: false
          // 텍스트를 변경 + isEdit상태를 false로 변경
        }
      }
      return item;
    });
    setTodos(updateTodos);
  };


  // 할 일 완료 상태(체크박스)
  function toggleTodo(id) {
    const newTodos = todos.map((item)=>{
      if(item.id === id) {  // 해당 id가 내가 클릭한 id면 
        return {...item, done: !item.done} // 원래 내용은 그대로 두고 done 속성만 반대로 바꿔줌
      }
      return item;
    });

    setTodos(newTodos) // 새 배열로 상태 업데이트
  }




  // 할 일 삭제 함수
  // function deleteTodo(deleteIndex) {

  //   const newTodos = [...todos] // 기존 배열을 그대로 복사
  //   newTodos.splice(deleteIndex, 1) // 클릭한 deleteIndex 1개를 삭제
  //   setTodos(newTodos) // 새 배열로 상태를 업데이트

  // }

  // filter 함수로 변경
  function deleteTodo(id) {
    // const newTodos = todos.filter((item, index)=> index !== deleteIndex);
    // setTodos(newTodos)

    // 한줄로 쓰면
    setTodos(todos.filter((item) => item.id !== id));
    // 이 자리에 값(item)이 있지만, 우린 안쓸거에요~
    // 즉 값(item)은 필요없고 위치(index)만 필요할 때
  }

  return (
    <div className='app'>

      <h1 className='title'>To do List</h1>

      <div className='contents'>
        {/* 인풋 영역 */}
        <TodoInput onAdd={addTodo} />

        {/* 목록 영역 */}
        <TodoList todos={todos} 
        Delete={deleteTodo} 
        onToggle={toggleTodo} 
        onEdit={toggleEdit}
        onUpdate = {updateTodo} />
      </div>

    </div>
  )
}

export default App









// 로컬스토리지란?
// 웹 브라우저에 데이터를 저장하는 공간
// 