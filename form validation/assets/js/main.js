const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

function Validator(options) {
    //Lấy ra form-group trong trường hợp element k phải con trực tiếp
    function getParentElement(inputElement, parentSelector) {
        var parentElement =  inputElement.closest(parentSelector)
        return parentElement;
    }

    var selectorRules = {}
    var isFormValid

    //Xử lí validate báo lỗi
    function validate(inputElement, rule) {
        var errorElement = getParentElement(inputElement, options.formGroupSelector).querySelector(options.errorSelector)
        var errorMessage

        // lay ra cac rule cua selector
        var rules = selectorRules[rule.selector]

        // lap qua tung rule va kiem tra
        //Neu co loi thi dung viec kiem tra
        for(var i=0; i < rules.length; ++i) {
            errorMessage = rules[i](inputElement.value)
            if (errorMessage) break;
        }
        // Xu li khong hop le
        if (errorMessage) {
            isFormValid = false
            errorElement.innerHTML = errorMessage
            getParentElement(inputElement, options.formGroupSelector).classList.add('invalid')
        } else {
            errorElement.innerHTML = ''
            getParentElement(inputElement, options.formGroupSelector).classList.remove('invalid')
        }
    }
    //Hàm xử lí khi đang nhập vào input
    function oninput(inputElement, rule) {
        var formMessage = getParentElement(inputElement, options.formGroupSelector).querySelector(options.errorSelector)
        formMessage.innerHTML = ''
        getParentElement(inputElement, options.formGroupSelector).classList.remove('invalid')
    }

    // Lấy element của form
    const formElement = $(options.form)
    if (formElement) {
        formElement.onsubmit = (e) => {
            isFormValid = true
            e.preventDefault()
            options.rules.forEach((rule) => {
                var inputElement = $(rule.selector)
                validate(inputElement, rule)
            })

            //lay cac value trong input
            var enableInput = formElement.querySelectorAll('[name]:not([disable])')
            
            if (isFormValid) {
                var formValue = Array.from(enableInput).reduce((values, input) => {
                    values[input.name] = input.value
                    return values
                }, {})

                options.onSubmit(formValue)
            }
        }

        // Lap qua moi rule va xu li event
        options.rules.forEach((rule) => {

            //Luu lai cac rule
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test)
            } else {
                selectorRules[rule.selector] = [rule.test]
            }

            var inputElement = $(rule.selector)
            if (inputElement) {
                //Xử lí khi blur ra khỏi input
                inputElement.onblur = () => {
                    validate(inputElement, rule)
                }
                //Xử lí khi người dùng nhập vào input
                //Xóa thông báo lỗi khi đang nhập
                inputElement.oninput = () => {
                    oninput(inputElement, rule)
                }
            }
        });
    }
}

Validator.isRequired = (selector) => {
    return {
        selector: selector,
        test: (value) => {
            return value.trim() ? undefined : 'Vui lòng nhập trường này.'
        }
    }
}

Validator.isEmail = (selector) => {
    return {
        selector: selector,
        test: (value) => {
            const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : 'Vui lòng nhập đúng email.'
        }
    }
}

Validator.isComfirmed = (selector, getConfirmValue) => {
    return {
        selector: selector,
        test: (value) => {
            return value === getConfirmValue() ? undefined : 'Password không khớp.'
        }
    }
}
