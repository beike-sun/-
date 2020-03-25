$(function(){
    //获取要裁剪的dom元素
   var $img= $('#image');
    // 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $img.cropper(options);
//   点击上传的时候调用file选择图片，获取选择的文件对象，根据选择的文件创建一个url,销毁裁剪区域，重新设置图片的url，在增加裁剪区域
$('.upload').on('click',function(){
    $('.file').click();
})
$('.file').change(function(){
    console.dir($('.file')[0]);
  if(this.files.length<=0){
      return alert('请选择图片');
  }  
//   获取文件对象
var fileobj=this.files[0];
 // 得到选择的图片的临时的url
        // URL 是 JS 内置对象
        // - create 创建
        var url = URL.createObjectURL(fileobj);
        // console.log(url);
        $img
        .cropper('destroy')      // 销毁旧的裁剪区域
        .attr('src', url)  // 重新设置图片路径
        .cropper(options)        // 重新初始化裁剪区域
})
// 点击确定的时候
// 4. 确定上传单机事件
$('#sureUpload').click(function () {
    // 开始剪裁图片
    // $image.cropper('方法名', {方法的参数});
    var canvas = $img.cropper('getCroppedCanvas', {
        width: 100,
        height: 100
    });
    // xxx是base64格式的图片，是一个字符串
    var xxx = canvas.toDataURL();
    // console.log(xxx);
    // 发送ajax请求，更换头像
    $.ajax({
        type: 'POST',
        url: '/my/update/avatar',
        data: {avatar: xxx},
        headers:{
            Authorization:localStorage.getItem('token')
        },
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            // 如果成功了。重新渲染头像
            layer.msg('更改头像成功');
            window.parent.getUserInfo();
        }
    });
});
})