$(function () {
    //实现登陆表单和注册表单之间的切换
    $('#quzhuce').on('click', function () {
        $('.login').hide();
        $('.register').show();
    });
    $('#qudenglu').on('click', function () {
        $('.login').show();
        $('.register').hide();
    });
    //注册表单提交前的表单验证操作
    var form = layui.form;
    form.verify({
        pass: [/^[\S]{6,12}$/, '密码必须在6位以上'],
        repwd: function (val) {
            // val表示使用当前验证规则输入的值
            // 获取上一个密码框的值与当前输入的值做比较
            var password = $('.password').val().trim();
            if (val != password) {
                return alert('注册失败');
            }
            alert('注册成功');
            $('#qudenglu').click();
        }
    });

    // 获取表单信息进行接口提交
    var layer = layui.layer;
    $('.form-reg').on('submit', function (e) {
        e.preventDefault();
        // 获取表单数据
        var data = $(this).serialize();
        console.log(data);
        
        $.ajax({
            type: 'post',
            url: 'http://www.liulongbin.top:3007/api/reguser',
            data: data,
            success: function (res) {
                console.log(res);
                
               if(res.status===1){
                   return layer.msg(res.message);
               }
               layer.msg(res.message);

            }
        })
    })

})