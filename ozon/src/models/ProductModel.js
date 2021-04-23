import {AjaxModule} from '../modules/Ajax/Ajax';
import {serverApiPath} from '../utils/urls/urls';
import BaseModel from './BaseModel';
import Events from '../utils/bus/events';
import Responses from '../utils/bus/responses';
import HTTPResponses from '../utils/http-responses/httpResponses';

/**
 * @description Model for Product in MVP Arch
 */
class ProductModel extends BaseModel {
    #item

    /**
     * @return {Object} item
     */
    get item() {
        return this.#item;
    }

    /**
     *
     * @param {Number} itemId ID of item on server
     * @description Loads item IN MODEL!
     */
    loadProduct(itemId) {
        AjaxModule.getUsingFetch({
            url: serverApiPath + `/product/${itemId}`,
        }).then((response) => {
            if (response.status !== HTTPResponses.Success) {
                throw response.status;
            }
            return response.json();
        }).then((parsedJson) => {
            const base = parsedJson['price']['base_cost'];
            const discount = parsedJson['price']['discount'];
            const discountPrice = Math.ceil(base * (1 - discount * 0.01));
            this.#item = {
                name: parsedJson['title'],
                price: {
                    discountPrice: discountPrice,
                    base: base,
                    discount: discount,
                },
                rating: parsedJson['rating'],
                description: {
                    descriptionText: parsedJson['description'],
                    category: parsedJson['category'],
                },
                images: parsedJson['images'],
                id: parsedJson['id'],
            };
            this.bus.emit(Events.ProductLoaded, Responses.Success);
        }).catch((err) => {
            switch (err) {
            case HTTPResponses.Unauthorized: {
                this.bus.emit(Events.ProductLoaded, Responses.Unauthorized);
                break;
            }
            case HTTPResponses.Offline: {
                this.bus.emit(Events.ProductLoaded, Responses.Offline);
                break;
            }
            default: {
                this.bus.emit(Events.ProductLoaded, Responses.Error);
                break;
            }
            }
        });
    }
}

export default ProductModel;
