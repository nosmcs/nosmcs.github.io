# Author Info Component

這是一個可重用的作者信息組件，包含浮水印、社交媒體連結和 favicon 配置。

## 使用方法

1. 將 `author-info` 目錄複製到您的項目中。

2. 在您的 HTML 文件的 `<head>` 中添加以下內容：
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
<link rel="stylesheet" href="author-info/author-style.css">

<!-- Favicon 配置 -->
<link rel="apple-touch-icon" sizes="180x180" href="author-info/favicon/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="author-info/favicon/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="author-info/favicon/favicon-16x16.png">
<link rel="manifest" href="author-info/favicon/site.webmanifest">
<link rel="mask-icon" href="author-info/favicon/safari-pinned-tab.svg" color="#00ebff">
<meta name="msapplication-TileColor" content="#1a1f35">
<meta name="theme-color" content="#1a1f35">
```

3. 在您的 HTML 文件的 `</body>` 標籤前添加以下內容：
```html
<a href="https://github.com/nosmc" class="watermark" target="_blank" rel="noopener noreferrer">
    <img src="author-info/favicon/favicon-32x32.png" alt="nos">
    <span>Created by nos</span>
</a>
<div class="copyright">
    © 2024 nos. All rights reserved.
</div>
<div class="social-links">
    <a href="https://discord.gg/Pah6vw36Tw" class="social-link" target="_blank" rel="noopener noreferrer" title="Discord">
        <i class="fab fa-discord"></i>
    </a>
    <a href="https://www.youtube.com/@n_os_" class="social-link" target="_blank" rel="noopener noreferrer" title="YouTube">
        <i class="fab fa-youtube"></i>
    </a>
    <a href="https://www.instagram.com" class="social-link" target="_blank" rel="noopener noreferrer" title="Instagram">
        <i class="fab fa-instagram"></i>
    </a>
</div>
```

## 自定義樣式

您可以通過修改 CSS 變量來自定義顏色：

```css
:root {
    --author-primary-color: #00ebff;  /* 主要顏色 */
    --author-text-color: #ffffff;     /* 文字顏色 */
}
```

## 注意事項

1. 確保文件路徑正確
2. 需要網絡連接以加載 Google Fonts 和 Font Awesome
3. 組件會固定在頁面底部
4. 支持響應式設計 
5. 使用favicon.io作為浮水印圖標