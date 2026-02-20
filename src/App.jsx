
import Lesson1_Component from './components/Lesson1_Component'
import Lesson2_State from './components/Lesson2_State'
import Lesson3_Logic from './components/Lesson3_Logic'
import Lesson4_Effect from './components/Lesson4_Effect'
import Lesson5_Cleanup from './components/Lesson5_Cleanup'
import Lesson6_StrictModeDoubleCall from './components/Lesson6_StrictModeDoubleCall'
import Lesson7_Ref from './components/Lesson7_Ref'
import Lesson8_Performance from './components/Lesson8_Performance'
import Lesson9_Context from './components/Lesson9_Context'
import Lesson10_CustomHook from './components/Lesson10_CustomHook'
import Lesson11_TypeScript from './components/Lesson11_TypeScript'
import { useEffect, useState } from 'react';

function App() {


  const [currentLesson, setCurrentLesson] = useState(1)

  const [price, setPrice] = useState(100)

  useEffect(() => {
    console.log('hello')
  }, [])
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>React 學習遊樂場 (Vue 開發者版)</h1>
      <p>請點擊下方按鈕切換課程範例：</p>
      {price}
      <button onClick={() => {
        setPrice(per => per + 200)
      }}>加10</button>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setCurrentLesson(1)} style={{ marginRight: '10px' }}>1. 組件與 Props</button>
        <button onClick={() => setCurrentLesson(2)} style={{ marginRight: '10px' }}>2. 狀態 (State)</button>
        <button onClick={() => setCurrentLesson(3)} style={{ marginRight: '10px' }}>3. 邏輯與渲染</button>
        <button onClick={() => setCurrentLesson(4)} style={{ marginRight: '10px' }}>4. 副作用 (Effect)</button>
        <button onClick={() => setCurrentLesson(5)} style={{ marginRight: '10px' }}>5. 清理 (Cleanup)</button>
        <button onClick={() => setCurrentLesson(6)} style={{ marginRight: '10px' }}>6. 防止重覆 (Ref)</button>
        <button onClick={() => setCurrentLesson(7)} style={{ marginRight: '10px' }}>7. Ref 教學</button>
        <button onClick={() => setCurrentLesson(8)} style={{ marginRight: '10px' }}>8. 效能優化</button>
        <button onClick={() => setCurrentLesson(9)} style={{ marginRight: '10px' }}>9. 全域狀態</button>
        <button onClick={() => setCurrentLesson(10)} style={{ marginRight: '10px' }}>10. 自定義 Hook</button>
        <button onClick={() => setCurrentLesson(11)}>11. TypeScript</button>
      </div>

      <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        {currentLesson === 1 && (
          <Lesson1_Component
            title="這是 Props 標題"
            footer={<p>這是具名 Slot (footer) 的內容</p>}
          >
            <p>這是透過 children 傳入的內容 (類似 Vue 的 default slot)</p>
          </Lesson1_Component>
        )}
        {currentLesson === 2 && <Lesson2_State />}
        {currentLesson === 3 && <Lesson3_Logic />}
        {currentLesson === 4 && <Lesson4_Effect />}
        {currentLesson === 5 && <Lesson5_Cleanup />}
        {currentLesson === 6 && <Lesson6_StrictModeDoubleCall />}
        {currentLesson === 7 && <Lesson7_Ref />}
        {currentLesson === 8 && <Lesson8_Performance />}
        {currentLesson === 9 && <Lesson9_Context />}
        {currentLesson === 10 && <Lesson10_CustomHook />}
        {currentLesson === 11 && <Lesson11_TypeScript />}
      </div>
    </div>
  )
}

export default App
