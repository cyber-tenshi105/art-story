document.addEventListener("DOMContentLoaded", () => {
  const nickname = document.getElementById("nickname");
  const ageGroup = document.getElementById("ageGroup");
  const ageCustom = document.getElementById("ageCustom");
  const style = document.getElementById("style");
  const styleCustom = document.getElementById("styleCustom");
  const traits = document.getElementById("traits");
  const traitsCustom = document.getElementById("traitsCustom");
  const personality = document.getElementById("personality");
  const personalityCustom = document.getElementById("personalityCustom");
  const extra = document.getElementById("extra");
  const output = document.getElementById("output");

  // 你在 Render 部署的后端 API 地址
  const API_URL = "https://art-artist-story.onrender.com";

  // 自定义选项逻辑
  function toggleCustom(selectEl, customEl) {
    selectEl.addEventListener("change", () => {
      if (selectEl.value === "自定义") {
        customEl.classList.remove("hidden");
      } else {
        customEl.classList.add("hidden");
      }
    });
  }

  toggleCustom(ageGroup, ageCustom);
  toggleCustom(style, styleCustom);
  toggleCustom(traits, traitsCustom);
  toggleCustom(personality, personalityCustom);

  // 点击生成故事
  document.getElementById("generateBtn").addEventListener("click", async () => {
    const data = {
      nickname: nickname.value,
      age: ageGroup.value === "自定义" ? ageCustom.value : ageGroup.value,
      style: style.value === "自定义" ? styleCustom.value : style.value,
      traits: traits.value === "自定义" ? traitsCustom.value : traits.value,
      personality: personality.value === "自定义" ? personalityCustom.value : personality.value,
      extra: extra.value
    };

    output.innerHTML = "⏳ Generating your story...";

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      output.innerHTML = result.text || "⚠️ No response from server.";
    } catch (err) {
      output.innerHTML = "❌ Failed to connect to server.";
    }
  });
});
