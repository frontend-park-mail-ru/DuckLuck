/**
 * @class BaseView
 * @classdesc Base class for all other views
 */
export class BaseView {
    #parent
    #cache
    #presenter
    #bus
    #id

    /**
     *
     * @param {Object} parent  Parent HTML element
     * @param {Object} bus bus of this mvp part
     */
    constructor(parent, bus) {
        this.#parent = parent;

        this.#parent.dataset.view = this.constructor.name;
        this.#parent.hidden = false;
        this.#cache = '';
        this.#bus = bus;
        this.#id = 1;
    }

    /**
     *
     * @return {boolean} is element Active?
     */
    get isActive() {
        return !this.parent.hidden;
    }

    /**
     *
     * @return {HTMLElement} Cache of View
     */
    get cache() {
        return this.#cache;
    }

    /**
     *
     * @return {Object} Presenter of View
     */
    get presenter() {
        return this.#presenter;
    }

    /**
     *
     * @return {HTMLElement} Parent of this View
     */
    get parent() {
        return this.#parent;
    }

    /**
     *
     * @return {Object} Bus of this mvp part
     */
    get bus() {
        return this.#bus;
    }

    /**
     *
     * @return {number} id,page number,item id, etc. for this view (use if needs)
     */
    get ID() {
        return this.#id;
    }

    /**
     *
     * @param {HTMLElement} cache Cache of View
     */
    set cache(cache) {
        this.#cache = cache;
    }

    /**
     *
     * @param {Object} presenter Chained Presenter of View
     */
    set presenter(presenter) {
        this.#presenter = presenter;
    }

    /**
     *
     * @param {number} id new id
     */
    set ID(id) {
        this.#id = id;
    }


    /**
     * @description Hides an element in HTML
     */
    hide() {
        this.#cache.hidden = true;
    }

    /**
     * @description Removes Element from HTML
     */
    remove() {
        this.#parent.removeChild(this.cache);
    }

    /**
     * @description Show element in HTML
     */
    show() {
        this.render();
        this.#cache.hidden = false;
    }

    /**
     * @description Drop cache and render
     */
    reRender() {
        this.#cache = '';
        this.render();
    }

    /**
     * Render from template
     */
    render() {

    }
}
