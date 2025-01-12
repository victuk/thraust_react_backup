export const errorHandler = (error: any) => {
    if(error.error) {
        return error.error;
    } else if(error.result) {
        return error.result
    } if(typeof(error) == "string") {
        return error;
    } else {
        return "Something went wrong... Kindly try again later.";
    }
}