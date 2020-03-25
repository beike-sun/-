
$(function () {
    var form = layui.form;
    // 设置表单验证
    form.verify({
        // 原密码和新密码不能一样
        different: function (value) { //value表示新密码在验证规则下输入的值
            // 获取原密码的值
            var oldpwd = $('input[name="oldPwd"]').val();
            if (oldpwd === value) {
                return '原密码和新密码不能一样'
            }
        },
        // 新密码和重置密码要一样

        same: function (value) {
            // 获取新密码的值
            var newPwd = $('input[name="newPwd"]').val();
            if (value != newPwd) {
                return '两次密码输入不一致'
            }
        }
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        , pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ]
    });

    //点击修改密码的时候获取表单信息，然后接口修改密码
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        // 获取表单信息
        var data = $(this).serialize();
        $.ajax({
            type: 'post',
            data: data,
            url: '/my/updatepwd',
            success: function (res) {
                if(res.status!=0){
                    return layer.msg(res.message);
                }
                // console.log(res);
                layer.msg(res.message);
                // 重置表单
                $('.layui-form')[0].reset();
            },
            headers: {
                Authorization: localStorage.getItem('token')
            }

        })
    })

})