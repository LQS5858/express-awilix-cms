export default class baseService {
    success (data = null, error) {
        return {
            success: true,
            error,
            data
        }
    }
    fail (data = null, error) {
        return {
            success: false,
            error,
            data
        }
    }
}