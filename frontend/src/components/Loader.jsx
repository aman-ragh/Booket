import HashLoader from "react-spinners/HashLoader";



function Loader() {
    const override = {
        // position: "absolute",
        // top: "50%",
        // left: "50%",
        display: "block",
        // margin: "0 auto",

    }
    
    return (
        <div className="loader">
        <div className="sweet-loading" >

            <HashLoader
                color="#1d0443"
                cssOverride={override}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
        </div>
    );
}

export default Loader;