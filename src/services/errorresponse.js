export function error_response_output(response_body, statuscode) {
    console.log("response_body: ", response_body)
    console.log("statuscode received: ", statuscode)
    console.log("statuscode type: ", typeof(statuscode))

    // default error msg
    var errMsg = 'Unknown Error'

    // if status is 422, loop through the error details, get the fields and their error msg
    // and add them in an array.
    if (statuscode === 422) {
        var errDetails = response_body['detail']
        var fields_error = errDetails.map(field => {
            return `field: ${field.loc[1]} - error: ${field.msg}`
        })
        console.log("fields_error => ", fields_error)
        console.log("fields_error length => ", fields_error.length)
        errMsg = fields_error
    }

    // convert the array to a string and set the errMsg

    else if (statuscode === 409) {
        errMsg = response_body
    }
    
    console.log("final errMsg => ", errMsg)

    return errMsg
}