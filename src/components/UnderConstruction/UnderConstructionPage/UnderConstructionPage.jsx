import { Link } from "react-router-dom";
import Preloader from "../Preloader/Preloader";
import './UnderConstructionPage.css'

function UnderConstructionPage() {
    return (
        <div className="App min-h-screen flex items-center justify-center">
            <div className="container max-w-screen-2xl text-center">
                <h1 className="mb-4">
                    This Page Is
                    <br />
                    Under Construction
                </h1>
                <br />
                <div>
                    <Link to="/"><button className="btn btn-success">GO TO HOME</button></Link>
                </div>
            </div>
            <Preloader />
        </div>
    );
}

export default UnderConstructionPage;