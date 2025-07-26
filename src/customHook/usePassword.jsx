import React, { useState } from 'react'
import { HideEyeIcon, ShowEyeIcon } from '../svg'

function usePassword(setIsShowPassword = () => { }) {
    const [showPassword, setPassword] = useState(false)

    function showPasswordHandler() {
        setPassword((prev) => !prev)
        setIsShowPassword(showPassword)
    }

    return (
        <div style={{
            position: 'absolute',
            top: 10,
            right: 5,
            cursor: 'pointer'
        }}
            onClick={showPasswordHandler}
        >
            {showPassword ? <HideEyeIcon /> : <ShowEyeIcon />}
        </div>
    )
}

export default usePassword