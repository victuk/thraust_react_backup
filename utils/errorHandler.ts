export const errorHandler = (error: any) => {
    if(error.error) {
        return error.error;
    } else {
        return "Something went wrong... Kindly try again later.";
    }
}