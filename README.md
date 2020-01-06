学习笔记
=========
2020年1月6日
------------
这阵子主要时间都用在开发小程序上面了,总结下新学到的东西
* 第一个就是看文档的重要性,真的要平时没事就多看看文档,一旦开发上有遇到什么新的需求,特殊的功能,才能更快速的找到解决方法.当然看,是要理解着看的,不是随意看一遍就完事的那种.
* 第二个是在写PDF文档下载功能的时候.后端返回给我的的是二进制流,以前没有做过二进制流文件的下载查看,搞了会时间,总结下怎么完成的
  以前的做法: 
  * 调用wx.downloadFile({})下载文件,在success接口中调用wx.saveFile({})把文件保存在本地,在再success回调中通过返回的文件临时地址,用wx.openDocument({})打开预览.
  ```Javascript 
  wx.downloadFile({
      url: filepath,
      // url:"https://www.ufa.hk/uploads/ufa/fit/DecOrderVO/3468830325178368.pdf",
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
