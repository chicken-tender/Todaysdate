import axios from "axios";

const FestivalAxiosApi = {
    fetchFestivals: async () => {
        try {
            return await axios.get("/api/festivals");
        } catch (error) {
            throw error;
        }
    },
};

export default FestivalAxiosApi;
