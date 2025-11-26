import React, { useState } from 'react';
import styles from './ToggleSwitch.module.scss';
import PropTypes from 'prop-types';

const ToggleSwitch = ({ defaultOn = false }) => {
    const [on, setOn] = useState(defaultOn);
    return (
        <button
            type="button"
            aria-pressed={on}
            onClick={() => setOn(!on)}
            className={`${styles.switch} ${on ? styles.on : ''}`}
        >
            <span className={styles.knob} />
        </button>
    );
};
ToggleSwitch.propTypes = {
    defaultOn: PropTypes.bool.isRequired,
}

export default ToggleSwitch;