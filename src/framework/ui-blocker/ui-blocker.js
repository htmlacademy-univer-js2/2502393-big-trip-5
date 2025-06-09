import './ui-blocker.css';

export default class UiBlocker {
  /** @type {number} Время до блокировки интерфейса*/
  #lowerLimit;

  /** @type {number} Минимальное время блокировки интерфейса*/
  #upperLimit;

  /** @type {HTMLElement|null} Элемент, блокирующий интерфейс */
  #element;

  /** @type {number} Время вызова метода block */
  #startTime;

  /** @type {number} Время вызова метода unblock */
  #endTime;

  /** @type {number} Идентификатор таймера */
  #timerId;

  /**
   * @param {Object} config Объект с настройками блокировщика
   * @param {number} config.lowerLimit Время до блокировки интерфейса в миллисекундах. Если вызвать метод unblock раньше, то интерфейс заблокирован не будет
   * @param {number} config.upperLimit Минимальное время блокировки в миллисекундах. Минимальная длительность блокировки
   */
  constructor({lowerLimit, upperLimit}) {
    this.#lowerLimit = lowerLimit;
    this.#upperLimit = upperLimit;

    this.#element = document.createElement('div');
    this.#element.classList.add('ui-blocker');
    document.body.append(this.#element);
  }

  block() {
    this.#startTime = Date.now();
    this.#timerId = setTimeout(() => {
      this.#addClass();
    }, this.#lowerLimit);
  }

  unblock() {
    this.#endTime = Date.now();
    const duration = this.#endTime - this.#startTime;

    if (duration < this.#lowerLimit) {
      clearTimeout(this.#timerId);
      return;
    }

    if (duration >= this.#upperLimit) {
      this.#removeClass();
      return;
    }

    setTimeout(this.#removeClass, this.#upperLimit - duration);
  }

  #addClass = () => {
    this.#element.classList.add('ui-blocker--on');
  };

  #removeClass = () => {
    this.#element.classList.remove('ui-blocker--on');
  };
}
