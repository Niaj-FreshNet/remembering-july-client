import { NavLink } from "react-router-dom";

const ShaheedCard = ({card, cards, setCards}) => {

    const { _id, name, title, company, email, phone, skills, experience, image} = card;

    return (
        <div>
            <div className="card glass w-96">
                <figure>
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        alt="car!" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">Name: {name}</h2>
                    <p>id: {_id}</p>
                    <p>Title: {title}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">
                            <NavLink to={`http://localhost:5000/cards/${_id}`}>{phone}</NavLink>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShaheedCard;