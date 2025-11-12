import { useEffect, useRef, useState } from 'react';
import { useDebounced } from '@/hooks/useDebounced';

/**
 * @viewmodel dùng để xử lý các sự kiện của ô input field ở @SearchPage đã custom.
 *
 * @param {Bool} showClose - dùng để hiển thị icon Close (X) để xóa inputValue sau khi gọi xong API.
 * @param {DOMElement} inputRef - Dùng để lấy DOMELEMENT ra để set các sự kiện focus và blur cho ô input.
 * @param {String} debouncedValue - sử dụng kỹ thuật useDebounced. Khi người dùng gõ xong đợi khoảng 1s thì mới gọi API.
 */
export const useInputViewModel = () => {
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [showClose, setShowClose] = useState(false);
    const inputRef = useRef(null);
    const debouncedValue = useDebounced(inputValue, 1000);

    /* Logic: khi người dùng gõ thì debouncedValue thay đổi liên tục nên ko cho hiển thị icon Close.
    => Chỉ khi người dùng dừng gõ thì sau 1.5s sẽ hiển thị icon. */
    useEffect(() => {
        if (debouncedValue.trim() !== '') {
            setShowClose(false);
            const timerId = setTimeout(() => {
                setShowClose(true);
            }, 1500);
            return () => clearTimeout(timerId);
        }
    }, [debouncedValue]);

    // Gắn các sự kiện focus, blur cho ô input Search.
    useEffect(() => {
        const inputEl = inputRef.current;
        if (!inputEl) return;

        const handleFocus = () => setIsFocused(true);
        const handleBlur = () => setIsFocused(false);

        inputEl.addEventListener('focus', handleFocus);
        inputEl.addEventListener('blur', handleBlur);

        return () => {
            inputEl.removeEventListener('focus', handleFocus);
            inputEl.removeEventListener('blur', handleBlur);
        };
    }, []);

    // Logic: Ấn vô Close sẽ xóa hết nội dung mà người dùng đã gõ.
    const handleClickClose = () => {
        setInputValue('');
        setShowClose(false);
    };

    const handleChangeInput = (e) => {
        setInputValue(e.target.value);
    };

    return {
        isFocused,
        inputValue,
        handleChangeInput,
        handleClickClose,
        showClose,
        inputRef,
        debouncedValue,
    };
};
