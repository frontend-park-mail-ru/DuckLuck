import BasePresenter from './BasePresenter.js';
import {isValidForm} from '../modules/Valiadtor/validator';
import Router from '../utils/router/Router';
import Events from '../utils/bus/events';
import Responses from '../utils/bus/responses';

/**
 * @description Presenter for Profile View and Model
 */
class ProfilePresenter extends BasePresenter {
    /**
     *
     * @param {Object} view
     * @param {Object} model
     * @param {Object} bus bus of this mvp part
     */
    constructor(view, model, bus) {
        super(view, model, bus);
        this.bus.on(Events.ProfileFLNameChange, this.sendFirstLastName);
        this.bus.on(Events.ProfileFLNameResult, this.firstLastNameSendProcessResult);
        this.bus.on(Events.ProfileAvatarChange, this.sendAvatar);
        this.bus.on(Events.ProfileAvatarResult, this.avatarSendProcessResult);
        this.bus.on(Events.ProfileEmailResult, this.emailSendProcessResult);
        this.bus.on(Events.ProfileCheckAuthResult, this.tryAuthProcessResult);
    }

    /**
     *
     * @param {Object} specificTypeToCheck
     * @return {boolean}
     */
    isFormValid = (specificTypeToCheck = []) => {
        return isValidForm(document.getElementsByClassName('profile-credentials__form')[0], specificTypeToCheck);
    }

    /**
     * @description Send data to model
     */
    sendFirstLastName = () => {
        if (!this.isFormValid(['text'])) {
            this.bus.emit(Events.ProfileIncorrectFLName, {});
            return;
        }
        const firstName = document.getElementsByName('firstName')[0].value.trim();
        const lastName = document.getElementsByName('lastName')[0].value.trim();
        this.model.changeFirstLastName(firstName, lastName);
    }

    /**
     * @param {string} result
     * @description Processed a signal
     */
    firstLastNameSendProcessResult = (result) => {
        if (result === Responses.Success) {
            this.view.changeFirstLastName(this.getFirstName(), this.getLastName());
        } else {
            console.error(result);
        }
    }

    /**
     *
     * @return {string}
     */
    getFirstName = () => {
        if (this.model.firstName === undefined) {
            this.model.getFirstLastName();
            return '';
        }

        return this.model.firstName;
    }

    /**
     *
     * @return {string}
     */
    getLastName = () => {
        if (this.model.lastName === undefined) {
            this.model.getFirstLastName();
            return '';
        }

        return this.model.lastName;
    }

    /**
     *
     * @return {string}
     */
    getEmail = () => {
        if (this.model.email === undefined) {
            this.model.getEmail();
            return '';
        }

        return this.model.email;
    }

    /**
     *
     * @return {string}
     */
    getAvatar = () => {
        if (this.model.avatarURL === undefined) {
            this.model.getAvatar();
            return '';
        }

        return this.model.avatarURL;
    }

    /**
     * @description get data view and send to model
     */
    sendAvatar = () => {
        if (!this.isFormValid(['file'])) {
            this.bus.emit(Events.ProfileIncorrectAvatar, {});
            return;
        }

        const avatarInput = document.getElementsByClassName('profile-info__user-avatar-input')[0];
        this.model.changeAvatar(avatarInput.files[0]);
    }

    /**
     *
     * @param {string} result
     */
    avatarSendProcessResult = (result) => {
        if (result === Responses.Success) {
            this.view.changeAvatar(this.getAvatar());
        } else {
            console.error(result);
        }
    }

    /**
     *
     * @param {string} result
     */
    emailSendProcessResult = (result) => {
        if (result === Responses.Success) {
            this.view.changeEmail(this.getEmail());
        } else {
            console.error(result);
        }
    }

    /**
     * @description attempts to authorize
     */
    tryAuth = () => {
        this.model.checkAuth();
    }

    /**
     *
     * @param {string} result
     */
    tryAuthProcessResult = (result) => {
        if (result === Responses.Success) {
            this.view.render();
            (this.view.cache).hidden = false;
        } else {
            Router.open('/login', {replaceState: true});
        }
    }
}

export default ProfilePresenter;
