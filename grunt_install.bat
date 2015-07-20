@echo off 安装grunt工程所需的包

rem 检查是否为合法的grunt工程
if not exist \package.json || not exist \Gruntfile.js do (
    echo "您的工程结构不合法"
) else (
    do goto npm
)

:npm
rem 安装grunt命令管理工具
npm install -g grunt-cli
rem 安装依赖包
npm install

exit

