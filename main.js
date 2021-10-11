const pre = document.querySelector('.pre')
const next = document.querySelector('.next')
const bannerWrap = document.querySelector('#banner')
const production = document.querySelector('#production')
const model = document.querySelector(".model")
const informationPic = document.querySelector(".information-pic")

// banner
var currentBanner = 0 //當前banner

// banner 下一張
next.addEventListener('click', () => {
  currentBanner = currentBanner + 100
  if (currentBanner > 900) {
    bannerWrap.style.transform = 'translateX(0%)'
    currentBanner = 0
  } else {
    bannerWrap.style.transform = 'translateX( -' + currentBanner + '%)'
  }
})
// banner 上一張
pre.addEventListener('click', () => {
  currentBanner = currentBanner - 100
  if (currentBanner < 0) {
    bannerWrap.style.transform = 'translateX(-900%)'
    currentBanner = 900
  } else {
    bannerWrap.style.transform = 'translateX( -' + currentBanner + '%)'
  }
})



//倒數計時
const timer = document.querySelector("#timer")

setInterval(() => {
  const time = new Date();
  const currentTime = time.getTime()
  //倒數設計 10/15 18:00 
  time.setMonth(9)
  time.setDate(15)
  time.setHours(18)
  time.setMinutes(0)
  time.setSeconds(0)

  const deadline = time.getTime()

  const countBackTime = (deadline - currentTime) / 1000
  const day = parseInt(countBackTime / 60 / 60 / 24) //天
  const hr = parseInt(countBackTime / 60 / 60) - day * 24 //時
  const minute = parseInt(countBackTime / 60) - day * 24 * 60 - hr * 60 //分鐘
  const sec = countBackTime - day * 24 * 60 * 60 - hr * 60 * 60 - minute * 60 //秒

  timer.textContent = '倒數計時' + day + '天' + hr + '小時' + minute + '分' + sec + '秒'
}, 1000)


//商品資訊

const currentData = [...data]
const htmlProduction = ""

//模板
function setDate(id, imgUrl, categoryNum) {
  const item = `
  <div class="production-info" data-id="${id}">
    <div class="production-info_pic" data-id="${id}">
      <img src="${imgUrl}" alt="" /data-id="${id}">
    </div>
    <div class="production-info_name" data-id="${id}">商品${id}</div>
    <div class="production-info_category"data-id="${id}">分類${categoryNum}</div>
  </div>
  `
  return item
}

//整合模板+渲染
let htmlStr = ""
function renderProduction() {
  currentData.forEach(e => {
    htmlStr = htmlStr + setDate(e.id, e.imgUrl, e.category)
  });
  production.innerHTML = htmlStr
}

renderProduction()


// Popup
const productionInfo = document.querySelectorAll('.production-info')
//開啟Popup
function modelOpen(id) {
  informationPic.src = ""
  const url = currentData.find((e) => id === e.id)
  informationPic.src = url.imgUrl
  model.style.display = "block"

  model.addEventListener('click', modelClose)

}
//關閉Popup
function modelClose() {
  model.style.display = "none"
}

function ProductionListener() {
  productionInfo.forEach(element => {
    element.addEventListener('click', (e) => {
      const id = Number(e.target.dataset.id)
      modelOpen(id)
    })
  });
}



//go to top

const goTop = document.querySelector(".go-top")

goTop.addEventListener("click", () => {
  document.scrollingElement.scrollTop = 0
})


//category 

const categoryItem = document.querySelectorAll(".category_item")

function filterItem(categoryNum) {

  filterData = data.filter(e => categoryNum === e.category)
  //清空
  let htmlStr = ""
  production.innerHTML = htmlStr
  //整合模板
  filterData.forEach(e => {
    htmlStr = htmlStr + setDate(e.id, e.imgUrl, e.category)
  });
  //渲染
  production.innerHTML = htmlStr

}

categoryItem.forEach(e => {
  e.addEventListener('click', (e) => {
    const categoryNum = Number(e.target.dataset.category)
    console.log("categoryNum", categoryNum)
    filterItem(categoryNum)
  })
})


ProductionListener()
