#!/usr/bin/env python3
"""
fetch-sources.py — 自动从信息源抓取AI开发工作流相关内容
写入 global/data.js 的 feed 部分

用法:
  python3 fetch-sources.py              # 抓取并更新 data.js
  python3 fetch-sources.py --dry-run    # 仅预览，不写入
  python3 fetch-sources.py --source x   # 仅抓取指定来源
"""

import json
import re
import os
import sys
import argparse
from datetime import datetime, timedelta
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
DATA_JS_PATH = SCRIPT_DIR.parent / "global" / "data.js"

# 搜索关键词
SEARCH_QUERIES = [
    "agentic software development",
    "AI coding workflow",
    "vibe coding best practices",
    "AI pair programming",
    "LLM agent development tools",
    "Cursor AI workflow",
    "Claude Code best practices",
    "AI-driven frontend development",
]

def fetch_from_web(query, source="web"):
    """
    占位：实际实现中这里会调用搜索API或web_fetch
    当前版本返回结构化的占位数据，后续集成 skillhub search
    """
    # TODO: 集成 actual search API
    # 1. 使用 online-search skill 搜索
    # 2. 或使用 multi-search-engine skill
    # 3. 或使用 web_fetch 抓取特定页面
    return []

def update_data_js(new_items):
    """更新 data.js 中的 feed 部分"""
    if not DATA_JS_PATH.exists():
        print(f"Error: {DATA_JS_PATH} not found")
        return False

    content = DATA_JS_PATH.read_text(encoding='utf-8')

    # 找到 feed 数组的位置
    feed_match = re.search(r'feed:\s*\[', content)
    if not feed_match:
        print("Error: Could not find feed array in data.js")
        return False

    # 生成新的 feed 条目
    feed_entries = []
    for item in new_items:
        entry = f"""    {{
      id: "{item['id']}",
      title: "{item['title']}",
      platform: "{item['platform']}",
      author: "{item['author']}",
      date: "{item['date']}",
      tags: {json.dumps(item['tags'], ensure_ascii=False)},
      summary: "{item['summary']}",
      url: "{item.get('url', '#')}"
    }}"""
        feed_entries.append(entry)

    # 在现有 feed 数组开头插入新条目
    if feed_entries:
        insert_pos = feed_match.end()
        new_content = content[:insert_pos] + "\n" + ",\n".join(feed_entries) + ",\n" + content[insert_pos:]
        DATA_JS_PATH.write_text(new_content, encoding='utf-8')
        print(f"Added {len(new_items)} items to feed")
    else:
        print("No new items to add")

    return True

def main():
    parser = argparse.ArgumentParser(description="Fetch AI dev workflow sources")
    parser.add_argument("--dry-run", action="store_true", help="Preview only")
    parser.add_argument("--source", type=str, help="Specific source to fetch from")
    args = parser.parse_args()

    print(f"📡 Fetching sources... ({datetime.now().isoformat()})")
    print(f"Data path: {DATA_JS_PATH}")

    all_items = []

    for query in SEARCH_QUERIES:
        print(f"\n🔍 Query: {query}")
        items = fetch_from_web(query, args.source)
        if items:
            all_items.extend(items)
            print(f"  Found {len(items)} items")

    # 去重
    seen_titles = set()
    unique_items = []
    for item in all_items:
        if item['title'] not in seen_titles:
            seen_titles.add(item['title'])
            unique_items.append(item)

    print(f"\n📊 Total unique items: {len(unique_items)}")

    if args.dry_run:
        for item in unique_items:
            print(f"  [{item['platform']}] {item['title']}")
        print("\n(Dry run — no changes written)")
    else:
        if unique_items:
            update_data_js(unique_items)
        else:
            print("No items to update")

    # 更新 meta 中的 lastUpdated
    if not args.dry_run:
        content = DATA_JS_PATH.read_text(encoding='utf-8')
        today = datetime.now().strftime("%Y-%m-%d")
        content = re.sub(
            r'lastUpdated:\s*"[^"]*"',
            f'lastUpdated: "{today}"',
            content
        )
        DATA_JS_PATH.write_text(content, encoding='utf-8')

if __name__ == "__main__":
    main()
