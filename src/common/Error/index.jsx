import React from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import { resetAll } from '../../redux/action/error'
import Popup from '../Popup'


function Error({ resetAll, load, message, code }) {
    return (
        <Popup open={load}>
            <img src={""} alt="" />
            <span className="code">{code}</span>
            <span className="msg">{message}</span>
            {console.log("MMM", message, code)}
            <button onClick={resetAll} backgroundColor="#3A3A3A" color="white" height={8}>
                OK
            </button>
        </Popup>
    )
}

Error.defaultProps = {
    load: false
}
Error.propTypes = {
    load: PropTypes.bool
}

const mapStatesToProps = state => {
    return {
        load: state.error.loading,
        message: state.error.message,
        code: state.error.code
    }
}
export default connect(mapStatesToProps, { resetAll })(Error)