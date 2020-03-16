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