import './Info.css';

function Info({user, numberAccount, address, country, nationalIdNumber}){

    return (
        <div className="infoSheet">
            <p className="info__label">Full Name:</p>
            <p className="info__value">{user}</p>
            <p className="info__label">Out</p>
            <p className="info__value">{numberAccount}</p>
            <p className="info__label">Interest</p>
            <p className="info__value">{address}</p>
            <p className="info__label">Full Name:</p>
            <p className="info__value">{country}</p>
            <p className="info__label">Full Name:</p>
            <p className="info__value">{nationalIdNumber}</p>
        </div>
    )

}

export default Info;