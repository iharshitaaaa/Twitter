class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            const result = await this.model.create(data);
            return result;  
        }
        catch (error) {
            console.error("Something went wrong in crud repository", error);
            throw error;
        }
    }

    async destroy(modelId) {
        try{
            const result = await this.model.findByIdAndDelete(modelId);
            return result;
        } 
        catch (error) {
            console.error("Something went wrong in crud repository", error);
            throw error;
        }   
    }

    async get(modelId) {
        try{
            const result = await this.model.findById(modelId);
            return result;
        } 
        catch (error) {
            console.error("Something went wrong in crud repository", error);
            throw error;
        }
    }

    async getAll() {
        try {
            const result = await this.model.find();
            return result;
        }
        catch (error) {
            console.error("Something went wrong in crud repository", error);
            throw error;
        }
    }

    async update(modelId, data) {
        try {
            const result = await this.model.findByIdAndUpdate(modelId, data, {new: true}); // new: true means it will return the updated document.
            return result;
        }
        catch (error) {
            console.error("Something went wrong in crud repository", error);
            throw error;
        }
    }
}

export default CrudRepository;