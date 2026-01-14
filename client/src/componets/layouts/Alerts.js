import React from 'react';
import { useSelector } from 'react-redux';


const Alerts = () => {
const alerts = useSelector((state) => state.alert);

if (!alerts || alerts.length < 1) return null;

return (
    <>
    {alerts.map(alert => (
        <div className={`alert alert-${alert.alertType}`} key={alert.id}>
            {alert.msg}
        </div>
    ))}
    </>
)
}

export default Alerts
