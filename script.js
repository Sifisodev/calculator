document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.display');
    const buttons = document.querySelectorAll('button');
    let currentValue = '';
    let operator = '';
    let previousValue = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (value === 'C') {
                currentValue = '';
                operator = '';
                previousValue = '';
                display.textContent = '0';
            } else if ('+-*/'.includes(value)) {
                operator = value;
                previousValue = currentValue;
                currentValue = '';
            } else if (value === '%') {
                currentValue = (parseFloat(currentValue) / 100).toString();
                display.textContent = currentValue;
            } else if (value === '=') {
                if (previousValue && currentValue && operator) {
                    currentValue = calculate(previousValue, currentValue, operator);
                    operator = '';
                    previousValue = '';
                    display.textContent = currentValue;
                }
            } else {
                currentValue += value;
                display.textContent = currentValue;
            }
        });
    });

    function calculate(a, b, op) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (op) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return b !== 0 ? a / b : 'Error';
            default: return b;
        }
    }
});
