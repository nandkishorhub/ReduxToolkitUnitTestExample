import React from "react";
import { useEffect } from "react";
import { setAlert } from "../reducers/noteReducer/alertReducer";
import { useDispatch } from "react-redux";

function Alert(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(setAlert(null));
    }, 1000);
    // eslint-disable-next-line
  }, [props.alert]);

  return (
    props.alert && (
      <div className={`alert alert-${props.alert.type}`} role="alert">
        {props.alert.msg}
      </div>
    )
  );
}

export default Alert;