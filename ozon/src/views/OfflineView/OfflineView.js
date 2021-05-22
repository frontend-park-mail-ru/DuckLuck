import {BaseView} from '../BaseView.js';
import {Popup} from '../Common/Popup/Popup.js';
import {Blind} from '../Common/Blind/Blind.js';
import Router from '../../utils/router/Router.js';
import {OfflineForm} from '../Common/OfflineForm/OfflineForm.js';
import decorator from '../decorators.scss';
import popupStyles from '../Common/Popup/Popup.scss';

/**
 * @class  OfflineView
 * @extends BaseView
 * @classdesc Class for offline view (when user doesn't have internet connection)
 */
export class OfflineView extends BaseView {
    /**
     *
     * @return {void} rendered page
     */
    render = () => {
        const body = document.getElementsByTagName('body')[0];
        body.classList.add(decorator.noScroll);

        if (this.cache !== '') {
            this.parent.appendChild(this.cache);
            return;
        }

        const template = new Popup().getHtmlString({
            popupBody: new OfflineForm().getHtmlString(),
            background: new Blind().getHtmlString(),
            popupType: popupStyles.offline,
        });

        this.cache = new DOMParser().parseFromString(template, 'text/html').getElementById('popup-wrapper');

        const blind = this.cache.getElementsByClassName('blind')[0];
        blind.addEventListener('click', (evt) => {
            evt.preventDefault();
            body.classList.remove(decorator.noScroll);
            this.remove();
            Router.goBack();
        });

        this.parent.appendChild(this.cache);
    }
}
