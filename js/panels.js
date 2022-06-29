export default function configurePanels() {
  const $tabPanels = document.querySelectorAll(".tabPanel");

  $tabPanels.forEach(($tabPanel, parentIndex) => {
    const $lis = $tabPanel.querySelectorAll(".dayWeather-item");

    $lis.forEach(($li) => {
      $li.addEventListener("click", (e) =>
        handleClick(e.target, parentIndex)
      );
    });
  });
}

function handleClick(event, parentIndex) {
  const $item = event.id ? event : event.parentNode;
  const id = $item.id;
  const $parent = document.querySelector(`#dayWeather-${parentIndex}`);
  const $infoPanel = $parent.querySelector(`[aria-labelledby=${id}]`);
  const $selectedInfoPanel = $parent.querySelector(".infoPanel:not([hidden])");
  const $selectedItem = $parent.querySelector(".is-selected");
  $selectedItem.classList.remove("is-selected");
  $item.classList.add("is-selected");

  $infoPanel.hidden = false;
  $selectedInfoPanel.hidden = true;
}
