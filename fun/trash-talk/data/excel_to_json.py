import pandas as pd
import json
import os

def excel_to_json():
    # 讀取主題
    themes_df = pd.read_excel('themes.xlsx')
    themes = {}
    for _, row in themes_df.iterrows():
        themes[row['theme_key']] = row['theme_name']
    
    # 讀取標籤
    tags_df = pd.read_excel('tags.xlsx')
    tags = {}
    for _, row in tags_df.iterrows():
        tags[row['tag_key']] = {
            'name': row['tag_name'],
            'description': row['tag_description']
        }
    
    # 讀取句子
    sentences_df = pd.read_excel('sentences.xlsx')
    sentences = []
    for _, row in sentences_df.iterrows():
        sentences.append({
            'text': row['text'],
            'theme': row['theme'],
            'tags': row['tags'].split(',')
        })
    
    # 組合所有數據
    data = {
        'themes': themes,
        'tags': tags,
        'sentences': sentences
    }
    
    # 寫入 JSON 檔案
    with open('sentences.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
    
    print("已成功將 Excel 檔案轉換為 sentences.json")

if __name__ == '__main__':
    excel_to_json() 