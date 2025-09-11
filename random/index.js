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
let generatePhoneBtn = null, generateUsernameBtn = null, generateEmailBtn = null, generateIpBtn = null;
let generateDateBtn = null, generateTimeBtn = null;
let copyPhoneBtn = null, copyUsernameBtn = null, copyEmailBtn = null, copyIpBtn = null;
let copyDateBtn = null, copyTimeBtn = null;
let isInitialized = false;

// 初始化所有功能的主函数
function initAllFeatures() {
    // 按照指定顺序初始化各功能模块
    initRandomPassword();
    initRandomString();
    initUuidGenerator();
    initRandomNumber();
    initRandomPhone();
    initRandomUsername();
    initRandomEmail();
    initRandomIP();
    initRandomDate();
    initRandomTime();
    initCopyButtons();
    initTabSwitching(); // 初始化Tab切换功能
    
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
 * Tab切换功能初始化
 */
function initTabSwitching() {
    console.log('正在注册Tab切换功能...');
    const tabs = document.querySelectorAll('.tab');
    const toolCards = document.querySelectorAll('.tool-card');
    
    console.log('找到tabs:', tabs.length, '找到工具卡片:', toolCards.length);
    
    // 为每个tab设置点击处理函数
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].onclick = function() {
            console.log('Tab被点击:', this.getAttribute('data-tab'));
            // 移除所有tab的active类
            for (let j = 0; j < tabs.length; j++) {
                tabs[j].classList.remove('active');
            }
            // 给当前点击的tab添加active类
            this.classList.add('active');

            const category = this.getAttribute('data-tab');
            console.log('切换到分类:', category);

            // 显示或隐藏工具卡片
            for (let k = 0; k < toolCards.length; k++) {
                const cardCategory = toolCards[k].getAttribute('data-category');
                console.log('卡片类别:', cardCategory);
                if (category === 'all' || cardCategory === category) {
                    toolCards[k].style.display = '';
                } else {
                    toolCards[k].style.display = 'none';
                }
            }
        };
    }
}

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
    // 获取所有复制按钮
    copyPasswordBtn = document.getElementById('copy-password');
    copyStringBtn = document.getElementById('copy-string');
    copyUuidBtn = document.getElementById('copy-uuid');
    copyNumberBtn = document.getElementById('copy-number');
    copyPhoneBtn = document.getElementById('copy-phone');
    copyUsernameBtn = document.getElementById('copy-username');
    copyEmailBtn = document.getElementById('copy-email');
    copyIpBtn = document.getElementById('copy-ip');
    copyDateBtn = document.getElementById('copy-date');
    copyTimeBtn = document.getElementById('copy-time');

    // 绑定点击事件
    if (copyPasswordBtn) {
        copyPasswordBtn.onclick = function() {
            copyToClipboard('password-result');
        };
    }

    if (copyStringBtn) {
        copyStringBtn.onclick = function() {
            copyToClipboard('string-result');
        };
    }

    if (copyUuidBtn) {
        copyUuidBtn.onclick = function() {
            copyToClipboard('uuid-result');
        };
    }

    if (copyNumberBtn) {
        copyNumberBtn.onclick = function() {
            copyToClipboard('number-result');
        };
    }

    if (copyPhoneBtn) {
        copyPhoneBtn.onclick = function() {
            copyToClipboard('phone-result');
        };
    }

    if (copyUsernameBtn) {
        copyUsernameBtn.onclick = function() {
            copyToClipboard('username-result');
        };
    }

    if (copyEmailBtn) {
        copyEmailBtn.onclick = function() {
            copyToClipboard('email-result');
        };
    }

    if (copyIpBtn) {
        copyIpBtn.onclick = function() {
            copyToClipboard('ip-result');
        };
    }

    if (copyDateBtn) {
        copyDateBtn.onclick = function() {
            copyToClipboard('date-result');
        };
    }

    if (copyTimeBtn) {
        copyTimeBtn.onclick = function() {
            copyToClipboard('time-result');
        };
    }
}

/**
 * 复制文本到剪贴板
 * @param {string} elementId - 要复制内容的元素ID
 */
function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const text = element.innerText;
    if (!text) return;

    try {
        // 创建临时文本区域
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);

        // 选择并复制
        textarea.select();
        document.execCommand('copy');

        // 移除临时元素
        document.body.removeChild(textarea);

        // 显示提示
        showToast();

        // 添加视觉反馈
        element.style.backgroundColor = '#e6ffe6';
        setTimeout(() => {
            element.style.backgroundColor = '';
        }, 500);
    } catch (err) {
        // 复制失败
    }
}

// 初始化随机手机号生成器
function initRandomPhone() {
	generatePhoneBtn = document.getElementById('generate-phone');
	if (!generatePhoneBtn) return;

	generatePhoneBtn.onclick = generateRandomPhone;
}

// 生成随机手机号
function generateRandomPhone() {
	const phoneResult = document.getElementById('phone-result');
	if (!phoneResult) return;

	// 获取运营商选择
	const isAll = document.getElementById('phone-type-all').checked;
	const isCMCC = document.getElementById('phone-type-cmcc').checked;
	const isCUCC = document.getElementById('phone-type-cucc').checked;
	const isCTCC = document.getElementById('phone-type-ctcc').checked;

	// 运营商前缀
	const cmccPrefixes = ['134', '135', '136', '137', '138', '139', '147', '150', '151', '152', '157', '158', '159', '172', '178', '182', '183', '184', '187', '188', '198'];
	const cuccPrefixes = ['130', '131', '132', '145', '155', '156', '166', '175', '176', '185', '186', '196'];
	const ctccPrefixes = ['133', '149', '153', '173', '177', '180', '181', '189', '199'];

	let prefixes = [];
	if (isAll || (isCMCC && isCUCC && isCTCC)) {
		prefixes = [...cmccPrefixes, ...cuccPrefixes, ...ctccPrefixes];
	} else {
		if (isCMCC) prefixes = [...prefixes, ...cmccPrefixes];
		if (isCUCC) prefixes = [...prefixes, ...cuccPrefixes];
		if (isCTCC) prefixes = [...prefixes, ...ctccPrefixes];
		// 如果没有选择任何运营商，默认使用所有
		if (prefixes.length === 0) {
			prefixes = [...cmccPrefixes, ...cuccPrefixes, ...ctccPrefixes];
		}
	}

	// 随机选择前缀
	const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
	
	// 生成后8位数字
	let suffix = '';
	for (let i = 0; i < 8; i++) {
		suffix += Math.floor(Math.random() * 10);
	}

	phoneResult.innerText = prefix + suffix;
}

// 初始化随机用户名生成器
function initRandomUsername() {
	generateUsernameBtn = document.getElementById('generate-username');
	if (!generateUsernameBtn) return;

	generateUsernameBtn.onclick = generateRandomUsername;
}

// 生成随机用户名
function generateRandomUsername() {
	const usernameResult = document.getElementById('username-result');
	if (!usernameResult) return;

	// 获取用户选择
	const length = parseInt(document.getElementById('username-length').value) || 8;
	const includeLetters = document.getElementById('username-letters').checked;
	const includeNumbers = document.getElementById('username-numbers').checked;
	const includeUnderscore = document.getElementById('username-underscore').checked;

	// 确保至少选择了一种字符类型
	if (!includeLetters && !includeNumbers && !includeUnderscore) {
		usernameResult.innerText = '请至少选择一种字符类型';
		return;
	}

	// 字符集
	let charset = '';
	if (includeLetters) charset += 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	if (includeNumbers) charset += '0123456789';
	if (includeUnderscore) charset += '_';

	// 生成用户名
	let username = '';
	for (let i = 0; i < length; i++) {
		username += charset.charAt(Math.floor(Math.random() * charset.length));
	}

	usernameResult.innerText = username;
}

// 初始化随机邮箱生成器
function initRandomEmail() {
	generateEmailBtn = document.getElementById('generate-email');
	if (!generateEmailBtn) return;

	generateEmailBtn.onclick = generateRandomEmail;

	// 设置结束日期默认值为今天
	const dateEndInput = document.getElementById('date-end');
	if (dateEndInput) {
		const today = new Date();
		const year = today.getFullYear();
		let month = today.getMonth() + 1;
		let day = today.getDate();

		// 格式化月和日，确保两位数
		month = month < 10 ? '0' + month : month;
		day = day < 10 ? '0' + day : day;

		dateEndInput.value = `${year}-${month}-${day}`;
	}
}

// 生成随机邮箱
function generateRandomEmail() {
	const emailResult = document.getElementById('email-result');
	if (!emailResult) return;

	// 获取用户选择
	const nameLength = parseInt(document.getElementById('email-name-length').value) || 8;
	const domainSelect = document.getElementById('email-domain');
	const domainValue = domainSelect.value;

	// 可用域名列表
	const domains = ['gmail.com', 'outlook.com', 'qq.com', '163.com', '126.com', 'yahoo.com', 'hotmail.com', 'foxmail.com'];

	// 生成用户名部分
	const charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
	let username = '';
	for (let i = 0; i < nameLength; i++) {
		username += charset.charAt(Math.floor(Math.random() * charset.length));
	}

	// 确定域名
	let domain;
	if (domainValue === 'random') {
		domain = domains[Math.floor(Math.random() * domains.length)];
	} else {
		domain = domainValue;
	}

	emailResult.innerText = username + '@' + domain;
}

// 初始化随机IP地址生成器
function initRandomIP() {
	generateIpBtn = document.getElementById('generate-ip');
	if (!generateIpBtn) return;

	generateIpBtn.onclick = generateRandomIP;
}

// 生成随机IP地址
function generateRandomIP() {
	const ipResult = document.getElementById('ip-result');
	if (!ipResult) return;

	// 获取IP版本选择和内网选项
	const isIPv4 = document.getElementById('ip-v4').checked;
	const isInternal = document.getElementById('ip-internal').checked;

	if (isIPv4) {
		// 生成IPv4地址
		let ipv4 = '';
		
		if (isInternal) {
			// 内网IP地址范围
			const internalRanges = [
				{ first: 10, second: [0, 255], third: [0, 255], fourth: [1, 254] }, // 10.0.0.0/8
				{ first: 172, second: [16, 31], third: [0, 255], fourth: [1, 254] }, // 172.16.0.0/12
				{ first: 192, second: [168], third: [0, 255], fourth: [1, 254] }  // 192.168.0.0/16
			];
			
			// 随机选择一个内网范围
			const range = internalRanges[Math.floor(Math.random() * internalRanges.length)];
			
			// 生成符合选定范围的IP
			ipv4 = range.first + '.';
			ipv4 += range.second.length === 1 
				? range.second[0] 
				: Math.floor(Math.random() * (range.second[1] - range.second[0] + 1)) + range.second[0];
			ipv4 += '.';
			ipv4 += Math.floor(Math.random() * (range.third[1] - range.third[0] + 1)) + range.third[0];
			ipv4 += '.';
			ipv4 += Math.floor(Math.random() * (range.fourth[1] - range.fourth[0] + 1)) + range.fourth[0];
		} else {
			// 生成公网IPv4地址（排除保留地址）
			let firstOctet;
			do {
				firstOctet = Math.floor(Math.random() * 256);
			} while (firstOctet === 10 || firstOctet === 127 || (firstOctet >= 224 && firstOctet <= 255));
			
			ipv4 = firstOctet + '.';
			
			// 避免172.16.0.0/12范围
			if (firstOctet === 172) {
				let secondOctet;
				do {
					secondOctet = Math.floor(Math.random() * 256);
				} while (secondOctet >= 16 && secondOctet <= 31);
				ipv4 += secondOctet;
			} else if (firstOctet === 192) {
				// 避免192.168.0.0/16范围
				let secondOctet;
				do {
					secondOctet = Math.floor(Math.random() * 256);
				} while (secondOctet === 168);
				ipv4 += secondOctet;
			} else {
				ipv4 += Math.floor(Math.random() * 256);
			}
			
			ipv4 += '.';
			ipv4 += Math.floor(Math.random() * 256);
			ipv4 += '.';
			ipv4 += Math.floor(Math.random() * 254) + 1; // 避免0和255
		}
		
		ipResult.innerText = ipv4;
	} else {
		// 生成IPv6地址
		const hexChars = '0123456789abcdef';
		let ipv6 = '';
		
		if (isInternal) {
			// 内网IPv6地址 (fd00::/8 - 唯一本地地址)
			ipv6 = 'fd';
			// 生成随机的全局ID (40位)
			for (let i = 0; i < 10; i++) {
				ipv6 += hexChars.charAt(Math.floor(Math.random() * hexChars.length));
			}
			// 添加分隔符
			ipv6 = ipv6.substring(0, 4) + ':' + ipv6.substring(4, 8) + ':' + ipv6.substring(8, 12) + '::';
			// 添加剩余部分
			for (let i = 0; i < 4; i++) {
				let segment = '';
				for (let j = 0; j < 4; j++) {
					segment += hexChars.charAt(Math.floor(Math.random() * hexChars.length));
				}
				ipv6 += segment;
				if (i < 3) ipv6 += ':';
			}
		} else {
			// 生成公网IPv6地址
			for (let i = 0; i < 8; i++) {
				for (let j = 0; j < 4; j++) {
					ipv6 += hexChars.charAt(Math.floor(Math.random() * hexChars.length));
				}
				if (i < 7) ipv6 += ':';
			}
		}
		
		ipResult.innerText = ipv6;
	}
}

// 初始化随机日期生成器
function initRandomDate() {
	generateDateBtn = document.getElementById('generate-date');
	if (!generateDateBtn) return;

	generateDateBtn.onclick = generateRandomDate;

	// 设置结束日期默认值为今天
	const dateEndInput = document.getElementById('date-end');
	if (dateEndInput) {
		const today = new Date();
		const year = today.getFullYear();
		let month = today.getMonth() + 1;
		let day = today.getDate();

		// 格式化月和日，确保两位数
		month = month < 10 ? '0' + month : month;
		day = day < 10 ? '0' + day : day;

		dateEndInput.value = `${year}-${month}-${day}`;
	}
}

// 生成随机日期
function generateRandomDate() {
	const dateResult = document.getElementById('date-result');
	if (!dateResult) return;

	// 获取用户选择
	const startDateStr = document.getElementById('date-start').value;
	const endDateStr = document.getElementById('date-end').value;
	const formatValue = document.getElementById('date-format').value;

	// 解析日期
	const startDate = startDateStr ? new Date(startDateStr) : new Date('2000-01-01');
	const endDate = endDateStr ? new Date(endDateStr) : new Date();

	// 生成随机时间戳
	const randomTimestamp = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
	const randomDate = new Date(randomTimestamp);

	// 格式化日期
	let formattedDate;
	const year = randomDate.getFullYear();
	let month = randomDate.getMonth() + 1;
	let day = randomDate.getDate();

	// 确保月和日是两位数
	const monthStr = month < 10 ? '0' + month : month;
	const dayStr = day < 10 ? '0' + day : day;

	switch (formatValue) {
		case 'yyyy-MM-dd':
			formattedDate = `${year}-${monthStr}-${dayStr}`;
			break;
		case 'dd/MM/yyyy':
			formattedDate = `${dayStr}/${monthStr}/${year}`;
			break;
		case 'MM/dd/yyyy':
			formattedDate = `${monthStr}/${dayStr}/${year}`;
			break;
		case 'yyyy年MM月dd日':
			formattedDate = `${year}年${monthStr}月${dayStr}日`;
			break;
		default:
			formattedDate = `${year}-${monthStr}-${dayStr}`;
	}

	dateResult.innerText = formattedDate;
}

// 初始化随机时间生成器
function initRandomTime() {
	generateTimeBtn = document.getElementById('generate-time');
	if (!generateTimeBtn) return;

	generateTimeBtn.onclick = generateRandomTime;
}

// 生成随机时间
function generateRandomTime() {
	const timeResult = document.getElementById('time-result');
	if (!timeResult) return;

	// 获取用户选择
	const is24h = document.getElementById('time-24h').checked;
	const includeSeconds = document.getElementById('time-seconds').checked;

	// 生成随机小时、分钟和秒
	const hour24 = Math.floor(Math.random() * 24);
	const hour12 = hour24 % 12 || 12; // 12小时制
	const minute = Math.floor(Math.random() * 60);
	const second = Math.floor(Math.random() * 60);
	const ampm = hour24 < 12 ? 'AM' : 'PM';

	// 格式化时间
	const hourStr = (is24h ? hour24 : hour12) < 10 ? '0' + (is24h ? hour24 : hour12) : (is24h ? hour24 : hour12);
	const minuteStr = minute < 10 ? '0' + minute : minute;
	const secondStr = second < 10 ? '0' + second : second;

	let formattedTime;
	if (includeSeconds) {
		formattedTime = `${hourStr}:${minuteStr}:${secondStr}`;
	} else {
		formattedTime = `${hourStr}:${minuteStr}`;
	}

	// 添加AM/PM（如果是12小时制）
	if (!is24h) {
		formattedTime += ` ${ampm}`;
	}

	timeResult.innerText = formattedTime;
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