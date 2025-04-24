#!/bin/bash

# 获取当前脚本的绝对路径
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$SCRIPT_DIR"  # 脚本就在 xtella-claim-scheduler 目录下

JSON_FILE="$PROJECT_DIR/src/data/addresses.json"
INDEX_JS="$PROJECT_DIR/src/index.js"
LOG_FILE="$PROJECT_DIR/output.log"


if [ ! -f "$JSON_FILE" ]; then
    echo "Error: config file not found!"
    exit 1
fi

# 获取 node 的完整路径
NODE_BIN=$(which node)
if [ -z "$NODE_BIN" ]; then
    echo "Error: node not found in PATH"
    exit 1
fi

# 获取系统时区偏移（以小时为单位）
LOCAL_OFFSET=$(date +%:::z)
BJ_OFFSET=8  # 北京时间 UTC+8
TIME_DIFF=$((BJ_OFFSET - LOCAL_OFFSET))

# 解析 JSON 并提取 runTime
JOBS=$(jq -c '.[]' "$JSON_FILE")

# 清除现有的相关 cron 任务
crontab -l | grep -v "$NODE_BIN $INDEX_JS" | crontab -

# 遍历 JSON 数据
NEW_CRON=""
INDEX=0
while IFS= read -r job; do
    RUNTIME=$(echo "$job" | jq -r '.runTime')
    MINUTE=$(echo "$RUNTIME" | cut -d":" -f2)
    HOUR=$(echo "$RUNTIME" | cut -d":" -f1)

    # 移除前导零
    HOUR=$(echo "$HOUR" | sed 's/^0*//')
    # 计算本地时区的执行时间
    HOUR=$(( (HOUR - TIME_DIFF + 24) % 24 ))

    NEW_CRON+="$MINUTE $HOUR * * * $NODE_BIN $INDEX_JS $INDEX >> $LOG_FILE 2>&1\n"
    ((INDEX++))
done <<< "$JOBS"

# 添加新的 cron 任务
(crontab -l; echo -e "$NEW_CRON") | crontab -

echo "定时任务创建成功!"
