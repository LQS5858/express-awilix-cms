export default class baseService {
    success (error, data = null) {
        return {
            success: true,
            error,
            data
        }
    }
    fail (error, data = null) {
        return {
            success: false,
            error,
            data
        }
    }
}