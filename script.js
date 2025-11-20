// 后端 API（完整正确路径）
const API_URL = "https://art-artist-story.onrender.com/generate";

// 显示自定义栏逻辑
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

  output.innerHTML = "⏳ 正在生成中…";

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  output.innerHTML = result.text;
});
