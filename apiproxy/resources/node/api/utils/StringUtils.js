/**
 * Created by T_Polsv on 12/6/16.
 */
'use strict';

module.exports = {
    compareStrings: function compareStrings(string1, string2, ignoreCase, useLocale) {
        if (ignoreCase) {
            if (useLocale) {
                string1 = string1.toLocaleLowerCase();
                string2 = string2.toLocaleLowerCase();
            }
            else {
                string1 = string1.toLowerCase();
                string2 = string2.toLowerCase();
            }
        }

        return string1 === string2;
    },

    checkSuccessCode: function checkSuccessCode(statusCode) {
        var regExp = /^2[0-9][0-9]$/
        return regExp.test(statusCode)
    }
}