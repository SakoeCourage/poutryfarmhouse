import Api from "./Api";


export default {
    async getRoles() {
        return Api.get("/roles/select");
    },
    async getJobPositions() {
        return Api.get("/jobpositions/all");
    },
    async getAllShed() {
        return Api.get("/sheds/all");
    },
    async getAllflockNames() {
        return Api.get("/flocks/all");
    },
    async getAllBreeds() {
        return Api.get("/breed/all/select");
    },
    async generateinvoice(id) {
        return Api.get(`invoice/${id}/store`)
    },
    async getPaymentMethods() {
        return Api.get('/payment/methods/all')
    },
    async getFeeds() {
        return Api.get('/feed/select/all')
    },
    async getAutoStockableProducts() {
        return Api.get('/product/stockable')
    },
    async getCollectionTypes() {
        return Api.get('/collectiontypes/select')
    }
}