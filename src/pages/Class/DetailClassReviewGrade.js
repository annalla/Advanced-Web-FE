import React, { useEffect } from "react";
import { useContext } from "react";
import { Nav2 } from "../../components/Nav/Nav2";
import { Fragment } from "react";
import { VALUE_TAB } from "../../constants/const";
import { useLocation } from "react-router";
import AuthContext from "../../store/store";
import { PATH } from "../../constants/paths";
import { splitPath } from "../../utils/util";
import { ERROR_CODE } from "../../constants/errorCode";
import { FE_URL } from "../../constants/const";
import Loading from "../../components/Loading/Loading";

const DetailClassReviewGrade = () => {
  const [error, setError] = React.useState(null);
  const location = useLocation();
  const id = splitPath(location.pathname, PATH.GRADE_REVIEW_SPLIT);
  const AuthCtx = useContext(AuthContext);
  const token = AuthCtx.user.token;
  const [loading,setLoading]=React.useState(true);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('review_id');
    console.log(token)//123
  }, [id,token]);
  if (error) {
    return <div>Error: {error}</div>;
  } else {
    return (
        <Fragment>
                <Nav2 id={id} token={token} valueTab={VALUE_TAB.TAB_GRADE} />
                {loading && <Loading />}
                <div className="card-container">
                    <header>
                        <img src={""} alt={"avatar"} />
                    </header>
                    <h1 className="bold-text">
                        {123} <span className="normal-text">{123}</span>
                    </h1>
                    <h2 className="normal-text">{123}</h2>
                    <h2 className="normal-text">{123}</h2>
                    <div className="social-container">

                    </div>
                </div>
      </Fragment>
    );
  }
};
export default DetailClassReviewGrade;
