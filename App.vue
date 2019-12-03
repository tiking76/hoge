<template>
  <div id="app">
    <h1>ToDoリスト</h1>

    <!-- ★STEP11 -->
    <label v-for="(label,index) in options" :key="index" >
      <input type="radio"
        v-model="current"
        v-bind:value="label.value">{{ label.label }}
    </label>
      
    <!-- ★STEP12 -->
    （{{ computedTodos.length }} 件を表示）

    <!-- ★STEP4 リスト用テーブル -->
    <table>
      <thead v-pre>
        <tr>
          <th class="id">ID</th>
          <th class="comment">コメント</th>
          <th class="state">状態</th>
          <th class="button">-</th>
        </tr>
      </thead>
      <tbody>
        <!-- ★STEP5 ToDo の要素をループ -->
        <tr
          v-for="item in computedTodos"
          v-bind:key="item.id"
          v-bind:class="{done:item.state}">
          <th>{{ item.id }}</th>
          <td>{{ item.comment }}</td>
          <td class="state">
            <!-- ★STEP10 状態変更ボタン -->
            <button v-on:click="doChangeState(item)">
              {{ labels[item.state] }}
            </button>
          </td>
          <td class="button">
            <!-- ★STEP10 削除ボタン -->
            <button v-on:click.d="doRemove(item)">
              削除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <p>※削除ボタンはdを押しながらクリックして下さい</p>

    <!-- ★STEP6 -->
    <h2>新しい作業の追加</h2>
    <form class="add-form" v-on:submit.prevent="doAdd">
      <!-- コメント入力フォーム -->
      コメント <input type="text" ref="comment">
      <!-- 追加ボタンのモック -->
      <button type="submit">追加</button>
    </form>
    <body>
    </body>
  </div>
</template>




<script>
// https://jp.vuejs.org/v2/examples/todomvc.html
var STORAGE_KEY = 'todos-vuejs-demo'

var todoStorage = {
  fetch: function() {
    var todos = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )
    todos.forEach(function(todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

export default {
 el: '#app',
    data(){
      return {
        todos: [],
        options: [
            {value: -1, label: 'すべて'},
            {value: 0, label: '作業中'},
            {value: 1, label: '完了'}
        ],
        current: -1
      }
    },
    computed: {
        computedTodos: function(){
            return this.todos.filter(function(el){
                return this.current < 0 ? true : this.current === el.state
            },this)
        },
        labels() {
            return this.options.reduce(function(a,b){
                return Object.assign(a,{ [b.value] : b.label })
            }, {})
        }
    },
    watch: {
        todos: {
            handler: function(todos){
                todoStorage.save(todos)
            },
            deep: true
        }
    },
    created(){
        this.todos = todoStorage.fetch()
    },
    methods: {
        doAdd: function(){
            var comment = this.$refs.comment
            if (!comment.value.length){
                // 入力がなければ何もしないで return
                return 
            }
            this.todos.push({
                id: todoStorage.uid++,
                comment: comment.value,
                state: 0
            })
            comment.value=''
        },
        doChangeState: function(item){
            item.state = item.state ? 0 : 1
        },
        doRemove: function(item) {
            var index = this.todos.indexOf(item)
            this.todos.splice(index,1)
        },

    }
}
</script>

<style>
* {
    box-sizing: border-box;
  }
  #app {
    max-width: 640px;
    margin: 0 auto;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  thead th {
    border-bottom: 2px solid #0099e4; /*#d31c4a */
    color: #27e021;
  }
  th,
  th {
    padding: 0 8px;
    line-height: 40px;
  }
  thead th.id {
    width: 50px;
  }
  thead th.state {
    width: 100px;
  }
  thead th.button {
    width: 60px;
  }
  tbody td.button, tbody td.state {
    text-align: center;
  }
  tbody tr td,
  tbody tr th {
    border-bottom: 1px solid #ccc;
    transition: all 0.4s;
  }
  tbody tr.done td,
  tbody tr.done th {
    background: #f8f8f8;
    color: #bbb;
  }
  tbody tr:hover td,
  tbody tr:hover th {
    background: #f4fbff;
  }
  button {
    border: none;
    border-radius: 20px;
    line-height: 24px;
    padding: 0 8px;
    background: #0099e4;
    color: #fff;
    cursor: pointer;
  }
  body {
  background-image: url("./assets/marine.jpg");
   background-position: center center;
   
  /* 画像をタイル状に繰り返し表示しない */
  background-repeat: no-repeat;
   
  /* コンテンツの高さが画像の高さより大きい時、動かないように固定 */
  background-attachment: fixed;
   
  /* 表示するコンテナの大きさに基づいて、背景画像を調整 */
  background-size: cover;
   
  /* 背景画像が読み込まれる前に表示される背景のカラー */
  background-color: #464646;
}
</style>
