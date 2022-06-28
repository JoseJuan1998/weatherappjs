const defaultConfig = {
  open: true,
  debug: true,
  animatable: true,
};

export default function draggable($element, config = defaultConfig) {
  if (!($element instanceof HTMLElement))
    return console.warn(
      `Elemento invalido se esperaba un HTLMElement y se recibio ${$element}`
    );

  let isOpen = config.open;
  let isDragging = false;

  const ELEMENT_BLOCK_SIZE = $element.getBoundingClientRect().height;

  const $marker = $element.querySelector('[data-marker="true"]');
  const MARKET_BLOCK_SIZE = $marker.getBoundingClientRect().height;

  const VISIBLE_Y_POSITION = 0;
  const HIDDEN_Y_POSITION = ELEMENT_BLOCK_SIZE - MARKET_BLOCK_SIZE;

  let widgetPosition = VISIBLE_Y_POSITION;

  isOpen ? open() : close();

  $marker.addEventListener("click", handleToggleClick);
  $marker.addEventListener("pointerdown", handlePointerDown);
  $marker.addEventListener("pointerup", handlePointerUp);
  $marker.addEventListener("pointerout", handlePointerOut);
  $marker.addEventListener("pointercancel", handlePointerCancel);
  $marker.addEventListener("pointermove", handlePointerMove);

  function handlePointerDown(event) {
    logger("DOWN");
  }

  function handlePointerUp(event) {
    logger("UP");
  }

  function handlePointerOut(event) {
    logger("OUT");
  }

  function handlePointerCancel(event) {
    logger("CANCEL");
  }

  function handlePointerMove(event) {
    logger("MOVING");
  }

  function handleToggleClick() {
    logger("CLICK");
    toggle()
  }

  function toggle() {
    if(!isDragging)
      return !isOpen ? open() : close();
  }

  function logger(message) {
    if (config.debug) {
      console.info(message);
    }
  }

  function open() {
    logger("Abrir Widget");
    isOpen = true;
    widgetPosition = VISIBLE_Y_POSITION;
    setWidgetPosition(widgetPosition);
  }

  function close() {
    logger("Cerrar Widget");
    isOpen = false;
    widgetPosition = HIDDEN_Y_POSITION;
    setWidgetPosition(widgetPosition);
  }

  function setWidgetPosition(value) {
    $element.style.marginBottom = `-${value}px`;
  }
}
