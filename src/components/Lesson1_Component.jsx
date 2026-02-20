// Lesson 1: React 組件基礎
// 目標：建立一個簡單的組件並傳遞資料 (Props)

// Vue 的寫法概念：
// <template>
//   <div class="card">
//     <h2>{{ title }}</h2>
//     <p><slot /></p>
//   </div>
// </template>
// <script setup>
//   defineProps(['title'])
// </script>

// React 的寫法：
// 1. 一般內容 -> props.children
// 2. 具名 Slot -> props.footer (或是 props.header, props.whatever)

function Lesson1_Component(props) {
  // 解構賦值：直接取得 title, children, 以及 footer (具名 slot)
  const { title, children, footer } = props;

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      <h2>{title}</h2>

      {/* 預設 Slot (children) */}
      <div style={{ minHeight: '50px' }}>
        我目前只想針對前端的 REAC
      </div>

      {/* 具名 Slot (footer): 只有當 footer 有傳入時才顯示 */}
      {footer && (
        <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '10px', color: 'gray' }}>
          {footer}
        </div>
      )}
    </div>
  );
}

export default Lesson1_Component;
