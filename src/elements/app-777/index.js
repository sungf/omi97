import { define, WeElement } from 'omi'
import style from './_index.css'

import '../box-777'

define('app-777', class extends WeElement {
  // static observe = true
  static get data() {
    return { numcount:[] }
  }
  data = {
    intime:null
  }
  install() { // 初始化
    this.randNumCount()
  }
  installed() {
    
  }
  revNumCount = (index, nide) => { // 转换
    // console.log('index-revcount',index,nide)
    this.store.revNumcount(index, nide)
    this.alertResult()
  }

  alertResult() {
    // 验证最后一位是否空
    if (this.store.data.numcount[this.store.data.numcount.length - 1] != '') {
      return
    }
    if (this.data.intime) {
      clearTimeout(this.data.intime)
      this.data.intime=null
    }
    this.data.intime=setTimeout(() => {
      this.resultObj()
    }, 550);
   
  }
  resultObj() {
    // console.log('reuslt-----')
    let isResult = this.store.data.numcount.every((elex, index, array) => {
      return elex == index + 1 || index == array.length - 1
    })
    if (isResult) {
      alert('恭喜发财，通关成功！')
      this.upLevel()
    }
  }
  upLevel() {
    // 升级难度
    let level=this.store.data.si+1
    this.randNumCount(level*level,level)
  }

  randNumCount(kk=9,si=3) { // 初始化
    // 位数
    // const kk = 9
    let map = []
    for (let i = 1; i < kk; i++) { 
      map.push(i)
    }
    map.push('')
    // 随机空位
   /*  // 随机bug 会有无解情况，类似 15 14 or 8 7 逆序，解决方法按正常顺序生成 随机步数
   let emtIndex = this.getRandomIntOk(kk)
    let map = []
    let isNumber={}
    for (let i = 0; i < kk; i++){
      if (emtIndex == i) {
        map.push('')
      } else {
        let num =this.getRandomIntOk(kk,isNumber)
        map.push(num)
      }
      
    }*/
    this.store.data.numcount=map
    this.store.data.si = si
    this.initNumber()
    
  }
  initNumber() { // 随机打乱
    // 随机下标 随机移动
   
    let i = 0
    const max=this.store.data.si*100 // 随机步数
    while (i < max) {
      this.clickBox(undefined,this.getRandomInt(0,this.store.data.numcount.length))
      i++
    }
  }
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }
  // data= {
  //   index: -1, // 计数器
  //   si:3, // 取余数
  //   globalCount: [1, 2, 3, 4, '', 6, 7, 8, 9]
  // }
  // globalData:['globalCount']
  // + `.plane { width:${this.store.data.si*110}px}` 
  css() {
    return style 
  }
 
  clickBox = (text,index) => {
    // console.log('box', text, index, this.data.globalSi);
    // 规则 根据下标 获取相邻四个位置（上index-si 下index+si 左index-1 右index+1）值
    console.log('val', this.countValBy(index, 'up'), this.countValBy(index, 'down'), this.countValBy(index, 'left'), this.countValBy(index, 'right'))
    // console.log('list',this.store.data.numcount)
    
  }

  countValBy = (index, type) => {
    
    let myval = null
    let nide = null
    switch (type) {
      case 'up':
        nide = index - this.store.data.si
        break;
      case 'down':
        nide = index+this.store.data.si
        break;
      case 'left': // 左右跟globalSi取余大于1
        if ((index) % this.store.data.si > 0) {
          nide =index-1  
        }
        
        break;
      case 'right':
        
        if ((index) % this.store.data.si < (this.store.data.si-1)) { 
          nide=index+1
        }
        
        break;
      default:
        break;
    }
    if (nide >= 0 && this.store.data.numcount.length > nide) {
      myval = this.store.data.numcount[nide]
      if (myval == '') {
        this.revoleCountByIndexAndType(index,nide)
      }
    }
    return type+'='+myval;
  }
  revoleCountByIndexAndType(index,nide) {
    // console.log('revole');
    // let vap = this.data.globalCount[nide]
    // this.data.globalCount[nide] = this.data.globalCount[index]
    // this.data.globalCount[index]=vap
    // this.fire('revoleval', { index: index, nide })
    this.revNumCount(index,nide)
  }
  changeSel = evt => {
    // console.log(evt.target.value)
    if (evt.target.value) {
      let num=Number(evt.target.value)
      this.randNumCount(num*num,num)  
    }
    
  }
  
  // item,index,this.data.globalSi
  render(props,data, store) {
    return (
      <div>
          <div>
        <select onChange={this.changeSel} value={this.store.data.si} placeholder="change size">
          <option value="">xxx</option>
          <option value="3">3*3</option>
          <option value="4">4*4</option>
            <option value="5">5*5</option>
            <option value="6">6*6</option>
          </select>
          </div> 
        <div class="plane" style={{width:this.store.data.si*110 +'px'}} >
        
          {this.store.data.numcount.map((item,index) => {
          if (index % this.store.data.si === 0) {
            
            return (<box-777  onClick={this.clickBox.bind(this,item,index)} text={item} index={index}></box-777>)
          } else {
            
            return (<box-777   onClick={this.clickBox.bind(this,item,index)} text={item} index={index} ></box-777>)  
          }
          
          
      })}  
        </div>
      
      </div>
    )
  }

 
})
