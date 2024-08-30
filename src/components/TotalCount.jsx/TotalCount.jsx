import useCards from "../../hooks/useCards";

const TotalCount = () => {
    const [cards] = useCards();
    return (
        <div>
            <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
                <div className="stat flex items-center justify-around bg-red-300">
                    <div className="stat-title">এ পর্যন্ত শহীদ</div>
                    <div className="stat-value">{cards.length}</div>
                </div>

                <div className="stat flex items-center justify-around bg-amber-300">
                    <div className="stat-title">এ পর্যন্ত আহত</div>
                    <div className="stat-value">৩৩,০০০+</div>
                </div>

                <div className="stat flex items-center justify-around bg-slate-300">
                    <div className="stat-title">নিখোঁজ</div>
                    <div className="stat-value">১১,০০০+</div>
                </div>
            </div>
        </div>
    );
};

export default TotalCount;