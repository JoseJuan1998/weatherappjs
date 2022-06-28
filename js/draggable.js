const defaultConfig = {
  open: true,
  debug: false,
  animatable: true,
};

export default function draggable($element, config = defaultConfig) {
  if (!($element instanceof HTMLElement))
    return console.warn(
      `Elemento invalido se esperaba un HTLMElement y se recibio ${$element}`
    );

  config.animatable ? setAnimations() : null;

  let isOpen = config.open;
  let isDragging = false;

  let startY = 0;

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

  function setAnimations() {
    $element.style.transition = "margin-bottom .3s";
  }

  function bounce() {
    if (isOpen) return widgetPosition < 60 ? open() : close();

    return widgetPosition < HIDDEN_Y_POSITION - 60 ? open() : close();
  }

  function handlePointerDown(event) {
    logger("DOWN");
    startDrag(event);
  }

  function handlePointerUp(event) {
    logger("UP");
    dragEnd();
  }

  function handlePointerOut(event) {
    logger("OUT");
    dragEnd();
  }

  function handlePointerCancel(event) {
    logger("CANCEL");
    dragEnd();
  }

  function dragEnd() {
    isDragging = false;
    bounce();
  }

  function handlePointerMove(event) {
    logger("MOVING");
    drag(event);
  }

  function handleToggleClick() {
    logger("CLICK");
    toggle();
  }

  function startDrag(event) {
    startY = pageY(event);
  }

  function pageY(event) {
    return event.pageY || event.touches[0].pageY;
  }

  function getMovement(movementY) {
    widgetPosition += movementY;
    if (widgetPosition > HIDDEN_Y_POSITION)
      return (widgetPosition = HIDDEN_Y_POSITION);

    if (widgetPosition < 0) return (widgetPosition = 0);

    return widgetPosition;
  }

  function toggle() {
    if (!isDragging) return !isOpen ? open() : close();
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

  function drag(event) {
    isDragging = true;
    const cursorY = pageY(event);
    const movementY = cursorY - startY;
    setWidgetPosition(getMovement(movementY));
    startY = cursorY;
    logger({ movementY });
  }
}
