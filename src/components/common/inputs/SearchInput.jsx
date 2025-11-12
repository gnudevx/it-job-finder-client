import { AiOutlineLoading } from 'react-icons/ai';
import { Search } from 'lucide-react';
import styles from './SearchInput.module.scss';
import { IoIosCloseCircle } from 'react-icons/io';
import { useInputViewModel } from '@/viewmodels/useInputViewModel.js';
import PropTypes from 'prop-types';
export const SearchInput = ({ onFocus, className, onChange, text }) => {
    const {
        inputValue,
        handleClickClose,
        showClose,
        handleChangeInput,
        inputRef,
        debouncedValue,
    } = useInputViewModel();
    const handleChange = (e) => {
        handleChangeInput(e);
        onChange && onChange(e.target.value); // ✅ gửi giá trị ra ngoài
    };
    return (
        <div className={`${styles['searchLayout__header-search']} ${className || ''}`}>
            <Search size={20} className={styles['searchLayout__header-searchIcon']} />
            <input
                ref={inputRef}
                type="text"
                placeholder={text || "Search"}
                onChange={handleChange}
                value={inputValue}
                onFocus={onFocus}
            />
            {debouncedValue.length > 0 && !showClose && (
                <AiOutlineLoading className={styles['searchLayout__header-loading']} />
            )}

            {inputValue.length > 0 && showClose && (
                <IoIosCloseCircle
                    className={styles['searchLayout__header-close']}
                    onClick={handleClickClose}
                />
            )}
        </div>
    );
};
SearchInput.propTypes = {
    onFocus: PropTypes.func,
    className: PropTypes.string,
    hideLeadingIcon: PropTypes.bool,
    onChange: PropTypes.func,
    text: PropTypes.string,
};