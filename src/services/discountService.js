import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Service for working with discount codes.
 */
export const discountService = {
    /**
     * Validates a discount code with the backend.
     */
    validateCode: async (code, cartTotal) => {
        try {
            const response = await axios.post(`${API_URL}/discounts/validate`, {
                code,
                cartTotal
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Network error or invalid code' };
        }
    }
};
