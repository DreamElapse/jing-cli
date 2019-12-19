
# jing-cli
一个轻量级的初始化项目工具

<a href="https://www.npmjs.com/package/jing-cli"><img src="https://img.shields.io/badge/npm-v0.0.8-blue" alt="Version"></a>
<a href="https://www.npmjs.com/package/jing-cli"><img src="https://img.shields.io/badge/license-MIT-green" alt="License"></a>

# Installation
```
npm install jing-cli -g
```

# Usage
打开终端输入`jing` 或者 `jing -h` , 展示 jing-cli 的`command`列表:
```
  Usage: jing <command>


  Commands:

    list   List all the templates
    init   Generate a new project

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

### init
通过这个`command`可以去选择模版然后初始化项目
```

? Project name: projectName
? Select template: vue2.x
? Project description: A description of project!
? Server Port: random
? Where to init the project: ./

  jing ·  Generated "projectName".

# Project has been initialized successfully!
# ==========================================

To Get Started:

  cd projectName
  npm install
  npm run dev
  npm run build

```

展示所有的模版列表

| Name    | Template         | Branch |
| :-----  | :--------------- | :----: |
| vue     | vue-template     | master |
| mapvue  | mpvue-template   | master |
| uniapp  | uni-app-template | master |


# Template
```
vue-template      ->  vue模版
mpvue-template    ->  mpvue模版
uni-app-template  ->  uniapp模版
...
持续更新中
```

# License
MIT.









