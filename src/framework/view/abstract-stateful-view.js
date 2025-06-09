import AbstractView from './abstract-view.js';

export default class AbstractStatefulView extends AbstractView {
  /** @type {Object} Объект состояния */
  _state = {};

  /**
   * @param {Object} update Объект с обновлённой частью состояния
   */
  updateElement(update) {
    if (!update) {
      return;
    }

    this._setState(update);

    this.#rerenderElement();
  }

  /**
   * Метод для восстановления обработчиков после перерисовки элемента
   * @abstract
   */
  _restoreHandlers() {
    throw new Error('Abstract method not implemented: restoreHandlers');
  }

  /**
   * Метод для обновления состояния
   * @param {Object} update Объект с обновлённой частью состояния
   */
  _setState(update) {
    this._state = structuredClone({...this._state, ...update});
  }

  #rerenderElement() {
    const prevElement = this.element;
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.element;

    parent.replaceChild(newElement, prevElement);

    this._restoreHandlers();
  }
}
