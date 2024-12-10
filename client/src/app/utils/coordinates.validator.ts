import { ValidatorFn, AbstractControl } from "@angular/forms";
import { extractCoordinates } from "./extractCoordinates";

export function coordinatesValidator(): ValidatorFn {
    return (control: AbstractControl) => {


        if (!control.value || control.value.trim() === '') {
            return null;
        }

        const coordinates = extractCoordinates(control.value);



        if (coordinates && isFinite(coordinates.lat) && isFinite(coordinates.lng)) {
            return null
        } else {
            return { coordinatesValidator: true };
        }

    };
}