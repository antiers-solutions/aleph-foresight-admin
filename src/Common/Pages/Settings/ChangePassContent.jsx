import React from 'react'
import InputCustom from '../../InputCustom/InputCustom'
import ButtonCustom from '../../ButtonCustom/ButtonCustom'
function ChangePassContent({onClick}) {
    return (
        <div className='plateformContent'>
            <p>Please Enter your email address</p>
            <InputCustom
                regularInput
                label="Email"
                placeholder="Eg”Admin123@gmail.com”"
            />
            <div className='plateformContent__button'>
                <ButtonCustom label="Get OTP" onClick={onClick} />
            </div>
        </div>
    )
}

export default ChangePassContent