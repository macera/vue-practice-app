
学習メモ

* ビルトインのディレクティブ
  * v-show
  * v-if/v-else
  * v-for
  * v-on(省略記法: @) 要素にイベントリスナーを追加する
  * v-bind(省略記法: : or .(.prop修飾子使用時)) 1つ以上の属性やコンポーネントのプロパティを式に動的にバインドする
  * v-model

* v-model

  双方向データバインディングが可能する。

  データバインディング（データバインド、データ結合）はデータと対象を結びつけ、

  データあるいは対象の変更を暗示的にもう一方の変更へ反映すること、それを実現する仕組み

  * ネイティブ要素でのv-model

  ```
    <input type="number" v-model="price">
    <input type="number" :value="price" @input="price = $event.target.value">の省略形
    <input type="number" v-bind:value="price" v-on:input="price = $event.target.value">の省略形
    
    :value=”price"
    v-bind:value=”price”の省略形
    
    @input=”price = $event.target.value”
    v-on:input=”price = $event.target.value”の省略形

  ```
    
    v-bindディレクティブは、リアクティブに HTML 属性を更新する
  
  * コンポーネントで使用する場合のv-model

  ```
    <CustomInput v-model="searchText" />
    <CustomInput :modelValue="searchText" @update:modelValue="newValue => searchText = newValue"/>
  ```

  * ポイント

    HTML属性を動的に変更したい場合は :HTML属性 (例 :class)

    イベントの発火で処理をしたい場合は @イベント名 (例: @click)

[オプション]

* data

  関数で記述

  templateタグの中で使用するには {{ }} で囲む

* computed

  算出プロパティ

  何か入力した値を加工して表示したいときに使用

  必ずreturnが必要

* methods

  イベントの発火の処理を書いたりする

  引数を受け取れる

  returnはなくても良い

[ライフサイクル]

* beforeCreate

  dataプロパティの中身を確認することができる

  createdのようにdataの上書きを行うことはできない

  dataプロパティに関係のない処理を行う際に利用

* created

  インスタンス初期化時、DOMが生成される前(DOMの取得ができない)

  this.$elはundefined

  dataオブジェクトがリアクティブになっている

  APIを使ってデータ取得を開始しても取得したデータを設定することができる

* mounted

  インスタンス初期化時、DOMが生成された後(DOMの取得ができるため、DOM操作が行える)

  this.$elはundefinedではない

[コンポーネント間の基本的なデータの受け渡し方法]

* props

  親→子に値を渡す時

  子コンポーネント内にpropsという属性を定義し、propの名前と型を定義する

  親コンポーネント内で子コンポーネントを使う時に、prop名と値を受け渡す

* $emit

  子→親に値を渡す時

  「親の知らぬところで子コンポーネントが値を変更する方法」のではなく

  「子が親に通知して親が値を変更する方法」を行う。
  
  子コンポーネント内で、$emitでカスタムイベント(clickとかchange的な使われ方をするやつ)を作る 

  (第２引数に送信するデータを渡す)

  親コンポーネント内で子コンポーネントを呼び出す時に、作成したカスタムイベントを付与する

  $eventや引数で送信されたデータを受け取る

  例1: 子 => 親

    親側
    ```
    <sample @onClick="parent-data = $event" />
    ```

    子側
    ```
    $emit("onClick", data);
    ```

  例2: 親 <=> 子

    親側
    ```
    <props-child :parent-data.sync="parentInputData" />
    上記は下記の糖衣構文
    <props-child :parent-data.sync="parentInputData" @update:parent-data="parentInputData = $event" />
    parentInputDataはdata
    ```

    子側
    ```
    $emit("update:parent-data", data)
    ```

  * .sync修飾子

    親から子にオブジェクトを渡したい場合、.sync 修飾子にオブジェクトを渡すと、子コンポーネントのpropsで値が展開される

    .sync修飾子を付与すると、子コンポーネントから$emit('update:xxx', $event) で親に通知することができる
    
    ```
    <text-document v-bind:title.sync="doc.title"></text-document>
    <text-document v-bind:title="doc.title" v-on:update:title="doc.title = $event"></text-document>の省略形
    ```

  * emitsプロパティ

* Vuex

  ライブラリ

  ネストが深いコンポーネント間ではこちらを使う

  データの管理を一元化するためのライブラリ

  コンポーネント間で状態の受け渡しが容易になるため、ある程度以上の規模の開発において利用されることが多いライブラリ

[よく使われるライブラリ]
* Vue CLI

  コマンドラインツール

  Vueプロジェクトを作成する

* Vue Router

  シングルページアプリケーション(SPA)を構築する

* axios

  APIの使用

  PromiseベースのHTTPクライアント

* babel

  ES6等の新しい文法をES5に変換してくれるコンパイラ


