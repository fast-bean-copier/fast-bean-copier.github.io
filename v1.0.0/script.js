// 页面加载时的初始化
document.addEventListener('DOMContentLoaded', function() {
    // 高亮当前页面的导航链接
    highlightCurrentNav();
    
    // 添加代码复制功能
    addCopyButtonsToCodeBlocks();
});

// 高亮当前页面的导航链接
function highlightCurrentNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// 为代码块添加复制按钮
function addCopyButtonsToCodeBlocks() {
    const codeBlocks = document.querySelectorAll('pre');
    
    codeBlocks.forEach((block, index) => {
        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.textContent = '复制';
        button.setAttribute('data-index', index);
        button.addEventListener('click', function() {
            copyCodeBlock(this);
        });
        
        block.style.position = 'relative';
        block.appendChild(button);
    });
}

// 复制代码块内容
function copyCodeBlock(button) {
    const codeBlock = button.parentElement;
    const code = codeBlock.querySelector('code');
    const text = code.textContent;
    
    // 使用 Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            const originalText = button.textContent;
            button.textContent = '已复制！';
            setTimeout(() => {
                button.textContent = originalText;
            }, 2000);
        }).catch(err => {
            console.error('复制失败:', err);
            fallbackCopy(text);
        });
    } else {
        // 降级方案
        fallbackCopy(text);
    }
}

// 降级复制方案（用于不支持 Clipboard API 的浏览器）
function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        alert('代码已复制到剪贴板');
    } catch (err) {
        console.error('复制失败:', err);
    }
    document.body.removeChild(textarea);
}

// 平滑滚动到锚点
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// 添加搜索功能（可选）
function searchContent(query) {
    const content = document.querySelector('.content');
    if (!content) return;
    
    const text = content.textContent.toLowerCase();
    const queryLower = query.toLowerCase();
    
    if (text.includes(queryLower)) {
        return true;
    }
    return false;
}
