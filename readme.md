## express-station
快速建站框架，多分支多模块

## Branch desc
+ base 底层分支，基于express，ejs框架系统
+ master 集合分支，所有类型分支的集合
+ station 后台界面分支，基本的后台界面，可以直接扩展开发
+ socket socket分支，使系统支持socket，已写入multiplexing例子
+ wechat 微信分支，微信公众号模块(暂时不做，其中网页授权可以参照wechat-enterprise的网页授权)
+ wechat－enterprise 微信企业分支，扫码自动获取个人企业信息（前提已关注企业号）

## Usage
服务器默认端口1212, 程序应用配置文件在/config/conf.json(端口也在此配置)

+ branch: base
	+ 底层服务器及基本的模板架构
	+ restful api
		+ /short/url?url=http://baidu.com 短链接api
	+ 静态文件目录，支持seajs，自带jquery
	+ 测试展示：http://127.0.0.1:1212
+ branch: station
	+ 后台界面模板
	+ 页面模板放于/views/ejs目录下
	+ 访问页面放于/views/page目录下
+ branch: socket
	+ socket基本通信服务测试
	+ multiplexing多路通信测试
+ branch: wechat-enterprise
	+ 扫码获取code
	+ 扫码获取微信企业员工信息，微信企业在/config/conf.json里面配置
+ branch: wechat
	+ 暂时不做，微信公众号网页授权跟微信企业的网页授权方式一样，不同的只是换个appid


## Dependencies
+ express
	+ 服务器框架
+ ejs
	+ 页面模板引擎
+ serve-favicon
	+ favicon图标处理
+ body-parser
	+ 网页参数解析器，req.query
+ express-params
	+ url匹配解析器，req.params.xxxx
+ socket.io
	+ socket通信服务
+ wechat-enterprise-api
	+ 微信企业api
+ hashids
	+ 随机字符串

## Catalog
+ config 应用程序配置目录
	+ conf.json 应用程序配置文件
	＋ conf_default.json 应用程序默认配置文件(新建时请将conf\_default.json文件copy一份成conf.json文件)
+ routes 路由文件目录
	+ api 一般存放restful api文件目录
	+ page 一般存放定制url路径文件目录
	+ socket 一般存放socket相关文件目录
	+ wechat 一般存放微信相关api目录
+ statiscs 静态文件目录
+ views 视图模板目录
	+ ejs 模板文件目录
	+ page 实际url路径文件目录
+ .gitignore git忽略文件
+ index.js 应用程序入口
+ package.json 应用程序相关说明及其包依赖关系
+ process.json pm2服务管理配置文件
+ readme.md 文档说明

## Source
框架来源：[express-station](https://github.com/oopkit/express-station)