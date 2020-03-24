// 退出功能
$(function () {
    // 1退出
    $('#logout').on('click', function () {
        // 询问是否退出，确定删除token，跳转到login.html
        //询问框

        layer.confirm('您确定退出吗？', {
            btn: ['确定', '取消'] //按钮
        }, function () {
            // 点击确定执行这个函数
            layer.msg('确定退出', { icon: 1 });
            localStorage.removeItem('token');
            location.href = "index.html"
        }, function () {
            // 点击取消执行这个韩式
            layer.msg('不退出了', {
                time: 2000, //20s后自动关闭

            });
        });
    })
    // 获取用户信息
    getUserInfo();
})
// 自定义函数放在入口函数外部
function getUserInfo() {
    // 发送请求获取用户信息
    // 渲染
    $.ajax({

        url: '/my/userinfo',
        success: function (res) {
            console.log(res);
            if (res.status != 0) {
                // 失败之后
                return layer.msg(res.message);
            }
            // 成功之后渲染页面
            renderHtml(res.data);
        

        },
        complete: function (xhr) {
            if (xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败！') {
                location.href = '/index.html';
            }
        },
        // 自己配置请求头
        headers: {
            Authorization: localStorage.getItem('token')
        }

    });
}
// 渲染页面的函数
function renderHtml(shuju) {

    
    // 获取字体头像
    // 如果有昵称用昵称，没有昵称用账号.优先使用前面的
    var name = shuju.nickname || shuju.username;
    // 获取第一个字母或中文
    var firstText = name.substr(0, 1).toUpperCase;
    if (shuju.user_pic) {
        // 显示图片
        $('.person img').show().attr('src', shuju.user_pic);
        // 隐藏字体头像
        $('.person .text-avatar').hide();
    } else {
        $('.person img').hide();
        $('.person .text-avatar').css('display','inline-block').text(name.substr(0,1));


    }
    // 设置欢迎
    $('.welcom').html('欢迎你&nbsp;&nbsp;' + name);
}