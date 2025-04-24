# Xtella Claim Scheduler

一个用于自动执行 [Xtella](https://xtella.ai?ref=0x7dE0eA20d4f416037A64B5e307835771EB83b83F) XP领取的定时任务调度器。

## 功能特点

- 支持多账户管理
- 自动登录和认证
- 定时执行 XP 领取任务


## 安装

1. 克隆项目
```bash
git clone https://github.com/fcmfcm1999/xtella-claim-scheduler.git
cd xtella-claim-scheduler
```

2. 安装依赖
```bash
npm install
```

3. 配置账户信息
在 `src/data/addresses.json` 中配置您的账户信息，格式如下：
```json
[
  {
    "address": "您的钱包地址",
    "privateKey": "您的私钥",
    "runTime": "HH:MM"  // 执行时间（北京时间）
  }
]
```

## 使用方法

1. 没有服务器的话可以, 手动执行测试
```bash
node src/index.js [账户索引]
```

2. 在服务器上设置定时任务
```bash
chmod +x cronjob_setup.sh
./cronjob_setup.sh
```

## 注意事项

- 请确保您的私钥安全，不要泄露给他人
- 定时任务会根据系统时区自动调整执行时间
- 日志文件保存在 `output.log` 中

## 目录结构

```
xtella-claim-scheduler/
├── src/
│   ├── apis/        # API 接口
│   ├── data/        # 数据文件
│   ├── services/    # 业务逻辑
│   ├── utils/       # 工具函数
│   └── index.js     # 主入口文件
├── cronjob_setup.sh # 定时任务设置脚本
└── package.json     # 项目配置
```

## 免责声明

本项目仅供学习研究使用，使用本项目产生的任何风险由使用者自行承担。 