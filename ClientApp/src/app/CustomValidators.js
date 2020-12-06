"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomValidators = void 0;
var CustomValidators = /** @class */ (function () {
    function CustomValidators() {
    }
    CustomValidators.passwordsMatch = function (password, confirmedPassword) {
        return function (control) {
            //getting undefined values for both variables
            console.log(password, confirmedPassword);
            //if I change this condition to === it throws the error if the 
            //  two fields are the same, so this part works
            if (password !== confirmedPassword) {
                return { 'passwordMismatch': true };
            }
            else {
                //it always gets here no matter what
                return null;
            }
        };
    };
    return CustomValidators;
}());
exports.CustomValidators = CustomValidators;
//# sourceMappingURL=CustomValidators.js.map