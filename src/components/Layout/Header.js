import React from 'react';
import headerImg from '../../assets/meals.jpg'
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = props => {
    return(
        <React.Fragment>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton onCartButtonClick={props.onCartButtonClick}></HeaderCartButton>
            </header>
            <div className={classes['main-image']}>
                <img src={headerImg} alt='Delicious Food Items'></img>
            </div>
        </React.Fragment>
    );
}

export default Header;