const tabs = [...document.querySelectorAll(".solution-tab")];
const panels = [...document.querySelectorAll(".solution-panel")];

function activateTab(tab, moveFocus = false) {
  const selectedPanel = tab.dataset.panel;
  for (const currentTab of tabs) {
    const isSelected = currentTab === tab;
    currentTab.classList.toggle("is-active", isSelected);
    currentTab.setAttribute("aria-selected", String(isSelected));
    currentTab.tabIndex = isSelected ? 0 : -1;
  }
  for (const panel of panels) {
    const isSelected = panel.id === `panel-${selectedPanel}`;
    panel.hidden = !isSelected;
    panel.classList.toggle("is-active", isSelected);
  }
  if (moveFocus) tab.focus();
}

for (const [index, tab] of tabs.entries()) {
  tab.addEventListener("click", () => activateTab(tab));
  tab.addEventListener("keydown", (event) => {
    let nextIndex;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;
    if (nextIndex !== undefined) {
      event.preventDefault();
      activateTab(tabs[nextIndex], true);
    }
  });
}

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");
menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  navigation.classList.toggle("is-open", !isExpanded);
});

for (const link of navigation.querySelectorAll("a")) {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  });
}

document.querySelector("#year").textContent = new Date().getFullYear();
