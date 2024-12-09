import css from './Page404.module.css';
import { useNavigate } from 'react-router-dom';


const Page404 = () => {

    const nav = useNavigate(); // react router hook

    const returnHome = async () => {
       
            nav('/')
       

    }

    return (

        <div className="background mainBackground">
            <section className="top-bottom">
                    <div className={css.page}>
                        <div>
                            <h1 className={css.header}> 404</h1>
                        </div>
                        <div>
                            <h3 className={css.notfounfHeader}> Page not found!</h3>
                            <p className={css.notfoundText}> The page you are trying to access does not exist on this server.</p>
                            <p className={css.notfoundreasons}>Possible reasons</p>
                            <ul className={css.notfoundList}>
                                <li className={css.notfoundListItem}> The page may have been moved or deleted</li>
                                <li className={css.notfoundListItem}>You may have used an outdated or broken link</li>
                                <li className={css.notfoundListItem}>You may have typed the address (URL)  incorrectly</li>

                            </ul>
                            <button
                                color="orange"
                                size="wide"
                                onClick={returnHome}
                            >
                                Return to Homepage
                            </button>

                        </div>
                    </div>
            </section>
        </div>

    )
}

export default Page404;
