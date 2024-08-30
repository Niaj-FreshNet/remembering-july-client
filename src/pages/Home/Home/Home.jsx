import TotalCount from "../../../components/TotalCount.jsx/TotalCount";
import Banner from "../Banner/Banner";
import Cards from "../Cards/Cards";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <TotalCount></TotalCount>
            <Cards></Cards>
        </div>
    );
};

export default Home;