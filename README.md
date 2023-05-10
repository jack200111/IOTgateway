

# 物联IOT网关系统

网关管理后台，基于Vue2、nodejs开发。通过nodejs的fs模块，读取和写入配置文件(见下图读取配置文件，ini,config,tmp文件)

1.项目：完整的项目在develop分支！！！

2.开发步骤：

- 进入/src/node把后端fs请求项目跑起来，操作如下

  node .\getIni.js

- 进入项目启动前端起来，操作如下：

```
    npm run serve
```

2.框架样式：不使用UI框架（需要UI框架的可直行修改组件样式），直接vue2组件写样式。

3.提供统一进行axios请求管理

4.Mixin封装类似的逻辑（见下图mixin文件，读取配置文件数据，响应式动态渲染页面）；

5.配置文件的配置，采用类型区分（见下图ini文件，通过多项值逗号隔开，第一项为类型，修改类型页面动态改变样式）

6.封装动态显示页面组件类型的组件（见下图component文件，通过封装可复用的组件复用）

7.登录提供md5加密存储，和读取账户修改密码(见下图login.ini文件)

8.注意：此项目所需的配置文件(config tmp usr)，需要移动到该项目的根目录下，见下图（config/xxx.ini文件）

ini文件

![1683704001086](assets/1683704001086.png)

mixin文件

![1683704152590](assets/1683704152590.png)

component文件

![1683704235209](assets/1683704235209.png)

读取配置文件

![1683704426907](assets/1683704426907.png)

类型判断，写入配置文件

![1683704390390](assets/1683704390390.png)

login.ini

![1683705973389](assets/1683705973389.png)

/config/xxx.ini

![1683706163932](assets/1683706163932.png)

![1683706136923](assets/1683706136923.png)