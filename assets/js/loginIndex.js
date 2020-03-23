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
        type: 'get',
        url: '/my/userinfo',
        success: function (res) {
            console.log(res);

        },
        // 自己配置请求头
        headers: {
            Authorization: localStorage.getItem('token')
        }

    })
}