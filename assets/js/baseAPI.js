// 统一Ajax请求的url地址。调用jQuery提供的$.ajaxPrefilter()，每发一次Ajax请求，被这个方法拦截，允许对配置对象{}进行二次配置
// 配置对象就是回调函数的形参
$.ajaxPrefilter(function(option){
//option 就是每次Ajax请求时的配置对象{}
console.log(option);
option.url='http://www.liulongbin.top:3007'+option.url;
})