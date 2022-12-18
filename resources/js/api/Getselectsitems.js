import Api from "./Api";


export default {
    async getRoles() {
        return Api.get("/roles/all");
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
};