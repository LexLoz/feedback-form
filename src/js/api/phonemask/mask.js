/*
https://github.com/liggth/inputmask-phones
*/

import maskList from "./masks_list";
const PhoneMask = (selector) => {
    function setMask(e) {
        let matrix = '+###############';

        maskList.forEach(item => {
            let code = item.code.replace(/[\s#]/g, ''),
                phone = e.target.value.replace(/[\s#-)(]/g, '');

            if (phone.includes(code)) {
                matrix = item.code;
            }
        });

        let i = 0,
            val = e.target.value.replace(/\D/g, '');

        e.target.value = matrix.replace(/(?!\+)./g, function (a) {
            return /[#\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        });
    }

    let inputs = document.querySelectorAll(selector);

    inputs.forEach(input => {
        if (!input.value) input.value = '+';
        input.addEventListener('input', setMask);
        input.addEventListener('focus', setMask);
        input.addEventListener('blur', setMask);
    });
};

export default PhoneMask;