module.exports = class Xe {
    constructor(name, url, price, images, thumbnail, colors, description, category_name, category_image) {
        this.name = '';
        this.price = 0;
        this.thumbnail = 'default_thumbnail';
        this.images = [];
        this.colors = [];
        this.description = [];
        this.dongxe_name = '';
        this.dongxe_url = '';
        this.dongxe_image = 'default_image';
        this.url = url;
    }
}