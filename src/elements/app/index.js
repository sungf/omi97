import { define, WeElement } from 'omi'
import logo from './logo.svg'
import style from './_index.css'
import '../app-777'
import '../life-love'

define('my-app', class extends WeElement {
  static get data() {
    return { name: '' }
  }
  
  clickHandler = () => {
    this.store.rename('sun game')
  }
 
  
  
  /*
  getRandomIntOk(max, isNumber = undefined) {
    console.log(max,'int')
    if (isNumber) {
      if (max - Object.keys(isNumber).length == 2) {
        // 最后一个数字 不随机
        let n = 1;
        while (n < max) {
          if (!isNumber[n]) {
            break
          }
          n++  
        }
        number = n
        return number
      } 
        
      
      let number = this.getRandomInt(1,max)
      // 判断循环次数是否过多
      
        if (isNumber[number] ) {
          number=this.getRandomIntOk(max,isNumber)
        }
      
      isNumber[number] = true
      return number
    }
    return this.getRandomInt(0,max)
  }
   getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }*/
 
  css() {
    return style
  }

  render(props, data, store) {
    return (
      <div class="app">
        <header class="app-header">
          <img
            src={logo}
            onClick={this.clickHandler}
            class="app-logo"
            alt="logo"
          />
          <h1 class="app-title">Welcome to {store.data.name}</h1>
        </header>
        <div class="content">
          <app-777  />
        </div>
        <life-love></life-love>
      </div>
    )
  }
})
