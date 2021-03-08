import {BasePage} from "../BasePage.js";
import {Input} from "../Common/Input/Input.js";
import {Link} from "../Common/Link.js";
import ProfileTemplate from "./ProfilePage.hbs"

export class ProfilePage extends BasePage {
    constructor(parent) {
        super(parent);
    }

    render = () => {
        const htmlTemplate = ProfileTemplate({
                    inputFields: [new Input({type: 'email', name: 'email', placeholder: 'Email address', isDisabled: true}),
                                  new Input({type: 'text', name: 'firstName', placeholder: 'First Name'}),
                                  new Input({type: 'text', name: 'lastName', placeholder: 'Last name'}),],
                    backLink: new Link({href: '/home', textContent: '<', dataset: 'home'}),
                    avatarUpload: new Input({type: 'file', name: 'avatar', placeholder: 'Upload new Avatar'}),
        });
        return new DOMParser().parseFromString(htmlTemplate, 'text/html')
            .getElementById('profile-page');
    }


    renderData = () => {
        const {first_name = '',
               email = '',
               last_name = '',
               avatar = ''} = this.data;
        document.getElementsByName('firstName')[0].placeholder = first_name;
        document.getElementsByName('email')[0].placeholder = email;
        document.getElementsByName('lastName')[0].placeholder = last_name;
        document.getElementsByClassName('profile-info__user-avatar')[0].src = avatar;
    }
}