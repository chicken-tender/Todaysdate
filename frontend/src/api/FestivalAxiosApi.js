import axios from "axios";

const FestivalAxiosApi = {
    // 🎉 축제 정보 가져오기
    fetchFestivals: async () => {
        try {
            const response = await axios.get("/api/festivals", {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default FestivalAxiosApi;
