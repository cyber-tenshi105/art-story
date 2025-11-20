// 后端 API
const API_URL = "https://art-artist-story.onrender.com";

// 获取 DOM 元素
const ageGroup = document.getElementById("ageGroup");
const ageCustom = document.getElementById("ageCustom");
const style = document.getElementById("style");
const styleCustom = document.getElementById("styleCustom");
const traits = document.getElementById("traits");
const traitsCustom = document.getElementById("traitsCustom");
const personality = document.getElementById("personality");
const personalityCustom = document.getElementById("personalityCustom");
const nickname = document.getElementById("nickname");
const extra = document.getElementById("extra");
const output = document.getElementById("output");
const generateBtn = document.getElementById("generateBtn");

// 检查所有必需元素是否存在
if (!ageGroup || !generateBtn) {
    console.error("缺少必要的 DOM 元素");
}

// 显示自定义栏逻辑
function toggleCustom(selectEl, customEl) {
    if (!selectEl || !customEl) return;
    
    selectEl.addEventListener("change", () => {
        if (selectEl.value === "自定义") {
            customEl.classList.remove("hidden");
        } else {
            customEl.classList.add("hidden");
        }
    });
}

// 初始化自定义栏切换
if (ageGroup && ageCustom) toggleCustom(ageGroup, ageCustom);
if (style && styleCustom) toggleCustom(style, styleCustom);
if (traits && traitsCustom) toggleCustom(traits, traitsCustom);
if (personality && personalityCustom) toggleCustom(personality, personalityCustom);

// 测试后端连接
async function testBackendConnection() {
    try {
        console.log("测试后端连接...");
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ test: "connection" })
        });
        
        console.log("后端响应状态:", response.status);
        return response.ok;
    } catch (error) {
        console.error("后端连接测试失败:", error);
        return false;
    }
}

// 点击生成故事
generateBtn.addEventListener("click", async () => {
    // 验证必要字段
    if (!nickname.value.trim()) {
        output.innerHTML = "❌ 请输入昵称";
        return;
    }

    const data = {
        nickname: nickname.value,
        age: ageGroup.value === "自定义" ? (ageCustom ? ageCustom.value : "") : ageGroup.value,
        style: style.value === "自定义" ? (styleCustom ? styleCustom.value : "") : style.value,
        traits: traits.value === "自定义" ? (traitsCustom ? traitsCustom.value : "") : traits.value,
        personality: personality.value === "自定义" ? (personalityCustom ? personalityCustom.value : "") : personality.value,
        extra: extra.value
    };

    console.log("发送数据:", data);

    // 禁用按钮防止重复提交
    generateBtn.disabled = true;
    generateBtn.textContent = "生成中...";
    output.innerHTML = "⏳ 正在生成中，请稍候...";

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        });

        console.log("响应状态:", res.status);
        
        if (!res.ok) {
            throw new Error(`HTTP错误! 状态: ${res.status}`);
        }

        const result = await res.json();
        console.log("生成结果:", result);
        
        if (result.text) {
            output.innerHTML = result.text.replace(/\n/g, "<br>");
        } else {
            output.innerHTML = "❌ 生成失败：未收到有效响应";
        }
        
    } catch (error) {
        console.error("生成失败:", error);
        output.innerHTML = `❌ 生成失败：${error.message}<br>请检查后端服务是否正常运行`;
    } finally {
        // 重新启用按钮
        generateBtn.disabled = false;
        generateBtn.textContent = "生成我的艺术家故事";
    }
});

// 页面加载时测试连接
document.addEventListener("DOMContentLoaded", async () => {
    console.log("页面加载完成，测试后端连接...");
    
    const isConnected = await testBackendConnection();
    if (isConnected) {
        console.log("✅ 后端连接正常");
    } else {
        console.log("❌ 后端连接失败");
        output.innerHTML = "⚠️ 后端服务连接异常，功能可能受限";
    }
});
