// Echo功能实现
let echoInput, echoButton, echoOutput;

// 全局函数，确保可以从任何地方调用
function performEcho() {
    try {
        // 每次执行时重新获取元素，避免引用失效
        echoInput = document.getElementById('echo-input');
        echoOutput = document.getElementById('echo-output');
        
        if (!echoInput || !echoOutput) {
            alert("Echo功能错误：找不到必要的DOM元素");
            return;
        }
        
        const inputText = echoInput.value;
        
        // 使用多种方式设置输出内容
        echoOutput.textContent = inputText;
        echoOutput.innerText = inputText; // 备用方法
        
        // 添加视觉反馈
        echoOutput.style.backgroundColor = '#e6ffe6';
        setTimeout(() => {
            echoOutput.style.backgroundColor = '';
        }, 500);
        
        return true;
    } catch (error) {
        alert("Echo功能出错：" + error.message);
        return false;
    }
}

// 初始化函数
function initEcho() {
    try {
        // 获取DOM元素
        echoInput = document.getElementById('echo-input');
        echoButton = document.getElementById('echo-button');
        echoOutput = document.getElementById('echo-output');
        
        // 确保所有元素都存在
        if (!echoInput || !echoButton || !echoOutput) {
            alert("Echo功能错误：找不到必要的DOM元素");
            return;
        }

        // 点击按钮时执行echo功能
        echoButton.onclick = function() {
            performEcho();
        };

        // 按下Enter键时也执行echo功能
        echoInput.onkeypress = function(event) {
            if (event.key === 'Enter') {
                performEcho();
            }
        };
        
        return true;
    } catch (error) {
        alert("Echo功能初始化出错：" + error.message);
        return false;
    }
}

// 确保在DOM加载完成后执行初始化
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initEcho);
} else {
    initEcho();
}

// 延迟初始化，以防其他方法都失败
setTimeout(function() {
    if (!echoInput || !echoButton || !echoOutput) {
        initEcho();
    }
}, 1000);