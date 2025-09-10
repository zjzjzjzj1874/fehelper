/**
 * 随机工具 - 主要JavaScript功能实现
 * 包含四个主要功能：
 * 1. 随机数生成
 * 2. 随机字符串生成
 * 3. 随机密码生成
 * 4. UUID生成
 */

// 声明全局变量，方便在任何地方访问
let generateNumberBtn = null, generateStringBtn = null, generatePasswordBtn = null, generateUuidBtn = null;
let copyNumberBtn = null, copyStringBtn = null, copyPasswordBtn = null, copyUuidBtn = null;
let isInitialized = false;

// 初始化所有功能的主函数
function initAllFeatures() {
    // 按照指定顺序初始化各功能模块
    initRandomPassword();
    initRandomString();
    initUuidGenerator();
    initRandomNumber();
    initCopyButtons();
    
    isInitialized = true;
    return true;
}

// 确保在DOM加载完成后执行初始化
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAllFeatures);
} else {
    initAllFeatures();
}

// 延迟初始化，以防其他方法都失败
setTimeout(function() {
    if (!document.getElementById('generate-password') || 
        !document.getElementById('generate-password').onclick) {
        initAllFeatures();
    }
}, 1000);

/**
 * 随机数生成器初始化
 */
function initRandomNumber() {
    // 获取DOM元素
    const minInput = document.getElementById('min-number');
    const maxInput = document.getElementById('max-number');
    generateNumberBtn = document.getElementById('generate-number');
    const resultElement = document.getElementById('number-result');
    copyNumberBtn = document.getElementById('copy-number');

    if (!generateNumberBtn) {
        return;
    }
    
    // 定义生成随机数的函数
    function performRandomNumber() {
        const min = parseInt(minInput.value, 10);
        const max = parseInt(maxInput.value, 10);

        // 验证输入
        if (isNaN(min) || isNaN(max)) {
            alert('请输入有效的数字范围');
            return;
        }

        if (min >= max) {
            alert('最小值必须小于最大值');
            return;
        }

        // 生成随机数
        const randomNumber = generateRandomNumber(min, max);
        resultElement.textContent = randomNumber;
        
        // 添加视觉反馈
        resultElement.style.backgroundColor = '#e6ffe6';
        setTimeout(() => {
            resultElement.style.backgroundColor = '';
        }, 500);
    }

    // 点击按钮时执行随机数生成功能
    generateNumberBtn.onclick = performRandomNumber;
}

/**
 * 生成指定范围内的随机整数
 * @param {number} min - 最小值（包含）
 * @param {number} max - 最大值（包含）
 * @returns {number} 随机整数
 */
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 随机字符串生成器初始化
 */
function initRandomString() {
    const lengthInput = document.getElementById('string-length');
    const uppercaseCheckbox = document.getElementById('uppercase');
    const lowercaseCheckbox = document.getElementById('lowercase');
    const numbersCheckbox = document.getElementById('numbers');
    const specialCheckbox = document.getElementById('special');
    generateStringBtn = document.getElementById('generate-string');
    const resultElement = document.getElementById('string-result');
    copyStringBtn = document.getElementById('copy-string');

    if (!generateStringBtn) {
        return;
    }

    // 定义生成随机字符串的函数
    function performRandomString() {
        const length = parseInt(lengthInput.value, 10);

        // 验证输入
        if (isNaN(length) || length <= 0 || length > 100) {
            alert('请输入1-100之间的有效长度');
            return;
        }

        // 至少选择一种字符类型
        if (!uppercaseCheckbox.checked && !lowercaseCheckbox.checked && 
            !numbersCheckbox.checked && !specialCheckbox.checked) {
            alert('请至少选择一种字符类型');
            return;
        }

        // 生成随机字符串
        const randomString = generateRandomString(
            length,
            uppercaseCheckbox.checked,
            lowercaseCheckbox.checked,
            numbersCheckbox.checked,
            specialCheckbox.checked
        );

        resultElement.textContent = randomString;
        
        // 添加视觉反馈
        resultElement.style.backgroundColor = '#e6ffe6';
        setTimeout(() => {
            resultElement.style.backgroundColor = '';
        }, 500);
    }

    // 绑定点击事件
    generateStringBtn.onclick = performRandomString;
    
    
}

/**
 * 生成随机字符串
 * @param {number} length - 字符串长度
 * @param {boolean} includeUppercase - 是否包含大写字母
 * @param {boolean} includeLowercase - 是否包含小写字母
 * @param {boolean} includeNumbers - 是否包含数字
 * @param {boolean} includeSpecial - 是否包含特殊字符
 * @returns {string} 随机字符串
 */
function generateRandomString(length, includeUppercase, includeLowercase, includeNumbers, includeSpecial) {
    let charset = '';
    let result = '';

    // 构建字符集
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSpecial) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    // 生成随机字符串
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        result += charset[randomIndex];
    }

    return result;
}

/**
 * 随机密码生成器初始化
 */
function initRandomPassword() {
    const lengthInput = document.getElementById('password-length');
    const uppercaseCheckbox = document.getElementById('pwd-uppercase');
    const lowercaseCheckbox = document.getElementById('pwd-lowercase');
    const numbersCheckbox = document.getElementById('pwd-numbers');
    const specialCheckbox = document.getElementById('pwd-special');
    generatePasswordBtn = document.getElementById('generate-password');
    const resultElement = document.getElementById('password-result');
    const strengthIndicator = document.getElementById('strength-indicator');
    const strengthText = document.getElementById('strength-text');
    copyPasswordBtn = document.getElementById('copy-password');

    if (!generatePasswordBtn) {
        return;
    }

    // 定义生成随机密码的函数
    function performRandomPassword() {
        const length = parseInt(lengthInput.value, 10);

        // 验证输入
        if (isNaN(length) || length < 8 || length > 32) {
            alert('请输入8-32之间的有效长度');
            return;
        }
        
        // 确保至少选择一种字符类型
        if (!uppercaseCheckbox.checked && !lowercaseCheckbox.checked && 
            !numbersCheckbox.checked && !specialCheckbox.checked) {
            alert('请至少选择一种字符类型');
            return;
        }

        // 生成随机密码
        const password = generateRandomPassword(
            length,
            uppercaseCheckbox.checked,
            lowercaseCheckbox.checked,
            numbersCheckbox.checked,
            specialCheckbox.checked
        );
        resultElement.textContent = password;

        // 更新密码强度指示器
        updatePasswordStrength(password, strengthIndicator, strengthText);
        
        // 添加视觉反馈
        resultElement.style.backgroundColor = '#e6ffe6';
        setTimeout(() => {
            resultElement.style.backgroundColor = '';
        }, 500);
    }
    
    // 绑定点击事件
    generatePasswordBtn.onclick = performRandomPassword;

    // 初始密码强度
    updatePasswordStrength('', strengthIndicator, strengthText);
}

/**
 * 生成随机密码
 * @param {number} length - 密码长度
 * @param {boolean} includeUppercase - 是否包含大写字母
 * @param {boolean} includeLowercase - 是否包含小写字母
 * @param {boolean} includeNumbers - 是否包含数字
 * @param {boolean} includeSpecial - 是否包含特殊字符
 * @returns {string} 随机密码
 */
function generateRandomPassword(length, includeUppercase, includeLowercase, includeNumbers, includeSpecial) {
    // 定义字符集
    const uppercase = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // 排除容易混淆的字符
    const lowercase = 'abcdefghijkmnopqrstuvwxyz'; // 排除容易混淆的字符
    const numbers = '23456789'; // 排除容易混淆的字符
    const special = '!@#$%^&*_+-=';

    let charset = '';
    let requiredChars = [];
    
    // 根据用户选择构建字符集
    if (includeUppercase) {
        charset += uppercase;
        requiredChars.push(uppercase[Math.floor(Math.random() * uppercase.length)]);
    }
    
    if (includeLowercase) {
        charset += lowercase;
        requiredChars.push(lowercase[Math.floor(Math.random() * lowercase.length)]);
    }
    
    if (includeNumbers) {
        charset += numbers;
        requiredChars.push(numbers[Math.floor(Math.random() * numbers.length)]);
    }
    
    if (includeSpecial) {
        charset += special;
        requiredChars.push(special[Math.floor(Math.random() * special.length)]);
    }

    // 确保密码至少包含所选类型的一个字符
    let password = requiredChars.join('');
    
    // 填充剩余长度
    const remainingLength = length - requiredChars.length;
    
    for (let i = 0; i < remainingLength; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    // 打乱密码字符顺序
    return shuffleString(password);
}

/**
 * 打乱字符串中字符的顺序
 * @param {string} str - 输入字符串
 * @returns {string} 打乱后的字符串
 */
function shuffleString(str) {
    const array = str.split('');
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // 交换元素
    }
    return array.join('');
}

/**
 * 更新密码强度指示器
 * @param {string} password - 密码
 * @param {HTMLElement} indicator - 强度指示器元素
 * @param {HTMLElement} text - 强度文本元素
 */
function updatePasswordStrength(password, indicator, text) {
    let strength = 0;
    let width = '0%';
    let color = '#dc3545'; // 默认红色（弱）
    let strengthLabel = '弱';

    if (password.length > 0) {
        // 基础强度评分
        strength = Math.min(100, password.length * 5); // 每个字符5分，最高100分

        // 根据字符类型增加分数
        if (/[A-Z]/.test(password)) strength += 10; // 包含大写字母
        if (/[a-z]/.test(password)) strength += 10; // 包含小写字母
        if (/[0-9]/.test(password)) strength += 10; // 包含数字
        if (/[^A-Za-z0-9]/.test(password)) strength += 15; // 包含特殊字符

        // 根据分数设置强度
        if (strength < 50) {
            color = '#dc3545'; // 红色（弱）
            strengthLabel = '弱';
        } else if (strength < 80) {
            color = '#ffc107'; // 黄色（中等）
            strengthLabel = '中等';
        } else {
            color = '#28a745'; // 绿色（强）
            strengthLabel = '强';
        }

        width = Math.min(100, strength) + '%';
    }

    // 更新UI
    indicator.style.width = width;
    indicator.style.backgroundColor = color;
    text.textContent = strengthLabel;
}

/**
 * UUID生成器初始化
 */
function initUuidGenerator() {
    generateUuidBtn = document.getElementById('generate-uuid');
    const resultElement = document.getElementById('uuid-result');
    copyUuidBtn = document.getElementById('copy-uuid');

    if (!generateUuidBtn) {
        return;
    }

    // 定义生成UUID的函数
    function performGenerateUUID() {
        const uuid = generateUUID();
        resultElement.textContent = uuid;
        
        // 添加视觉反馈
        resultElement.style.backgroundColor = '#e6ffe6';
        setTimeout(() => {
            resultElement.style.backgroundColor = '';
        }, 500);
    }
    
    // 绑定点击事件
     generateUuidBtn.onclick = performGenerateUUID;
}

/**
 * 生成UUID v4
 * @returns {string} UUID字符串
 */
function generateUUID() {
    // 实现基于RFC4122版本4的UUID
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * 初始化所有复制按钮
 */
function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    const toast = document.getElementById('toast');

    copyButtons.forEach((button) => {
        // 定义复制功能函数
        function performCopy() {
            // 获取对应的结果元素
            const resultId = button.id.replace('copy-', '');
            const resultElement = document.getElementById(resultId + '-result');
            
            if (!resultElement) {
                return;
            }
            
            const textToCopy = resultElement.textContent;

            // 复制到剪贴板
            copyToClipboard(textToCopy);

            // 显示提示
            showToast(toast);
            
            // 添加视觉反馈
            resultElement.style.backgroundColor = '#e6ffe6';
            setTimeout(() => {
                resultElement.style.backgroundColor = '';
            }, 500);
        }
        
        // 绑定事件
         button.onclick = performCopy;
    });
}

/**
 * 复制文本到剪贴板
 * @param {string} text - 要复制的文本
 */
function copyToClipboard(text) {
    // 创建临时textarea元素
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed'; // 避免滚动到底部
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        // 执行复制命令
        document.execCommand('copy');
    } catch (err) {
        // 复制失败时静默处理
    }
    
    // 移除临时元素
    document.body.removeChild(textarea);
}

/**
 * 显示提示框
 * @param {HTMLElement} toast - 提示框元素
 */
function showToast(toast) {
    toast.classList.add('show');
    
    // 3秒后隐藏提示框
    setTimeout(function() {
        toast.classList.remove('show');
    }, 3000);
}