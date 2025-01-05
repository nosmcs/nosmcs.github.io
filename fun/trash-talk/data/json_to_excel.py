import json
import pandas as pd
import os

def json_to_excel():
    # 讀取 JSON 檔案
    with open('sentences.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # 轉換主題
    themes_data = [[k, v] for k, v in data['themes'].items()]
    themes_df = pd.DataFrame(themes_data, columns=['theme_key', 'theme_name'])
    themes_df.to_excel('themes.xlsx', index=False)
    
    # 轉換標籤
    tags_data = [[k, v['name'], v['description']] for k, v in data['tags'].items()]
    tags_df = pd.DataFrame(tags_data, columns=['tag_key', 'tag_name', 'tag_description'])
    tags_df.to_excel('tags.xlsx', index=False)
    
    # 轉換句子
    sentences_data = []
    for sentence in data['sentences']:
        sentences_data.append([
            sentence['text'],
            sentence['theme'],
            ','.join(sentence['tags'])
        ])
    sentences_df = pd.DataFrame(sentences_data, columns=['text', 'theme', 'tags'])
    sentences_df.to_excel('sentences.xlsx', index=False)
    
    print("已成功將 JSON 轉換為 Excel 檔案：")
    print("1. themes.xlsx")
    print("2. tags.xlsx")
    print("3. sentences.xlsx")

if __name__ == '__main__':
    json_to_excel() 