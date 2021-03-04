学习笔记
=========

2020年1月6日
------------
#### 小程序文档下载预览功能
这阵子主要时间都用在开发小程序上面了,总结下新学到的东西
* 第一个就是看文档的重要性,真的要平时没事就多看看文档,一旦开发上有遇到什么新的需求,特殊的功能,才能更快速的找到解决方法.当然看,是要理解着看的,不是随意看一遍就完事的那种.
* 第二个是在写PDF文档下载功能的时候.后端返回给我的的是二进制流,以前没有做过二进制流文件的下载查看,搞了会时间,总结下怎么完成的
  以前的做法: 
  * 调用wx.downloadFile({})下载文件,在success接口中调用wx.saveFile({})把文件保存在本地,在再success回调中通过返回的文件临时地址,用wx.openDocument({})打开预览.
  ```Javascript 
  wx.downloadFile({
      url: filepath,
      // url:"https://www. .../uploads/ufa/fit/DecOrderVO/3468830325178368.pdf",
      success: function (res) {
  
        //保存文件到本地
        wx.saveFile({
          tempFilePath: res.tempFilePath,
          success(result) {
            var Path = result.savedFilePath
            //返回的文件临时地址，用于后面打开本地预览所用
            wx.openDocument({
              filePath: Path,
              success: function (res) {
                console.log('打开文档成功')
              }
            })
          },
          fail(res) {
            wx.showToast({
              icon: 'none',
              title: '下载失败'
            })
          }
        })
      }
    })
    ```
  * 对于二进制流文件,用以下方法:
  用小程序原生的请求api,wx.request({}),在header中传入token,定义响应内容为二进制流形式responseType:'arraybuffer',通过wx.getFileSystemManager().writeFile({}),将下载回来的data写在一个新建的本地文件中,写完后调用wx.openDocument({})实现预览功能,代码如下:
  ```Javascript
   wx.request({
      url: app.globalData.apiUrl + '/swh/prepareOrder/download/' + id,
      header: {
        wmpToken: wx.getStorageSync("wmpToken")
      },
      responseType:'arraybuffer',
      success: function(res) {
        var data = res.data 
        console.log(res,'111res')
        wx.getFileSystemManager().writeFile({
          filePath: `${wx.env.USER_DATA_PATH}/${purName + id}.pdf`,
          data:data,  
          success: function (rest){  
            console.log(rest, '111rest')
            wx.openDocument({
              filePath: `${wx.env.USER_DATA_PATH}/${purName + id}.pdf`,
              success: function (res) {
                console.log('打开文档成功')
              }
            })  
          },
          complete: function (rest) {
            console.log(rest, 'complete')
          },
        })
      }
    })
  ```
  代码中,```Javasctipt ${wx.env.USER_DATA_PATH} ```是小程序自带的文件系统用户目录路径, 若在小程序开发助手上,点击详情->文件系统->usr目录中,若在手机端上,则在tencent\MicroMsg\wxanewfiles\.....; 另外,开发中还遇到一个小知识点,是文件下载下来之后打印出来,在开发助手上看是http://..........,用手机调试发现是wxFile://.......,不用太过纠结,这只是两种不同的协议.
* 第三个点是要写一个数据字典选择的组件
* 第四个点是写一个类似于购物车功能的实现,其实没用到什么,它的大致需求是这样的,A页面(主页面),进入B页面(选择物料页面),填写物料信息后,点击保存,这个时候返回A页面,在A页面中最后调用接口保存时也将B页面的物料信息提交上去.在数据未提交给后端的时候,需要把已填写的数据给缓存起来,之后提交成功或者没有提交返回到上一个页面需要把缓存清除,否则会报错.

2020年3月16日
------------
#### 前两天看了个实现瀑布流的视频，今天想着实现下，总结如下：（三个方法）
html中，我是这么写的： 
```html
<div class="warp">
    <div class="item"><img src="../../assets/images/0.png" /></div>
    <div class="item"><img src="../../assets/images/1.png" /></div>
    <div class="item"><img src="../../assets/images/2.png" /></div>
    <div class="item"><img src="../../assets/images/3.jpg" /></div>
    <div class="item"><img src="../../assets/images/4.png" /></div>
</div>
```
* 第一个方法：用jquery实现动态的瀑布流布局，在页面获取到图片资源后渲染出效果;
具体思路是：通过获取图片资源，循环数组，数组第一行无需再加定位操作；从第二行开始，图片相对父元素绝对定位，找到目前为止高度最小的一列，将图片插入那一列中，那一列的高度加上图片的高度，再进入下一个循环。
```vue.js
  mounted() {
    this.waterFall();
  },
  methods: {
    waterFall() {
      var box = $(".item");
      var boxWidth = $(box).outerWidth() + 5; //outerWidth() jquery方法 返回的width包含padding和border，如果要加上margin，则传'true'参数
      var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth; // 保证兼容性
      // var windowWidth = $(window).width();
      var cols = Math.floor(windowWidth / boxWidth);
      var heightArr = [];
      $.each(box,function(index,item){
        let boxHeight = $(item).outerHeight() + 5;
        if(index < cols) {
          heightArr[index] = boxHeight;
        } else {
          let minboxHeight = Math.min(...heightArr);
          let i = heightArr.indexOf(minboxHeight);
          item.style.position = 'absolute';
          item.style.top = minboxHeight + "px";
          item.style.left = i*boxWidth + 'px';
          // item.style = ({
          //   position: "absolute",
          //   top: minboxHeight + "px",
          //   left: i*boxWidth + 'px'
          // });
          heightArr[i] += boxHeight;
        }
      })
    }
  }
```
* 第二个方法： 用column来布局，在父元素中设置column-count列数
```scss
.warp {
    column-count: 4;
    .item {
      border: solid 1px #f2f2f2;
      margin: 5px;
      img {
        width: 100%;
      }
    }
  }
```
* 第三个方法： 用flex弹性布局，定义flex-flow属性，flex-flow即flex-direction和flex-wrap的复合属性
```scss
.warp {
    display: flex;
    flex-flow: column wrap;
    height: 100vh;
    .item {
      width: calc(100%/4  - 10px);
      margin: 5px;
      img {
        width: 100%;
      }
    }
}
```
* 总结上面三个方法，个人觉得用column布局和flex布局都很方便，用jquery布局的，图片从第二行开始是绝对布局，会脱离文档流，当加载的图片很多的时候，很难控制父元素的height值，无法滚动下拉。

#### 封装了下vue 穿梭框组件
具体看github,因为之前公司有一个需求，需要一个穿梭狂，原本想用vue-element-admin里封装好的，发现它这个组件写的实在有限，所以就自己粗略写了一个。

2021年3月3日
------------
#### px rpx rem em的区别
* px 相对长度单位： 相对显示器屏幕分辨率而言
* em 相对长度单位： 相对于当前对象内文本的字体尺寸
    1. 任意浏览器的默认字体为16px，即: 1em=16px => 0.625em=10px,在body中声明Font-size=62.5%，这样 16px*62.5%=10px,即12px=1.2em,10px=1em
    2. em的值不是固定的，它会继承父级元素的字体大小
* rem 相对长度单位： 相对于根元素（root em)
    1. IE8及更早版本不支持
* rpx 小程序解决自适应屏幕尺寸的尺寸单位，小程序规定屏幕宽度为750rpx
    1. 小程序同时支持rem尺寸单位，小程序规定屏幕宽度为20rem, 1rem=(750/20)rpx=37.5rpx
* upx uni-app使用upx为尺寸单位，uni-app规定屏幕基准宽度750upx

#### css样式的应用
 ```css
  <!-- 逐渐消失的样式 -->
    .truncate-text-multiline {
        overflow: hidden;
        display: block;
        height: 109.2px;
        margin: 0 auto;
        font-size: 26px;
        line-height: 1.4;
        width: 400px;
        position: relative;
    }
    .truncate-text-multiline:after {
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        width: 150px;
        height: 36.4px;
        background: linear-gradient(to right, rgba(0, 0, 0, 0), #f5f6f9 50%);
    }
  <!-- 列表计数器 -->
    ul {
    counter-reset: counter;
    }
    li::before {
    counter-increment: counter;
    content: counters(counter, '.') ' ';
    }
   <!-- 自定义文本选择样式 -->
    ::selection {
        background: aquamarine;
        color: black;
    }
    .custom-text-selection::selection {
        background: deeppink;
        color: white;
    }
    <!-- 创建动态阴影 -->
    .dynamic-shadow {
        position: relative;
        width: 10rem;
        height: 10rem;
        background: linear-gradient(75deg, #6d78ff, #00ffb8);
        z-index: 1;
    }
    .dynamic-shadow::after {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        background: inherit;
        top: 0.5rem;
        filter: blur(0.4rem);
        opacity: 0.7;
        z-index: -1;
    }
    <!-- 更改子项聚焦时，父类的外观 -->
    form {
        border: 3px solid #2d98da;
        color: #000000;
        padding: 4px;
    }
    form:focus-within {
        background: #f7b731;
        color: #000000;
    } 
    <!-- 给p标签添加渐变颜色 -->
    .gradient-text {
        background: -webkit-linear-gradient(pink, red);
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
    }

  ```

#### vue 如何实现数据的实时渲染
##### 通过发布者订阅者这个设计模式
* 发布者：数据  
* 订阅者：Watch(3种：render Wathcer    computed Watcher    user Watcher）
###### render Watch

#### vue 依赖包
前阵子发现项目越跑越慢，编译的很慢，有时候切换个分支就会报错，想着可能是依赖包太大了，于是整理了下并删掉一些没有用的：
* vue-json-editor：旧的编辑器  quill，vue-quill-editor：目前在用的编辑器
* el-bigdata-table：大数据表格渲染（未用到）
* id-validator：中国大陆身份证校验器（未用到）
* pdfobject：PDF预览插件
* vue-draggable-resizable-gorkys：缩放插件
* vue-bus: 用于组件间的通信
* vue-json-editor: json编辑器
* vue-json-tree-view：有配置但是木有用到
* jsencrypt：对数据进行加密（wk有用到）
* codemirror：代码高亮（系统参数）
* lockr：本地存储插件，配合i18n，用于语言切换等
* numeral：数据格式化
* nzh：数字跟中文转换插件（wk有用到）
* pinyin-match：拼音match(wk有用到)
* qrcodejs2：生成二维码插件
* vue-cropper：截取图片（wk用于头像截取）
* vue-draggable-resizable：拖拽插件
* vuedraggable: 拖拽插件
* vue-radial-progress：进度条(wk有用)
* Lockr: vue插件 用于操作localStorage，本地存储对象、数组、数字、字符串，提供多种方法：
  1. Lockr.prefix 给键值添加前缀
  2. Lockr.set 设置值（类型可以为String,Number,Array,Object)
  3. Lockr.get 通过键值返回值，可以指定默认返回值
  4. Lockr.rm 完全删除键值对
  5. Lockr.sadd 在原来数值的基础上追加值
  6. Lockr.sismember 判断指定键是否存在某个值（验证下是否只能是String,Number)
  7. Lockr.srem 移除指定键的某个值
  8. Lockr.getAll 获取localStorage所有键值对

#### 埋点功能
前阵子公司项目里产品提需求：要统计每个功能模块的使用次数，于是引入：埋点，做的过程中总结以下问题（以公司CRM项目为基础）
* 埋点根据功能编码，初步想通过登录后返回的权限功能数组，发现有一部分页面是公共模块，没有配权限编码，因此通过在路由中meta属性中增加字段，如下（vue-element PC端）：
```javascript
var funcBm = '';
var findFuncBm = function(target) {
  let menus = JSON.parse(localStorage.getItem('menus'));
  if(!menus || menus.length == 0) return;
  funcBm = '';
  console.debug('menus',menus)
  menus.forEach((item)=>{
    item.children.forEach((cItem)=>{
      if(cItem.path == target.path) {
        funcBm = cItem.funcBm;
        return;
      }
    })
  })
}

// 功能使用记录
export function logFuncUseLog(target){
  console.debug('target', target)
  // 获取功能编码
  if(target.meta.funcBm) funcBm = target.meta.funcBm;
  else findFuncBm(target);

  return new Promise((resolve, reject)=>{
    try{
      resolve()
      if(funcBm) {
        handleSetUseLog(funcBm).then((res) =>{
        }).catch((err) => {
          console.log('统计使用次数报错了', err)
        })
      }
    } catch (e) {
      reject(e)
    }
  })
}
```
以上方法置于路由跳转之前调用
```javascript
Router.beforeEach((to, from, next) => {
  // console.debug(to, from)
  const pageErrorList = ['/login', '/500', '/502', '/11', '/403', '/404']
  if (checkNull(Store.getters.userInfo) && pageErrorList.indexOf(to.path) < 0) {
    getUserInfo().then(res => {
      const {data, code} = res.data
      if (res.status === 200 && res.data.code === 0) {
        Store.commit("SET_USERIFNO", data);
        localStorage.setItem('userInfo', JSON.stringify(data))
        logFuncUseLog(to).then(() => {
          next()
        });
      } else {
        if (localStorage.getItem('isLoginFlag')) {
          Notification({
            message: '获取信息失败,请重新登录',
            type: 'error'
          })
          localStorage.removeItem("isLoginFlag");
        }
        next('/login')
      }
    }).catch(res => {
      console.error(res)
    });
  } else {
    logFuncUseLog(to).then(() => {
      next({replace: true})
    })

  }
})
```
* 在小程序端，小程序端是个体力活动了，需要到每个页面去，在onShow中手动调用方法从而实现埋点
  除了有一点，接口需要通过header传参，把功能编码传递给后端的，小程序的请求用了flyio，flyio中已设置了拦截器，在不改变原来配置的基础上，只能另起一个文件（不能跟其它接口放置同个文件中），重新配置需要的headers参数，如下：
  ```javascript
  export function handleSetUseLog(data) {
    request.interceptors.request.use((request) => {
        // request.headers['analyseCode'] = data
        request.headers = {
            "content-type": "application/json",
            'Admin-Token': wx.getStorageSync('token'),
            "Client-Type": "APP",
            "token": wx.getStorageSync('token'),
            "Span-Session": getApp() ? getApp().globalData.spanSession : null,
            'analyseCode': data,
            "version": config.version,
        }
    });
    return request.request({
        url: `user/func/use/l_log`,
        method: 'GET'
    })
  }
  ```

#### 小程序实现纵横向可滑动，横向滑动时奇数行固定，纵向滑动时顶部底部固定，效果如下:
![Image text](./image/sticky.gif)

#### websocket实时监听消息

#### 大屏
![Image text](./image/print.gif)