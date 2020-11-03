## 如何开效果？

- open index.html in refactor folder with vscode pugin `live server`

## js 如何开启 live server 后， 可以正常引入？

```
//index.html


 <script type="module">
      import Game from "./js/game.js";


//game.js

import Event from "./event.js";
import Map from "./map.js";
import Food from "./food.js";
import Snake from "./snake.js";


//event.js es6语法 默认导入


```
