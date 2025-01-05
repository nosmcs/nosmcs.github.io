const API_KEY = 'sk-6inQb64FRR5SKRrl8c3c2b317c774a89A21074A8CbD8210b';
const API_URL = 'https://free.v36.cm/v1/chat/completions';

let messageHistory = [{
    role: 'system',
    content: `你是一個有幫助的AI助手，請遵循以下規則：
1. 使用繁體中文回答
2. 在列舉事項時使用換行
3. 在展示程式碼時使用程式碼區塊並換行
4. 保持清晰的段落分隔
5. 使用適當的標點符號
6. 回答要有條理，分點列出`
}];

export async function sendMessage(message) {
    try {
        // 添加用戶消息到歷史
        messageHistory.push({
            role: 'user',
            content: message
        });

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: messageHistory,
                temperature: 0.7,
                presence_penalty: 0.6,
                frequency_penalty: 0.5
            })
        });

        if (!response.ok) {
            console.error('API 錯誤狀態:', response.status);
            const errorText = await response.text();
            console.error('錯誤詳情:', errorText);
            throw new Error(`API 請求失敗: ${response.status}`);
        }

        const data = await response.json();
        const assistantMessage = data.choices[0].message;

        // 添加助手回應到歷史
        messageHistory.push(assistantMessage);

        // 如果歷史太長，移除最舊的對話（保留system提示）
        if (messageHistory.length > 10) {
            messageHistory = [
                messageHistory[0],
                ...messageHistory.slice(-9)
            ];
        }

        return assistantMessage.content;
    } catch (error) {
        console.error('API 錯誤:', error);
        throw error;
    }
} 