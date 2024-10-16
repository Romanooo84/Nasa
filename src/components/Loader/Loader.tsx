
import css from './Loader.module.css'

const Loader=()=>{


    return(
        <div id={css.universe}>
            <div id={css.galaxy}>
                <div className={css.circle}></div>
                <div className={css.circle2}></div>
                <div className={css.circle3}></div>
                <div id={css.orbit0}>
                <div id={css.pos0}>
                    <div id={css.dot0}></div>
                </div>
                </div>
                <div id={css.orbit1}>
                <div id={css.pos1}>
                    <div id={css.dot1}></div>
                </div>
                </div>
                <div id={css.orbit2}>
                <div id={css.pos2}>
                    <div id={css.dot2}></div>
                </div>
                </div>
                <div id={css.orbit3}>
                <div id={css.pos}>
                    <div id={css.dot3}></div>
                </div>
                </div>
            </div>
        </div>

    )
}

export default Loader