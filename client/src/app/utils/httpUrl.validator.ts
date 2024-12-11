import { ValidatorFn, AbstractControl } from "@angular/forms";

export function httpUrlValidator(): ValidatorFn {
    // Define the URL regex pattern (for HTTP/HTTPS URLs)
    const urlRegex = /^((http|https):\/\/)?(www\.)?[a-zA-Z0-9@:%._+~#?&//=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%._+~#?&//=]*)$/;

    return (control: AbstractControl) => {
        // If the control value is empty or contains only whitespace, return null (no error)
        if (!control.value || control.value.trim() === '') {
            return null;
        }

        // Test the control's value against the URL regex pattern
        const isValidUrl = urlRegex.test(control.value);

        // Return null if the URL is valid, otherwise return an error object
        return isValidUrl ? null : { httpUrlValidator: true };
    };
}