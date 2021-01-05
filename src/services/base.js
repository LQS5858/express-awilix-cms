export default class baseService {
    success (message, data = null) {
        return {
            success: true,
            message,
            data
        }
    }
    fail (message, data = null) {
        return {
            success: false,
            message,
            data
        }
    }
}